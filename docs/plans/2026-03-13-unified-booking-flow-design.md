# Unified Booking Flow — Hợp nhất Đặt lịch & Lưu lịch

## Bối cảnh

Hiện tại có 2 flow tách rời:
1. **BookingBottomSheet** — Form đặt lịch (SĐT, tên, ngày, giờ, dịch vụ) → gửi Google Sheet
2. **Checklist bottom sheet** (trang Tính Ngày Dự Sinh) — Chọn mốc khám → cấu hình → tải ICS / Google Cal

Mục tiêu: Hợp nhất thành **1 flow duy nhất** dùng chung toàn site.

## User Flow

### Từ trang Tính Ngày Dự Sinh (có checklist)
```
Chọn mốc khám trong checklist
    ↓
Ấn "Nhắc lịch khám"
    ↓
BookingBottomSheet mở (Step 1):
  - SĐT (bắt buộc)
  - Họ tên
  - 1 mốc: Ngày khám cụ thể (dropdown)
  - Nhiều mốc: Thứ trong tuần (T2-T7 / CN)
  - Ca khám, nhắc trước
  - Dịch vụ (auto-filled), ghi chú
  - [Xác Nhận Đặt Lịch]
    ↓
Gửi data → Google Sheet
    ↓
Sheet morph sang Step 2:
  ✅ Đặt lịch thành công!
  1 mốc: [Google Cal] + [Tải .ics]
  Nhiều mốc: [Tải .ics] only
```

### Từ trang khác (homepage, dịch vụ...)
```
Ấn "Đặt Lịch Khám" / .open-booking
    ↓
BookingBottomSheet mở (Step 1):
  - Form đặt lịch bình thường (như hiện tại)
  - [Xác Nhận Đặt Lịch]
    ↓
Gửi data → Google Sheet
    ↓
Có EDD data? → Step 2: Mời lưu lịch mốc tiếp theo
Không có EDD? → Toast "Đặt lịch thành công"
```

## Architecture

### Multi-step wizard trong 1 BookingBottomSheet

```
BookingBottomSheet
├── Step 1: booking-step-form (form đặt lịch)
│   ├── SĐT + Tên (luôn hiện)
│   ├── Ngày khám / Thứ trong tuần (conditional)
│   ├── Ca khám, nhắc trước (khi có checklist context)
│   ├── Dịch vụ + ghi chú
│   └── [Xác Nhận Đặt Lịch]
│
└── Step 2: booking-step-calendar (calendar save)
    ├── ✅ Success message
    ├── Milestone info display
    ├── [Thêm Google Cal] (1 mốc only)
    ├── [Tải .ics]
    └── [Đóng]
```

### State management
- `window._bookingContext`: Object chứa context từ checklist hoặc EDD
  - `milestones`: Array mốc khám đã chọn (từ checklist)
  - `lmpDate`: LMP date (từ localStorage hoặc checklist page)
  - `dayPref`, `timePref`, `reminderHours`: Preferences

### Conditional fields
- **1 mốc đã chọn** → Hiện dropdown "Ngày muốn khám" (ngày cụ thể)
- **Nhiều mốc** → Ẩn ngày cụ thể, hiện "Khám ngày" (T2-T7 / CN) chips
- **Không có checklist** → Hiện dropdown "Ngày muốn khám" bình thường

### Google Sheet data
Gửi thêm fields:
- `selectedMilestones`: Danh sách mốc khám đã chọn
- `dayPreference`: weekday/sunday
- `reminderPreference`: 1 ngày / 8 giờ
