export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Thiết lập CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Giới hạn tên miền thực tế sau này (vd: https://phusanansinh.com)
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Xử lý preflight CORS request
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Google Apps Script Deploy URL (Bạn phải đổi URL này sau khi deploy Apps Script)
    const GAS_URL = env.GAS_URL || 'YOUR_GOOGLE_SCRIPT_MACRO_URL_HERE';
    const ADMIN_TOKEN = env.ADMIN_TOKEN || 'ansinh123456';

    try {
      if (path === '/api/queue/config' && request.method === 'GET') {
        return handleProxyGET(GAS_URL, 'getConfig', corsHeaders);
      }
      
      if (path === '/api/queue/current' && request.method === 'GET') {
        return handleProxyGET(GAS_URL, 'getCurrent', corsHeaders);
      }
      
      if (path === '/api/queue/book' && request.method === 'POST') {
        return handleProxyPOST(request, GAS_URL, 'book', corsHeaders);
      }
      
      if (path === '/api/queue/admin/next' && request.method === 'POST') {
        // Kiểm tra Token Auth cho Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
          return new Response(JSON.stringify({ status: 'error', message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
        return handleProxyPOST(request, GAS_URL, 'adminCallNext', corsHeaders);
      }

      // Route không tồn tại
      return new Response(JSON.stringify({ status: 'error', message: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
      
    } catch (err) {
      return new Response(JSON.stringify({ status: 'error', message: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};

/**
 * Gọi GET request tới Google Apps Script
 */
async function handleProxyGET(gasUrl, action, corsHeaders) {
  const targetUrl = `${gasUrl}?action=${action}`;
  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });
  
  const text = await response.text();
  return new Response(text, {
    status: response.status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

/**
 * Gọi POST request tới Google Apps Script
 * Đóng gói Dữ liệu dưới dạng URLSearchParams vì Google Script Apps nhận x-www-form-urlencoded tốt nhất
 */
async function handleProxyPOST(request, gasUrl, action, corsHeaders) {
  // Parsing body JSON from local Frontend
  let bodyJson = {};
  if (request.headers.get('Content-Type')?.includes('application/json')) {
    bodyJson = await request.json();
  } else {
    // Hoặc fallback sang formData nếu có
    const formData = await request.formData();
    for (const [key, value] of formData.entries()) {
      bodyJson[key] = value;
    }
  }

  // Đóng gói params gửi tới Google Script
  const params = new URLSearchParams();
  params.append('action', action);
  for (const key in bodyJson) {
    if (bodyJson.hasOwnProperty(key)) {
      params.append(key, bodyJson[key]);
    }
  }

  const response = await fetch(gasUrl, {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
  });

  const text = await response.text();
  return new Response(text, {
    status: response.status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}
