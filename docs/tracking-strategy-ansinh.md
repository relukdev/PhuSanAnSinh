# 📊 Tracking Strategy — Phòng Khám An Sinh

> **Ngày tạo:** 2026-03-03  
> **GTM Container:** `GTM-5WVXVR36`  
> **Website:** phusanansinh.com (Astro Static)

---

## 1. Tổng Quan Events

Website tự động push đầy đủ data vào `dataLayer` — Marketer chỉ cần tạo **GTM Tags/Triggers** để bắn sang Facebook, TikTok, Google Ads.

| # | Event Name | Khi Nào Fire | Ý Nghĩa |
|---|-----------|-------------|---------|
| 1 | `cro_lead` | Submit form đặt lịch thành công | ⭐ **Conversion chính** — Lead hoàn chỉnh |
| 2 | `cro_phone_capture` | Bước 1: Nhập SĐT | Micro-conversion (phone capture) |
| 3 | `cro_phone_call` | Click bất kỳ link gọi điện | Click hotline (tel:) |
| 4 | `cro_zalo_click` | Click bất kỳ link Zalo | Click nhắn Zalo |
| 5 | `cro_view_content` | Mở trang dịch vụ/home/tool | Xem nội dung |
| 6 | `cro_open_booking` | Mở form đặt lịch | Intent signal |
| 7 | `cro_scroll_depth` | Scroll 25%, 50%, 75%, 90% | Engagement |

---

## 2. GTM Variables Cần Tạo

> **Tất cả** dùng loại **Data Layer Variable** trong GTM.

### Variables chính (per-event)

| Variable Name | Data Layer Variable Name | Ghi chú |
|--------------|------------------------|---------|
| `DL - event_id` | `event_id` | UUID duy nhất mỗi event (dùng dedup CAPI) |
| `DL - phone_number` | `phone_number` | SĐT đầy đủ (chỉ có ở `cro_phone_call`) |
| `DL - phone_masked` | `phone_masked` | SĐT ẩn một phần (lead/capture) |
| `DL - click_location` | `click_location` | Nơi click: `header`, `footer`, `sticky-cta`, `content` |
| `DL - trigger_element` | `trigger_element` | Text nút bấm |
| `DL - form_type` | `form_type` | Loại form: `kham-thai`, `sieu-am`, `phu-khoa`... |
| `DL - service_name` | `service_name` | Dịch vụ chọn trong form |
| `DL - lead_type` | `lead_type` | `booking` |
| `DL - scroll_milestone` | `scroll_milestone` | 25, 50, 75, 90 |
| `DL - zalo_url` | `zalo_url` | URL Zalo được click |

### Variables 5W1H (context — có ở MỌI event)

| Variable Name | Data Layer Variable Name | 5W1H | Giải thích |
|--------------|------------------------|------|-----------|
| `DL - user_type` | `user_type` | WHO | `new` hoặc `returning` |
| `DL - device_type` | `device_type` | WHO | `mobile` / `tablet` / `desktop` |
| `DL - session_id` | `session_id` | WHO | ID phiên (session-level) |
| `DL - page_title` | `page_title` | WHAT | Tiêu đề trang |
| `DL - page_path` | `page_path` | WHAT | Đường dẫn trang |
| `DL - page_url` | `page_url` | WHAT | URL đầy đủ |
| `DL - page_type` | `page_type` | WHAT | `home` / `service` / `blog` / `tool` |
| `DL - service_category` | `service_category` | WHAT | `kham-thai` / `sieu-am` / `phu-khoa`... |
| `DL - event_timestamp` | `event_timestamp` | WHEN | ISO 8601 timestamp |
| `DL - day_of_week` | `day_of_week` | WHEN | `monday`...`sunday` |
| `DL - hour_of_day` | `hour_of_day` | WHEN | 0-23 |
| `DL - is_business_hours` | `is_business_hours` | WHEN | `true` / `false` |
| `DL - scroll_depth` | `scroll_depth` | WHERE | % trang đã scroll |
| `DL - referrer_domain` | `referrer_domain` | WHY | `facebook.com`, `google.com`... |
| `DL - ftc_source` | `ftc_source` | HOW | Nguồn first-touch |
| `DL - ftc_medium` | `ftc_medium` | HOW | Medium first-touch |
| `DL - ftc_campaign` | `ftc_campaign` | HOW | Campaign first-touch |
| `DL - utm_source` | `utm_source` | HOW | UTM source hiện tại |
| `DL - utm_medium` | `utm_medium` | HOW | UTM medium hiện tại |
| `DL - utm_campaign` | `utm_campaign` | HOW | UTM campaign hiện tại |

---

## 3. GTM Triggers Cần Tạo

> Tất cả dùng loại **Custom Event** trong GTM.

| Trigger Name | Event Name | Ghi chú |
|-------------|-----------|---------|
| `CE - Lead` | `cro_lead` | Main conversion |
| `CE - Phone Capture` | `cro_phone_capture` | Step 1 conversion |
| `CE - Phone Call Click` | `cro_phone_call` | Click gọi điện |
| `CE - Zalo Click` | `cro_zalo_click` | Click nhắn Zalo |
| `CE - View Content` | `cro_view_content` | Xem trang dịch vụ |
| `CE - Open Booking` | `cro_open_booking` | Mở form đặt lịch |
| `CE - Scroll Depth` | `cro_scroll_depth` | Scroll milestones |

---

## 4. GTM Tags — Ví Dụ Setup

### 4.1 Facebook/Meta Pixel

> Tạo Base Pixel tag trên **All Pages** trước. Sau đó tạo Event tags:

| Tag Name | Tag Type | Trigger | FB Event | Parameters |
|----------|----------|---------|----------|------------|
| FB - Lead | FB Pixel Event | CE - Lead | `Lead` | content_name: `{{DL - service_name}}` |
| FB - Phone Call | FB Pixel Event | CE - Phone Call Click | `Contact` | content_name: `Phone Call` |
| FB - Zalo Click | FB Pixel Event | CE - Zalo Click | `Contact` | content_name: `Zalo Click` |
| FB - View Content | FB Pixel Event | CE - View Content | `ViewContent` | content_name: `{{DL - service_category}}` |

### 4.2 TikTok Pixel

| Tag Name | Trigger | TikTok Event | Parameters |
|----------|---------|-------------|------------|
| TT - Lead | CE - Lead | `SubmitForm` | content_name: `{{DL - service_name}}` |
| TT - Phone Call | CE - Phone Call Click | `Contact` | — |
| TT - Zalo Click | CE - Zalo Click | `Contact` | — |
| TT - View Content | CE - View Content | `ViewContent` | content_name: `{{DL - service_category}}` |

### 4.3 Google Ads Conversion

| Tag Name | Trigger | Conversion ID/Label | Value |
|----------|---------|-------------------|-------|
| GAds - Lead | CE - Lead | `AW-XXXXXXXXX/yyyy` | Giá trị lead (fixed) |
| GAds - Phone Call | CE - Phone Call Click | `AW-XXXXXXXXX/zzzz` | — |

---

## 5. UTM Naming Convention

> Luôn viết thường, dùng dấu gạch ngang, không ký tự đặc biệt.

| Platform | utm_source | utm_medium | utm_campaign (ví dụ) |
|----------|-----------|-----------|---------------------|
| Facebook Feed | `facebook` | `paid-social` | `kham-thai-retarget-202603` |
| Facebook Story | `facebook` | `paid-social` | `sieu-am-5d-cold-202603` |
| TikTok | `tiktok` | `paid-social` | `phu-khoa-awareness-202603` |
| Google Search | `google` | `paid-search` | `kham-thai-branded-202603` |
| Google Display | `google` | `paid-display` | `retarget-visitors-202603` |
| Zalo Ads | `zalo` | `paid-social` | `sieu-am-zalo-202603` |
| Email | `email` | `email` | `newsletter-thang3-202603` |

**Campaign format:** `[dịch-vụ]-[đối-tượng]-[YYYYMM]`

**URL mẫu:**
```
https://phusanansinh.com/sieu-am-5d?utm_source=facebook&utm_medium=paid-social&utm_campaign=sieu-am-5d-retarget-202603&utm_content=video-15s-a
```

---

## 6. First-Touch vs Last-Touch Attribution

### Website tự động lưu cookie `_ftc` (90 ngày)

| Trường | Ý nghĩa |
|--------|---------|
| `ftc_source` | Nguồn traffic **lần đầu** vào site |
| `ftc_medium` | Medium **lần đầu** |
| `ftc_campaign` | Campaign **lần đầu** |
| `utm_source` | Nguồn traffic **lần này** (last-touch) |
| `utm_medium` | Medium **lần này** |
| `utm_campaign` | Campaign **lần này** |

**Ví dụ phân tích:**  
Khách vào từ Facebook ads ngày 1 (first-touch) → Quay lại từ Google ngày 7 (last-touch) → Đặt lịch.  
→ `ftc_source = facebook`, `utm_source = google`  
→ Biết Facebook là kênh giới thiệu, Google là kênh chốt.

---

## 7. Quick Reference Card ⚡

### Tracking IDs cần điền

| Platform | ID Type | Value | Status |
|----------|---------|-------|--------|
| GTM | Container ID | `GTM-5WVXVR36` | ✅ Đã cài |
| Facebook/Meta | Pixel ID | `_________` | ⬜ Chưa có |
| TikTok | Pixel ID | `_________` | ⬜ Chưa có |
| Google Ads | Conversion ID | `_________` | ⬜ Chưa có |
| GA4 | Measurement ID | `_________` | ⬜ Chưa có |

### Top 3 Events ưu tiên setup trước

| # | Event | FB Event | Tại sao |
|---|-------|----------|---------|
| 1 | `cro_lead` | Lead | **Conversion chính** — Train algorithm tốt nhất |
| 2 | `cro_phone_call` | Contact | Volume cao, dễ optimize |
| 3 | `cro_zalo_click` | Contact | Kênh liên hệ phổ biến |

### DataLayer Event Cheat Sheet

```javascript
// Xem tất cả events đã fire
console.table(dataLayer.filter(e => e.event && e.event.startsWith('cro_')));

// Xem chi tiết 1 event
dataLayer.filter(e => e.event === 'cro_lead');
```

---

## 8. Kiểm Tra Tracking (QA)

### Chrome DevTools
1. F12 → Console → gõ `dataLayer`
2. Kiểm tra mỗi event có đầy đủ fields

### GTM Preview Mode
1. Vào GTM → Preview → nhập URL site
2. Thực hiện từng action → kiểm tra event fire

### Facebook Pixel Helper / TikTok Pixel Helper
- Cài extension → kiểm tra pixel fire đúng event

---

> **Cần hỗ trợ?** Liên hệ developer với nội dung:  
> *"Tôi cần thêm event [tên] khi [hành động] trên trang [tên trang]"*
