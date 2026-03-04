#!/usr/bin/env node
/**
 * eSMS.vn Local Mock API Server
 * ─────────────────────────────
 * Simulates eSMS REST API locally for testing SMS/ZNS flows.
 *
 * Usage:
 *   node scripts/esms-mock-server.js          → start on port 3456
 *   node scripts/esms-mock-server.js --port 4000
 *   ESMS_MOCK_PORT=4000 node scripts/esms-mock-server.js
 *
 * Endpoints:
 *   POST /api/sms/send           → Mock SMS send
 *   POST /api/zns/send           → Mock ZNS send
 *   GET  /api/sms/history        → View sent SMS history
 *   GET  /api/health             → Health check
 *   DELETE /api/sms/history      → Clear history
 */

import { createServer } from 'node:http';

const PORT = parseInt(process.argv.find((a, i) => process.argv[i - 1] === '--port') || process.env.ESMS_MOCK_PORT || '3456');

// In-memory storage
const smsHistory = [];
let smsIdCounter = 1000;

function generateSmsId() {
    return `MOCK-SMS-${++smsIdCounter}-${Date.now()}`;
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try { resolve(JSON.parse(body || '{}')); }
            catch { resolve({}); }
        });
        req.on('error', reject);
    });
}

function json(res, data, status = 200) {
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end(JSON.stringify(data, null, 2));
}

// ─── Request Handler ────────────────────────────────────────

async function handleRequest(req, res) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const path = url.pathname;

    // CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        return res.end();
    }

    // Health check
    if (path === '/api/health' && req.method === 'GET') {
        return json(res, { status: 'ok', service: 'esms-mock', uptime: process.uptime(), totalSms: smsHistory.length });
    }

    // Send SMS
    if (path === '/api/sms/send' && req.method === 'POST') {
        const body = await parseBody(req);
        return handleSmsSend(body, 'sms', res);
    }

    // Send ZNS
    if (path === '/api/zns/send' && req.method === 'POST') {
        const body = await parseBody(req);
        return handleSmsSend(body, 'zns', res);
    }

    // History
    if (path === '/api/sms/history' && req.method === 'GET') {
        const limit = parseInt(url.searchParams.get('limit') || '50');
        return json(res, {
            total: smsHistory.length,
            items: smsHistory.slice(-limit).reverse(),
        });
    }

    // Clear history
    if (path === '/api/sms/history' && req.method === 'DELETE') {
        smsHistory.length = 0;
        return json(res, { message: 'History cleared' });
    }

    // Dashboard (HTML)
    if (path === '/' || path === '/dashboard') {
        return serveDashboard(res);
    }

    // 404
    json(res, { error: 'Not found', path }, 404);
}

// ─── SMS Send Handler ───────────────────────────────────────

function handleSmsSend(body, type, res) {
    // Validate
    if (!body.Phone) {
        return json(res, { CodeResult: '104', ErrorMessage: 'Phone is required', SMSID: '' }, 400);
    }
    if (type === 'sms' && !body.Content) {
        return json(res, { CodeResult: '104', ErrorMessage: 'Content is required', SMSID: '' }, 400);
    }

    const smsId = generateSmsId();
    const record = {
        id: smsId,
        type,
        phone: body.Phone,
        content: body.Content || '',
        brandname: body.Brandname || '',
        sendDate: body.SendDate || null,
        templateId: body.TempID || null,
        templateData: body.Params || null,
        receivedAt: new Date().toISOString(),
        status: body.SendDate ? 'scheduled' : 'sent',
    };

    smsHistory.push(record);

    // Log to console
    console.log(`\n📨 ${type.toUpperCase()} ${record.status === 'scheduled' ? '⏰ SCHEDULED' : '✅ SENT'}`);
    console.log(`   To: ${record.phone}`);
    if (record.content) console.log(`   Content: ${record.content.substring(0, 80)}${record.content.length > 80 ? '...' : ''}`);
    if (record.sendDate) console.log(`   Scheduled: ${record.sendDate}`);
    console.log(`   ID: ${smsId}`);
    console.log(`   Total: ${smsHistory.length} messages\n`);

    // Simulate eSMS success response
    return json(res, {
        CodeResult: '100',
        SMSID: smsId,
        ErrorMessage: '',
    });
}

// ─── Dashboard HTML ─────────────────────────────────────────

function serveDashboard(res) {
    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eSMS Mock Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 2rem; }
        h1 { color: #38bdf8; margin-bottom: .5rem; }
        .subtitle { color: #94a3b8; margin-bottom: 2rem; }
        .stats { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .stat-card { background: #1e293b; border-radius: 12px; padding: 1.25rem; flex: 1; }
        .stat-value { font-size: 2rem; font-weight: 700; color: #38bdf8; }
        .stat-label { font-size: .75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; }
        .messages { display: flex; flex-direction: column; gap: .75rem; }
        .msg-card { background: #1e293b; border-radius: 12px; padding: 1rem 1.25rem; border-left: 4px solid #38bdf8; }
        .msg-card.type-zns { border-left-color: #a78bfa; }
        .msg-card.status-scheduled { border-left-color: #fbbf24; }
        .msg-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem; }
        .msg-type { font-size: .6875rem; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; background: #38bdf8; color: #0f172a; }
        .msg-type.type-zns { background: #a78bfa; }
        .msg-phone { font-weight: 600; color: #f1f5f9; }
        .msg-content { font-size: .875rem; color: #cbd5e1; line-height: 1.5; white-space: pre-wrap; }
        .msg-meta { font-size: .75rem; color: #64748b; margin-top: .5rem; }
        .empty { text-align: center; padding: 3rem; color: #64748b; }
        .actions { margin-bottom: 1.5rem; display: flex; gap: .75rem; }
        .btn { padding: .5rem 1rem; border-radius: 8px; border: none; cursor: pointer; font-size: .875rem; font-weight: 500; }
        .btn-refresh { background: #38bdf8; color: #0f172a; }
        .btn-clear { background: #ef4444; color: #fff; }
        .btn:hover { opacity: .85; }
    </style>
</head>
<body>
    <h1>📨 eSMS Mock Server</h1>
    <p class="subtitle">Port ${PORT} — Local development dashboard</p>
    <div class="stats">
        <div class="stat-card"><div class="stat-value" id="total">0</div><div class="stat-label">Total Messages</div></div>
        <div class="stat-card"><div class="stat-value" id="sms-count">0</div><div class="stat-label">SMS</div></div>
        <div class="stat-card"><div class="stat-value" id="zns-count">0</div><div class="stat-label">ZNS</div></div>
    </div>
    <div class="actions">
        <button class="btn btn-refresh" onclick="loadHistory()">🔄 Refresh</button>
        <button class="btn btn-clear" onclick="clearHistory()">🗑️ Clear</button>
    </div>
    <div class="messages" id="messages"><div class="empty">No messages yet. Send a test SMS!</div></div>
    <script>
        async function loadHistory() {
            const res = await fetch('/api/sms/history?limit=50');
            const data = await res.json();
            document.getElementById('total').textContent = data.total;
            document.getElementById('sms-count').textContent = data.items.filter(m => m.type === 'sms').length;
            document.getElementById('zns-count').textContent = data.items.filter(m => m.type === 'zns').length;
            const container = document.getElementById('messages');
            if (data.items.length === 0) {
                container.innerHTML = '<div class="empty">No messages yet. Send a test SMS!</div>';
                return;
            }
            container.innerHTML = data.items.map(m => \`
                <div class="msg-card type-\${m.type} status-\${m.status}">
                    <div class="msg-header">
                        <span class="msg-phone">\${m.phone}</span>
                        <span class="msg-type type-\${m.type}">\${m.type} · \${m.status}</span>
                    </div>
                    <div class="msg-content">\${m.content || '[ZNS Template ' + m.templateId + ']'}</div>
                    <div class="msg-meta">ID: \${m.id} · \${m.receivedAt}\${m.sendDate ? ' · Scheduled: ' + m.sendDate : ''}</div>
                </div>
            \`).join('');
        }
        async function clearHistory() {
            await fetch('/api/sms/history', { method: 'DELETE' });
            loadHistory();
        }
        loadHistory();
        setInterval(loadHistory, 5000);
    </script>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
}

// ─── Start Server ───────────────────────────────────────────

const server = createServer(handleRequest);
server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║  📨 eSMS Mock Server                         ║
║  Port: ${String(PORT).padEnd(39)}║
║  Dashboard: http://localhost:${PORT}/          ║
╠══════════════════════════════════════════════╣
║  POST /api/sms/send    → Mock SMS send       ║
║  POST /api/zns/send    → Mock ZNS send       ║
║  GET  /api/sms/history → View sent history   ║
║  GET  /api/health      → Health check        ║
╚══════════════════════════════════════════════╝
`);
});
