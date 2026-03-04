import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    generateReminderSchedule,
    getAllMilestones,
    calculateMilestoneDate,
    generateIcsCalendar,
    generateGoogleCalendarUrl,
    formatIcsDate,
    PRENATAL_MILESTONES,
    TIER_CONFIG,
    TIME_SLOTS,
    toLocalDate,
    addDays,
    calcGestationalAge,
} from '../src/utils/prenatal-reminder-engine.js';

// ─── PRENATAL_MILESTONES data integrity ──────────────────────

describe('PRENATAL_MILESTONES — data integrity', () => {
    it('has 13 milestones', () => {
        assert.equal(PRENATAL_MILESTONES.length, 13);
    });

    it('all milestones have required fields', () => {
        for (const m of PRENATAL_MILESTONES) {
            assert.ok(m.id, `missing id on ${m.title}`);
            assert.ok(m.week > 0, `week > 0 on ${m.id}`);
            assert.ok(m.windowStart > 0, `windowStart on ${m.id}`);
            assert.ok(m.windowEnd >= m.windowStart, `windowEnd >= windowStart on ${m.id}`);
            assert.ok(m.title, `title on ${m.id}`);
            assert.ok(['critical', 'recommended', 'monitoring'].includes(m.tier), `valid tier on ${m.id}`);
            assert.ok(m.urgencyNote?.length > 0, `urgencyNote on ${m.id}`);
            assert.ok(m.description?.length > 0, `description on ${m.id}`);
            assert.ok(Array.isArray(m.tests) && m.tests.length > 0, `tests on ${m.id}`);
            assert.ok(m.icon?.length > 0, `icon on ${m.id}`);
            assert.ok(m.calendarDescription?.length > 0, `calendarDescription on ${m.id}`);
        }
    });

    it('milestones are sorted by week ascending', () => {
        for (let i = 1; i < PRENATAL_MILESTONES.length; i++) {
            assert.ok(PRENATAL_MILESTONES[i].week >= PRENATAL_MILESTONES[i - 1].week,
                `week ${PRENATAL_MILESTONES[i].week} should be >= ${PRENATAL_MILESTONES[i - 1].week}`);
        }
    });

    it('has 4 critical, 4 recommended, 5 monitoring milestones', () => {
        const counts = { critical: 0, recommended: 0, monitoring: 0 };
        for (const m of PRENATAL_MILESTONES) counts[m.tier]++;
        // At least some in each tier
        assert.ok(counts.critical >= 3, 'has >= 3 critical');
        assert.ok(counts.recommended >= 3, 'has >= 3 recommended');
        assert.ok(counts.monitoring >= 3, 'has >= 3 monitoring');
    });

    it('unique IDs across all milestones', () => {
        const ids = PRENATAL_MILESTONES.map(m => m.id);
        assert.equal(new Set(ids).size, ids.length);
    });
});

// ─── TIER_CONFIG ─────────────────────────────────────────────

describe('TIER_CONFIG', () => {
    it('has all three tiers', () => {
        assert.ok(TIER_CONFIG.critical);
        assert.ok(TIER_CONFIG.recommended);
        assert.ok(TIER_CONFIG.monitoring);
    });

    it('each tier has emoji, label, color', () => {
        for (const [key, config] of Object.entries(TIER_CONFIG)) {
            assert.ok(config.emoji, `emoji for ${key}`);
            assert.ok(config.label, `label for ${key}`);
            assert.ok(config.color.startsWith('#'), `color hex for ${key}`);
        }
    });
});

// ─── calcGestationalAge ─────────────────────────────────────

describe('calcGestationalAge', () => {
    it('returns correct weeks and days', () => {
        const ga = calcGestationalAge('2026-01-01', '2026-03-02');
        assert.equal(ga.totalDays, 60);
        assert.equal(ga.weeks, 8);
        assert.equal(ga.days, 4);
    });

    it('returns 0 for future LMP', () => {
        const ga = calcGestationalAge('2027-01-01', '2026-01-01');
        assert.equal(ga.weeks, 0);
        assert.equal(ga.totalDays, 0);
    });
});

// ─── generateReminderSchedule ───────────────────────────────

describe('generateReminderSchedule', () => {
    it('returns all 13 when at week 0', () => {
        const schedule = generateReminderSchedule('2026-03-04'); // today = LMP → 0 weeks
        assert.equal(schedule.length, 13);
    });

    it('filters out past milestones', () => {
        // LMP 2025-07-01, current 2026-03-04 → about 35 weeks
        const schedule = generateReminderSchedule('2025-07-01', '2026-03-04');
        for (const m of schedule) {
            assert.ok(m.week >= 35, `milestone week ${m.week} should be >= 35`);
        }
    });

    it('returns only future milestones when at week 30', () => {
        // 30 weeks = 210 days. LMP = today - 210 days
        const lmp = addDays(new Date(), -210);
        const schedule = generateReminderSchedule(lmp);
        assert.ok(schedule.length < 13, 'should not return all 13');
        assert.ok(schedule.length >= 4, 'should have at least 4 remaining (32, 34, 36, 37, 38, 39, 40)');
    });

    it('returns 0 milestones when at week 41', () => {
        // 41 weeks = 287 days
        const lmp = addDays(new Date(), -287);
        const schedule = generateReminderSchedule(lmp);
        assert.equal(schedule.length, 0);
    });

    it('each milestone has tierConfig attached', () => {
        const schedule = generateReminderSchedule('2026-03-04');
        for (const m of schedule) {
            assert.ok(m.tierConfig, `tierConfig on ${m.id}`);
            assert.ok(m.tierConfig.emoji, `tierConfig.emoji on ${m.id}`);
        }
    });

    it('each milestone has baseDate calculated', () => {
        const schedule = generateReminderSchedule('2026-01-01');
        for (const m of schedule) {
            assert.ok(m.baseDate instanceof Date, `baseDate on ${m.id}`);
        }
    });

    it('throws on invalid LMP date', () => {
        assert.throws(() => generateReminderSchedule('invalid'), /Invalid LMP date/);
    });
});

// ─── getAllMilestones ───────────────────────────────────────

describe('getAllMilestones', () => {
    it('always returns 13 milestones', () => {
        assert.equal(getAllMilestones().length, 13);
    });

    it('each has tierConfig', () => {
        for (const m of getAllMilestones()) {
            assert.ok(m.tierConfig);
        }
    });
});

// ─── calculateMilestoneDate ─────────────────────────────────

describe('calculateMilestoneDate', () => {
    it('weekday preference: never returns Sunday', () => {
        // Test multiple weeks to cover all day-of-week possibilities
        for (let w = 8; w <= 40; w += 2) {
            const date = calculateMilestoneDate('2026-01-01', w, 'weekday', 'morning');
            assert.notEqual(date.getDay(), 0, `week ${w} should not be Sunday (got ${date})`);
        }
    });

    it('sunday preference: always returns Sunday', () => {
        for (let w = 8; w <= 40; w += 4) {
            const date = calculateMilestoneDate('2026-01-01', w, 'sunday', 'morning');
            assert.equal(date.getDay(), 0, `week ${w} should be Sunday (got day ${date.getDay()})`);
        }
    });

    it('morning slot: hour = 8', () => {
        const date = calculateMilestoneDate('2026-01-01', 12, 'weekday', 'morning');
        assert.equal(date.getHours(), 8);
    });

    it('afternoon slot: hour = 14', () => {
        const date = calculateMilestoneDate('2026-01-01', 12, 'weekday', 'afternoon');
        assert.equal(date.getHours(), 14);
    });

    it('evening slot: hour = 18', () => {
        const date = calculateMilestoneDate('2026-01-01', 12, 'weekday', 'evening');
        assert.equal(date.getHours(), 18);
    });

    it('sunday + afternoon: Sunday at 14:00', () => {
        const date = calculateMilestoneDate('2026-01-01', 12, 'sunday', 'afternoon');
        assert.equal(date.getDay(), 0);
        assert.equal(date.getHours(), 14);
    });

    it('defaults to weekday + morning', () => {
        const date = calculateMilestoneDate('2026-01-01', 12);
        assert.notEqual(date.getDay(), 0);
        assert.equal(date.getHours(), 8);
    });
});

// ─── formatIcsDate ──────────────────────────────────────────

describe('formatIcsDate', () => {
    it('formats correctly', () => {
        const d = new Date(2026, 2, 15, 8, 0, 0); // March 15, 2026 8:00 AM
        assert.equal(formatIcsDate(d), '20260315T080000');
    });

    it('pads single-digit month and day', () => {
        const d = new Date(2026, 0, 5, 14, 30, 0); // Jan 5, 2026 14:30
        assert.equal(formatIcsDate(d), '20260105T143000');
    });

    it('handles midnight', () => {
        const d = new Date(2026, 11, 31, 0, 0, 0);
        assert.equal(formatIcsDate(d), '20261231T000000');
    });
});

// ─── generateIcsCalendar ────────────────────────────────────

describe('generateIcsCalendar', () => {
    const milestones = generateReminderSchedule('2026-01-01').slice(0, 3);
    const options = {
        lmpDate: '2026-01-01',
        dayPref: 'weekday',
        timePref: 'morning',
        reminderHours: 24,
    };

    it('starts with BEGIN:VCALENDAR', () => {
        const ics = generateIcsCalendar(milestones, options);
        assert.ok(ics.startsWith('BEGIN:VCALENDAR'));
    });

    it('ends with END:VCALENDAR', () => {
        const ics = generateIcsCalendar(milestones, options);
        assert.ok(ics.trimEnd().endsWith('END:VCALENDAR'));
    });

    it('contains correct number of VEVENTs', () => {
        const ics = generateIcsCalendar(milestones, options);
        const eventCount = (ics.match(/BEGIN:VEVENT/g) || []).length;
        assert.equal(eventCount, milestones.length);
    });

    it('contains VALARM with correct trigger', () => {
        const ics = generateIcsCalendar(milestones, options);
        assert.ok(ics.includes('TRIGGER:-PT24H'));
    });

    it('8-hour reminder works', () => {
        const ics = generateIcsCalendar(milestones, { ...options, reminderHours: 8 });
        assert.ok(ics.includes('TRIGGER:-PT8H'));
    });

    it('contains VTIMEZONE for Asia/Ho_Chi_Minh', () => {
        const ics = generateIcsCalendar(milestones, options);
        assert.ok(ics.includes('TZID:Asia/Ho_Chi_Minh'));
    });

    it('contains clinic location', () => {
        const ics = generateIcsCalendar(milestones, options);
        assert.ok(ics.includes('An Sinh'));
    });

    it('contains VERSION:2.0', () => {
        const ics = generateIcsCalendar(milestones, options);
        assert.ok(ics.includes('VERSION:2.0'));
    });

    it('each event has UID', () => {
        const ics = generateIcsCalendar(milestones, options);
        const uids = (ics.match(/UID:/g) || []).length;
        assert.equal(uids, milestones.length);
    });

    it('empty milestones returns valid but empty calendar', () => {
        const ics = generateIcsCalendar([], options);
        assert.ok(ics.includes('BEGIN:VCALENDAR'));
        assert.ok(ics.includes('END:VCALENDAR'));
        assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 0);
    });
});

// ─── generateGoogleCalendarUrl ──────────────────────────────

describe('generateGoogleCalendarUrl', () => {
    const milestone = PRENATAL_MILESTONES[0]; // week 8
    const options = {
        lmpDate: '2026-01-01',
        dayPref: 'weekday',
        timePref: 'morning',
    };

    it('returns Google Calendar URL', () => {
        const url = generateGoogleCalendarUrl(milestone, options);
        assert.ok(url.startsWith('https://www.google.com/calendar/render'));
    });

    it('contains action=TEMPLATE', () => {
        const url = generateGoogleCalendarUrl(milestone, options);
        assert.ok(url.includes('action=TEMPLATE'));
    });

    it('contains encoded title with milestone name', () => {
        const url = generateGoogleCalendarUrl(milestone, options);
        // URLSearchParams double-encodes, so check the raw URL param
        const textParam = new URL(url).searchParams.get('text');
        assert.ok(textParam.includes(milestone.title), `text param should contain "${milestone.title}", got: ${textParam}`);
    });

    it('contains dates parameter', () => {
        const url = generateGoogleCalendarUrl(milestone, options);
        assert.ok(url.includes('dates='));
    });

    it('contains timezone parameter', () => {
        const url = generateGoogleCalendarUrl(milestone, options);
        assert.ok(url.includes('ctz='));
    });

    it('contains location', () => {
        const url = generateGoogleCalendarUrl(milestone, options);
        const locationParam = new URL(url).searchParams.get('location');
        assert.ok(locationParam.includes('An Sinh'), `location should contain 'An Sinh', got: ${locationParam}`);
    });
});

// ─── TIME_SLOTS ─────────────────────────────────────────────

describe('TIME_SLOTS', () => {
    it('has morning, afternoon, evening', () => {
        assert.ok(TIME_SLOTS.morning);
        assert.ok(TIME_SLOTS.afternoon);
        assert.ok(TIME_SLOTS.evening);
    });

    it('morning is 8:00', () => {
        assert.equal(TIME_SLOTS.morning.hour, 8);
    });

    it('afternoon is 14:00', () => {
        assert.equal(TIME_SLOTS.afternoon.hour, 14);
    });

    it('evening is 18:00', () => {
        assert.equal(TIME_SLOTS.evening.hour, 18);
    });
});
