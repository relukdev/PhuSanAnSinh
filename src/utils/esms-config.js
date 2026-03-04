/**
 * eSMS.vn Configuration & Client
 * ─────────────────────────────────
 * Config module for eSMS.vn SMS/ZNS API.
 * Supports local mock mode for development.
 *
 * Environment Variables:
 *   ESMS_API_KEY      — eSMS API Key
 *   ESMS_SECRET_KEY   — eSMS Secret Key
 *   ESMS_BRANDNAME    — Registered brandname (e.g. "AN SINH")
 *   ESMS_OAID         — Zalo OA ID (for ZNS)
 *   ESMS_TEMPLATE_ID  — ZNS template ID
 *   ESMS_SANDBOX      — "true" to use sandbox mode
 *   ESMS_MOCK_URL     — Local mock API URL (e.g. "http://localhost:3456")
 */

// ─── Config ─────────────────────────────────────────────────

const ESMS_DEFAULTS = {
    apiUrl: 'https://rest.esms.vn/MainService.svc/json',
    sandboxUrl: 'https://rest.esms.vn/MainService.svc/json',
    smsType: 2, // Brandname CSKH
    znsType: 24, // ZNS by template
};

/**
 * Build config from environment or explicit overrides.
 * In browser context (Astro client), pass config explicitly.
 * In Edge Function / Node, reads from process.env.
 */
export function getEsmsConfig(overrides = {}) {
    // Try env vars (Node / Deno / Edge Function)
    const env = typeof process !== 'undefined' ? process.env : {};
    const config = {
        apiKey: overrides.apiKey || env.ESMS_API_KEY || '',
        secretKey: overrides.secretKey || env.ESMS_SECRET_KEY || '',
        brandname: overrides.brandname || env.ESMS_BRANDNAME || 'AN SINH',
        oaId: overrides.oaId || env.ESMS_OAID || '',
        templateId: overrides.templateId || env.ESMS_TEMPLATE_ID || '',
        sandbox: overrides.sandbox ?? (env.ESMS_SANDBOX === 'true'),
        mockUrl: overrides.mockUrl || env.ESMS_MOCK_URL || '',
        apiUrl: overrides.apiUrl || ESMS_DEFAULTS.apiUrl,
        smsType: overrides.smsType || ESMS_DEFAULTS.smsType,
        znsType: overrides.znsType || ESMS_DEFAULTS.znsType,
    };
    return config;
}

/**
 * Validate config has required fields for SMS sending.
 */
export function validateConfig(config) {
    const errors = [];
    if (!config.apiKey) errors.push('ESMS_API_KEY is required');
    if (!config.secretKey) errors.push('ESMS_SECRET_KEY is required');
    if (!config.brandname) errors.push('ESMS_BRANDNAME is required');
    return { valid: errors.length === 0, errors };
}

// ─── SMS Payload Builder ────────────────────────────────────

/**
 * Build SMS payload for eSMS API.
 * @param {Object} params
 * @param {string} params.phone - Recipient phone number
 * @param {string} params.content - SMS content (max ~160 chars for 1 segment)
 * @param {string} [params.sendDate] - Scheduled send date (e.g. "2026-03-15 08:00:00")
 * @param {Object} config - eSMS config from getEsmsConfig()
 */
export function buildSmsPayload(params, config) {
    const payload = {
        ApiKey: config.apiKey,
        SecretKey: config.secretKey,
        Content: params.content,
        Phone: normalizePhone(params.phone),
        Brandname: config.brandname,
        SmsType: config.smsType,
        IsUnicode: 1, // Vietnamese content
    };
    if (params.sendDate) {
        payload.SendDate = params.sendDate;
    }
    return payload;
}

/**
 * Build ZNS payload for eSMS API.
 * @param {Object} params
 * @param {string} params.phone - Recipient phone number
 * @param {Object} params.templateData - Template parameters
 * @param {string} [params.sendDate] - Scheduled send date
 * @param {Object} config - eSMS config from getEsmsConfig()
 */
export function buildZnsPayload(params, config) {
    const payload = {
        ApiKey: config.apiKey,
        SecretKey: config.secretKey,
        Phone: normalizePhone(params.phone),
        OAID: config.oaId,
        TempID: params.templateId || config.templateId,
        Params: params.templateData || [],
        SendDate: params.sendDate || '',
    };
    return payload;
}

// ─── API Client ─────────────────────────────────────────────

/**
 * Send SMS via eSMS.vn API (or mock).
 * @returns {Promise<{success: boolean, smsId?: string, code?: number, error?: string}>}
 */
export async function sendSms(params, configOverrides = {}) {
    const config = getEsmsConfig(configOverrides);
    const validation = validateConfig(config);
    if (!validation.valid) {
        return { success: false, error: validation.errors.join(', '), code: -1 };
    }

    const payload = buildSmsPayload(params, config);
    const url = config.mockUrl
        ? `${config.mockUrl}/api/sms/send`
        : `${config.apiUrl}/SendMultipleMessage_V4_post_json`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return parseSmsResponse(data);
    } catch (err) {
        return { success: false, error: err.message, code: -999 };
    }
}

/**
 * Send ZNS via eSMS.vn API (or mock).
 */
export async function sendZns(params, configOverrides = {}) {
    const config = getEsmsConfig(configOverrides);
    const payload = buildZnsPayload(params, config);
    const url = config.mockUrl
        ? `${config.mockUrl}/api/zns/send`
        : `${config.apiUrl}/SendZaloMessage_V4_post_json`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return parseSmsResponse(data);
    } catch (err) {
        return { success: false, error: err.message, code: -999 };
    }
}

// ─── Prenatal Reminder SMS ──────────────────────────────────

/**
 * Generate SMS content for a prenatal milestone reminder.
 * @param {Object} milestone - Milestone from PRENATAL_MILESTONES
 * @param {Date} appointmentDate - Calculated appointment date
 */
export function buildReminderSmsContent(milestone, appointmentDate) {
    const dateStr = appointmentDate.toLocaleDateString('vi-VN', {
        weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    });
    const timeStr = appointmentDate.toLocaleTimeString('vi-VN', {
        hour: '2-digit', minute: '2-digit'
    });

    return [
        `[An Sinh] Nhắc khám thai Tuần ${milestone.week}`,
        `${milestone.title}`,
        `Ngày: ${dateStr} lúc ${timeStr}`,
        `${milestone.urgencyNote}`,
        `Đặt lịch: 0899 268 299`,
    ].join('\n');
}

/**
 * Schedule SMS reminders for selected milestones.
 * @param {string} phone
 * @param {Array} milestones - Selected milestones with baseDate
 * @param {number} reminderDaysBefore - Days before appointment to send SMS
 * @param {Object} configOverrides
 * @returns {Promise<Array<{milestoneId: string, success: boolean, error?: string}>>}
 */
export async function scheduleReminderSms(phone, milestones, reminderDaysBefore = 1, configOverrides = {}) {
    const results = [];
    for (const m of milestones) {
        if (!m.baseDate) continue;
        // Calculate send date
        const sendDate = new Date(m.baseDate);
        sendDate.setDate(sendDate.getDate() - reminderDaysBefore);
        const sendDateStr = formatSendDate(sendDate);

        const content = buildReminderSmsContent(m, m.baseDate);
        const result = await sendSms({
            phone,
            content,
            sendDate: sendDateStr,
        }, configOverrides);

        results.push({
            milestoneId: m.id,
            week: m.week,
            scheduledFor: sendDateStr,
            ...result,
        });
    }
    return results;
}

// ─── Helpers ────────────────────────────────────────────────

/**
 * Normalize Vietnamese phone to 0x format.
 */
export function normalizePhone(phone) {
    if (!phone) return '';
    let cleaned = phone.replace(/[\s\-().]/g, '');
    if (cleaned.startsWith('+84')) cleaned = '0' + cleaned.slice(3);
    if (cleaned.startsWith('84') && cleaned.length === 11) cleaned = '0' + cleaned.slice(2);
    return cleaned;
}

/**
 * Parse eSMS API response into a standard format.
 */
function parseSmsResponse(data) {
    // eSMS response: { CodeResult: "100", SMSID: "...", ErrorMessage: "" }
    const code = parseInt(data.CodeResult || data.code || '-1');
    if (code === 100) {
        return {
            success: true,
            smsId: data.SMSID || data.smsId || '',
            code: 100,
        };
    }
    return {
        success: false,
        code,
        error: data.ErrorMessage || data.error || `eSMS error code: ${code}`,
    };
}

/**
 * Format date for eSMS SendDate field.
 * Format: "yyyy-MM-dd HH:mm:ss"
 */
export function formatSendDate(date) {
    const y = date.getFullYear();
    const mo = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${mo}-${d} ${h}:${mi}:${s}`;
}
