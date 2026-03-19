# Hướng dẫn Tích hợp API SaleHay CRM

> **Base URL:** `https://api.salehay.com`
>
> **Version:** 1.0 | **Protocol:** HTTPS | **Format:** JSON

---

## Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Xác thực & Headers](#2-xác-thực--headers)
3. [API Công khai (Public)](#3-api-công-khai-public)
4. [API Nội bộ (Protected)](#4-api-nội-bộ-protected)
5. [Phân trang (Pagination)](#5-phân-trang-pagination)
6. [Xử lý lỗi (Error Handling)](#6-xử-lý-lỗi-error-handling)
7. [Ví dụ tích hợp](#7-ví-dụ-tích-hợp)
8. [🤖 Agent API (AI Agent)](#8--agent-api-ai-agent)
9. [🔑 Agent Tokens](#9--agent-tokens)
10. [🔔 Webhooks](#10--webhooks)
11. [📄 Public Pages](#11--public-pages)

---

## 1. Tổng quan

```
┌─────────────────┐     HTTPS/JSON      ┌──────────────────────────┐
│   Website /     │ ──────────────────►  │  api.salehay.com          │
│   Landing Page  │                      │  (Cloudflare Worker)     │
│   Mobile App    │ ◄──────────────────  │                          │
└─────────────────┘                      │  ┌───────────────────┐   │
                                         │  │ PostgreSQL (Neon)  │   │
                                         │  └───────────────────┘   │
                                         └──────────────────────────┘
```

**Đa chi nhánh (Multi-tenant):** Hệ thống hỗ trợ hoạt động cho nhiều chi nhánh/tenant cùng lúc. Truyền header `X-Tenant-Slug` hoặc token JWT ở mỗi request để xác định chi nhánh.

---

## 2. Xác thực & Headers

### Headers chung

| Header | Bắt buộc | Mô tả |
|--------|----------|-------|
| `Content-Type` | ✅ (POST/PATCH) | `application/json` |
| `Authorization` | 🔒 Protected routes | `Bearer <jwt_token>` |
| `X-Agent-Token` | 🤖 Agent routes | Token cho AI Agent (OpenFang/OpenClaw) |
| `X-API-Key` | 🔑 Public integrations | API Key cho landing page lead intake |
| `X-Tenant-Slug` | ❌ Optional | Slug của tenant, ví dụ: `an-sinh`. Nếu không gửi, dùng tenant mặc định |

### Đăng nhập lấy JWT

```
POST /api/auth/login
```

**Request Body:**

```json
{
  "username": "admin",
  "password": "yourpassword"
}
```

**Response 200:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "role": "owner",
    "name": "Nguyễn Admin",
    "permissions": { "leads": "*", "customers": "*", "bookings": "*" }
  }
}
```

> Token có hiệu lực **24 giờ**. Thuật toán: `HS256`.

---

## 3. API Công khai (Public)

Các endpoint này không yêu cầu đăng nhập. Dùng để tích hợp vào Website / Landing Page, cho phép khách hàng chủ động đặt lịch, gửi đánh giá hoặc lấy số xếp hàng.

---

### 3.1. Đặt lịch hẹn

```
POST /api/bookings
```

**Request Body:**

```json
{
  "phone": "0901234567",
  "name": "Nguyễn Văn A",
  "service": "Khám tổng quát",
  "date": "2026-03-20",
  "time_slot": "09:00",
  "note": "Lần đầu khám",
  "form_type": "booking",
  "source_url": "https://example.com/landing-page",
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "spring_2026",
  "click_ids": { "fbclid": "abc123", "gclid": "xyz789" }
}
```

| Field | Type | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `phone` | string | ✅ | Số ĐT Việt Nam (bắt đầu bằng `0`, 9-11 chữ số) |
| `name` | string | ❌ | Tên khách hàng |
| `service` | string | ❌ | Tên dịch vụ |
| `date` | string | ❌ | Ngày hẹn `YYYY-MM-DD` |
| `time_slot` | string | ❌ | Khung giờ `HH:mm` |
| `note` | string | ❌ | Ghi chú |
| `form_type` | string | ❌ | Loại form: `booking`, `contact`, `callback` |
| `source_url` | string | ❌ | URL trang gửi form |
| `utm_source` | string | ❌ | UTM tracking |
| `utm_medium` | string | ❌ | UTM tracking |
| `utm_campaign` | string | ❌ | UTM tracking |
| `click_ids` | object | ❌ | `{ "fbclid": "...", "gclid": "..." }` |

**Response 201:**

```json
{
  "status": "success",
  "booking": {
    "id": "uuid",
    "status": "pending",
    "created_at": "2026-03-15T05:30:00.000Z"
  }
}
```

> **Lưu ý:** Hệ thống tự động tạo mới hoặc liên kết với hồ sơ `Customer` đã có nếu trùng số điện thoại (`phone`).

---

### 3.2. Gửi đánh giá (Review)

```
POST /api/reviews
```

**Request Body:**

```json
{
  "phone": "0901234567",
  "name": "Nguyễn Văn A",
  "service": "Khám tổng quát",
  "rating": 5,
  "tags": "Nhanh, Tận tâm",
  "review_text": "Dịch vụ rất tốt!",
  "suggestions": "Cần thêm bãi giữ xe",
  "source_url": "https://example.com/review"
}
```

| Field | Type | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `rating` | integer | ❌ | 1–5 sao |
| `review_text` | string | ❌ | Nội dung đánh giá |
| `tags` | string | ❌ | Tags mô tả, phân tách bằng dấu phẩy |
| `suggestions` | string | ❌ | Góp ý |
| `phone`, `name`, `service`, `source_url` | string | ❌ | Thông tin bổ sung |

**Response 200:**

```json
{
  "status": "success",
  "review": { "id": "uuid", "created_at": "..." }
}
```

---

### 3.3. Hàng đợi (Queue)

#### Lấy danh sách phòng khám hoạt động

```
GET /api/queue/config
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "roomId": "room-1",
      "doctorName": "BS. Nguyễn A",
      "services": ["Khám tổng quát", "Siêu âm"]
    }
  ]
}
```

#### Xem trạng thái hàng đợi hiện tại

```
GET /api/queue/current
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "room-1": {
      "queueNumber": "260315-CH-005",
      "customerName": "Nguyễn Văn A",
      "timeCalled": "2026-03-15T09:15:00.000Z"
    }
  }
}
```

#### Lấy số hàng đợi (khách tự đăng ký)

```
POST /api/queue/book
```

**Request Body:**

```json
{
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "service": "Khám tổng quát",
  "dob": "1990-05-15",
  "gender": "Nam",
  "area": "Quận 1",
  "note": "Triệu chứng đau đầu",
  "source_url": "https://example.com/queue"
}
```

| Field | Type | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `name` | string | ✅ | Họ tên |
| `phone` | string | ✅ | SĐT (format `0xxx`, 9-11 số) |
| `service` | string | ❌ | Tên dịch vụ |
| `dob` | string | ❌ | Ngày sinh `YYYY-MM-DD` |
| `gender` | string | ❌ | `Nam` / `Nữ` |
| `area` | string | ❌ | Khu vực |
| `note` | string | ❌ | Ghi chú |

**Response 200:**

```json
{
  "status": "success",
  "queueNumber": "260315-CH-001",
  "name": "Nguyễn Văn A",
  "service": "Khám tổng quát",
  "time": "15/03/2026 09:30:00"
}
```

> **Format số:** `YYMMDD-CODE-NNN` (ví dụ: `260315-CH-001`)

---

### 3.4. Tài liệu (Resources)

#### Danh sách tài liệu

```
GET /api/resources
```

**Response:**

```json
{
  "resources": [
    {
      "id": "uuid",
      "title": "Cẩm nang thai kỳ",
      "type": "pdf",
      "file_url": "https://...",
      "download_count": 42
    }
  ]
}
```

#### Download & thu thập thông tin lead

```
POST /api/resources/download
```

**Request Body:**

```json
{
  "resource_id": "uuid",
  "phone": "0901234567",
  "name": "Nguyễn Văn A",
  "email": "a@gmail.com"
}
```

**Response:**

```json
{ "status": "success", "file_url": "https://..." }
```

---

### 3.5. VietQR Thanh toán

```
POST /api/payments/qr
```

**Request Body:**

```json
{
  "amount": 500000,
  "description": "Thanh toán khám bệnh",
  "bookingId": "uuid"
}
```

**Response:**

```json
{
  "id": "uuid",
  "amount": 500000,
  "status": "pending",
  "qr_url": "https://img.vietqr.io/image/...",
  "qr_data": "https://img.vietqr.io/image/..."
}
```

### 3.6. Webhook thanh toán ngân hàng

```
POST /api/payments/webhook
```

**Headers:**

```
X-API-Key: <WEBHOOK_KEY>
```

**Request Body:**

```json
{
  "description": "TT 1710489600000",
  "amount": 500000,
  "transferType": "in"
}
```

> Hệ thống tự match `description` với payment pending để cập nhật `status = 'paid'`.

---

### 3.7. Health Check

```
GET /api/health
```

**Response:**

```json
{ "status": "ok", "ts": "2026-03-15T05:30:00.000Z" }
```

---

## 4. API Nội bộ (Protected)

Tất cả endpoint dưới đây yêu cầu truyền header `Authorization: Bearer <token>`.

---

### 4.1. Thông tin user hiện tại

```
GET /api/auth/me
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "username": "admin",
    "role": "owner",
    "name": "Nguyễn Admin",
    "permissions": { "leads": "*", "customers": "rwc" },
    "tenant_name": "An Sinh Clinic",
    "tenant_slug": "an-sinh"
  }
}
```

---

### 4.2. Danh sách nhân viên

```
GET /api/staff
```

**Response:**

```json
{
  "staff": [
    { "id": "uuid", "name": "BS. Nguyễn A", "username": "nguyena", "role": "doctor", "role_name": "Bác sĩ" }
  ]
}
```

---

### 4.3. Bookings (Admin)

#### Danh sách đặt lịch

```
GET /api/bookings?status=pending&page=1&limit=20
```

| Param | Type | Mô tả |
|-------|------|-------|
| `status` | string | Filter: `pending`, `confirmed`, `arrived`, `completed`, `cancelled` |
| `page` | int | Trang (default: 1) |
| `limit` | int | Số item/trang (max: 100, default: 20) |

**Response:**

```json
{
  "bookings": [{ "id": "uuid", "phone": "09...", "name": "...", "status": "pending", ... }],
  "pagination": { "page": 1, "limit": 20, "total": 45 }
}
```

#### Cập nhật trạng thái

```
PATCH /api/bookings/:id
```

```json
{ "status": "confirmed", "note": "Đã xác nhận qua điện thoại" }
```

---

### 4.4. Reviews (Admin)

#### Danh sách đánh giá

```
GET /api/reviews?rating=5&page=1&limit=20
```

**Response:**

```json
{
  "reviews": [...],
  "stats": { "avg_rating": "4.2", "total_reviews": 128 },
  "pagination": { "page": 1, "limit": 20, "total": 128 }
}
```

#### Phản hồi đánh giá

```
PATCH /api/reviews/:id
```

```json
{ "admin_response": "Cảm ơn bạn đã đánh giá!" }
```

---

### 4.5. Leads (Sales Pipeline)

**Trạng thái hợp lệ:** `new` → `contacted` → `appointment_set` → `showed_up` → `no_show` → `reschedule` → `qualified` → `converted` → `lost`

#### Danh sách leads

```
GET /api/leads?status=new&source=facebook&assigned_to=uuid&q=0901&page=1&limit=20
```

| Param | Type | Mô tả |
|-------|------|-------|
| `status` | string | Filter theo trạng thái |
| `source` | string | Filter theo nguồn: `facebook`, `zalo`, `website`, `manual` |
| `assigned_to` | uuid | Filter theo nhân viên phụ trách |
| `q` | string | Tìm theo SĐT hoặc tên |

**Response:**

```json
{
  "leads": [{ "id": "uuid", "customer_name": "...", "customer_phone": "09...", "status": "new", "assigned_name": "...", ... }],
  "pipeline": { "new": 12, "contacted": 8, "converted": 3 },
  "sources": { "facebook": 15, "website": 5, "manual": 3 },
  "pagination": { "page": 1, "limit": 20, "total": 23 }
}
```

#### Chi tiết lead

```
GET /api/leads/:id
```

**Response:** trả về `lead` + `activities` (lịch sử thay đổi).

#### Tạo lead mới

```
POST /api/leads
```

```json
{
  "phone": "0901234567",
  "name": "Nguyễn Văn A",
  "source": "facebook",
  "utm_source": "fb",
  "utm_medium": "cpc",
  "utm_campaign": "spring_2026",
  "service_interest": "Khám tổng quát",
  "priority": "high",
  "note": "Khách quan tâm gói VIP",
  "assigned_to": "staff-uuid",
  "estimated_value": 2000000
}
```

> **Bắt buộc:** `phone`. Hệ thống tự tạo/liên kết Customer.
>
> **RBAC:** cần quyền `leads:c`.

#### Cập nhật lead

```
PATCH /api/leads/:id
```

```json
{
  "status": "contacted",
  "priority": "high",
  "note": "Đã gọi, khách đồng ý hẹn",
  "activity_note": "Gọi điện lần 1"
}
```

> **RBAC:** cần quyền `leads:w`.

#### Phân công lead

```
PATCH /api/leads/:id/assign
```

```json
{ "assigned_to": "staff-uuid" }
```

> **RBAC:** cần quyền `leads:a`.

#### Xóa lead (soft delete)

```
DELETE /api/leads/:id
```

> **RBAC:** cần quyền `leads:d`.

---

### 4.6. Customers (Khách hàng)

#### Danh sách

```
GET /api/customers?q=0901&page=1&limit=20
```

#### Chi tiết (kèm leads & bookings liên quan)

```
GET /api/customers/:id
```

**Response:**

```json
{
  "customer": { "id": "uuid", "phone": "09...", "name": "...", "email": "...", ... },
  "leads": [...],
  "bookings": [...]
}
```

#### Tạo khách hàng

```
POST /api/customers
```

```json
{
  "phone": "0901234567",
  "name": "Nguyễn Văn A",
  "email": "a@gmail.com",
  "dob": "1990-05-15",
  "gender": "Nam",
  "address": "123 Lê Lợi, Q.1",
  "zalo": "0901234567",
  "facebook": "https://fb.com/nguyen.a",
  "tiktok": "@nguyena",
  "tags": "VIP",
  "notes": "Khách quen",
  "utm_source": "facebook",
  "utm_medium": "ads",
  "utm_campaign": "spring_2026",
  "click_ids": { "fbclid": "abc123" }
}
```

> **Bắt buộc:** `phone`. Trả 409 nếu `phone` đã tồn tại.

#### Cập nhật

```
PATCH /api/customers/:id
```

(Gửi các field cần cập nhật, chỉ ghi đè field có giá trị)

#### Xóa (soft delete)

```
DELETE /api/customers/:id
```

---

### 4.7. Queue (Admin)

#### Check-in khách hàng (tạo Booking + Queue Ticket)

```
POST /api/queue/checkin
```

```json
{
  "phone": "0901234567",
  "name": "Nguyễn Văn A",
  "service": "Khám tổng quát",
  "note": "Đau đầu 3 ngày"
}
```

> **Luồng:** Tìm Customer → Tìm Booking hôm nay → Tạo Queue Ticket → Trả số thứ tự.

#### Gọi số tiếp theo

```
POST /api/queue/next
```

```json
{ "roomId": "room-1", "nextQueueNumber": "260315-CH-005" }
```

#### Danh sách tickets hôm nay

```
GET /api/queue/tickets?status=waiting
```

---

### 4.8. Activities (Lịch sử hoạt động)

#### Danh sách

```
GET /api/activities?entity_type=lead&entity_id=uuid&limit=50
```

#### Ghi hoạt động thủ công

```
POST /api/activities
```

```json
{
  "entity_type": "lead",
  "entity_id": "lead-uuid",
  "action": "called",
  "note": "Gọi điện lần 2, khách đồng ý hẹn",
  "new_value": { "result": "agreed" }
}
```

---

### 4.9. Payments (Admin)

#### Danh sách thanh toán

```
GET /api/payments
```

#### Cập nhật trạng thái

```
PATCH /api/payments/:id
```

```json
{ "status": "paid", "paid_method": "cash" }
```

#### Tài khoản ngân hàng

```
GET /api/bank-accounts
POST /api/bank-accounts
```

```json
{
  "bankCode": "VCB",
  "accountNumber": "1234567890",
  "accountName": "NGUYEN VAN A",
  "isDefault": true
}
```

---

### 4.10. Dashboard

```
GET /api/dashboard
```

**Response:**

```json
{
  "bookings": { "today": 5, "total": 142, "byStatus": { "pending": 3, "confirmed": 2 } },
  "reviews": { "today": 1, "avgRating": "4.2", "totalReviews": 128 },
  "queue": { "total": 8, "waiting": 3, "called": 5 },
  "downloads": 42,
  "recentBookings": [...]
}
```

---

### 4.11. Reports (Báo cáo)

Tất cả report nhận param `?range=7d|30d|90d|6m` (default: `30d`).

| Endpoint | Mô tả |
|----------|-------|
| `GET /api/reports/funnel` | Phễu chuyển đổi (Lead → Booking → Arrived → Completed) |
| `GET /api/reports/sources` | Phân bổ nguồn leads & tỷ lệ convert |
| `GET /api/reports/cohort?months=6` | Ma trận cohort retention theo tháng |
| `GET /api/reports/marketing` | Trend leads hàng ngày, top campaigns |
| `GET /api/reports/customers` | Khách mới vs tái khám, phân bổ dịch vụ |
| `GET /api/reports/export?type=bookings&from=2026-01-01&to=2026-03-15` | Xuất CSV (`bookings`, `customers`, `leads`) |

---

### 3.8. Public Lead Intake (API Key Auth)

> **Mục đích:** Nhận lead từ landing page, form bên ngoài, hoặc ad platforms mà không cần đăng nhập.
>
> **Bảo mật:** Xác thực bằng API key (header `X-API-Key`). Quản lý key tại **Settings → Tích hợp → API Keys**.

```
POST /api/public/leads
```

**Headers:**

```
Content-Type: application/json
X-API-Key: sk_live_abc123def456...
```

**Request Body:**

```json
{
  "phone": "0912345678",
  "name": "Nguyễn Văn A",
  "email": "a@gmail.com",
  "source": "facebook",
  "utm_source": "fb_ads",
  "utm_medium": "cpc",
  "utm_campaign": "promo_march",
  "utm_term": "massage giảm đau",
  "utm_content": "ad_v1",
  "click_ids": { "fbclid": "abc123", "gclid": "xyz789", "ttclid": "ttt456" },
  "referral_code": "REF001",
  "service_interest": "Massage Trị Liệu",
  "landing_page": "https://example.com/lp1",
  "page_referrer": "https://facebook.com",
  "note": "Khách quan tâm gói cao cấp",
  "custom_fields": { "budget": "5tr", "preferred_time": "Sáng" }
}
```

| Field | Type | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `phone` | string | ✅ | SĐT (format `0xxx`, 9-11 số) |
| `name` | string | ❌ | Tên khách hàng |
| `email` | string | ❌ | Email |
| `source` | string | ❌ | Nguồn: `facebook`, `google`, `tiktok`, `website`, `referral`, `api` (default: `api`) |
| `utm_source` | string | ❌ | UTM source parameter |
| `utm_medium` | string | ❌ | UTM medium parameter |
| `utm_campaign` | string | ❌ | UTM campaign parameter |
| `utm_term` | string | ❌ | UTM term (keyword quảng cáo) |
| `utm_content` | string | ❌ | UTM content (biến thể quảng cáo) |
| `click_ids` | object | ❌ | `{ "fbclid": "...", "gclid": "...", "ttclid": "..." }` |
| `referral_code` | string | ❌ | Mã giới thiệu (tiếp thị liên kết) |
| `service_interest` | string | ❌ | Dịch vụ quan tâm |
| `landing_page` | string | ❌ | URL trang landing page |
| `page_referrer` | string | ❌ | URL trang giới thiệu |
| `note` | string | ❌ | Ghi chú |
| `custom_fields` | object | ❌ | Fields tùy chỉnh theo ngành `{ "key": "value" }` |
| `priority` | string | ❌ | `normal` (default), `high`, `low` |

**Response 201:**

```json
{
  "ok": true,
  "lead_id": "uuid",
  "customer_id": "uuid"
}
```

**Error Responses:**

| Status | Mô tả |
|--------|-------|
| 401 | API key missing hoặc invalid |
| 400 | `phone` thiếu hoặc sai format |
| 403 | API key thiếu scope `leads:create` |
| 429 | Rate limit exceeded |

> **Rate Limit:** Mặc định 100 requests/phút. Có thể cấu hình riêng cho mỗi API key.

---

### 3.9. Tracking Snippet (Auto-Capture UTM)

Thêm snippet vào landing page để tự động capture UTM params và click IDs từ URL quảng cáo:

```html
<script src="https://api.salehay.com/tracking.min.js" data-api-key="sk_live_xxx"></script>
```

**Tự động capture:**
- UTM params: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- Click IDs: `fbclid` (Facebook), `gclid` (Google), `ttclid` (TikTok), `msclkid` (Bing)
- `ref` / `referral_code` (tiếp thị liên kết)

**JavaScript API:**

```javascript
// Lấy tracking data đã capture
const tracking = SaleHayCRM.getTracking();
console.log(tracking);
// { utm_source: "fb_ads", utm_medium: "cpc", click_ids: { fbclid: "abc" }, ... }

// Gửi lead trực tiếp
SaleHayCRM.submitLead({
  phone: "0912345678",
  name: "Nguyễn Văn A",
  service_interest: "Massage"
}).then(data => console.log("Lead created:", data.lead_id));

// Tích hợp với form HTML có sẵn
SaleHayCRM.enhanceForm('#contact-form', {
  phoneField: 'phone',
  nameField: 'name'
});
```

**Ví dụ tích hợp HTML form:**

```html
<form id="lead-form">
  <input name="phone" placeholder="Số điện thoại" required>
  <input name="name" placeholder="Họ tên">
  <input name="service_interest" placeholder="Dịch vụ quan tâm">
  <button type="submit">Gửi thông tin</button>
</form>

<script src="https://api.salehay.com/tracking.min.js" data-api-key="sk_live_xxx"></script>
<script>
  document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    SaleHayCRM.submitLead({
      phone: fd.get('phone'),
      name: fd.get('name'),
      service_interest: fd.get('service_interest')
    }).then(() => {
      alert('Cảm ơn! Chúng tôi sẽ liên hệ bạn sớm.');
      this.reset();
    }).catch(err => alert('Lỗi: ' + err.message));
  });
</script>
```

---

### 3.10. API Key Management (Admin)

#### Danh sách API keys

```
GET /api/settings/api-keys
```

> **Auth:** JWT required. **RBAC:** `settings:r`

#### Tạo API key mới

```
POST /api/settings/api-keys
```

```json
{
  "name": "Landing Page chính",
  "rate_limit": 100
}
```

**Response 201:** trả về key đầy đủ **một lần duy nhất**.

```json
{
  "api_key": {
    "id": "uuid",
    "key": "sk_live_abc123...",
    "key_prefix": "sk_live_abc1",
    "name": "Landing Page chính",
    "rate_limit": 100
  },
  "message": "Save this key now. It will not be shown again."
}
```

#### Thu hồi API key

```
DELETE /api/settings/api-keys/:id
```

> API key bị thu hồi sẽ không thể sử dụng lại.

---

### 3.11. Tích hợp Share Page & QR Code (Client-side)

> **Mục đích:** Tích hợp tính năng nhắc lịch miễn phí vào website/landing page bằng cách tạo QR Code hoặc nút bấm mở trang Share để khách tự động lưu lịch vào Google Calendar / Apple Calendar. Tính năng này hoạt động độc lập ở Front-end (Client-side) thông qua thuật toán nén `lz-string`, không cần lưu database.

#### Base URL trang Share
```
https://api.salehay.com/share/view#{compressed_data}
```

#### Cấu trúc Payload (JSON)
Bạn cần xây dựng một object JSON chứa thông tin lịch hẹn:

| Field | Type | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `b` | string | ✅ | Tên thương hiệu (VD: `Spa Hoa Đào`) |
| `s` | string | ✅ | Dịch vụ (VD: `Chăm sóc da buổi 3/10`) |
| `d` | string | ✅ | Ngày giờ hẹn chuẩn ISO 8601 (VD: `2026-03-20T10:00`) |
| `h` | string | ❌ | Hotline liên hệ (VD: `0987654321`) |
| `n` | string | ❌ | Ghi chú dặn dò khách (VD: `Nhớ tẩy trang trước khi đến`) |
| `m` | string | ❌ | Link Google Maps địa chỉ (VD: `https://maps.app.goo.gl/...`) |
| `t` | string | ❌ | Ngành nghề để load theme màu sắc (`spa`, `dental`, `clinic`, v.v.) |

#### Thuật toán mã hóa
Sử dụng thư viện `lz-string` để mã hóa (compress) payload JSON trên, sau đó gắn vào sau `#` (hash) của URL.

**Ví dụ Code JavaScript (Website tích hợp):**

```javascript
// 1. Cài đặt package lz-string
// npm install lz-string
// hoặc qua CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js"></script>

import LZString from 'lz-string';

const appointmentData = {
  b: "Spa Hoa Đào",
  s: "Chăm sóc da chuyên sâu",
  d: "2026-03-20T10:00",
  h: "0987.654.321",
  n: "Vui lòng đến sớm 5 phút"
};

// 2. Nén JSON thành chuỗi an toàn cho URL
const compressedData = LZString.compressToEncodedURIComponent(JSON.stringify(appointmentData));

// 3. Tạo Share URL
const shareUrl = `https://api.salehay.com/share/view#${compressedData}`;

// 4. Sử dụng URL
// C1: Gắn vào nút bấm 
// window.open(shareUrl, '_blank');
// C2: Dùng thư viện qrcode (như 'qrcode') để render QR code từ shareUrl cho khách quét
```

> Trang `/share/view` sẽ tự động giải mã thông tin và hiển thị giao diện tối ưu di động, cho phép khách hàng bấm "Thêm vào lịch" để tải file `.ics` hoặc mở Google Calendar lưu sự kiện (với 2 chuông nhắc lịch tự động trước 24h và 2h).

---

### 4.12. Call Logs & Call Scripts (Admin)

Tính năng hỗ trợ telesales, telespaking theo kịch bản và ghi nhận kết quả cuộc gọi.

#### Danh sách & Quản lý Kịch bản gọi (Call Scripts)

```
GET /api/call-scripts
POST /api/call-scripts
PATCH /api/call-scripts/:id
DELETE /api/call-scripts/:id
```

**Payload tạo mới/cập nhật:**
```json
{
  "name": "Kịch bản chốt Sale Spa",
  "content": "Chào anh/chị, em gọi từ Spa Hoa Đào...",
  "type": "booking"
}
```

#### Ghi nhận kết quả cuộc gọi (Call Logs)

Log cuộc gọi trên Lead:
```
POST /api/leads/:id/calls
GET /api/leads/:id/calls
```

Log cuộc gọi trên Booking chuẩn bị tới:
```
POST /api/bookings/:id/calls
```

**Payload tạo Call Log:**
```json
{
  "outcome": "agreed",
  "note": "Khách đồng ý đến vào chủ nhật",
  "callback_at": "2026-03-22T10:00:00Z",
  "script_id": "uuid-cua-kich-ban-goi"
}
```

> Các outcome phổ biến: `busy`, `unreachable`, `agreed`, `rejected`, `callback`. 

---

### 4.13. Danh sách Dịch vụ (Admin)

Trả về danh sách các dịch vụ hiện có của chi nhánh để đổ vào các dropdown chọn dịch vụ.

```
GET /api/services
```

**Response 200:**
```json
{
  "services": [
    {
      "id": "uuid",
      "name": "Massage Cổ Vai Gáy",
      "code": "MSG-CVG",
      "is_active": true
    }
  ]
}
```

---

## 5. Phân trang (Pagination)

Các endpoint danh sách trả về object `pagination`:

```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 142
  }
}
```

| Param | Default | Max | Mô tả |
|-------|---------|-----|-------|
| `page` | 1 | — | Số trang |
| `limit` | 20 | 100 | Số item mỗi trang |

---

## 6. Xử lý lỗi (Error Handling)

### HTTP Status Codes

| Code | Ý nghĩa |
|------|---------|
| `200` | Thành công |
| `201` | Tạo mới thành công |
| `400` | Request không hợp lệ (thiếu field, sai format) |
| `401` | Chưa đăng nhập / token hết hạn |
| `403` | Không có quyền (RBAC) |
| `404` | Không tìm thấy |
| `409` | Trùng lặp (ví dụ: SĐT đã tồn tại) |

### Error Response Format

```json
{ "error": "Mô tả lỗi cụ thể" }
```

---

## 7. Ví dụ Tích hợp (Code Examples)

### JavaScript (fetch)

```javascript
const BASE_URL = 'https://api.salehay.com';

// 1. Đặt lịch (Public — không cần token)
async function createBooking(data) {
  const res = await fetch(`${BASE_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Slug': 'an-sinh'    // optional
    },
    body: JSON.stringify({
      phone: data.phone,
      name: data.name,
      service: data.service,
      date: data.date,
      time_slot: data.timeSlot,
      source_url: window.location.href,
      utm_source: new URLSearchParams(window.location.search).get('utm_source'),
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
    })
  });
  return res.json();
}

// 2. Gửi đánh giá (Public)
async function submitReview(data) {
  const res = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// 3. Lấy số hàng đợi (Public)
async function getQueueTicket(data) {
  const res = await fetch(`${BASE_URL}/api/queue/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// 4. API Protected — cần đăng nhập trước
async function login(username, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const { token } = await res.json();
  localStorage.setItem('token', token);
  return token;
}

async function fetchDashboard() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/api/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}
```

### HTML Form tích hợp nhanh

```html
<form id="booking-form">
  <input name="phone" placeholder="Số điện thoại *" required pattern="0\d{8,10}">
  <input name="name" placeholder="Họ tên">
  <input name="service" placeholder="Dịch vụ">
  <input name="date" type="date">
  <input name="time_slot" type="time">
  <textarea name="note" placeholder="Ghi chú"></textarea>
  <button type="submit">Đặt lịch</button>
</form>

<script>
document.getElementById('booking-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  data.source_url = window.location.href;

  // Auto-capture UTM params
  const params = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach(k => {
    if (params.get(k)) data[k] = params.get(k);
  });

  try {
    const res = await fetch('https://api.salehay.com/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.status === 'success') {
      alert('Đặt lịch thành công!');
      e.target.reset();
    } else {
      alert(result.error || 'Có lỗi xảy ra');
    }
  } catch (err) {
    alert('Lỗi kết nối, vui lòng thử lại');
  }
});
</script>
```

### cURL examples

```bash
# Health check
curl https://api.salehay.com/api/health

# Đặt lịch
curl -X POST https://api.salehay.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"phone":"0901234567","name":"Test","service":"Khám tổng quát"}'

# Login
curl -X POST https://api.salehay.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'

# Dashboard (protected)
curl https://api.salehay.com/api/dashboard \
  -H "Authorization: Bearer eyJhbGci..."

# Export CSV
curl "https://api.salehay.com/api/reports/export?type=leads&from=2026-01-01" \
  -H "Authorization: Bearer eyJhbGci..." \
  -o leads.csv
```

---

## RBAC — Hệ thống phân quyền

Quyền được lưu trong `roles.permissions` dạng JSON:

```json
{
  "leads": "*",        // full quyền
  "customers": "rwc",  // read + write + create
  "bookings": "r"      // chỉ đọc
}
```

| Ký tự | Ý nghĩa |
|-------|---------|
| `r` | Read (xem) |
| `w` | Write (sửa) |
| `c` | Create (tạo mới) |
| `a` | Assign (phân công) |
| `d` | Delete (xóa) |
| `*` | Toàn quyền |

---

## CORS

API cho phép CORS từ mọi origin (`*`). Các headers được phép:

```
Content-Type, Authorization, X-API-Key, X-Agent-Token, X-Tenant-Slug
```

Methods: `GET, POST, PATCH, PUT, DELETE, OPTIONS`

---

## 8. 🤖 Agent API (AI Agent)

Đầy đủ 7 endpoints cho AI Agent (OpenFang/OpenClaw) tương tác với CRM:

| Endpoint | Method | Scope | Mô tả |
|----------|--------|-------|--------|
| `/api/agent/leads` | POST | `leads:write` | Tạo lead mới |
| `/api/agent/leads/search` | GET | `leads:read` | Tìm kiếm leads |
| `/api/agent/leads/:id` | PATCH | `leads:write` | Cập nhật lead |
| `/api/agent/calls/log` | POST | `calls:write` | Ghi nhận cuộc gọi |
| `/api/agent/bookings/today` | GET | `bookings:read` | Lịch hẹn hôm nay |
| `/api/agent/messages/send` | POST | `messages:write` | Gửi/log tin nhắn |
| `/api/agent/analytics` | GET | `analytics:read` | Analytics pipeline |

**Auth**: Header `X-Agent-Token: agent_xxx`

👉 Chi tiết đầy đủ: [Agent API Reference](./api/agent-api.md)

---

## 9. 🔑 Agent Tokens

Quản lý tokens cho AI Agent (tạo, liệt kê, thu hồi):

| Endpoint | Method | Auth | Mô tả |
|----------|--------|------|--------|
| `/api/settings/agent-tokens` | GET | JWT | Danh sách tokens |
| `/api/settings/agent-tokens` | POST | JWT | Tạo token mới |
| `/api/settings/agent-tokens/:id` | DELETE | JWT | Thu hồi token |

**Scopes**: `leads:read`, `leads:write`, `bookings:read`, `calls:write`, `messages:write`, `analytics:read`, `*`

**Agent Types**: `openfang`, `openclaw`, `custom`

👉 Chi tiết đầy đủ: [Agent Tokens Reference](./api/agent-tokens.md)

---

## 10. 🔔 Webhooks

Nhận events tự động khi có thay đổi trong CRM:

| Endpoint | Method | Auth | Mô tả |
|----------|--------|------|--------|
| `/api/settings/webhooks` | GET | JWT | Danh sách webhooks |
| `/api/settings/webhooks` | POST | JWT | Tạo webhook |
| `/api/settings/webhooks/:id` | DELETE | JWT | Xóa webhook |

**Events**: `lead.created`, `lead.updated`, `booking.created`, `booking.updated`, `call.completed`, `review.created`, `*`

**Security**: HMAC-SHA256 signature · Retry 3 lần · Delivery log

👉 Chi tiết đầy đủ: [Webhooks Reference](./api/webhooks.md)

---

## 11. 📄 Public Pages

Quản lý trang công khai (booking, review, lead intake):

| Endpoint | Method | Auth | Mô tả |
|----------|--------|------|--------|
| `/api/settings/pages` | GET | JWT | Danh sách pages |
| `/api/settings/pages` | POST | JWT | Tạo page mới |
| `/api/settings/pages/:id` | PATCH | JWT | Cập nhật config/status |
| `/api/settings/pages/:id` | DELETE | JWT | Xóa page |
| `/api/public/pages/:slug` | GET | None | Public: lấy page config |

**Page Types**: `register`, `book`, `review`

**Config**: Brand name, primary color, services, fields, welcome text, google maps link.

---

> **Hỗ trợ:** Liên hệ team dev qua repo [github.com/tody-agent/service-crm](https://github.com/tody-agent/service-crm)
>
> **Tài liệu liên quan:** [MCP Server](./tech/mcp-server.md) · [OpenFang/OpenClaw](./tech/openfang-openclaw.md) · [SOP Cài đặt Agent](./sop/agent-setup.md)
