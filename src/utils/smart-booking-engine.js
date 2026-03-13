/**
 * Smart Booking Engine — localStorage-based booking intelligence
 * 
 * Stores EDD info and booking history in localStorage.
 * Provides smart suggestions for the next prenatal visit
 * based on gestational age and the PRENATAL_MILESTONES schedule.
 * 
 * Pure JS, no framework dependencies.
 */

import {
    PRENATAL_MILESTONES,
    calcGestationalAge,
    toLocalDate,
    addDays,
} from './prenatal-reminder-engine.js';

// ═══════════════════════════════════════════════
// STORAGE KEYS
// ═══════════════════════════════════════════════

const STORAGE_KEY_EDD = 'ansinh_edd_info';
const STORAGE_KEY_HISTORY = 'ansinh_booking_history';

// ═══════════════════════════════════════════════
// EDD INFO — saved from Tính Ngày Dự Sinh page
// ═══════════════════════════════════════════════

/**
 * Save EDD information to localStorage.
 * Called after the user calculates their due date.
 * 
 * @param {Object} data
 * @param {string} data.edd - ISO date string of estimated due date
 * @param {string} data.lmpDate - ISO date string of last menstrual period
 * @param {string} [data.method] - calculation method used (LMP, IVF, etc.)
 */
export function saveEddInfo(data) {
    if (!data || !data.edd || !data.lmpDate) return;
    try {
        const info = {
            edd: data.edd,
            lmpDate: data.lmpDate,
            method: data.method || 'LMP',
            savedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY_EDD, JSON.stringify(info));
    } catch (e) {
        // localStorage may be unavailable (private browsing, etc.)
        console.warn('Smart Booking: Cannot save EDD info', e);
    }
}

/**
 * Get stored EDD information.
 * @returns {Object|null} { edd, lmpDate, method, savedAt } or null
 */
export function getEddInfo() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_EDD);
        if (!raw) return null;
        const info = JSON.parse(raw);
        // Validate: EDD should not be more than 42 weeks old
        if (info.edd) {
            const edd = new Date(info.edd);
            const now = new Date();
            const daysPastEdd = Math.floor((now - edd) / (1000 * 60 * 60 * 24));
            if (daysPastEdd > 14) return null; // EDD passed > 2 weeks ago, data is stale
        }
        return info;
    } catch (e) {
        return null;
    }
}

// ═══════════════════════════════════════════════
// BOOKING HISTORY — saved after successful booking
// ═══════════════════════════════════════════════

/**
 * Save a booking record to localStorage.
 * Keeps the last 5 bookings.
 * 
 * @param {Object} data
 * @param {string} data.phone
 * @param {string} [data.name]
 * @param {string} [data.service]
 * @param {string} [data.date]
 * @param {string} [data.note]
 */
export function saveBookingHistory(data) {
    if (!data || !data.phone) return;
    try {
        const history = getBookingHistory();
        history.unshift({
            phone: data.phone,
            name: data.name || '',
            service: data.service || '',
            date: data.date || '',
            note: data.note || '',
            timestamp: new Date().toISOString(),
        });
        // Keep only last 5
        const trimmed = history.slice(0, 5);
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(trimmed));
    } catch (e) {
        console.warn('Smart Booking: Cannot save booking history', e);
    }
}

/**
 * Get all booking history from localStorage.
 * @returns {Array<Object>}
 */
export function getBookingHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
        if (!raw) return [];
        const history = JSON.parse(raw);
        return Array.isArray(history) ? history : [];
    } catch (e) {
        return [];
    }
}

/**
 * Get the most recent booking.
 * @returns {Object|null}
 */
export function getLastBooking() {
    const history = getBookingHistory();
    return history.length > 0 ? history[0] : null;
}

// ═══════════════════════════════════════════════
// SMART SUGGESTION LOGIC
// ═══════════════════════════════════════════════

/**
 * Find the next prenatal milestone based on current gestational age.
 * 
 * @param {number} gaWeeks - current gestational age in weeks
 * @param {number} gaDays - remaining days
 * @returns {Object|null} the next milestone or null if past all milestones
 */
export function findNextMilestone(gaWeeks, gaDays) {
    // Find the first milestone whose week is >= current GA
    // or whose window still includes current GA
    for (const m of PRENATAL_MILESTONES) {
        if (m.week > gaWeeks) return m;
        if (m.week === gaWeeks && gaDays <= 2) return m;
        // Also check if we're within the milestone's window
        if (gaWeeks >= m.windowStart && gaWeeks <= m.windowEnd) return m;
    }
    return null;
}

/**
 * Calculate a suggested appointment date based on the milestone week.
 * Returns the date when the milestone week is reached.
 * 
 * @param {string} lmpDate - ISO date string
 * @param {number} milestoneWeek - target week
 * @returns {Date}
 */
function calculateSuggestedDate(lmpDate, milestoneWeek) {
    const lmp = toLocalDate(lmpDate);
    const targetDate = addDays(lmp, milestoneWeek * 7);
    const today = toLocalDate(new Date());
    
    // If target date is in the past, suggest tomorrow
    if (targetDate <= today) {
        return addDays(today, 1);
    }
    return targetDate;
}

/**
 * Generate a smart booking suggestion based on stored EDD and booking history.
 * 
 * @returns {Object} suggestion object:
 *   - hasEdd: boolean - whether EDD info exists
 *   - hasHistory: boolean - whether booking history exists
 *   - phone: string - last used phone number
 *   - name: string - last used name
 *   - gaWeeks: number - current gestational age weeks
 *   - gaDays: number - current gestational age days
 *   - nextVisit: Object|null - { id, title, week, reason, suggestedDate, service, tests, icon, tier }
 *   - bannerText: string - display text for the suggestion banner
 */
export function getSmartSuggestion() {
    const eddInfo = getEddInfo();
    const lastBooking = getLastBooking();
    
    const result = {
        hasEdd: false,
        hasHistory: false,
        phone: '',
        name: '',
        gaWeeks: 0,
        gaDays: 0,
        nextVisit: null,
        bannerText: '',
    };
    
    // Fill from booking history
    if (lastBooking) {
        result.hasHistory = true;
        result.phone = lastBooking.phone || '';
        result.name = lastBooking.name || '';
    }
    
    // Fill from EDD info
    if (eddInfo && eddInfo.lmpDate) {
        result.hasEdd = true;
        const ga = calcGestationalAge(eddInfo.lmpDate);
        result.gaWeeks = ga.weeks;
        result.gaDays = ga.days;
        
        const nextMilestone = findNextMilestone(ga.weeks, ga.days);
        if (nextMilestone) {
            const suggestedDate = calculateSuggestedDate(eddInfo.lmpDate, nextMilestone.week);
            result.nextVisit = {
                id: nextMilestone.id,
                title: nextMilestone.title,
                week: nextMilestone.week,
                reason: nextMilestone.urgencyNote,
                suggestedDate: suggestedDate,
                service: 'Khám thai định kỳ',
                tests: nextMilestone.tests,
                icon: nextMilestone.icon,
                tier: nextMilestone.tier,
            };
            
            // Build banner text
            const weeksUntil = nextMilestone.week - ga.weeks;
            if (weeksUntil <= 0) {
                result.bannerText = `Bạn đang ở tuần ${ga.weeks}. Đã đến lúc: ${nextMilestone.title}`;
            } else if (weeksUntil <= 2) {
                result.bannerText = `Bạn đang ở tuần ${ga.weeks}. Sắp đến mốc: ${nextMilestone.title} (tuần ${nextMilestone.week})`;
            } else {
                result.bannerText = `Bạn đang ở tuần ${ga.weeks}. Mốc khám tiếp theo: ${nextMilestone.title} (tuần ${nextMilestone.week})`;
            }
        }
    }
    
    return result;
}

// ═══════════════════════════════════════════════
// CLEAR DATA
// ═══════════════════════════════════════════════

/**
 * Clear all smart booking data from localStorage.
 */
export function clearBookingData() {
    try {
        localStorage.removeItem(STORAGE_KEY_EDD);
        localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {
        // ignore
    }
}

// ═══════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════

export {
    STORAGE_KEY_EDD,
    STORAGE_KEY_HISTORY,
};
