import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import {
    getEsmsConfig, validateConfig,
    buildSmsPayload, buildZnsPayload,
    normalizePhone, formatSendDate,
    buildReminderSmsContent,
    sendSms, scheduleReminderSms,
} from '../src/utils/esms-config.js';

// ─── getEsmsConfig ──────────────────────────────────────────

describe('getEsmsConfig', () => {
    it('returns default config with empty overrides', () => {
        const config = getEsmsConfig();
        assert.equal(config.brandname, 'AN SINH');
        assert.equal(config.smsType, 2);
        assert.equal(config.znsType, 24);
        assert.equal(config.sandbox, false);
    });

    it('overrides take precedence', () => {
        const config = getEsmsConfig({
            apiKey: 'test-key',
            secretKey: 'test-secret',
            brandname: 'CUSTOM',
            sandbox: true,
            mockUrl: 'http://localhost:3456',
        });
        assert.equal(config.apiKey, 'test-key');
        assert.equal(config.secretKey, 'test-secret');
        assert.equal(config.brandname, 'CUSTOM');
        assert.equal(config.sandbox, true);
        assert.equal(config.mockUrl, 'http://localhost:3456');
    });
});

// ─── validateConfig ─────────────────────────────────────────

describe('validateConfig', () => {
    it('fails when apiKey missing', () => {
        const result = validateConfig({ apiKey: '', secretKey: 'x', brandname: 'X' });
        assert.equal(result.valid, false);
        assert.ok(result.errors.some(e => e.includes('API_KEY')));
    });

    it('fails when secretKey missing', () => {
        const result = validateConfig({ apiKey: 'x', secretKey: '', brandname: 'X' });
        assert.equal(result.valid, false);
    });

    it('passes when all required fields present', () => {
        const result = validateConfig({ apiKey: 'x', secretKey: 'y', brandname: 'Z' });
        assert.equal(result.valid, true);
        assert.equal(result.errors.length, 0);
    });
});

// ─── normalizePhone ─────────────────────────────────────────

describe('normalizePhone', () => {
    it('strips spaces and dashes', () => {
        assert.equal(normalizePhone('0899 268 299'), '0899268299');
        assert.equal(normalizePhone('0899-268-299'), '0899268299');
    });

    it('converts +84 to 0', () => {
        assert.equal(normalizePhone('+84899268299'), '0899268299');
    });

    it('converts 84xxx to 0xxx', () => {
        assert.equal(normalizePhone('84899268299'), '0899268299');
    });

    it('handles empty/null', () => {
        assert.equal(normalizePhone(''), '');
        assert.equal(normalizePhone(null), '');
        assert.equal(normalizePhone(undefined), '');
    });

    it('keeps valid 0x format unchanged', () => {
        assert.equal(normalizePhone('0899268299'), '0899268299');
    });
});

// ─── formatSendDate ─────────────────────────────────────────

describe('formatSendDate', () => {
    it('formats correctly', () => {
        const d = new Date(2026, 2, 15, 8, 30, 0); // March 15, 2026
        assert.equal(formatSendDate(d), '2026-03-15 08:30:00');
    });

    it('pads single digits', () => {
        const d = new Date(2026, 0, 5, 7, 5, 3);
        assert.equal(formatSendDate(d), '2026-01-05 07:05:03');
    });
});

// ─── buildSmsPayload ────────────────────────────────────────

describe('buildSmsPayload', () => {
    const config = getEsmsConfig({ apiKey: 'K', secretKey: 'S', brandname: 'AN SINH' });

    it('builds correct payload', () => {
        const payload = buildSmsPayload({ phone: '0899268299', content: 'Test' }, config);
        assert.equal(payload.ApiKey, 'K');
        assert.equal(payload.SecretKey, 'S');
        assert.equal(payload.Phone, '0899268299');
        assert.equal(payload.Content, 'Test');
        assert.equal(payload.Brandname, 'AN SINH');
        assert.equal(payload.SmsType, 2);
        assert.equal(payload.IsUnicode, 1);
    });

    it('includes SendDate when provided', () => {
        const payload = buildSmsPayload({ phone: '0899268299', content: 'X', sendDate: '2026-03-15 08:00:00' }, config);
        assert.equal(payload.SendDate, '2026-03-15 08:00:00');
    });

    it('omits SendDate when not provided', () => {
        const payload = buildSmsPayload({ phone: '0899268299', content: 'X' }, config);
        assert.equal(payload.SendDate, undefined);
    });

    it('normalizes phone', () => {
        const payload = buildSmsPayload({ phone: '+84 899 268 299', content: 'X' }, config);
        assert.equal(payload.Phone, '0899268299');
    });
});

// ─── buildZnsPayload ────────────────────────────────────────

describe('buildZnsPayload', () => {
    const config = getEsmsConfig({ apiKey: 'K', secretKey: 'S', oaId: 'OA123', templateId: 'TPL1' });

    it('builds correct ZNS payload', () => {
        const payload = buildZnsPayload({ phone: '0899268299', templateData: ['A', 'B'] }, config);
        assert.equal(payload.OAID, 'OA123');
        assert.equal(payload.TempID, 'TPL1');
        assert.deepEqual(payload.Params, ['A', 'B']);
    });

    it('allows template override', () => {
        const payload = buildZnsPayload({ phone: '0899268299', templateId: 'ALT', templateData: [] }, config);
        assert.equal(payload.TempID, 'ALT');
    });
});

// ─── buildReminderSmsContent ────────────────────────────────

describe('buildReminderSmsContent', () => {
    const milestone = {
        week: 12,
        title: 'Sàng lọc quý 1',
        urgencyNote: 'Chỉ làm được 11-13 tuần 6 ngày',
    };
    const appointmentDate = new Date(2026, 2, 20, 8, 0); // March 20, 2026

    it('includes clinic name', () => {
        const content = buildReminderSmsContent(milestone, appointmentDate);
        assert.ok(content.includes('[An Sinh]'));
    });

    it('includes milestone week', () => {
        const content = buildReminderSmsContent(milestone, appointmentDate);
        assert.ok(content.includes('Tuần 12'));
    });

    it('includes milestone title', () => {
        const content = buildReminderSmsContent(milestone, appointmentDate);
        assert.ok(content.includes('Sàng lọc quý 1'));
    });

    it('includes phone number', () => {
        const content = buildReminderSmsContent(milestone, appointmentDate);
        assert.ok(content.includes('0899 268 299'));
    });

    it('includes urgency note', () => {
        const content = buildReminderSmsContent(milestone, appointmentDate);
        assert.ok(content.includes('Chỉ làm được'));
    });
});

// ─── sendSms (with mock server) ─────────────────────────────

describe('sendSms — error handling', () => {
    it('returns validation error when API key missing', async () => {
        const result = await sendSms({ phone: '0899268299', content: 'Test' }, { apiKey: '', secretKey: '', mockUrl: '' });
        assert.equal(result.success, false);
        assert.ok(result.error.includes('API_KEY'));
    });

    it('returns network error for unreachable mock', async () => {
        const result = await sendSms(
            { phone: '0899268299', content: 'Test' },
            { apiKey: 'K', secretKey: 'S', mockUrl: 'http://localhost:19999' }
        );
        assert.equal(result.success, false);
        assert.equal(result.code, -999);
    });
});
