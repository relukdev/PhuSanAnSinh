// Hiếm muộn nam knowledge module
const B = { name: 'Phòng Khám An Sinh', addr: '416 Minh Khai, Đồng Nguyên, Từ Sơn, Bắc Ninh', phone: '0899 268 299', bookUrl: 'https://phusanansinh.com/dat-lich-hen-kham.html' };

function generic(a) {
    const kw = a.title.split(':')[0].trim();
    return {
        intro: `${kw} là chủ đề quan trọng nhưng còn ít được nam giới quan tâm đúng mức. Theo thống kê của WHO, yếu tố nam giới chiếm 40-50% nguyên nhân hiếm muộn ở các cặp vợ chồng. Tại Việt Nam, do tâm lý e ngại, nhiều nam giới trì hoãn việc thăm khám, dẫn đến bỏ lỡ thời gian vàng điều trị. Bài viết này cung cấp kiến thức y khoa chuyên sâu về ${kw.toLowerCase()}, giúp nam giới hiểu rõ vấn đề và chủ động bảo vệ sức khỏe sinh sản.`,
        sections: [
            {
                h: `${kw} — Kiến thức y khoa cơ bản`,
                content: `### Tổng quan\n\n${kw} là vấn đề y khoa liên quan đến khả năng sinh sản nam giới. Theo ASRM (American Society for Reproductive Medicine), vô sinh nam được đánh giá thông qua phân tích tinh dịch đồ (semen analysis) — xét nghiệm quan trọng nhất trong chẩn đoán.\n\n### Các chỉ số tinh dịch đồ bình thường (WHO 2021)\n\n| Chỉ số | Giá trị bình thường |\n|--------|---------------------|\n| Thể tích | ≥ 1.4 mL |\n| Mật độ | ≥ 16 triệu/mL |\n| Tổng số | ≥ 39 triệu/lần xuất |\n| Di động tiến tới (PR) | ≥ 30% |\n| Hình thái bình thường | ≥ 4% (Kruger strict) |\n| Tỷ lệ sống | ≥ 54% |\n| pH | 7.2-8.0 |\n\n### Tại sao nam giới cần khám sớm?\n\n- Xét nghiệm tinh dịch đồ đơn giản, không xâm lấn, chi phí thấp\n- Phát hiện sớm giúp điều trị hiệu quả hơn\n- Tránh để vợ phải trải qua các thủ thuật không cần thiết\n- Nhiều nguyên nhân vô sinh nam có thể điều trị thành công`
            },
            {
                h: `Nguyên nhân gây vô sinh nam`,
                content: `### Nguyên nhân trước tinh hoàn (Pre-testicular)\n\n- **Rối loạn nội tiết**: Thiếu hụt GnRH, FSH, LH\n- **Tăng prolactin máu**: U tuyến yên\n- **Suy tuyến yên**: Bẩm sinh hoặc mắc phải\n- **Béo phì**: Ảnh hưởng testosterone, tăng estrogen\n\n### Nguyên nhân tại tinh hoàn (Testicular)\n\n- **Giãn tĩnh mạch thừng tinh (Varicocele)** — chiếm 35-40% vô sinh nam\n- **Viêm tinh hoàn**: Do quai bị, vi khuẩn, virus\n- **Tinh hoàn ẩn (Cryptorchidism)**: Không xuống bìu khi sinh\n- **Hội chứng Klinefelter**: Bất thường nhiễm sắc thể 47,XXY\n- **Micro-deletion Y**: Mất đoạn nhỏ trên nhiễm sắc thể Y\n- **Tổn thương do hóa trị, xạ trị**: Ảnh hưởng sinh tinh\n\n### Nguyên nhân sau tinh hoàn (Post-testicular)\n\n- **Tắc ống dẫn tinh**: Bẩm sinh hoặc do nhiễm trùng\n- **Xuất tinh ngược dòng**: Tinh trùng đi vào bàng quang\n- **Rối loạn cương dương**: Không thể quan hệ bình thường\n- **Kháng thể kháng tinh trùng**: Hệ miễn dịch tấn công tinh trùng\n\n### Yếu tố lối sống\n\n- Hút thuốc lá (giảm 20-30% chất lượng tinh trùng)\n- Uống rượu bia nhiều\n- Tiếp xúc nhiệt độ cao (sauna, laptop trên đùi)\n- Stress kéo dài, thiếu ngủ\n- Thuốc đồng hóa (anabolic steroids)`
            },
            {
                h: `Phương pháp chẩn đoán và điều trị`,
                content: `### Quy trình khám nam khoa hiếm muộn\n\n**1. Hỏi bệnh sử chi tiết**\n- Tiền sử phẫu thuật, bệnh lý sinh dục\n- Thói quen sinh hoạt, nghề nghiệp\n- Thuốc đang sử dụng\n\n**2. Khám lâm sàng**\n- Đánh giá phát triển giới tính thứ phát\n- Khám tinh hoàn (kích thước, mật độ)\n- Phát hiện giãn tĩnh mạch thừng tinh\n\n**3. Xét nghiệm**\n- Tinh dịch đồ (nhịn xuất tinh 2-7 ngày trước xét nghiệm)\n- Nội tiết: Testosterone, FSH, LH, Prolactin\n- Siêu âm bìu Doppler (nếu nghi giãn tĩnh mạch)\n- Xét nghiệm di truyền (nếu tinh trùng < 5 triệu/mL)\n\n### Phương pháp điều trị\n\n**Điều trị nội khoa:**\n- Kháng sinh (nếu nhiễm trùng)\n- Hormone (FSH, hCG) — kích thích sinh tinh\n- Thuốc bổ tinh trùng: Coenzyme Q10, L-Carnitine, kẽm, selenium\n- Clomiphene citrate (tăng testosterone nội sinh)\n\n**Điều trị ngoại khoa:**\n- Phẫu thuật giãn tĩnh mạch thừng tinh\n- Nối ống dẫn tinh (vasectomy reversal)\n- Micro-TESE (phẫu thuật lấy tinh trùng từ tinh hoàn)\n\n**Hỗ trợ sinh sản:**\n- IUI (bơm tinh trùng đã lọc rửa)\n- IVF/ICSI (thụ tinh trong ống nghiệm)`
            },
            {
                h: `Thay đổi lối sống cải thiện tinh trùng`,
                content: `Nghiên cứu cho thấy thay đổi lối sống có thể cải thiện chất lượng tinh trùng sau 2-3 tháng (74 ngày — chu kỳ sinh tinh):\n\n**Dinh dưỡng:**\n- Bổ sung kẽm (11mg/ngày): Hàu, thịt bò, hạt bí\n- Omega-3: Cá hồi, cá thu, quả óc chó\n- Vitamin C & E: Cam, kiwi, hạnh nhân\n- Lycopene: Cà chua nấu chín\n- Acid folic (400mcg/ngày): Rau xanh đậm\n\n**Vận động:**\n- Tập thể dục 150 phút/tuần (cường độ vừa)\n- Tránh đạp xe quá nhiều (áp lực vùng đáy chậu)\n- Yoga, bơi lội — giảm stress hiệu quả\n\n**Thói quen cần tránh:**\n- Bỏ thuốc lá hoàn toàn\n- Giảm rượu bia (< 14 đơn vị/tuần)\n- Không đặt laptop trên đùi\n- Tránh mặc quần bó sát\n- Hạn chế xông hơi, tắm nước nóng\n- Ngủ đủ 7-8 tiếng/đêm`
            }
        ],
        doctorAdvice: `Nam giới thường e ngại khi đề cập đến vấn đề sinh sản. Tuy nhiên, xét nghiệm tinh dịch đồ là xét nghiệm đơn giản nhất, ít tốn kém nhất và nên được thực hiện đầu tiên trong đánh giá hiếm muộn vợ chồng. Đừng để sĩ diện ảnh hưởng đến hạnh phúc gia đình. Hãy chủ động đi khám.`,
        faqItems: `**Hỏi: Xét nghiệm tinh dịch đồ có đau không?**\n\nĐáp: Không đau. Bạn chỉ cần lấy mẫu tinh dịch bằng cách thủ dâm vào cốc vô trùng. Phòng khám có phòng riêng đảm bảo sự riêng tư.\n\n**Hỏi: Tinh trùng yếu có chữa được không?**\n\nĐáp: Phần lớn trường hợp có thể cải thiện. Tùy nguyên nhân, bác sĩ sẽ chỉ định điều trị nội khoa, phẫu thuật hoặc hỗ trợ sinh sản. Nhiều cặp vợ chồng đã thành công sau điều trị.\n\n**Hỏi: Bao lâu nên xét nghiệm lại tinh dịch đồ?**\n\nĐáp: Sau 2-3 tháng điều trị hoặc thay đổi lối sống. Chu kỳ sinh tinh là 74 ngày, nên cần ít nhất thời gian này để thấy sự thay đổi.\n\n**Hỏi: Chi phí khám nam khoa hiếm muộn bao nhiêu?**\n\nĐáp: Tại ${B.name}, chi phí khám và xét nghiệm tinh dịch đồ rất hợp lý. Liên hệ hotline ${B.phone} để được tư vấn chi tiết và đặt lịch khám.`,
    };
}

export function enrichHiemMuonNam(article) {
    const data = generic(article);
    const sectionsContent = data.sections.map(s => `## ${s.h}\n\n${s.content}`).join('\n\n');
    return {
        intro: data.intro,
        mainContent: sectionsContent,
        doctorAdvice: data.doctorAdvice,
        faqItems: data.faqItems,
        whenToSee: `- Quan hệ > 12 tháng không tránh thai mà vợ chưa thụ thai\n- Tiền sử quai bị biến chứng tinh hoàn\n- Giãn tĩnh mạch thừng tinh (đau, nặng bìu)\n- Rối loạn cương dương hoặc xuất tinh\n- Từng phẫu thuật vùng sinh dục\n- Tiếp xúc hóa chất, phóng xạ kéo dài`,
    };
}
