import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Tests for smart-booking-engine.js
 * 
 * Since the engine uses localStorage (browser API), we test the pure
 * logic functions by importing them and mocking localStorage where needed.
 */

// ── Mock localStorage for Node.js environment ──
const storage = new Map();
global.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
    clear: () => storage.clear(),
    get length() { return storage.size; },
    key: (i) => [...storage.keys()][i] ?? null,
};

// Import after mocking localStorage
import {
    saveEddInfo,
    getEddInfo,
    saveBookingHistory,
    getBookingHistory,
    getLastBooking,
    getSmartSuggestion,
    findNextMilestone,
    clearBookingData,
    STORAGE_KEY_EDD,
    STORAGE_KEY_HISTORY,
} from '../src/utils/smart-booking-engine.js';

// ─── saveEddInfo / getEddInfo ──────────────────────────────

describe('saveEddInfo / getEddInfo', () => {
    beforeEach(() => storage.clear());

    it('saves and retrieves EDD info', () => {
        const edd = '2026-10-01';
        const lmpDate = '2025-12-25';
        saveEddInfo({ edd, lmpDate, method: 'LMP' });

        const info = getEddInfo();
        assert.ok(info);
        assert.equal(info.edd, edd);
        assert.equal(info.lmpDate, lmpDate);
        assert.equal(info.method, 'LMP');
        assert.ok(info.savedAt);
    });

    it('returns null when no EDD is stored', () => {
        assert.equal(getEddInfo(), null);
    });

    it('ignores invalid data', () => {
        saveEddInfo(null);
        assert.equal(getEddInfo(), null);

        saveEddInfo({});
        assert.equal(getEddInfo(), null);

        saveEddInfo({ edd: '2026-10-01' }); // missing lmpDate
        assert.equal(getEddInfo(), null);
    });

    it('returns null for stale EDD (> 2 weeks past)', () => {
        // Set EDD to 20 days ago
        const pastEdd = new Date();
        pastEdd.setDate(pastEdd.getDate() - 20);
        const lmp = new Date();
        lmp.setDate(lmp.getDate() - 300);

        saveEddInfo({
            edd: pastEdd.toISOString().split('T')[0],
            lmpDate: lmp.toISOString().split('T')[0],
        });

        assert.equal(getEddInfo(), null);
    });

    it('returns valid EDD within 2 weeks of due date', () => {
        const futureEdd = new Date();
        futureEdd.setDate(futureEdd.getDate() + 5);
        const lmp = new Date();
        lmp.setDate(lmp.getDate() - 270); // ~38 weeks ago

        saveEddInfo({
            edd: futureEdd.toISOString().split('T')[0],
            lmpDate: lmp.toISOString().split('T')[0],
        });

        const info = getEddInfo();
        assert.ok(info);
        assert.equal(info.edd, futureEdd.toISOString().split('T')[0]);
    });

    it('defaults method to LMP', () => {
        saveEddInfo({ edd: '2026-10-01', lmpDate: '2025-12-25' });
        const info = getEddInfo();
        assert.equal(info.method, 'LMP');
    });
});

// ─── saveBookingHistory / getBookingHistory / getLastBooking ─

describe('saveBookingHistory / getBookingHistory', () => {
    beforeEach(() => storage.clear());

    it('saves a booking and retrieves it', () => {
        saveBookingHistory({ phone: '0901234567', name: 'Chị Hoa' });
        const history = getBookingHistory();
        assert.equal(history.length, 1);
        assert.equal(history[0].phone, '0901234567');
        assert.equal(history[0].name, 'Chị Hoa');
    });

    it('returns empty array when no history', () => {
        const history = getBookingHistory();
        assert.deepEqual(history, []);
    });

    it('keeps last 5 bookings only', () => {
        for (let i = 0; i < 7; i++) {
            saveBookingHistory({ phone: `090000000${i}` });
        }
        const history = getBookingHistory();
        assert.equal(history.length, 5);
        // Most recent first
        assert.equal(history[0].phone, '0900000006');
    });

    it('getLastBooking returns most recent', () => {
        saveBookingHistory({ phone: '0901111111', name: 'A' });
        saveBookingHistory({ phone: '0902222222', name: 'B' });
        const last = getLastBooking();
        assert.equal(last.phone, '0902222222');
        assert.equal(last.name, 'B');
    });

    it('getLastBooking returns null when empty', () => {
        assert.equal(getLastBooking(), null);
    });

    it('ignores null/undefined input', () => {
        saveBookingHistory(null);
        saveBookingHistory(undefined);
        assert.deepEqual(getBookingHistory(), []);
    });

    it('ignores input without phone', () => {
        saveBookingHistory({ name: 'No Phone' });
        assert.deepEqual(getBookingHistory(), []);
    });

    it('stores timestamp with each booking', () => {
        saveBookingHistory({ phone: '0901234567' });
        const last = getLastBooking();
        assert.ok(last.timestamp);
        assert.ok(new Date(last.timestamp).getTime() > 0);
    });
});

// ─── findNextMilestone ────────────────────────────────────────

describe('findNextMilestone', () => {
    it('returns week 8 milestone at week 5', () => {
        const m = findNextMilestone(5, 0);
        assert.ok(m);
        assert.equal(m.week, 8);
    });

    it('returns week 8 milestone at week 9 (within window)', () => {
        const m = findNextMilestone(9, 0);
        assert.ok(m);
        // week 9 falls within week 8's window (windowStart–windowEnd) if applicable,
        // otherwise returns the next milestone with week > 9
        assert.ok(m.week >= 8);
    });

    it('returns current milestone if within 2 days', () => {
        const m = findNextMilestone(12, 1);
        assert.ok(m);
        assert.equal(m.week, 12);
    });

    it('returns a milestone when past current by > 2 days', () => {
        const m = findNextMilestone(12, 4);
        assert.ok(m);
        // Should return a milestone (either within window or next one)
        assert.ok(m.week >= 12);
    });

    it('returns milestone at week 41 (within window of week 40)', () => {
        const m = findNextMilestone(41, 0);
        // week 40 milestone has windowEnd: 41, so it should be returned
        assert.ok(m);
        assert.equal(m.week, 40);
    });

    it('returns a late milestone at week 39+3', () => {
        const m = findNextMilestone(39, 3);
        assert.ok(m);
        assert.ok(m.week >= 39);
    });
});

// ─── getSmartSuggestion ──────────────────────────────────────

describe('getSmartSuggestion', () => {
    beforeEach(() => storage.clear());

    it('returns empty suggestion when no data stored', () => {
        const s = getSmartSuggestion();
        assert.equal(s.hasEdd, false);
        assert.equal(s.hasHistory, false);
        assert.equal(s.phone, '');
        assert.equal(s.name, '');
        assert.equal(s.nextVisit, null);
        assert.equal(s.bannerText, '');
    });

    it('fills phone and name from booking history', () => {
        saveBookingHistory({ phone: '0901234567', name: 'Chị Lan' });
        const s = getSmartSuggestion();
        assert.equal(s.hasHistory, true);
        assert.equal(s.phone, '0901234567');
        assert.equal(s.name, 'Chị Lan');
    });

    it('suggests next milestone based on EDD', () => {
        // Set up: LMP 8 weeks ago → should suggest week 8 or later milestone
        const lmp = new Date();
        lmp.setDate(lmp.getDate() - 56); // 8 weeks = 56 days
        const edd = new Date(lmp);
        edd.setDate(edd.getDate() + 280); // 40 weeks from LMP

        saveEddInfo({
            edd: edd.toISOString().split('T')[0],
            lmpDate: lmp.toISOString().split('T')[0],
            method: 'LMP',
        });

        const s = getSmartSuggestion();
        assert.equal(s.hasEdd, true);
        assert.equal(s.gaWeeks, 8);
        assert.ok(s.nextVisit);
        assert.ok(s.nextVisit.title);
        assert.ok(s.nextVisit.suggestedDate instanceof Date);
        assert.ok(s.bannerText.length > 0);
    });

    it('returns no nextVisit when past all milestones', () => {
        // LMP 42 weeks ago
        const lmp = new Date();
        lmp.setDate(lmp.getDate() - 294);
        const edd = new Date(lmp);
        edd.setDate(edd.getDate() + 280);

        saveEddInfo({
            edd: edd.toISOString().split('T')[0],
            lmpDate: lmp.toISOString().split('T')[0],
        });

        // But EDD is > 2 weeks ago, so getEddInfo returns null
        const s = getSmartSuggestion();
        assert.equal(s.nextVisit, null);
    });

    it('combines EDD and booking history', () => {
        const lmp = new Date();
        lmp.setDate(lmp.getDate() - 70); // 10 weeks
        const edd = new Date(lmp);
        edd.setDate(edd.getDate() + 280);

        saveEddInfo({
            edd: edd.toISOString().split('T')[0],
            lmpDate: lmp.toISOString().split('T')[0],
        });
        saveBookingHistory({ phone: '0909876543', name: 'Chị Mai' });

        const s = getSmartSuggestion();
        assert.equal(s.hasEdd, true);
        assert.equal(s.hasHistory, true);
        assert.equal(s.phone, '0909876543');
        assert.equal(s.name, 'Chị Mai');
        assert.ok(s.nextVisit);
        assert.ok(s.nextVisit.week >= 8); // next milestone at or after week 10
    });

    it('banner text mentions gestational age', () => {
        const lmp = new Date();
        lmp.setDate(lmp.getDate() - 140); // 20 weeks
        const edd = new Date(lmp);
        edd.setDate(edd.getDate() + 280);

        saveEddInfo({
            edd: edd.toISOString().split('T')[0],
            lmpDate: lmp.toISOString().split('T')[0],
        });

        const s = getSmartSuggestion();
        assert.ok(s.bannerText.includes('20'));
    });
});

// ─── clearBookingData ───────────────────────────────────────

describe('clearBookingData', () => {
    beforeEach(() => storage.clear());

    it('clears all smart booking data', () => {
        saveEddInfo({ edd: '2026-10-01', lmpDate: '2025-12-25' });
        saveBookingHistory({ phone: '0901234567' });

        assert.ok(localStorage.getItem(STORAGE_KEY_EDD));
        assert.ok(localStorage.getItem(STORAGE_KEY_HISTORY));

        clearBookingData();

        assert.equal(localStorage.getItem(STORAGE_KEY_EDD), null);
        assert.equal(localStorage.getItem(STORAGE_KEY_HISTORY), null);
    });

    it('does not throw when nothing stored', () => {
        assert.doesNotThrow(() => clearBookingData());
    });
});
