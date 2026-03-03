// Hiếm muộn nữ knowledge module
const B = { name: 'Phòng Khám An Sinh', addr: '416 Minh Khai, Đồng Nguyên, Từ Sơn, Bắc Ninh', phone: '0899 268 299', bookUrl: 'https://phusanansinh.com/dat-lich-hen-kham.html' };

function generic(a) {
    const kw = a.title.split(':')[0].trim();
    return {
        intro: `${kw} là vấn đề sức khỏe sinh sản ảnh hưởng đến hàng triệu phụ nữ Việt Nam. Theo thống kê của Tổ chức Y tế Thế giới (WHO), khoảng 15% các cặp vợ chồng trong độ tuổi sinh sản gặp khó khăn trong việc thụ thai, trong đó yếu tố nữ chiếm khoảng 40-50% nguyên nhân. Tại ${B.name}, chúng tôi đã hỗ trợ hàng nghìn phụ nữ tìm được phương pháp điều trị phù hợp. Bài viết này cung cấp thông tin y khoa chi tiết, đáng tin cậy về ${kw.toLowerCase()}, giúp bạn hiểu rõ vấn đề và có hướng xử lý đúng đắn.`,
        sections: [
            {
                h: `Hiểu đúng về ${kw}`,
                content: `### Khái niệm y khoa\n\n${kw} là thuật ngữ y khoa chỉ tình trạng liên quan đến khả năng sinh sản ở phụ nữ. Theo định nghĩa của ASRM (American Society for Reproductive Medicine), vô sinh nữ được chẩn đoán khi một cặp vợ chồng quan hệ tình dục đều đặn không dùng biện pháp tránh thai trong 12 tháng (hoặc 6 tháng nếu nữ trên 35 tuổi) mà không thụ thai.\n\n### Phân loại\n\n| Loại | Đặc điểm | Tỷ lệ |\n|------|----------|--------|\n| Vô sinh nguyên phát | Chưa từng mang thai | 40% |\n| Vô sinh thứ phát | Đã từng mang thai nhưng không thể thụ thai lại | 60% |\n\n### Tại sao cần khám sớm?\n\n- Tuổi là yếu tố quan trọng nhất ảnh hưởng đến khả năng sinh sản nữ\n- Sau 35 tuổi, chất lượng và số lượng trứng giảm đáng kể\n- Phát hiện sớm giúp có nhiều lựa chọn điều trị hơn\n- Nhiều nguyên nhân vô sinh nữ có thể điều trị hiệu quả nếu can thiệp kịp thời`
            },
            {
                h: `Nguyên nhân phổ biến và yếu tố nguy cơ`,
                content: `### Nguyên nhân y khoa\n\n**1. Rối loạn phóng noãn (30-40% trường hợp)**\n- Hội chứng buồng trứng đa nang (PCOS) — nguyên nhân phổ biến nhất\n- Suy buồng trứng sớm (POI)\n- Rối loạn tuyến yên, tuyến giáp\n- Tăng prolactin máu\n\n**2. Yếu tố vòi trứng và phúc mạc (25-35%)**\n- Tắc vòi trứng do viêm nhiễm (Chlamydia, lậu)\n- Lạc nội mạc tử cung (endometriosis)\n- Tiền sử phẫu thuật vùng chậu\n- Dính vòi trứng sau viêm\n\n**3. Yếu tố tử cung (10-15%)**\n- U xơ tử cung (leiomyoma)\n- Polyp buồng tử cung\n- Dị dạng tử cung bẩm sinh\n- Dính buồng tử cung (hội chứng Asherman)\n\n**4. Yếu tố cổ tử cung (5%)**\n- Chất nhầy cổ tử cung bất thường\n- Hẹp cổ tử cung sau phẫu thuật\n\n**5. Không rõ nguyên nhân (10-15%)**\n- Tất cả xét nghiệm bình thường nhưng vẫn không thụ thai`
            },
            {
                h: `Phương pháp chẩn đoán hiện đại`,
                content: `### Quy trình khám hiếm muộn nữ\n\n**Bước 1: Khám lâm sàng và hỏi bệnh sử**\n- Tiền sử kinh nguyệt, thai sản\n- Thời gian mong con, tần suất quan hệ\n- Bệnh lý nền, thuốc đang dùng\n\n**Bước 2: Xét nghiệm nội tiết (ngày 2-3 chu kỳ)**\n\n| Xét nghiệm | Ý nghĩa | Giá trị bình thường |\n|-------------|---------|---------------------|\n| FSH | Dự trữ buồng trứng | < 10 mIU/mL |\n| LH | Rối loạn phóng noãn | 2-15 mIU/mL |\n| AMH | Dự trữ buồng trứng tổng thể | 1.0-3.5 ng/mL |\n| Estradiol (E2) | Chức năng buồng trứng | 25-75 pg/mL |\n| Prolactin | Tăng prolactin | < 25 ng/mL |\n| TSH | Chức năng tuyến giáp | 0.5-4.5 mIU/L |\n\n**Bước 3: Siêu âm phụ khoa**\n- Đếm nang thứ (AFC) — đánh giá dự trữ buồng trứng\n- Kiểm tra cấu trúc tử cung, buồng trứng\n- Theo dõi nang noãn qua các ngày\n\n**Bước 4: Chụp tử cung-vòi trứng (HSG)**\n- Đánh giá thông thoáng vòi trứng\n- Hình dạng buồng tử cung\n\n**Bước 5: Xét nghiệm bổ sung (nếu cần)**\n- Nội soi ổ bụng\n- Nội soi buồng tử cung\n- Xét nghiệm di truyền (karyotype)`
            },
            {
                h: `Phương pháp điều trị tại ${B.name}`,
                content: `### Lựa chọn điều trị theo nguyên nhân\n\n**Rối loạn phóng noãn:**\n- Kích thích phóng noãn bằng Clomiphene citrate hoặc Letrozole\n- Tiêm FSH/hMG (nếu kháng thuốc uống)\n- Theo dõi nang noãn bằng siêu âm + xét nghiệm\n\n**Tắc vòi trứng:**\n- Phẫu thuật nội soi thông vòi trứng\n- Chuyển hướng IVF nếu tắc nặng 2 bên\n\n**Lạc nội mạc tử cung:**\n- Phẫu thuật nội soi kết hợp điều trị nội khoa\n- IUI hoặc IVF sau phẫu thuật\n\n**IUI (Bơm tinh trùng vào buồng tử cung):**\n- Chỉ định: Vô sinh nhẹ, yếu tố cổ tử cung, vô sinh không rõ nguyên nhân\n- Tỷ lệ thành công: 10-20%/chu kỳ\n- Quy trình nhẹ nhàng, không cần gây mê\n\n### Tại sao chọn ${B.name}?\n\n- Bác sĩ chuyên khoa 20+ năm kinh nghiệm điều trị hiếm muộn\n- Trang thiết bị siêu âm 5D hiện đại\n- Phác đồ cá thể hóa cho từng bệnh nhân\n- Chi phí minh bạch, hợp lý\n- Hỗ trợ tâm lý suốt quá trình điều trị`
            }
        ],
        doctorAdvice: `Hiếm muộn không phải là dấu chấm hết. Với y học hiện đại, rất nhiều phương pháp có thể giúp bạn thực hiện ước mơ làm mẹ. Điều quan trọng nhất là đừng chờ đợi quá lâu — đặc biệt nếu bạn trên 30 tuổi. Hãy đến khám sớm để được đánh giá chính xác và có phương án điều trị phù hợp nhất.`,
        faqItems: `**Hỏi: Bao lâu không thụ thai thì nên đi khám?**\n\nĐáp: Dưới 35 tuổi: sau 12 tháng quan hệ đều đặn không tránh thai. Trên 35 tuổi: sau 6 tháng. Nếu có tiền sử rối loạn kinh nguyệt, phẫu thuật vùng chậu, hoặc bệnh lý phụ khoa — nên khám ngay khi có ý định mang thai.\n\n**Hỏi: Chi phí khám hiếm muộn bao nhiêu?**\n\nĐáp: Tại ${B.name}, gói khám hiếm muộn cơ bản bao gồm khám lâm sàng, siêu âm, và xét nghiệm nội tiết. Chi phí công khai, minh bạch. Liên hệ ${B.phone} để được tư vấn chi tiết.\n\n**Hỏi: IUI có đau không?**\n\nĐáp: IUI là thủ thuật nhẹ nhàng, tương tự khám phụ khoa thông thường. Hầu hết phụ nữ chỉ cảm thấy hơi khó chịu nhẹ và có thể về nhà ngay sau thủ thuật.\n\n**Hỏi: Nên khám hiếm muộn ở đâu tại Bắc Ninh?**\n\nĐáp: ${B.name} tại ${B.addr} là địa chỉ uy tín với đánh giá 5.0⭐ Google Maps. Khám buổi tối (17h-22h) và Chủ nhật, tiện lợi cho người đi làm.`,
    };
}

export function enrichHiemMuonNu(article) {
    const data = generic(article);
    const kw = article.title.split(':')[0].trim();
    const sectionsContent = data.sections.map(s => `## ${s.h}\n\n${s.content}`).join('\n\n');
    return {
        intro: data.intro,
        mainContent: sectionsContent,
        doctorAdvice: data.doctorAdvice,
        faqItems: data.faqItems,
        whenToSee: `- Quan hệ đều đặn > 12 tháng không tránh thai mà chưa thụ thai\n- Trên 35 tuổi và thử > 6 tháng không thành công\n- Kinh nguyệt không đều hoặc mất kinh\n- Đau bụng kinh dữ dội, nghi lạc nội mạc tử cung\n- Tiền sử sảy thai liên tiếp (≥ 2 lần)\n- Đã phẫu thuật vùng chậu hoặc bệnh lý phụ khoa`,
        journeySteps: `1. **Tư vấn ban đầu** — Hỏi bệnh sử, tiền sử sản khoa, thời gian mong con\n2. **Khám lâm sàng** — Khám phụ khoa, siêu âm đánh giá tử cung-buồng trứng\n3. **Xét nghiệm chuyên sâu** — Nội tiết, AMH, HSG, tinh dịch đồ (chồng)\n4. **Chẩn đoán và tư vấn** — Xác định nguyên nhân, giải thích phương án\n5. **Lên phác đồ điều trị** — Cá thể hóa theo nguyên nhân và mong muốn\n6. **Theo dõi và hỗ trợ** — Siêu âm theo dõi, điều chỉnh phác đồ khi cần`,
    };
}
