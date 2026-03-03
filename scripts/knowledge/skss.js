// SKSS (Sức khỏe sinh sản) knowledge module
const B = { name: 'Phòng Khám An Sinh', addr: '416 Minh Khai, Đồng Nguyên, Từ Sơn, Bắc Ninh', phone: '0899 268 299', bookUrl: 'https://phusanansinh.com/dat-lich-hen-kham.html' };

function generic(a) {
    const kw = a.title.split(':')[0].trim();
    return {
        intro: `${kw} là chủ đề sức khỏe sinh sản quan trọng mà mọi người trong độ tuổi sinh sản cần hiểu rõ. Theo Tổ chức Y tế Thế giới (WHO), sức khỏe sinh sản không chỉ là không mắc bệnh mà còn là trạng thái hoàn toàn khỏe mạnh về thể chất, tinh thần và xã hội trong mọi vấn đề liên quan đến hệ sinh sản. Tại Việt Nam, nhận thức về sức khỏe sinh sản đã được cải thiện nhưng vẫn còn nhiều hiểu lầm phổ biến. Bài viết này cung cấp thông tin y khoa chính xác về ${kw.toLowerCase()}, được biên soạn bởi đội ngũ bác sĩ tại ${B.name}.`,
        sections: [
            {
                h: `Hiểu đúng về ${kw}`,
                content: `### Khái niệm y khoa\n\n${kw} là thuật ngữ y khoa liên quan đến chức năng và quá trình sinh sản. Hiểu đúng về ${kw.toLowerCase()} giúp bạn:\n\n- **Chủ động bảo vệ sức khỏe** — Phát hiện sớm và xử lý kịp thời các vấn đề\n- **Kế hoạch hóa gia đình** — Sinh con khi sẵn sàng, đúng thời điểm\n- **Phòng ngừa bệnh lây truyền** — Bảo vệ bản thân và đối tác\n- **Nâng cao chất lượng cuộc sống** — Tự tin, chủ động trong vấn đề sinh sản\n\n### Các hiểu lầm phổ biến\n\n| Hiểu lầm | Sự thật y khoa |\n|-----------|----------------|\n| ${kw} chỉ dành cho phụ nữ | Cả nam và nữ đều cần quan tâm |\n| Chỉ cần khám khi có triệu chứng | Nhiều bệnh không triệu chứng giai đoạn đầu |\n| Trẻ tuổi không cần lo | Vấn đề SKSS có thể xuất hiện ở mọi lứa tuổi |\n| Tìm hiểu trên mạng là đủ | Cần tư vấn bác sĩ để có thông tin chính xác |`
            },
            {
                h: `Thông tin chi tiết và hướng dẫn y khoa`,
                content: `### Những điều bạn cần biết\n\n**Về mặt sinh lý:**\n- Hệ sinh sản nữ bao gồm: tử cung, buồng trứng, vòi trứng, âm đạo, cổ tử cung\n- Hệ sinh sản nam bao gồm: tinh hoàn, mào tinh, ống dẫn tinh, tuyến tiền liệt\n- Chu kỳ kinh nguyệt bình thường: 21-35 ngày, trung bình 28 ngày\n- Giai đoạn phóng noãn: khoảng ngày 14 trong chu kỳ 28 ngày\n\n**Các xét nghiệm sàng lọc quan trọng:**\n\n| Xét nghiệm | Đối tượng | Tần suất |\n|-------------|-----------|----------|\n| Pap smear | Nữ từ 21 tuổi | Mỗi 1-3 năm |\n| HPV Test | Nữ từ 30 tuổi | Mỗi 5 năm (kết hợp Pap) |\n| Xét nghiệm STIs | Người hoạt động tình dục | Khi có nguy cơ |\n| Tinh dịch đồ | Nam > 30 tuổi mong con | Khi có nhu cầu |\n| Nội tiết sinh dục | Cả hai giới | Khi có rối loạn |\n\n**Vắc xin quan trọng:**\n- **HPV**: Ngừa ung thư cổ tử cung, tiêm từ 9-45 tuổi\n- **Rubella (MMR)**: Phòng rubella bẩm sinh, tiêm trước khi mang thai 3 tháng\n- **Viêm gan B**: Phòng lây truyền từ mẹ sang con\n- **Cúm**: Tiêm mỗi năm, đặc biệt khi mang thai`
            },
            {
                h: `Chăm sóc sức khỏe sinh sản theo từng giai đoạn`,
                content: `### Giai đoạn dậy thì (12-18 tuổi)\n- Giáo dục giới tính đúng đắn\n- Hiểu về kinh nguyệt, vệ sinh cá nhân\n- Tiêm vắc xin HPV (tốt nhất 11-12 tuổi)\n\n### Giai đoạn sinh sản (18-35 tuổi)\n- Khám phụ khoa định kỳ 6 tháng/lần\n- Sàng lọc Pap smear, HPV\n- Biện pháp tránh thai phù hợp\n- Khám tiền hôn nhân trước kết hôn\n- Chuẩn bị sức khỏe trước mang thai (acid folic, TORCH)\n\n### Giai đoạn mang thai\n- Khám thai đúng lịch\n- Bổ sung đầy đủ vi chất\n- Sàng lọc trước sinh (Double test, NIPT)\n- Chuẩn bị cho cuộc sinh\n\n### Giai đoạn sau sinh và mãn kinh\n- Theo dõi sức khỏe sau sinh\n- Biện pháp tránh thai sau sinh\n- Quản lý triệu chứng mãn kinh\n- Sàng lọc ung thư phụ khoa định kỳ`
            },
            {
                h: `Dịch vụ tại ${B.name}`,
                content: `### Gói khám sức khỏe sinh sản\n\n${B.name} cung cấp đầy đủ các dịch vụ:\n\n**Cho nữ:**\n- Khám phụ khoa tổng quát\n- Siêu âm phụ khoa (2D/5D)\n- Xét nghiệm Pap smear, HPV\n- Tư vấn biện pháp tránh thai\n- Khám tiền hôn nhân\n- Khám thai trọn gói\n- Tư vấn và điều trị hiếm muộn\n\n**Cho nam:**\n- Khám nam khoa\n- Xét nghiệm tinh dịch đồ\n- Tư vấn sức khỏe sinh sản nam\n\n### Tại sao chọn ${B.name}?\n\n- Bác sĩ chuyên khoa 20+ năm kinh nghiệm\n- Đánh giá 5.0⭐ Google Maps — uy tín hàng đầu khu vực\n- Trang thiết bị hiện đại: Siêu âm 5D, xét nghiệm nhanh\n- Khám buổi tối (17h-22h) và Chủ nhật\n- Bảng giá công khai, minh bạch\n- Kết quả online — tra cứu mọi lúc`
            }
        ],
        doctorAdvice: `Sức khỏe sinh sản là nền tảng của hạnh phúc gia đình. Đừng chờ đến khi có vấn đề mới đi khám. Hãy chủ động khám sức khỏe sinh sản định kỳ, tiêm vắc xin phòng ngừa, và tham vấn bác sĩ khi có bất kỳ thắc mắc nào. Sự chủ động hôm nay là sự an tâm cho ngày mai.`,
        faqItems: `**Hỏi: ${kw} ảnh hưởng đến ai?**\n\nĐáp: Cả nam và nữ trong mọi độ tuổi đều cần quan tâm đến sức khỏe sinh sản. Đặc biệt, phụ nữ 18-45 tuổi và nam giới mong có con cần khám định kỳ.\n\n**Hỏi: Khi nào nên bắt đầu khám sức khỏe sinh sản?**\n\nĐáp: Nên bắt đầu từ khi dậy thì hoặc khi bắt đầu hoạt động tình dục. Khám tiền hôn nhân trước khi kết hôn là rất quan trọng.\n\n**Hỏi: Khám sức khỏe sinh sản gồm những gì?**\n\nĐáp: Bao gồm: hỏi bệnh sử, khám lâm sàng, siêu âm, xét nghiệm máu (nội tiết, STIs, TORCH), và tư vấn chuyên sâu.\n\n**Hỏi: Chi phí khám bao nhiêu?**\n\nĐáp: Tại ${B.name}, chi phí khám hợp lý với bảng giá công khai. Liên hệ ${B.phone} để được tư vấn.`,
    };
}

export function enrichSKSS(article) {
    const data = generic(article);
    const sectionsContent = data.sections.map(s => `## ${s.h}\n\n${s.content}`).join('\n\n');
    return {
        intro: data.intro,
        mainContent: sectionsContent,
        doctorAdvice: data.doctorAdvice,
        faqItems: data.faqItems,
    };
}
