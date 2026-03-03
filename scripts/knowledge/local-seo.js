// Local SEO knowledge module
const B = { name: 'Phòng Khám An Sinh', addr: '416 Minh Khai, Đồng Nguyên, Từ Sơn, Bắc Ninh', phone: '0899 268 299', drPhone: '0869 935 808', hours: 'T2-T7: 17h-22h | CN: 8h-22h', bookUrl: 'https://phusanansinh.com/dat-lich-hen-kham.html' };

const areas = {
    'Từ Sơn': { desc: 'thành phố công nghiệp phát triển nhanh nhất Bắc Ninh', pop: '200,000+', dist: '0 km (trung tâm)', landmarks: ['KCN VSIP', 'KCN Tiên Sơn', 'Chợ Từ Sơn', 'Bệnh viện Từ Sơn'] },
    'Bắc Ninh': { desc: 'tỉnh lỵ và trung tâm hành chính của tỉnh', pop: '500,000+', dist: '15 km', landmarks: ['Bệnh viện Đa khoa tỉnh', 'Chùa Dâu', 'KCN Quế Võ'] },
    'Yên Phong': { desc: 'huyện phía Nam Bắc Ninh, gần Samsung', pop: '150,000+', dist: '10 km', landmarks: ['KCN Yên Phong', 'Samsung Display', 'Samsung Electronics'] },
    'Tiên Du': { desc: 'huyện phía Đông Từ Sơn', pop: '130,000+', dist: '8 km', landmarks: ['Chùa Phật Tích', 'KCN Tiên Du'] },
    'Thuận Thành': { desc: 'huyện phía Đông Nam Bắc Ninh', pop: '160,000+', dist: '20 km', landmarks: ['Chùa Dâu', 'Chùa Bút Tháp'] },
    'Quế Võ': { desc: 'huyện phía Đông Bắc Ninh', pop: '140,000+', dist: '25 km', landmarks: ['KCN Quế Võ I, II, III'] },
    'Đông Anh': { desc: 'huyện ngoại thành Hà Nội, giáp Bắc Ninh', pop: '400,000+', dist: '15 km', landmarks: ['KCN Đông Anh', 'Cổ Loa'] },
    'Đồng Nguyên': { desc: 'phường trung tâm của Từ Sơn', pop: '20,000+', dist: '0 km (ngay tại)', landmarks: ['Chợ Đồng Nguyên', 'Trường THPT Từ Sơn'] },
    'Minh Khai': { desc: 'đường chính tại Đồng Nguyên, Từ Sơn', pop: '', dist: '0 km', landmarks: [] },
};

function detectArea(a) {
    for (const [area, info] of Object.entries(areas)) {
        if (a.title.includes(area) || (a.localArea && a.localArea.includes(area))) return { area, ...info };
    }
    return { area: 'Từ Sơn Bắc Ninh', desc: 'khu vực phía Bắc Hà Nội, trung tâm công nghiệp', pop: '1,200,000+', dist: '0-25 km', landmarks: ['KCN VSIP', 'Samsung', 'Canon'] };
}

function generic(a) {
    const kw = a.title.replace(' tốt nhất hiện nay', '').trim();
    const loc = detectArea(a);
    return {
        intro: `Bạn đang tìm ${kw.toLowerCase()} uy tín, chất lượng? Với nhu cầu chăm sóc sức khỏe sản phụ khoa ngày càng tăng tại ${loc.area} — ${loc.desc} với dân số ${loc.pop} cư dân, việc lựa chọn một cơ sở y tế đáng tin cậy là vô cùng quan trọng. ${B.name} tại ${B.addr} tự hào là địa chỉ được hàng nghìn bệnh nhân tin tưởng với đánh giá 5.0⭐ trên Google Maps — cao nhất khu vực.`,
        sections: [
            {
                h: `Tiêu chí chọn ${kw}`,
                content: `### 8 tiêu chí đánh giá phòng khám uy tín\n\nKhi lựa chọn cơ sở y tế cho nhu cầu sản phụ khoa, bạn nên xem xét:\n\n**1. Bác sĩ chuyên khoa** — Có chứng chỉ hành nghề, kinh nghiệm thực tế. Bác sĩ chuyên khoa I, II hoặc tiến sĩ y khoa là tiêu chuẩn tốt.\n\n**2. Đánh giá từ người dùng** — Kiểm tra Google Reviews, Facebook reviews. Chú ý đánh giá có hình ảnh và mô tả chi tiết (không phải review ảo).\n\n**3. Trang thiết bị** — Máy siêu âm 4D/5D, phòng xét nghiệm, thiết bị tiệt trùng đạt chuẩn. Công nghệ hiện đại = chẩn đoán chính xác hơn.\n\n**4. Giá cả minh bạch** — Có bảng giá công khai, báo trước chi phí. TRÁNH nơi không nói rõ giá hoặc phát sinh phí không báo trước.\n\n**5. Vệ sinh an toàn** — Phòng khám sạch sẽ, tiệt trùng dụng cụ, quy trình chống nhiễm khuẩn nghiêm ngặt.\n\n**6. Thời gian khám linh hoạt** — Có khám buổi tối, ngày nghỉ để phù hợp lịch trình.\n\n**7. Quyền riêng tư** — Phòng khám riêng, bảo mật thông tin bệnh nhân.\n\n**8. Dễ tiếp cận** — Giao thông thuận lợi, có chỗ đỗ xe.`
            },
            {
                h: `So sánh ${B.name} với các cơ sở khác`,
                content: `| Tiêu chí | ${B.name} | Bệnh viện tuyến tỉnh | PK tư nhân khác |\n|----------|------|----------|--------|\n| Chờ đợi | 15-30 phút | 2-4 giờ | 30-60 phút |\n| Bác sĩ trực tiếp siêu âm | ✅ Có | ❌ KTV siêu âm | Tùy nơi |\n| Siêu âm 5D | ✅ Có | ❌ 2D/3D | Tùy nơi |\n| Khám buổi tối | ✅ 17h-22h | ❌ Chỉ giờ hành chính | Tùy nơi |\n| Khám Chủ nhật | ✅ 8h-22h | ❌ Không | Tùy nơi |\n| Google Rating | ⭐ 5.0 | ⭐ 3.5-4.0 | ⭐ 3.0-4.5 |\n| Bảng giá công khai | ✅ Có | ❌ Khó tra cứu | Tùy nơi |\n| Kết quả online | ✅ Tra cứu 24/7 | ❌ Lấy tại viện | Tùy nơi |\n| Riêng tư | ✅ Phòng riêng | ❌ Đông đúc | Tùy nơi |`
            },
            {
                h: `Dịch vụ tại ${B.name}`,
                content: `### Dịch vụ sản khoa\n\n- Khám thai định kỳ trọn gói\n- Siêu âm 2D/5D hiện đại\n- Sàng lọc trước sinh (Double test, Triple test, NIPT)\n- Theo dõi thai kỳ nguy cơ cao\n- Tư vấn dinh dưỡng, chuẩn bị sinh\n\n### Dịch vụ phụ khoa\n\n- Khám phụ khoa tổng quát\n- Xét nghiệm Pap smear, HPV\n- Điều trị viêm nhiễm phụ khoa\n- Đốt viêm lộ tuyến cổ tử cung\n- Tư vấn biện pháp tránh thai\n\n### Dịch vụ hiếm muộn\n\n- Khám và đánh giá hiếm muộn vợ chồng\n- Xét nghiệm nội tiết, tinh dịch đồ\n- Kích thích phóng noãn + IUI\n- Tư vấn chuyển IVF khi cần\n\n### Dịch vụ nam khoa\n\n- Khám nam khoa tổng quát\n- Xét nghiệm tinh dịch đồ\n- Tư vấn sức khỏe sinh sản nam`
            },
            {
                h: `Hướng dẫn đến ${B.name}`,
                content: `### Thông tin liên hệ\n\n- **Địa chỉ**: ${B.addr}\n- **Hotline đặt lịch**: ${B.phone}\n- **BS tư vấn trực tiếp**: ${B.drPhone}\n- **Giờ khám**: ${B.hours}\n- **Google Maps**: Tìm "${B.name}" — Đánh giá 5.0⭐\n\n### Đường đi từ các khu vực\n\n**Từ TP Bắc Ninh** (15 km, ~25 phút):\n→ Đi QL1A hướng Hà Nội → Đến Từ Sơn → Rẽ vào đường Minh Khai → Số 416\n\n**Từ Yên Phong** (10 km, ~20 phút):\n→ Đi đường tỉnh lộ 286 → Về Từ Sơn → Đường Minh Khai → Số 416\n\n**Từ Tiên Du / Thuận Thành** (8-20 km, ~15-35 phút):\n→ Đi QL38 hoặc tỉnh lộ → Về Từ Sơn → Đường Minh Khai → Số 416\n\n**Từ Hà Nội (Đông Anh, Long Biên)** (15-20 km, ~30-40 phút):\n→ Đi QL1A hoặc cao tốc Hà Nội-Bắc Ninh → Đến Từ Sơn → Đường Minh Khai → Số 416\n\n### Lưu ý khi đến khám\n\n- Đặt lịch trước qua hotline hoặc website để giảm thời gian chờ\n- Mang theo CMND/CCCD và sổ khám bệnh (nếu có)\n- Đến trước giờ hẹn 10-15 phút để làm thủ tục\n- Có chỗ đỗ xe miễn phí tại phòng khám`
            }
        ],
        doctorAdvice: `Việc lựa chọn cơ sở y tế uy tín là bước đầu tiên để bảo vệ sức khỏe. Đừng ngại ngần đặt câu hỏi, yêu cầu xem bảng giá, và kiểm tra đánh giá trước khi quyết định. Tại ${B.name}, chúng tôi luôn chào đón bạn trong một môi trường chuyên nghiệp, thân thiện và minh bạch.`,
        faqItems: `**Hỏi: ${B.name} khám những chuyên khoa nào?**\n\nĐáp: Chuyên Sản - Phụ khoa - Hiếm muộn - Nam khoa. Bao gồm: khám thai, siêu âm 5D, khám phụ khoa, điều trị hiếm muộn, xét nghiệm tinh dịch đồ.\n\n**Hỏi: Phòng khám có mở buổi tối không?**\n\nĐáp: Có! Giờ khám: T2-T7 từ 17h-22h và Chủ nhật từ 8h-22h. Rất thuận tiện cho người đi làm tại các KCN.\n\n**Hỏi: Có cần đặt lịch trước không?**\n\nĐáp: Khuyến khích đặt lịch qua hotline ${B.phone} hoặc website để giảm thời gian chờ. Tuy nhiên, phòng khám cũng nhận bệnh nhân đến trực tiếp.\n\n**Hỏi: Chi phí khám có đắt không?**\n\nĐáp: Bảng giá công khai, minh bạch. Chi phí hợp lý so với chất lượng dịch vụ. Liên hệ ${B.phone} để được tư vấn chi phí cụ thể cho dịch vụ bạn cần.`,
    };
}

export function enrichLocalSEO(article) {
    const data = generic(article);
    const kw = article.title.replace(' tốt nhất hiện nay', '').trim();
    const sectionsContent = data.sections.map(s => `## ${s.h}\n\n${s.content}`).join('\n\n');
    return {
        intro: data.intro,
        mainContent: sectionsContent,
        doctorAdvice: data.doctorAdvice,
        faqItems: data.faqItems,
        localAction: article.localAction || 'khám',
        localArea: article.localArea || 'Từ Sơn Bắc Ninh',
        localReasons: `- Đội ngũ bác sĩ chuyên khoa 20+ năm kinh nghiệm\n- Trang thiết bị hiện đại: Siêu âm 5D, xét nghiệm nhanh\n- Đánh giá 5.0⭐ Google Maps — uy tín hàng đầu khu vực\n- Khám buổi tối và Chủ nhật — tiện lợi cho người đi làm\n- Chi phí minh bạch, không phát sinh\n- Kết quả online — tra cứu mọi lúc mọi nơi`,
        services: `- Khám thai định kỳ, siêu âm 5D\n- Khám phụ khoa tổng quát\n- Xét nghiệm Pap smear, HPV\n- Điều trị viêm nhiễm phụ khoa\n- Tư vấn và điều trị hiếm muộn\n- Khám nam khoa, tinh dịch đồ\n- Khám tiền hôn nhân\n- Kế hoạch hóa gia đình`,
        tableSection: `| Tiêu chí | ${B.name} | Bệnh viện tuyến tỉnh |\n|----------|------|----------|\n| Thời gian chờ | 15-30 phút | 2-4 giờ |\n| BS trực tiếp siêu âm | ✅ | ❌ |\n| Siêu âm 5D | ✅ | ❌ |\n| Khám buổi tối | ✅ 17h-22h | ❌ |\n| Google Rating | ⭐ 5.0 | ⭐ 3.5-4.0 |\n| Kết quả online | ✅ | ❌ |`,
    };
}
