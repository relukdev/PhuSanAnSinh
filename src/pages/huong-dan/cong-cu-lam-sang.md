---
title: "SOP Công Cụ Lâm Sàng — Phòng Khám An Sinh"
description: "Hướng dẫn sử dụng bộ công cụ tính toán y khoa sản phụ khoa trên website An Sinh."
keywords: ["công cụ lâm sàng", "calculator sản phụ khoa", "SOP", "clinical tools"]
robots: "noindex, nofollow"
layout: ../../layouts/SopLayout.astro
---


> **Quick Reference**
> - **Ai dùng**: Bác sĩ · Mẹ bầu (một số công cụ công khai)
> - **Truy cập**: [/cong-cu/](https://phusanansinh.pages.dev/cong-cu/) và các trang riêng
> - **Tổng cộng**: 8+ công cụ tính toán y khoa
> - **Độ phức tạp**: 🟢 Dễ sử dụng (nhập số liệu → nhận kết quả)

---

## Danh Sách Công Cụ

| # | Công cụ | Đường dẫn | Đối tượng | Mô tả |
|---|---------|-----------|----------|-------|
| 1 | **Tính ngày dự sinh** | `/cong-cu/tinh-ngay-du-sinh` | Mẹ bầu, BS | Tính ngày dự sinh theo kỳ kinh cuối hoặc siêu âm |
| 2 | **Cân nặng thai nhi** | `/can-nang-thai-nhi` | Mẹ bầu, BS | Tra bảng chuẩn cân nặng theo tuần thai |
| 3 | **Tính ngày rụng trứng** | `/tinh-ngay-rung-trung` | Mẹ bầu | Dự đoán ngày rụng trứng + cửa sổ thụ thai |
| 4 | **Theo dõi thai kỳ** | `/cong-cu/theo-doi-thai-ky` | Mẹ bầu, BS | Nhắc lịch khám, mốc thai kỳ quan trọng |
| 5 | **Bishop Score** | `/cong-cu/bishop-score` | BS | Đánh giá độ chín cổ tử cung, hỗ trợ quyết định khởi phát chuyển dạ |
| 6 | **Doppler thai nhi** | `/cong-cu/doppler-thai-nhi` | BS | Phân tích chỉ số Doppler: PI, RI, S/D |
| 7 | **Đái tháo đường thai kỳ** | `/cong-cu/du-doan-dai-thao-duong-thai-ky` | BS | Sàng lọc nguy cơ GDM dựa trên yếu tố lâm sàng |
| 8 | **Sàng lọc tiền sản giật** | `/cong-cu/sang-loc-tien-san-giat` | BS | Đánh giá nguy cơ tiền sản giật |
| 9 | **Dự đoán sinh non** | `/cong-cu/du-doan-sinh-non` | BS | Đánh giá nguy cơ sinh non |
| 10 | **Đánh giá khối u buồng trứng** | `/cong-cu/danh-gia-khoi-u-buong-trung` | BS | IOTA Rules, O-RADS phân loại khối u |

---

## Hướng Dẫn Sử Dụng Chung

Tất cả công cụ đều tuân theo quy trình 3 bước:

```mermaid
graph LR
    A["1. Nhập dữ liệu<br/>lâm sàng"] --> B["2. Hệ thống<br/>tính toán"] --> C["3. Kết quả +<br/>Khuyến nghị"]
```

> **Mô tả:** Nhập dữ liệu → hệ thống tính toán tự động → hiển thị kết quả kèm khuyến nghị lâm sàng.

### Quy tắc chung

1. **Nhập đúng đơn vị** — Mỗi trường có ghi rõ đơn vị (mm, g, tuần, ...)
2. **Đọc kết quả** — Kết quả hiển thị kèm:
   - Giá trị tính được
   - Phân loại nguy cơ (nếu có)
   - Khuyến nghị lâm sàng
   - Tham chiếu y khoa
3. **Không thay thế chẩn đoán** — Công cụ chỉ hỗ trợ, quyết định cuối cùng là của bác sĩ

<div class=\"admonition\"><strong>💡 Mẹo:</strong><br/>
Một số công cụ (Tính ngày dự sinh, Cân nặng thai nhi, Ngày rụng trứng) có thể hướng dẫn mẹ bầu tự sử dụng — giảm tải cho bác sĩ trong việc giải thích.
</div>

---

## Chi Tiết Từng Công Cụ

### 1. Tính Ngày Dự Sinh

**Input:** Ngày kinh cuối (hoặc tuổi thai theo siêu âm)
**Output:** Ngày dự sinh ước tính, tuần thai hiện tại, bảng mốc khám quan trọng

### 2. Bishop Score

**Input:** 5 tiêu chí: Độ mở cổ tử cung, Xoá cổ tử cung, Mật độ, Vị trí, Ngôi thai
**Output:** Điểm Bishop (0-13), Khuyến nghị (thuận lợi / không thuận lợi cho khởi phát)

### 3. Doppler Thai Nhi

**Input:** Chỉ số PI, RI, S/D từ kết quả siêu âm Doppler
**Output:** Phân loại bình thường / bất thường, khuyến nghị theo dõi, prompt AI phân tích

### 4. Đái Tháo Đường Thai Kỳ (GDM)

**Input:** BMI, tiền sử gia đình, tuổi, kết quả OGTT
**Output:** Nguy cơ GDM, phác đồ sàng lọc, khuyến nghị dinh dưỡng + theo dõi

### 5. Tiền Sản Giật

**Input:** Tiền sử, BMI, huyết áp, chỉ số sinh hoá
**Output:** Phân tầng nguy cơ, khuyến nghị dự phòng (Aspirin liều thấp)

---

## Xử Lý Sự Cố

<details>
<summary>🔴 Kết quả hiện "NaN" hoặc không hợp lệ</summary>

**Nguyên nhân:** Nhập dữ liệu sai định dạng (chữ thay vì số, dấu phẩy thay dấu chấm).

**Cách xử lý:**
1. Xoá trường và nhập lại
2. Dùng dấu chấm (.) cho số thập phân
3. Không nhập đơn vị vào ô số

</details>

---

## Liên quan

- [Tổng quan hệ thống](./index)
- [Vai trò Bác sĩ](./vai-tro-trach-nhiem#bac-si)
- [Đặt lịch khám](./dat-lich-kham)
