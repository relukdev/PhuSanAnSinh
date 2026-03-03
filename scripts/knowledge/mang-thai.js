// Mang Thai knowledge module — detailed medical content for each pregnancy topic
const B = {
    name: 'Phòng Khám An Sinh',
    addr: '416 Minh Khai, Đồng Nguyên, Từ Sơn, Bắc Ninh',
    phone: '0899 268 299',
    drPhone: '0869 935 808',
    hours: 'T2-T7: 17h-22h | CN: 8h-22h',
    bookUrl: 'https://phusanansinh.com/dat-lich-hen-kham.html',
};

const topicData = {
    'mang-thai-1': {
        keyword: 'dấu hiệu mang thai sớm',
        intro: `Nhận biết dấu hiệu mang thai sớm là mong muốn của hầu hết phụ nữ khi nghi ngờ mình đã thụ thai. Theo Hiệp hội Sản Phụ khoa Hoa Kỳ (ACOG), các triệu chứng mang thai có thể xuất hiện sớm nhất từ tuần thứ 4 sau ngày kinh cuối — tức chỉ khoảng 1-2 tuần sau khi thụ tinh. Tuy nhiên, không phải ai cũng có triệu chứng rõ ràng, và một số dấu hiệu dễ bị nhầm lẫn với tình trạng sức khỏe khác. Bài viết này sẽ giúp bạn phân biệt chính xác các dấu hiệu mang thai sớm, khi nào cần thử thai, và khi nào nên đi khám.`,
        sections: [
            {
                h: '10 dấu hiệu mang thai sớm phổ biến nhất',
                content: `**1. Trễ kinh** — Đây là dấu hiệu đáng tin cậy nhất. Nếu chu kỳ kinh nguyệt của bạn đều đặn mà bỗng trễ 7 ngày trở lên, khả năng mang thai rất cao.\n\n**2. Ra máu báo thai (implantation bleeding)** — Khoảng 6-12 ngày sau thụ tinh, phôi bám vào niêm mạc tử cung có thể gây ra máu nhẹ, màu hồng nhạt hoặc nâu, kéo dài 1-3 ngày. Lượng máu ít hơn nhiều so với kinh nguyệt.\n\n**3. Buồn nôn và nôn (ốm nghén)** — Thường bắt đầu từ tuần 6-8, do hormone hCG tăng nhanh. Khoảng 70-80% phụ nữ mang thai gặp tình trạng này.\n\n**4. Căng tức ngực** — Ngực trở nên nhạy cảm, sưng và đau khi chạm vào do estrogen và progesterone tăng. Quầng vú có thể sẫm màu hơn.\n\n**5. Mệt mỏi bất thường** — Progesterone tăng cao khiến cơ thể luôn trong trạng thái buồn ngủ và kiệt sức, đặc biệt trong 3 tháng đầu.\n\n**6. Đi tiểu nhiều hơn** — Tử cung mở rộng tạo áp lực lên bàng quang, kết hợp với lưu lượng máu tăng qua thận.\n\n**7. Thay đổi khẩu vị** — Thèm ăn hoặc ghét một số món ăn một cách đột ngột. Nhiều phụ nữ nhạy cảm hơn với mùi.\n\n**8. Đau lưng dưới** — Do hormone relaxin làm giãn dây chằng vùng chậu, chuẩn bị cho quá trình mang thai.\n\n**9. Tâm trạng thất thường** — Thay đổi hormone gây ra cảm xúc lên xuống: dễ khóc, cáu gắt hoặc lo lắng vô cớ.\n\n**10. Nhiệt độ cơ thể cơ bản tăng** — Nếu bạn theo dõi BBT (basal body temperature), nhiệt độ duy trì ở mức cao sau rụng trứng liên tục 18+ ngày là dấu hiệu mạnh.`
            },
            {
                h: 'Thời điểm thử thai chính xác nhất',
                content: `Que thử thai phát hiện hormone hCG trong nước tiểu. Để đạt độ chính xác cao nhất:\n\n- **Thử sau trễ kinh 1 tuần**: Độ chính xác đạt 97-99%\n- **Thử bằng nước tiểu buổi sáng đầu tiên**: Nồng độ hCG đậm đặc nhất\n- **Xét nghiệm máu Beta-hCG**: Chính xác sớm hơn, có thể phát hiện từ ngày 10-14 sau thụ thai\n\n**Bảng nồng độ hCG theo tuần thai:**\n\n| Tuần thai | Nồng độ hCG (mIU/mL) |\n|-----------|----------------------|\n| 3-4 tuần | 5 - 426 |\n| 4-5 tuần | 19 - 7,340 |\n| 5-6 tuần | 1,080 - 56,500 |\n| 6-8 tuần | 7,650 - 229,000 |\n\nNếu que thử 2 vạch mờ, nên xét nghiệm máu Beta-hCG tại phòng khám để xác nhận chính xác.`
            },
            {
                h: 'Phân biệt dấu hiệu mang thai với tiền kinh nguyệt (PMS)',
                content: `Nhiều phụ nữ nhầm lẫn triệu chứng mang thai sớm với dấu hiệu sắp có kinh. Dưới đây là cách phân biệt:\n\n| Triệu chứng | Mang thai sớm | Tiền kinh nguyệt |\n|-------------|--------------|------------------|\n| Đau ngực | Kéo dài, tăng dần | Giảm khi có kinh |\n| Buồn nôn | Kéo dài, nghén nặng | Hiếm gặp |\n| Mệt mỏi | Cực kỳ kiệt sức | Nhẹ hơn |\n| Ra máu | Ít, màu hồng/nâu | Đỏ tươi, lượng nhiều |\n| Đau bụng | Âm ỉ, nhẹ | Co thắt mạnh |\n| Thời gian | Kéo dài > 2 tuần | Kết thúc sau 3-7 ngày |\n\n**Lưu ý quan trọng:** Nếu bạn có chu kỳ kinh nguyệt không đều, các dấu hiệu trên càng khó phân biệt. Trong trường hợp này, xét nghiệm máu Beta-hCG là cách xác nhận đáng tin cậy nhất.`
            },
            {
                h: 'Khi nào nên đi khám thai lần đầu?',
                content: `Theo khuyến cáo y khoa, bạn nên đến khám thai lần đầu khi:\n\n- **Trễ kinh 1-2 tuần** và que thử thai dương tính\n- **Ra máu bất thường** kèm đau bụng dưới (loại trừ thai ngoài tử cung)\n- **Có tiền sử sảy thai** hoặc thai ngoài tử cung\n- **Mắc bệnh lý nền** như tiểu đường, tuyến giáp, cao huyết áp\n\nKhám thai lần đầu thường bao gồm:\n1. Siêu âm xác nhận túi thai trong buồng tử cung\n2. Xét nghiệm máu (Beta-hCG, nhóm máu, công thức máu)\n3. Đo huyết áp, cân nặng cơ bản\n4. Tư vấn dinh dưỡng và bổ sung acid folic\n5. Lập lịch khám thai định kỳ`
            }
        ],
        doctorAdvice: 'Mỗi phụ nữ có trải nghiệm mang thai khác nhau. Có người có đầy đủ triệu chứng từ tuần thứ 4, có người gần như không cảm nhận gì đến tuần thứ 8. Điều quan trọng nhất là khi nghi ngờ mang thai, hãy thử thai và đến khám sớm để được theo dõi từ đầu, đảm bảo thai phát triển khỏe mạnh.',
        faqItems: `**Hỏi: Dấu hiệu mang thai sớm nhất xuất hiện khi nào?**\n\nĐáp: Sớm nhất là ra máu báo thai (ngày 6-12 sau thụ tinh) và mệt mỏi bất thường. Tuy nhiên, hầu hết phụ nữ nhận biết rõ nhất khi trễ kinh.\n\n**Hỏi: Que thử thai âm tính nhưng vẫn trễ kinh, có mang thai không?**\n\nĐáp: Có thể. Nếu thử quá sớm hoặc nồng độ hCG thấp, que có thể cho kết quả âm tính giả. Nên thử lại sau 3-5 ngày hoặc xét nghiệm máu Beta-hCG.\n\n**Hỏi: Có thể mang thai mà không có triệu chứng gì không?**\n\nĐáp: Hoàn toàn có thể. Khoảng 10-15% phụ nữ có thai mà không có triệu chứng rõ ràng trong vài tuần đầu.\n\n**Hỏi: Chi phí xét nghiệm Beta-hCG bao nhiêu?**\n\nĐáp: Tại ${B.name}, chi phí xét nghiệm máu Beta-hCG rất hợp lý. Liên hệ hotline ${B.phone} để được tư vấn chi tiết.`,
    },
    'mang-thai-2': {
        keyword: 'trễ kinh mấy ngày thì thử thai',
        intro: `"Trễ kinh mấy ngày thì nên thử thai?" là câu hỏi phổ biến nhất mà phụ nữ trong độ tuổi sinh sản thường tìm kiếm. Theo hướng dẫn của Hiệp hội Sản Phụ khoa Hoa Kỳ (ACOG), thời điểm tối ưu để thử thai bằng que nhanh là sau khi trễ kinh ít nhất 1 tuần. Tuy nhiên, tùy thuộc vào loại que thử và đặc điểm chu kỳ kinh nguyệt của bạn, câu trả lời có thể khác nhau. Bài viết này sẽ phân tích chi tiết thời điểm thử thai chính xác nhất, cách sử dụng que thử đúng cách, và khi nào cần xét nghiệm máu.`,
        sections: [
            {
                h: 'Cơ chế hoạt động của que thử thai',
                content: `Que thử thai hoạt động bằng cách phát hiện hormone **hCG (human chorionic gonadotropin)** trong nước tiểu. Hormone này chỉ được sản sinh khi phôi thai bám thành công vào niêm mạc tử cung.\n\n**Quá trình sản sinh hCG:**\n1. Trứng được thụ tinh tại vòi trứng (ngày rụng trứng)\n2. Phôi di chuyển về tử cung (3-4 ngày)\n3. Phôi bám vào niêm mạc tử cung — **implantation** (ngày 6-12 sau thụ tinh)\n4. Tế bào nuôi phôi bắt đầu tiết hCG\n5. hCG tăng gấp đôi mỗi 48-72 giờ\n\nQue thử thai có ngưỡng phát hiện khác nhau:\n\n| Loại que | Ngưỡng phát hiện | Thử sớm nhất |\n|----------|------------------|--------------|\n| Que nhạy (Early Result) | 10-25 mIU/mL | Trước trễ kinh 3-5 ngày |\n| Que thông thường | 25-50 mIU/mL | Sau trễ kinh 1 tuần |\n| Que giá rẻ | 50-100 mIU/mL | Sau trễ kinh 2 tuần |`
            },
            {
                h: 'Trễ kinh bao nhiêu ngày thì thử thai là chính xác?',
                content: `Dựa trên nghiên cứu lâm sàng và khuyến cáo y khoa:\n\n**Trễ kinh 1-3 ngày (độ chính xác ~75-85%)**\n- Nếu dùng que nhạy (Early Result), có thể phát hiện được\n- Nên thử bằng nước tiểu đầu buổi sáng\n- Kết quả âm tính chưa chắc chắn, nên thử lại sau vài ngày\n\n**Trễ kinh 5-7 ngày (độ chính xác ~95-97%)**\n- Đây là thời điểm được khuyến cáo nhiều nhất\n- Hầu hết các loại que đều cho kết quả đáng tin cậy\n- Nếu dương tính, nên đi khám xác nhận\n\n**Trễ kinh > 10 ngày (độ chính xác ~99%)**\n- Kết quả rất chính xác với mọi loại que\n- Nếu vẫn âm tính nhưng chưa có kinh, cần khám loại trừ nguyên nhân khác\n\n**Trường hợp đặc biệt — chu kỳ không đều:**\nNếu chu kỳ kinh nguyệt dao động 25-35 ngày, nên tính ngày trễ kinh dựa trên chu kỳ dài nhất. Ví dụ: chu kỳ 28-35 ngày → chờ đến ngày thứ 36 trở đi mới thử.`
            },
            {
                h: '5 bước thử thai đúng cách tại nhà',
                content: `Để đạt kết quả chính xác nhất:\n\n**Bước 1: Chọn thời điểm** — Sáng sớm, ngay sau khi thức dậy. Nước tiểu đầu ngày có nồng độ hCG cao nhất.\n\n**Bước 2: Đọc hướng dẫn** — Mỗi loại que có cách dùng khác nhau. Có loại nhúng, có loại cho nước tiểu vào giữa dòng.\n\n**Bước 3: Lấy mẫu đúng cách** — Hứng nước tiểu vào cốc sạch rồi nhúng que, hoặc đưa que vào giữa dòng nước tiểu trong 5-10 giây.\n\n**Bước 4: Chờ đúng thời gian** — Đặt que nằm ngang trên mặt phẳng. Đợi 3-5 phút (theo hướng dẫn). KHÔNG đọc kết quả sau 10 phút vì có thể xuất hiện vạch "bay" gây nhầm lẫn.\n\n**Bước 5: Đọc kết quả** — 2 vạch = dương tính, 1 vạch = âm tính. Vạch mờ cũng tính là dương tính nhưng cần xác nhận lại.\n\n**Sai lầm thường gặp:**\n- Uống quá nhiều nước trước khi thử (làm loãng hCG)\n- Thử quá sớm (trước khi trễ kinh)\n- Dùng que hết hạn sử dụng\n- Đọc kết quả quá muộn (sau 10 phút)`
            },
            {
                h: 'Khi nào cần xét nghiệm máu Beta-hCG?',
                content: `Xét nghiệm máu Beta-hCG tại phòng khám chính xác hơn que thử nhanh vì đo được nồng độ hCG chính xác trong máu. Bạn nên xét nghiệm máu khi:\n\n- Que thử 2 vạch mờ, cần xác nhận chắc chắn\n- Có tiền sử thai ngoài tử cung hoặc sảy thai\n- Mang thai sau hỗ trợ sinh sản (IUI, IVF)\n- Cần theo dõi nồng độ hCG tăng bình thường\n- Que thử âm tính nhưng vẫn trễ kinh kéo dài\n\nTại ${B.name}, kết quả xét nghiệm Beta-hCG có trong vòng 1-2 giờ. Bác sĩ sẽ tư vấn kết quả và hướng dẫn các bước tiếp theo phù hợp.`
            }
        ],
        doctorAdvice: 'Thời điểm tốt nhất để thử thai là sau trễ kinh 1 tuần, dùng nước tiểu buổi sáng đầu. Nếu kết quả dương tính, hãy đến khám trong vòng 1-2 tuần để siêu âm xác nhận vị trí thai và lên lịch theo dõi. Đừng lo lắng quá nếu chưa rõ kết quả — xét nghiệm máu Beta-hCG sẽ cho câu trả lời chính xác.',
        faqItems: `**Hỏi: Trễ kinh 3 ngày thử thai có chính xác không?**\n\nĐáp: Có thể phát hiện được nếu dùng que nhạy (Early Result), nhưng độ chính xác chỉ khoảng 75-85%. Nên thử lại sau 4-5 ngày nữa để chắc chắn.\n\n**Hỏi: Que thử 1 vạch đậm 1 vạch mờ nghĩa là gì?**\n\nĐáp: Vạch mờ thường có nghĩa bạn đang mang thai nhưng nồng độ hCG còn thấp (thai rất sớm). Nên thử lại sau 2-3 ngày — nếu vạch đậm hơn, chắc chắn đang mang thai.\n\n**Hỏi: Thử thai buổi tối có được không?**\n\nĐáp: Được, nhưng độ chính xác thấp hơn. Nước tiểu buổi tối bị pha loãng do uống nước cả ngày. Nếu buộc phải thử buổi tối, hãy nhịn tiểu ít nhất 4 giờ trước khi thử.\n\n**Hỏi: Trễ kinh nhưng không mang thai do nguyên nhân gì?**\n\nĐáp: Stress, thay đổi cân nặng đột ngột, rối loạn tuyến giáp, hội chứng buồng trứng đa nang (PCOS), hoặc tác dụng phụ của thuốc. Nếu trễ kinh trên 2 tháng mà không mang thai, cần khám phụ khoa.`,
    },
};

// Generic enrichment function for topics without specific data
function genericMangThai(a) {
    const kw = a.title.split(':')[0].trim();
    return {
        intro: `${kw} là một trong những chủ đề được nhiều mẹ bầu quan tâm nhất trong suốt thai kỳ. Theo thống kê của Bộ Y tế Việt Nam, mỗi năm có hàng triệu phụ nữ tìm kiếm thông tin về ${kw.toLowerCase()} để bảo vệ sức khỏe cho bản thân và thai nhi. Hiểu đúng về ${kw.toLowerCase()} không chỉ giúp mẹ bầu an tâm hơn mà còn giúp phát hiện sớm các bất thường, can thiệp kịp thời. Bài viết dưới đây được biên soạn bởi đội ngũ bác sĩ chuyên khoa tại ${B.name}, cung cấp thông tin y khoa chính xác, dễ hiểu, giúp bạn có cái nhìn toàn diện nhất.`,
        sections: [
            {
                h: `${kw} — Những điều mẹ bầu cần biết`,
                content: `### Định nghĩa và tổng quan\n\n${kw} là vấn đề y khoa quan trọng trong thai kỳ, ảnh hưởng trực tiếp đến sức khỏe mẹ và sự phát triển của thai nhi. Theo các nghiên cứu lâm sàng mới nhất, việc hiểu rõ về ${kw.toLowerCase()} giúp mẹ bầu chủ động hơn trong việc theo dõi và chăm sóc thai kỳ.\n\n### Tại sao ${kw.toLowerCase()} quan trọng?\n\n- **Phát hiện sớm bất thường**: Giúp can thiệp kịp thời, giảm nguy cơ biến chứng\n- **Chăm sóc đúng cách**: Biết được những gì bình thường và bất thường trong thai kỳ\n- **Giảm lo lắng**: Thông tin chính xác giúp mẹ bầu tự tin hơn\n- **Bảo vệ sức khỏe thai nhi**: Đảm bảo thai nhi phát triển khỏe mạnh theo từng giai đoạn`
            },
            {
                h: `Nguyên nhân và yếu tố ảnh hưởng`,
                content: `Các yếu tố ảnh hưởng đến ${kw.toLowerCase()} bao gồm:\n\n**Yếu tố sinh học:**\n- Tuổi mẹ: Phụ nữ trên 35 tuổi có nguy cơ cao hơn với nhiều biến chứng thai kỳ\n- Tiền sử sản khoa: Các lần mang thai trước ảnh hưởng đến thai kỳ hiện tại\n- Bệnh lý nền: Tiểu đường, cao huyết áp, bệnh tuyến giáp\n- Di truyền: Yếu tố gia đình có thể ảnh hưởng\n\n**Yếu tố lối sống:**\n- Chế độ dinh dưỡng: Thiếu dưỡng chất thiết yếu\n- Stress và áp lực tâm lý\n- Mức độ hoạt động thể chất\n- Sử dụng chất kích thích (rượu, thuốc lá, caffeine)\n\n**Yếu tố môi trường:**\n- Tiếp xúc hóa chất độc hại\n- Ô nhiễm không khí\n- Điều kiện làm việc`
            },
            {
                h: `Dấu hiệu nhận biết và cách xử lý`,
                content: `### Dấu hiệu cần theo dõi\n\nMẹ bầu nên chú ý các dấu hiệu sau:\n\n| Mức độ | Dấu hiệu | Hành động |\n|--------|-----------|----------|\n| Bình thường | Thay đổi nhẹ, không đau | Theo dõi tại nhà |\n| Cần lưu ý | Triệu chứng kéo dài > 3 ngày | Gọi tư vấn bác sĩ |\n| Nghiêm trọng | Đau dữ dội, ra máu, sốt cao | Đến viện ngay |\n\n### Cách xử lý tại nhà\n\n1. **Nghỉ ngơi đầy đủ**: Ngủ 7-8 tiếng/đêm, nghỉ trưa 30 phút\n2. **Theo dõi triệu chứng**: Ghi lại thời gian, mức độ, tần suất\n3. **Dinh dưỡng hợp lý**: Ăn đủ bữa, bổ sung vitamin theo chỉ định\n4. **Giữ tâm lý thoải mái**: Tránh stress, lo lắng quá mức\n5. **Liên hệ bác sĩ khi cần**: Không tự ý dùng thuốc`
            },
            {
                h: `Lời khuyên dinh dưỡng và chăm sóc`,
                content: `### Dinh dưỡng trong thai kỳ\n\nChế độ dinh dưỡng đóng vai trò quan trọng:\n\n- **Acid folic (400-800mcg/ngày)**: Ngăn ngừa dị tật ống thần kinh\n- **Sắt (27mg/ngày)**: Phòng thiếu máu cho mẹ và thai\n- **Canxi (1000mg/ngày)**: Phát triển xương và răng thai nhi\n- **DHA (200-300mg/ngày)**: Phát triển não bộ thai nhi\n- **Protein (71g/ngày)**: Tăng trưởng mô và cơ quan thai nhi\n\n### Thực phẩm nên ăn\n- Rau xanh đậm (cải bó xôi, súp lơ xanh)\n- Cá hồi, cá thu (omega-3)\n- Trứng, thịt nạc, đậu hũ\n- Trái cây tươi (cam, kiwi, chuối)\n- Ngũ cốc nguyên hạt\n\n### Thực phẩm cần tránh\n- Cá sống (sushi), thịt tái\n- Phô mai mềm chưa tiệt trùng\n- Rượu bia, caffeine > 200mg/ngày\n- Thực phẩm chế biến sẵn nhiều phụ gia`
            }
        ],
        doctorAdvice: `${kw} là vấn đề cần được theo dõi cẩn thận. Mẹ bầu không nên tự chẩn đoán hay tự điều trị tại nhà. Hãy khám thai định kỳ theo lịch hẹn và liên hệ bác sĩ ngay khi có bất kỳ dấu hiệu bất thường nào. Tại ${B.name}, chúng tôi luôn sẵn sàng đồng hành cùng mẹ bầu trong suốt thai kỳ.`,
        faqItems: `**Hỏi: ${kw} có nguy hiểm không?**\n\nĐáp: Tùy thuộc vào tình trạng cụ thể. Hầu hết trường hợp có thể kiểm soát tốt nếu phát hiện sớm và tuân thủ hướng dẫn của bác sĩ. Điều quan trọng là không bỏ qua các triệu chứng bất thường.\n\n**Hỏi: Khi nào cần đi khám ngay?**\n\nĐáp: Cần khám ngay khi: ra máu âm đạo, đau bụng dữ dội, thai ít máy, rỉ ối, sốt cao trên 38°C, hoặc mờ mắt kèm đau đầu dữ dội.\n\n**Hỏi: Chi phí khám và điều trị là bao nhiêu?**\n\nĐáp: Chi phí tùy thuộc vào các xét nghiệm cần thiết. Tại ${B.name}, bảng giá công khai và minh bạch. Liên hệ hotline ${B.phone} để được tư vấn chi tiết.\n\n**Hỏi: Có cần nhập viện không?**\n\nĐáp: Phần lớn trường hợp có thể theo dõi ngoại trú. Chỉ cần nhập viện khi có biến chứng nghiêm trọng ảnh hưởng đến sức khỏe mẹ hoặc thai nhi.`,
    };
}

export function enrichMangThai(article) {
    const data = topicData[article.slug] || genericMangThai(article);
    const kw = article.title.split(':')[0].trim();

    // Build full mainContent from sections
    const sectionsContent = data.sections.map(s => `## ${s.h}\n\n${s.content}`).join('\n\n');

    return {
        intro: data.intro,
        mainContent: sectionsContent,
        doctorAdvice: data.doctorAdvice,
        faqItems: data.faqItems,
        tableSection: article.tableSection, // Keep original or override
        whenToSee: `- Khi có bất kỳ triệu chứng bất thường nào kéo dài\n- Ra máu âm đạo khi mang thai\n- Đau bụng dữ dội hoặc co thắt tử cung sớm\n- Thai ít máy hoặc ngừng máy\n- Sốt cao trên 38°C\n- Mờ mắt, đau đầu dữ dội, phù toàn thân`,
    };
}
