// Phụ khoa knowledge module
const B = { name: 'Phòng Khám An Sinh', addr: '416 Minh Khai, Đồng Nguyên, Từ Sơn, Bắc Ninh', phone: '0899 268 299', bookUrl: 'https://phusanansinh.com/dat-lich-hen-kham.html' };

function generic(a) {
    const kw = a.title.split(' và ')[0].replace(' triệu chứng', '').replace(' các dấu hiệu cảnh báo', '').trim();
    return {
        intro: `${kw} là một trong những vấn đề phụ khoa phổ biến nhất ở phụ nữ Việt Nam. Theo thống kê của Bộ Y tế, khoảng 90% phụ nữ mắc ít nhất một bệnh phụ khoa trong đời, nhưng chỉ 30% chủ động đi khám. Sự e ngại, thiếu kiến thức hoặc chủ quan khiến nhiều chị em bỏ qua các dấu hiệu cảnh báo, dẫn đến bệnh tiến triển nặng hơn. Bài viết này cung cấp thông tin y khoa chính xác về ${kw.toLowerCase()}, giúp bạn nhận biết sớm và có hướng xử lý đúng đắn.`,
        sections: [
            {
                h: `${kw} — Tổng quan y khoa`,
                content: `### Định nghĩa\n\n${kw} là tình trạng bệnh lý liên quan đến hệ sinh dục nữ. Bệnh có thể ảnh hưởng đến chất lượng cuộc sống, khả năng sinh sản và sức khỏe tổng thể nếu không được phát hiện và điều trị kịp thời.\n\n### Phân loại\n\n| Mức độ | Đặc điểm | Tiên lượng |\n|--------|----------|------------|\n| Nhẹ | Triệu chứng ít, không ảnh hưởng sinh hoạt | Điều trị nội khoa |\n| Trung bình | Triệu chứng rõ, ảnh hưởng một phần | Điều trị tích cực |\n| Nặng | Biến chứng, ảnh hưởng sinh sản | Có thể cần phẫu thuật |\n\n### Đối tượng nguy cơ cao\n\n- Phụ nữ trong độ tuổi sinh sản (15-49 tuổi)\n- Người có nhiều bạn tình hoặc quan hệ không an toàn\n- Phụ nữ sử dụng dụng cụ tử cung (vòng tránh thai)\n- Người có tiền sử viêm nhiễm phụ khoa tái phát\n- Phụ nữ mang thai hoặc sau sinh\n- Người có hệ miễn dịch suy giảm`
            },
            {
                h: `Dấu hiệu nhận biết sớm`,
                content: `### Triệu chứng điển hình\n\nPhụ nữ cần chú ý các dấu hiệu sau:\n\n**Thay đổi khí hư (dịch âm đạo):**\n- Màu sắc bất thường: vàng, xanh, xám, nâu\n- Mùi hôi, tanh hoặc mùi cá\n- Lượng nhiều hơn bình thường\n- Có lẫn máu ngoài kỳ kinh\n\n**Triệu chứng vùng sinh dục:**\n- Ngứa, rát, nóng vùng kín\n- Đau khi quan hệ tình dục (dyspareunia)\n- Đau khi đi tiểu (dysuria)\n- Tiểu buốt, tiểu rắt\n- Sưng, đỏ vùng âm hộ\n\n**Triệu chứng toàn thân:**\n- Đau bụng dưới âm ỉ hoặc dữ dội\n- Sốt nhẹ (viêm nhiễm nặng)\n- Mệt mỏi, suy nhược\n- Rối loạn kinh nguyệt\n\n### Khi nào PHẢI đi khám ngay?\n\n🔴 **Cấp cứu**: Đau bụng dữ dội + sốt cao + khí hư mủ → Nghi viêm vùng chậu cấp\n🟡 **Khẩn**: Khí hư bất thường > 7 ngày + ngứa rát → Cần điều trị sớm\n🟢 **Theo dõi**: Khí hư hơi thay đổi, không đau → Khám trong 1-2 tuần`
            },
            {
                h: `Nguyên nhân và cơ chế bệnh`,
                content: `### Nguyên nhân nhiễm trùng\n\n**Vi khuẩn (Bacterial Vaginosis):**\n- Mất cân bằng vi khuẩn âm đạo (Lactobacillus giảm)\n- Gardnerella vaginalis phát triển quá mức\n- Khí hư xám, mùi cá, pH > 4.5\n\n**Nấm (Candida):**\n- Candida albicans — chiếm 85-90% trường hợp nấm\n- Khí hư trắng, vón cục (như phô mai), ngứa dữ dội\n- Yếu tố thuận lợi: kháng sinh, tiểu đường, thai kỳ, mặc quần ẩm\n\n**Trichomonas:**\n- Ký sinh trùng lây qua đường tình dục\n- Khí hư vàng-xanh, bọt, mùi hôi\n- Cần điều trị cả hai vợ chồng\n\n**Chlamydia & Lậu:**\n- Nhiễm trùng lây truyền qua đường tình dục (STI)\n- Có thể không triệu chứng nhưng gây biến chứng tắc vòi trứng\n- Cần sàng lọc định kỳ ở phụ nữ trẻ hoạt động tình dục\n\n### Nguyên nhân không nhiễm trùng\n\n- Viêm lộ tuyến cổ tử cung (ectropion)\n- U xơ tử cung, polyp\n- Thay đổi hormone (mãn kinh, thuốc tránh thai)\n- Dị ứng (sản phẩm vệ sinh, chất tẩy rửa)\n- Vật lạ âm đạo (tampon quên tháo)`
            },
            {
                h: `Phương pháp chẩn đoán và điều trị tại ${B.name}`,
                content: `### Quy trình khám phụ khoa chuyên sâu\n\n**1. Hỏi bệnh sử** — Triệu chứng, thời gian, tiền sử điều trị\n**2. Khám ngoài** — Đánh giá âm hộ, tầng sinh môn\n**3. Khám bằng mỏ vịt** — Quan sát âm đạo, cổ tử cung\n**4. Lấy mẫu xét nghiệm** — Soi tươi dịch âm đạo, Pap smear, HPV\n**5. Siêu âm** — Đánh giá tử cung, buồng trứng, vùng phụ cận\n\n### Phương pháp điều trị\n\n**Điều trị nội khoa:**\n- Kháng sinh (Metronidazole, Clindamycin) — vi khuẩn\n- Kháng nấm (Fluconazole, Clotrimazole) — nấm Candida\n- Kháng ký sinh trùng (Metronidazole) — Trichomonas\n\n**Thủ thuật:**\n- Đốt viêm lộ tuyến bằng laser CO2 hoặc điện cao tần\n- Cắt polyp cổ tử cung\n- Soi cổ tử cung + sinh thiết (nếu nghi bất thường)\n\n### Tại sao chọn ${B.name}?\n\n- Bác sĩ nữ khám phụ khoa (đảm bảo sự thoải mái)\n- Phòng khám riêng tư, kín đáo\n- Kết quả xét nghiệm nhanh trong ngày\n- Khám buổi tối (17h-22h) và Chủ nhật — tiện cho chị em đi làm\n- Trang thiết bị hiện đại, vô trùng tuyệt đối`
            },
            {
                h: `Phòng ngừa bệnh phụ khoa hiệu quả`,
                content: `### 10 nguyên tắc vệ sinh phụ khoa đúng cách\n\n1. **Rửa ngoài, không thụt rửa bên trong** — Âm đạo có khả năng tự làm sạch nhờ vi khuẩn Lactobacillus\n2. **Dùng nước sạch hoặc dung dịch pH 3.8-4.5** — Tránh xà phòng có kiềm mạnh\n3. **Rửa từ trước ra sau** — Ngăn vi khuẩn từ hậu môn xâm nhập\n4. **Thay quần lót hàng ngày** — Chọn cotton, thoáng khí\n5. **Thay băng vệ sinh mỗi 3-4 giờ** — Tránh ẩm ướt kéo dài\n6. **Quan hệ an toàn** — Sử dụng bao cao su đúng cách\n7. **Khám phụ khoa định kỳ 6 tháng/lần** — Phát hiện sớm bất thường\n8. **Tiêm vắc xin HPV** — Phòng ung thư cổ tử cung\n9. **Tăng cường miễn dịch** — Ăn uống đủ chất, ngủ đủ giấc, tập thể dục\n10. **Không tự ý dùng kháng sinh** — Gây kháng thuốc và mất cân bằng vi khuẩn`
            }
        ],
        doctorAdvice: `Nhiều phụ nữ e ngại khi đi khám phụ khoa, nhưng việc khám định kỳ là cách tốt nhất để phòng ngừa và phát hiện sớm bệnh. Tại ${B.name}, chúng tôi luôn đảm bảo sự riêng tư và thoải mái cho bệnh nhân. Đừng để sự ngại ngùng ảnh hưởng đến sức khỏe của bạn.`,
        faqItems: `**Hỏi: Khám phụ khoa có đau không?**\n\nĐáp: Khám phụ khoa gây ra cảm giác hơi khó chịu nhưng không đau. Bác sĩ sẽ thao tác nhẹ nhàng và giải thích từng bước. Bạn có thể yêu cầu dừng bất cứ lúc nào.\n\n**Hỏi: Bao lâu nên khám phụ khoa một lần?**\n\nĐáp: Khuyến cáo: 6 tháng/lần cho phụ nữ có quan hệ tình dục. Đặc biệt nên Pap smear mỗi 1-3 năm từ 21 tuổi trở lên.\n\n**Hỏi: Viêm phụ khoa có tự khỏi không?**\n\nĐáp: Một số trường hợp nhẹ có thể tự khỏi nếu cơ thể khỏe mạnh. Tuy nhiên, hầu hết cần điều trị đúng thuốc để tránh tái phát và biến chứng.\n\n**Hỏi: Chi phí khám phụ khoa bao nhiêu?**\n\nĐáp: Tại ${B.name}, chi phí khám phụ khoa cơ bản rất hợp lý. Liên hệ ${B.phone} để biết chi tiết.`,
    };
}

export function enrichPhuKhoa(article) {
    const data = generic(article);
    const sectionsContent = data.sections.map(s => `## ${s.h}\n\n${s.content}`).join('\n\n');
    return {
        intro: data.intro,
        mainContent: sectionsContent,
        doctorAdvice: data.doctorAdvice,
        faqItems: data.faqItems,
        symptoms: `- Khí hư bất thường (thay đổi màu, mùi, lượng)\n- Ngứa rát, nóng vùng sinh dục\n- Đau bụng dưới âm ỉ hoặc dữ dội\n- Đau khi quan hệ tình dục\n- Tiểu buốt, tiểu rắt\n- Ra máu bất thường ngoài kỳ kinh\n- Rối loạn kinh nguyệt (sớm, muộn, kéo dài)`,
        causes: `Do nhiều yếu tố phối hợp: nhiễm trùng (vi khuẩn, nấm, ký sinh trùng, virus), mất cân bằng pH âm đạo, thay đổi hormone, suy giảm miễn dịch, vệ sinh không đúng cách, quan hệ không an toàn, và yếu tố cơ địa.`,
        treatment: `Tại ${B.name}, bác sĩ chuyên khoa sẽ chẩn đoán chính xác nguyên nhân qua thăm khám và xét nghiệm, từ đó đưa ra phác đồ điều trị phù hợp — bao gồm điều trị nội khoa (thuốc uống, thuốc đặt) hoặc thủ thuật (đốt viêm lộ tuyến, cắt polyp) tùy tình trạng.`,
        prevention: `Vệ sinh đúng cách (rửa ngoài, không thụt rửa), mặc đồ lót cotton thoáng khí, quan hệ an toàn, khám định kỳ 6 tháng/lần, tiêm vắc xin HPV, và không tự ý dùng kháng sinh.`,
        whenToSee: `- Khí hư thay đổi màu, mùi kéo dài > 7 ngày\n- Ngứa rát vùng kín không đỡ\n- Đau bụng dưới kèm sốt\n- Ra máu bất thường giữa chu kỳ\n- Đau khi quan hệ tình dục\n- Chưa từng khám phụ khoa (trên 21 tuổi hoặc đã quan hệ)`,
    };
}
