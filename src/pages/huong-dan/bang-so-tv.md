---
title: "SOP Bảng Số TV — Phòng Khám An Sinh"
description: "Hướng dẫn cài đặt và vận hành bảng số thứ tự hiển thị trên màn hình TV phòng chờ."
keywords: ["bảng số TV", "hiển thị số thứ tự", "SOP", "TV display"]
robots: "noindex, nofollow"
layout: ../../layouts/SopLayout.astro
---


> **Quick Reference**
> - **Ai dùng**: Kỹ thuật viên (cài đặt) · Lễ tân (bật/tắt hàng ngày)
> - **Truy cập**: [/bang-so](https://phusanansinh.pages.dev/bang-so)
> - **Thiết bị**: TV + Android TV Box / Laptop kết nối HDMI
> - **Tự động**: Cập nhật mỗi 3 giây, có âm thanh + giọng nói gọi tên

---

## Tính Năng Bảng Số

| Tính năng | Mô tả |
|-----------|-------|
| **Khu vực chính (trái)** | Hiển thị lớn số đang được gọi, tên bệnh nhân, phòng khám |
| **Danh sách phòng (phải)** | Trạng thái tất cả các phòng khám |
| **Cảnh báo gọi tên** | Banner đỏ trượt từ trên xuống khi có bệnh nhân mới |
| **Âm thanh + TTS** | Tiếng chuông + giọng nói tiếng Việt gọi tên |
| **QR quảng cáo** | Carousel QR đặt lịch + công cụ y khoa (tự chuyển mỗi 10s) |
| **Đồng hồ** | Hiển thị giờ hiện tại |
| **Fullscreen** | Nút toàn màn hình (góc trên phải) |

---

## Hướng Dẫn Cài Đặt

### Bước 1: Kết nối thiết bị

1. Kết nối **Android TV Box** hoặc **Laptop** với TV qua HDMI
2. Đảm bảo thiết bị có **kết nối WiFi ổn định**
3. Mở trình duyệt web (Chrome khuyến nghị)

### Bước 2: Truy cập trang bảng số

Mở link: `phusanansinh.pages.dev/bang-so`

**Các chế độ hiển thị (thêm vào URL):**

| Chế độ | URL | Mô tả |
|--------|-----|-------|
| **Mặc định** | `/bang-so` | 1 số lớn (trái) + danh sách phòng (phải) |
| **Grid** | `/bang-so?mode=grid` | Hiển thị dạng lưới nhiều phòng, ẩn khu vực focus |
| **Lọc zone** | `/bang-so?zone=A` | Chỉ hiển thị phòng trong zone A |
| **Lọc phòng** | `/bang-so?rooms=1,2,3` | Chỉ hiển thị phòng 1, 2, 3 |

<div class=\"admonition\"><strong>💡 Mẹo:</strong><br/>
Kết hợp params: `/bang-so?mode=grid&rooms=1,2` để hiển thị dạng grid chỉ phòng 1 và 2.
</div>

### Bước 3: Bật fullscreen

1. Nhấn nút **toàn màn hình** (⛶) ở góc trên phải
2. Hoặc nhấn **F11** trên keyboard
3. TV sẽ hiển thị toàn bộ bảng số

### Bước 4: Vận hành hàng ngày

| Thời điểm | Hành động |
|-----------|----------|
| **Mở cửa (17:00)** | Bật TV + thiết bị → truy cập `/bang-so` → fullscreen |
| **Trong phiên** | Bảng tự động cập nhật, không cần thao tác |
| **Đóng cửa (21:00)** | Tắt TV + thiết bị |

---

## Cách Hoạt Động

1. **Polling API**: Bảng số gọi API `sale.todyai.io/api/queue/current` mỗi **3 giây**
2. **Phát hiện thay đổi**: So sánh số thứ tự mới với cũ
3. **Khi có bệnh nhân mới**:
   - Cập nhật khu vực focus (trái) với số + tên
   - Hiện banner cảnh báo đỏ (10 giây)
   - Phát tiếng chuông 🔔
   - Giọng nói TTS: *"Mời khách hàng [Tên] vào [Phòng]"*
4. **Cập nhật sidebar**: Tất cả phòng được hiển thị bên phải

---

## Xử Lý Sự Cố

<details>
<summary>🔴 Bảng số hiện "Đang kết nối..."</summary>

**Nguyên nhân:** Không có kết nối internet hoặc API không phản hồi.

**Cách xử lý:**
1. Kiểm tra WiFi trên thiết bị
2. Thử tải lại trang (F5)
3. Kiểm tra kết nối internet bằng trình duyệt khác

</details>

<details>
<summary>🔴 Không có âm thanh khi gọi tên</summary>

**Nguyên nhân:** Trình duyệt chặn âm thanh tự động (autoplay policy).

**Cách xử lý:**
1. Click vào bất kỳ đâu trên trang để kích hoạt audio
2. Kiểm tra volume TV đã mở
3. Kiểm tra trình duyệt cho phép autoplay: Settings → Site Settings → Sound → Allow

</details>

<details>
<summary>🔴 Hiển thị không vừa màn hình TV</summary>

**Cách xử lý:**
1. Nhấn nút fullscreen hoặc F11
2. Điều chỉnh zoom trình duyệt: `Ctrl` + `+` hoặc `Ctrl` + `-`
3. Kiểm tra độ phân giải output của TV Box

</details>

---

## Liên quan

- [Quản lý số thứ tự](./quan-ly-so-thu-tu)
- [Công cụ nội bộ — Điều phối gọi số](./cong-cu-noi-bo#dieu-phoi-goi-so)
- [Tổng quan hệ thống](./index)
