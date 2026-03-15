---
title: "SOP Quản Lý Số Thứ Tự — Phòng Khám An Sinh"
description: "Hướng dẫn đăng ký và quản lý số thứ tự khám bệnh tại Phòng Khám An Sinh."
keywords: ["số thứ tự", "queue management", "SOP", "An Sinh"]
robots: "noindex, nofollow"
layout: ../../layouts/SopLayout.astro
---


> **Quick Reference**
> - **Ai dùng**: Khách hàng (đăng ký) · Lễ tân (hỗ trợ)
> - **Truy cập**: [/lay-so-thu-tu](https://phusanansinh.pages.dev/lay-so-thu-tu) hoặc quét QR
> - **Thời gian**: ~30 giây
> - **Kết quả**: Nhận số thứ tự dạng `YYMMDD-XX-NNN`

---

## Quy Trình Đăng Ký Số

```mermaid
graph TB
    style S fill:#232221,stroke:#3fb950,color:#E8E5DF
    style A fill:#232221,stroke:#60A5FA,color:#E8E5DF
    style B fill:#232221,stroke:#60A5FA,color:#E8E5DF
    style C fill:#232221,stroke:#60A5FA,color:#E8E5DF
    style D fill:#232221,stroke:#60A5FA,color:#E8E5DF
    style E fill:#232221,stroke:#3fb950,color:#E8E5DF
    style F fill:#232221,stroke:#d29922,color:#E8E5DF

    S(["▶ Khách đến phòng khám"]) --> A["Quét QR tại quầy<br/>hoặc vào /lay-so-thu-tu"]
    A --> B["Điền: Họ tên, SĐT,<br/>Ngày sinh, Khu vực"]
    B --> C["Chọn nhu cầu khám"]
    C --> D["Nhấn ĐĂNG KÝ KHÁM"]
    D --> E(["✅ Nhận số thứ tự"])
    E --> F["Chờ gọi tên trên bảng TV"]
```

> **Mô tả:** Khách quét QR hoặc vào trang web → điền thông tin → chọn dịch vụ → nhấn đăng ký → nhận số thứ tự → chờ gọi tên.

---

## Hướng Dẫn Chi Tiết

### Bước 1: Truy cập trang lấy số

- **Tại phòng khám:** Quét mã QR dán tại quầy lễ tân
- **Online:** Vào link `phusanansinh.pages.dev/lay-so-thu-tu`

<div class=\"admonition\"><strong>💡 Mẹo:</strong><br/>
Mã QR lấy số được in tại trang [Công cụ nội bộ](./cong-cu-noi-bo). Lễ tân cần đảm bảo QR luôn được dán rõ ràng tại quầy.
</div>

### Bước 2: Điền thông tin

| Trường | Bắt buộc | Mô tả | Ví dụ |
|--------|----------|-------|-------|
| Họ và tên | ✅ | Họ tên đầy đủ | Nguyễn Thị Mai |
| Số điện thoại | ✅ | 9-11 chữ số, bắt đầu bằng 0 | 0901234567 |
| Ngày sinh | ❌ | Ngày/tháng/năm sinh | 15/06/1990 |
| Giới tính | ❌ | Mặc định: Nữ | Nữ / Nam |
| Khu vực | ❌ | Phường/xã (autocomplete) | Đồng Nguyên |
| Nhu cầu khám | ✅ | Chọn 1 trong 7 dịch vụ | Khám thai định kỳ |
| Ghi chú | ❌ | Thông tin bổ sung | Tái khám, thai 20 tuần |

<div class=\"admonition\"><strong>💡 Mẹo:</strong><br/>
Hệ thống **tự động nhớ** thông tin khách qua localStorage. Lần sau quay lại, form sẽ được điền sẵn — rất nhanh cho khách tái khám.
</div>

### Bước 3: Nhấn "ĐĂNG KÝ KHÁM"

1. Nhấn nút **🏥 ĐĂNG KÝ KHÁM** ở cuối trang
2. Hệ thống gửi thông tin tới Google Sheets
3. Nhận **số thứ tự** hiển thị trên màn hình

### Bước 4: Hiểu số thứ tự

Số thứ tự có cấu trúc: **`YYMMDD-XX-NNN`**

| Phần | Ý nghĩa | Ví dụ |
|------|---------|-------|
| `YYMMDD` | Ngày đăng ký (năm/tháng/ngày) | `260315` = 15/03/2026 |
| `XX` | Mã dịch vụ (2 ký tự) | `KT` = Khám thai |
| `NNN` | Số thứ tự trong ngày | `001`, `002`, ... |

**Bảng mã dịch vụ:**

| Mã | Dịch vụ |
|----|---------|
| `KT` | Khám thai định kỳ |
| `SA` | Siêu âm 5D |
| `PK` | Khám phụ khoa |
| `NK` | Khám nam khoa |
| `HM` | Điều trị vô sinh |
| `TT` | Tư vấn tránh thai |
| `CH` | Tư vấn chung |

**Ví dụ:** `260315-KT-003` = Ngày 15/03/2026, Khám thai, số thứ tự 3.

### Bước 5: Chờ gọi tên

- Ngồi chờ tại phòng khám
- Theo dõi **bảng số TV** treo tại phòng chờ
- Khi tên được gọi, vào phòng khám theo chỉ dẫn

---

## Xử Lý Sự Cố

<details>
<summary>🔴 Lỗi "Số điện thoại không hợp lệ"</summary>

**Nguyên nhân:** SĐT không bắt đầu bằng 0 hoặc không đủ 9-11 chữ số.

**Cách xử lý:**
1. Xoá khoảng trắng trong SĐT
2. Kiểm tra bắt đầu bằng số 0
3. Đếm lại số chữ số (phải 9-11)

</details>

<details>
<summary>🔴 Không nhận được số thứ tự</summary>

**Nguyên nhân:** Mạng yếu hoặc Google Sheets không phản hồi.

**Cách xử lý:**
1. Kiểm tra kết nối internet (WiFi phòng khám)
2. Thử lại sau 30 giây
3. Nếu vẫn lỗi: Lễ tân đăng ký hộ trên máy tính

</details>

<details>
<summary>🔴 Muốn đăng ký cho nhiều người</summary>

**Cách xử lý:**
Sau khi đăng ký xong, nhấn nút **"Đăng ký thêm người khác"** ở cuối trang. Form sẽ reset nhưng giữ lại thông tin cơ bản.

</details>

---

## FAQ

<details>
<summary>Q: Số thứ tự có hết hạn không?</summary>

**A:** Số thứ tự chỉ có hiệu lực trong ngày đăng ký (theo mã YYMMDD).

</details>

<details>
<summary>Q: Có thể đăng ký trước từ nhà không?</summary>

**A:** Được. Khách có thể vào link `/lay-so-thu-tu` từ nhà, nhưng nên đăng ký khi đã đến hoặc gần đến phòng khám để tránh mất lượt.

</details>

---

## Liên quan

- [Bảng số TV — Hiển thị phòng chờ](./bang-so-tv)
- [Công cụ nội bộ — Điều phối gọi số](./cong-cu-noi-bo#dieu-phoi-goi-so)
- [Tổng quan hệ thống](./index)
