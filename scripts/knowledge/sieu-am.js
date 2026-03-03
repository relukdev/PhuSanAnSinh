// Siêu âm knowledge module
const B = { name: 'Phòng Khám An Sinh', addr: '416 Minh Khai, Đồng Nguyên, Từ Sơn, Bắc Ninh', phone: '0899 268 299', bookUrl: 'https://phusanansinh.com/dat-lich-hen-kham.html' };

function generic(a) {
    const kw = a.title.split(':')[0].trim();
    return {
        intro: `${kw} là chủ đề được nhiều mẹ bầu và phụ nữ quan tâm khi tìm hiểu về các phương pháp chẩn đoán hình ảnh trong y khoa. Siêu âm là công cụ an toàn, không xâm lấn, không sử dụng tia X, được WHO và ACOG khuyến cáo sử dụng rộng rãi trong sản phụ khoa. Tại ${B.name}, chúng tôi trang bị hệ thống siêu âm 5D thế hệ mới nhất, cho hình ảnh rõ nét, giúp đánh giá chính xác tình trạng thai nhi và các bệnh lý phụ khoa.`,
        sections: [
            {
                h: `${kw} — Kiến thức cần biết`,
                content: `### Siêu âm trong sản phụ khoa\n\nSiêu âm sử dụng sóng siêu âm tần số cao (2-18 MHz) để tạo hình ảnh các cơ quan bên trong cơ thể. Trong sản phụ khoa, siêu âm đóng vai trò quan trọng:\n\n**Trong thai kỳ:**\n- Xác nhận thai trong tử cung\n- Đánh giá tuổi thai, dự kiến ngày sinh\n- Theo dõi sự phát triển thai nhi (cân nặng, kích thước)\n- Phát hiện dị tật bẩm sinh\n- Đánh giá nước ối, nhau thai\n- Xác định giới tính thai nhi\n\n**Trong phụ khoa:**\n- Đánh giá tử cung (u xơ, polyp, dị dạng)\n- Kiểm tra buồng trứng (u nang, nang chức năng)\n- Theo dõi nang noãn (hỗ trợ sinh sản)\n- Đánh giá nội mạc tử cung`
            },
            {
                h: `So sánh các loại siêu âm: 2D, 3D, 4D, 5D`,
                content: `| Loại | Hình ảnh | Ưu điểm | Ứng dụng chính |\n|------|---------|---------|----------------|\n| 2D | Phẳng, đen trắng | Chuẩn đoán y khoa chuẩn | Đo kích thước, đánh giá cấu trúc |\n| 3D | Không gian 3 chiều, tĩnh | Thấy rõ hình dạng thai nhi | Phát hiện dị tật mặt, xương |\n| 4D | 3D + chuyển động | Thấy thai nhi cử động real-time | Quan sát biểu cảm, vận động |\n| 5D | 4D + HD + light rendering | Hình ảnh cực kỳ sắc nét, sáng tự nhiên | Chẩn đoán chính xác + lưu niệm |\n\n### Siêu âm 5D — Công nghệ mới nhất\n\nSiêu âm 5D (còn gọi HD-Live) là bước tiến vượt bậc trong chẩn đoán hình ảnh sản khoa:\n\n- **Ánh sáng nhân tạo (Virtual Light Source)**: Tạo bóng đổ tự nhiên, hình ảnh thai nhi sinh động như ảnh chụp\n- **Độ phân giải cao**: Chi tiết từng nét mặt, ngón tay, ngón chân\n- **Silhouette Mode**: Hiển thị cấu trúc bên trong (não, tim) bằng hiệu ứng trong suốt\n- **Crystal Vue**: Xuyên qua mô mềm để thấy cấu trúc xương và cơ quan\n- **RealisticVue**: Hình ảnh giống ảnh chụp thật nhất\n\n**Khi nào nên siêu âm 5D?**\n- Tuần 24-30: Thời điểm lý tưởng để xem mặt thai nhi\n- Thai đủ nước ối và nằm ngửa sẽ cho hình ảnh đẹp nhất`
            },
            {
                h: `Lịch siêu âm thai kỳ quan trọng`,
                content: `### 6 mốc siêu âm không nên bỏ qua\n\n**Mốc 1: Tuần 5-8 — Siêu âm xác nhận thai**\n- Xác nhận túi thai trong buồng tử cung\n- Tim thai (từ tuần 6-7)\n- Loại trừ thai ngoài tử cung\n\n**Mốc 2: Tuần 11-14 — Sàng lọc quý I (Đo độ mờ da gáy)**\n- Đo NT (Nuchal Translucency): bình thường < 3mm\n- Xương mũi thai nhi\n- Kết hợp Double Test sàng lọc Down, Edwards, Patau\n\n**Mốc 3: Tuần 18-22 — Siêu âm hình thái học**\n- Khảo sát toàn diện cấu trúc thai nhi\n- Tim, não, cột sống, thận, chi, mặt\n- Phát hiện các dị tật bẩm sinh lớn\n\n**Mốc 4: Tuần 24-28 — Đánh giá tăng trưởng**\n- Cân nặng ước tính thai nhi\n- Nước ối, nhau thai\n- Chiều dài cổ tử cung (nguy cơ sinh non)\n\n**Mốc 5: Tuần 32-34 — Đánh giá ngôi thai**\n- Vị trí thai nhi (ngôi đầu, ngôi ngược)\n- Cân nặng, lượng nước ối\n- Doppler động mạch rốn (nếu cần)\n\n**Mốc 6: Tuần 36-38 — Chuẩn bị sinh**\n- Đánh giá cân nặng cuối cùng\n- Xác nhận ngôi thai, nhau thai\n- Kế hoạch sinh (thường/mổ)`
            },
            {
                h: `Siêu âm tại ${B.name} — Chất lượng & Tiện lợi`,
                content: `### Trang thiết bị\n\n- Máy siêu âm 5D Samsung Medison — dòng cao cấp\n- Đầu dò volume (3D/4D/5D) cho hình ảnh sắc nét\n- Phần mềm SonoAVC, 5D CNS+ hỗ trợ chẩn đoán\n\n### Quy trình siêu âm\n\n1. **Đăng ký** — Đặt lịch online hoặc đến trực tiếp\n2. **Chuẩn bị** — Uống nước (siêu âm ổ bụng) hoặc không cần (đầu dò)\n3. **Thực hiện** — Bác sĩ siêu âm trực tiếp, giải thích chi tiết\n4. **Kết quả** — In ảnh + ghi USB (siêu âm 5D), kết quả online\n5. **Tư vấn** — Bác sĩ tư vấn kết quả ngay sau siêu âm\n\n### Ưu điểm tại ${B.name}\n\n- Bác sĩ chuyên khoa trực tiếp siêu âm (không phải kỹ thuật viên)\n- Giải thích chi tiết, dễ hiểu cho mẹ bầu\n- Kết quả tra cứu online mọi lúc mọi nơi\n- Khám buổi tối (17h-22h) và Chủ nhật\n- Chi phí công khai trên bảng giá`
            }
        ],
        doctorAdvice: `Siêu âm là phương pháp an toàn, không gây hại cho mẹ và thai nhi. Tuy nhiên, việc siêu âm cần được thực hiện đúng mốc, đúng chỉ định để có giá trị chẩn đoán cao nhất. Mẹ bầu nên tuân thủ lịch khám thai và siêu âm do bác sĩ hẹn, đặc biệt không bỏ lỡ 3 mốc quan trọng: tuần 12-13, tuần 20-22, và tuần 32.`,
        faqItems: `**Hỏi: Siêu âm nhiều có hại cho thai nhi không?**\n\nĐáp: Theo WHO và ACOG, siêu âm chẩn đoán với cường độ tiêu chuẩn hoàn toàn an toàn. Tuy nhiên, không khuyến cáo siêu âm không có chỉ định y khoa.\n\n**Hỏi: Siêu âm 5D giá bao nhiêu?**\n\nĐáp: Tại ${B.name}, chi phí siêu âm 5D rất hợp lý so với mặt bằng chung. Liên hệ ${B.phone} để biết chi tiết.\n\n**Hỏi: Siêu âm đầu dò có đau không?**\n\nĐáp: Siêu âm đầu dò âm đạo gây hơi khó chịu nhưng không đau. Được chỉ định khi thai nhỏ (< 12 tuần) hoặc khám phụ khoa chuyên sâu.\n\n**Hỏi: Khi nào nên siêu âm 5D để xem mặt baby?**\n\nĐáp: Tuần 24-30 là thời điểm vàng. Thai có đủ mỡ dưới da, nước ối đủ, cho hình ảnh mặt rõ nét nhất.`,
    };
}

export function enrichSieuAm(article) {
    const data = generic(article);
    const sectionsContent = data.sections.map(s => `## ${s.h}\n\n${s.content}`).join('\n\n');
    return {
        intro: data.intro,
        mainContent: sectionsContent,
        doctorAdvice: data.doctorAdvice,
        faqItems: data.faqItems,
        whenToSee: `- Mang thai và chưa siêu âm lần đầu\n- Đến mốc siêu âm quan trọng (12, 20, 32 tuần)\n- Ra máu, đau bụng khi mang thai\n- Muốn kiểm tra sức khỏe phụ khoa tổng quát\n- Theo dõi nang noãn trong điều trị hiếm muộn`,
    };
}
