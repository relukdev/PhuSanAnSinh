/**
 * Central Form Handler — CRM + Google Sheets Dual-Write
 * Supports: Retry logic, Toast notifications, UTM/click_id tracking, Custom success events
 */

export const FORM_CONFIG = {
    URLS: {
        feedback: 'https://script.google.com/macros/s/AKfycbw1h_Ygg1a_wVUBRVOV4wwoOLJk70nPdWJ2DPknKZSiesENZ3gKaRwfCJp7sI_KXiFLhA/exec',
        // Google Apps Script endpoint (JSONP supported)
        queue: 'https://script.google.com/macros/s/AKfycbwypBm_W01EEdhnPtQ40i3VM9xd2cYbwohXDP4FTjdmDybwA17ZVvnhf8mJ9NX1EP1x/exec',
        booking: 'https://script.google.com/macros/s/AKfycbz5gOgCVmLJPvkRkMKGz5cwspW9pjm0fMOiqHZFp-m1R2I0dKNJoWQKG8v5VD6VGBs6/exec',
        queueProxy: 'https://queue-proxy.todyle.workers.dev'
    },
    CRM_URLS: {
        feedback: 'https://sale.todyai.io/api/reviews',
        booking: 'https://sale.todyai.io/api/bookings',
        queue: 'https://sale.todyai.io/api/queue/book'
    },
    CRM_HEADERS: {
        'Content-Type': 'application/json',
        'X-Tenant-Slug': 'an-sinh'
    },
    FALLBACK_CONTACT: {
        url: 'https://zalo.me/0899268299',
        label: '💬 Nhắn Zalo hotline',
    },
    MAX_RETRIES: 3,
    PHONE_REGEX: /^0\d{8,10}$/,
    MESSAGES: {
        sending: 'Đang gửi...',
        retrying: (attempt, max) => `Đang thử lại (${attempt}/${max})...`,
        success: {
            title: 'Gửi thành công! 🎉',
            msg: 'Cảm ơn ý kiến quý giá của bạn.',
        },
        error: {
            title: 'Gửi không thành công',
            msg: 'Hệ thống đang bận. Vui lòng nhắn Zalo để được hỗ trợ ngay!',
        },
    },
};

/**
 * Shared tracking data helper — captures UTM, click_ids, referral_code from URL.
 * Used by all form submission paths for consistent CRM enrichment.
 * @returns {Object} tracking payload to spread into CRM requests
 */
export function getTrackingData() {
    const urlParams = new URLSearchParams(window.location.search);
    const tracking = {};

    // UTM parameters (5 standard fields)
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(k => {
        const v = urlParams.get(k);
        if (v) tracking[k] = v;
    });

    // Click IDs (Facebook, Google, TikTok)
    const clickIds = {};
    const fbclid = urlParams.get('fbclid');
    const gclid = urlParams.get('gclid');
    const ttclid = urlParams.get('ttclid');
    if (fbclid) clickIds.fbclid = fbclid;
    if (gclid) clickIds.gclid = gclid;
    if (ttclid) clickIds.ttclid = ttclid;
    if (Object.keys(clickIds).length > 0) tracking.click_ids = clickIds;

    // Referral code
    const ref = urlParams.get('ref') || urlParams.get('referral_code');
    if (ref) tracking.referral_code = ref;

    // Page context
    tracking.source_url = window.location.href;
    if (document.referrer) tracking.page_referrer = document.referrer;

    return tracking;
}

export function showFormToast(type, title, msg, options = {}) {
    let container = document.querySelector('.form-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'form-toast-container';
        document.body.appendChild(container);
    }

    container.querySelectorAll('.form-toast').forEach(t => {
        t.classList.add('hiding');
        setTimeout(() => t.remove(), 300);
    });

    const icons = { success: '✅', error: '❌', retrying: '⏳' };
    const toast = document.createElement('div');
    toast.className = `form-toast form-toast--${type}`;

    const fallback = FORM_CONFIG.FALLBACK_CONTACT;
    toast.innerHTML = `
        <span class="form-toast-icon">${icons[type] || '📋'}</span>
        <div class="form-toast-body">
            <div class="form-toast-title">${title}</div>
            <div class="form-toast-msg">${msg}</div>
            ${options.showFallback ? `<a href="${fallback.url}" target="_blank" class="form-toast-zalo">${fallback.label}</a>` : ''}
        </div>
        <button class="form-toast-close" aria-label="Close">✕</button>
    `;

    toast.querySelector('.form-toast-close').addEventListener('click', () => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    const dismissMs = { success: 6000, error: 15000, retrying: 10000 };
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }
    }, dismissMs[type] || 8000);

    return toast;
}

async function fetchWithRetry(url, options, maxRetries, onRetry) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const res = await fetch(url, options);
            if (res.type === 'opaque' || res.ok) return res;
            const data = await res.json().catch(() => null);
            if (data?.status === 'success') return res;
            throw new Error(data?.message || `HTTP ${res.status}`);
        } catch (err) {
            lastError = err;
            if (attempt < maxRetries) {
                if (onRetry) onRetry(attempt, maxRetries);
                await new Promise(r => setTimeout(r, Math.pow(2, attempt - 1) * 1000));
            }
        }
    }
    throw lastError;
}

async function fetchJsonpWithRetry(url, paramsObj, maxRetries, onRetry) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const data = await new Promise((resolve, reject) => {
                const cbName = 'jsonp_' + Date.now() + '_' + Math.round(1000 * Math.random());
                const script = document.createElement('script');
                
                const cleanup = () => {
                    delete window[cbName];
                    if (script.parentNode) script.parentNode.removeChild(script);
                };
                
                window[cbName] = function(data) {
                    cleanup();
                    resolve(data);
                };
                
                script.onerror = () => {
                    cleanup();
                    reject(new Error('JSONP Request Error'));
                };
                
                const params = new URLSearchParams(paramsObj);
                params.append('callback', cbName);
                script.src = url + (url.includes('?') ? '&' : '?') + params.toString();
                document.body.appendChild(script);
            });
            
            if (data?.status === 'success') return data;
            
            if (data?.status === 'error') {
                const err = new Error(data?.message || 'Server returned error');
                err.noRetry = true;
                throw err;
            }
            throw new Error('Invalid response format');
        } catch (err) {
            lastError = err;
            if (err.noRetry) throw err;
            if (attempt < maxRetries) {
                if (onRetry) onRetry(attempt, maxRetries);
                await new Promise(r => setTimeout(r, Math.pow(2, attempt - 1) * 1000));
            }
        }
    }
    throw lastError;
}

export async function submitToGoogleSheet(event) {
    event.preventDefault();
    const form = event.target;
    const btn = event.submitter || form.querySelector('button[type="submit"]') || form.querySelector('button');
    if (!btn || btn.disabled) return;

    const cfg = FORM_CONFIG;
    const msgs = cfg.MESSAGES;
const originalText = btn.innerHTML;
    const formType = form.getAttribute('data-form-type') || 'feedback';
    const scriptURL = cfg.URLS[formType];

    if (!scriptURL || scriptURL.includes('AKfycbwP7fX8v7Fv7Fv7Fv7Fv7Fv7Fv7Fv7Fv7Fv7Fv7Fv/exec')) {
        console.warn('Apps Script URL not configured for:', formType);
        // Dispatch success anyway for demo if URL is placeholder, or show error
        // showFormToast('error', 'Lỗi cấu hình', 'Vui lòng cấu hình Apps Script URL.');
        // return;
    }

    btn.innerHTML = `<span class="qb-spinner"></span> ${msgs.sending}`;
    btn.disabled = true;

    // Auto-fill URL
    const urlInput = form.querySelector('input[name="url"]');
    if (urlInput) urlInput.value = window.location.href;

    try {
        let responseData = null;
        
        // 1. Prepare CRM Payload (JSON)
        const formData = new FormData(form);
        const paramsObj = {};
        for (const [k, v] of formData.entries()) paramsObj[k] = v;

        // Enrich with full tracking data (UTM, click_ids, referral_code)
        const tracking = getTrackingData();
        const crmPayload = { ...paramsObj, ...tracking };

        // 2. Execute Dual-Write: CRM (primary) + Google Sheets (backup)
        const crmUrl = formType === 'feedback' ? cfg.CRM_URLS.feedback : 
                       (formType === 'queue' ? cfg.CRM_URLS.queue : cfg.CRM_URLS.booking);

        const promises = [];

        // CRM API — primary
        if (crmUrl) {
            promises.push(
                fetch(crmUrl, {
                    method: 'POST',
                    headers: cfg.CRM_HEADERS,
                    body: JSON.stringify(crmPayload)
                })
                .then(res => res.json())
                .then(data => {
                    if (data && data.status === 'success') responseData = data;
                    else if (data && data.error) console.warn('CRM API error:', data.error);
                })
                .catch(err => {
                    console.warn('CRM API unreachable:', err);
                    throw err; // Re-throw to track failure
                })
            );
        }

        // Google Sheets — backup
        if (form.getAttribute('data-method') === 'JSONP') {
            promises.push(
                fetchJsonpWithRetry(
                    scriptURL, paramsObj, cfg.MAX_RETRIES,
                    (attempt, max) => {
                        btn.innerHTML = `<span class="qb-spinner"></span> Đang thử lại (${attempt}/${max})...`;
                        showFormToast('retrying', 'Đang thử lại...', `Lần ${attempt}/${max} — Vui lòng chờ.`);
                    }
                ).then(res => { if (!responseData) responseData = res; })
            );
        } else {
            promises.push(
                fetchWithRetry(
                    scriptURL,
                    { method: 'POST', body: formData, mode: 'no-cors' },
                    cfg.MAX_RETRIES,
                    (attempt, max) => {
                        btn.innerHTML = `<span class="qb-spinner"></span> Đang thử lại (${attempt}/${max})...`;
                        showFormToast('retrying', 'Đang thử lại...', `Lần ${attempt}/${max} — Vui lòng chờ.`);
                    }
                )
            );
        }

        // Wait for both to complete
        const results = await Promise.allSettled(promises);
        
        // If ALL attempted submissions failed (rejected), then we must show an error
        const allFailed = results.length > 0 && results.every(r => r.status === 'rejected');
        if (allFailed) {
            throw new Error('Cả hệ thống CRM và máy chủ dự phòng đều không phản hồi.');
        }

        showFormToast('success', msgs.success.title, msgs.success.msg);

        // Dispatch success event for specific page logic
        window.dispatchEvent(new CustomEvent('form-submit-success', {
            detail: { formType, form, responseData }
        }));

        form.reset();

    } catch (err) {
        // Use backend error message if available, else fallback
        const alertMsg = (err.message && err.message !== 'JSONP Request Error' && err.message !== 'Failed to fetch' && err.message !== 'Invalid response format') 
            ? err.message 
            : msgs.error.msg;
            
        showFormToast('error', msgs.error.title, alertMsg, { showFallback: true });
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Global expose if needed
if (typeof window !== 'undefined') {
    window.submitToGoogleSheet = submitToGoogleSheet;
}
