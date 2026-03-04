
# TÀI LIỆU YÊU CẦU CHI TIẾT (PRD)

## CÔNG CỤ QUẢN LÝ VÀ THEO DÕI THAI KỲ CHO BÀ BẦU

### *Product Requirements Document for Prenatal Care Tracking Tool*

---

**Tác giả:** Chuyên gia Sản phụ khoa

**Phiên bản:** 1.0

**Ngày:** 04/03/2026

**Nguồn tham chiếu khoa học:**

* WHO Recommendations on Antenatal Care for a Positive Pregnancy Experience (2016, cập nhật 2024)
* ACOG (American College of Obstetricians and Gynecologists) – Prenatal Care Guidelines & Clinical Consensus 2025
* NICE Guidelines NG201 – Antenatal Care (2021, cập nhật 2025)
* AAFP (American Academy of Family Physicians) – Prenatal Care: An Evidence-Based Approach (2023)
* USPSTF (U.S. Preventive Services Task Force) – Screening Recommendations
* Bộ Y tế Việt Nam – Thông tư 34/2016/TT-BYT & Hướng dẫn khám thai định kỳ
* CDC – Urgent Maternal Warning Signs (HEAR HER Campaign)

---

## PHẦN I: TỔNG QUAN HỆ THỐNG

### 1.1 Mục tiêu sản phẩm

Xây dựng công cụ số (ứng dụng di động / web app) giúp thai phụ và nhân viên y tế theo dõi toàn diện thai kỳ, bao gồm: lịch khám thai theo từng tuần tuổi thai, nội dung thăm khám cần thực hiện tại mỗi lần khám, các xét nghiệm và sàng lọc bắt buộc / khuyến nghị, hệ thống cảnh báo dấu hiệu nguy hiểm, và hướng dẫn chăm sóc thai kỳ dựa trên bằng chứng y khoa (evidence-based).

### 1.2 Đối tượng người dùng

Đối tượng sử dụng chính gồm thai phụ và gia đình (người dùng cuối), bác sĩ sản khoa và nữ hộ sinh (nhân viên y tế), và quản trị viên hệ thống y tế. Mỗi nhóm cần giao diện và quyền truy cập khác nhau.

### 1.3 Mô hình chăm sóc thai kỳ tham chiếu

WHO khuyến nghị tối thiểu **8 lần tiếp xúc (contacts)** trong suốt thai kỳ, thay thế mô hình 4 lần khám cũ (FANC). Lịch trình cụ thể: tam cá nguyệt 1 (1 lần, trước 12 tuần), tam cá nguyệt 2 (2 lần, tuần 20 và 26), tam cá nguyệt 3 (5 lần, tuần 30, 34, 36, 38 và 40). ACOG truyền thống khuyến nghị 12–14 lần khám trực tiếp, tuy nhiên hướng dẫn mới nhất (04/2025) đã chuyển sang mô hình cá nhân hóa (tailored care), cho phép phối hợp khám trực tiếp và từ xa dựa trên yếu tố nguy cơ.

---

## PHẦN II: LỊCH KHÁM THAI CHI TIẾT – DỮ LIỆU CỐT LÕI CHO DEV

### 2.1 Cấu trúc dữ liệu mỗi lần khám (Data Schema)

Mỗi bản ghi khám thai cần chứa các trường sau: `visit_id` (mã lần khám), `gestational_age_weeks` (tuổi thai tính bằng tuần), `trimester` (tam cá nguyệt 1/2/3), `visit_type` (bắt buộc / khuyến nghị / bổ sung), `visit_modality` (trực tiếp / từ xa / linh hoạt), `clinical_assessments[]` (danh sách thăm khám lâm sàng), `lab_tests[]` (danh sách xét nghiệm), `ultrasound_type` (loại siêu âm nếu có), `vaccinations[]` (tiêm chủng nếu có), `medications[]` (thuốc kê đơn nếu có), `education_topics[]` (chủ đề tư vấn giáo dục sức khỏe), `warning_signs[]` (dấu hiệu cần theo dõi), `notes` (ghi chú tự do), `next_visit_weeks` (tuần hẹn khám tiếp theo), `evidence_references[]` (tham chiếu khoa học cho mỗi mục).

---

### 2.2 BẢNG LỊCH KHÁM THAI CHI TIẾT THEO TUẦN TUỔI THAI

---

#### **LẦN KHÁM 1: Tuần 6–10 (Lần khám đầu tiên – First Prenatal Visit)**

**Hình thức:** Trực tiếp bắt buộc

**Mục đích tổng quát:** Xác nhận thai, đánh giá toàn diện tình trạng sức khỏe mẹ, phân tầng nguy cơ, thiết lập kế hoạch chăm sóc thai kỳ.

**A. Thăm khám lâm sàng:**

**Khai thác bệnh sử toàn diện** gồm tiền sử sản khoa (số lần mang thai, sinh, sẩy, thai ngoài tử cung, sinh non, thai chết lưu, phương pháp sinh trước đó, biến chứng các lần mang thai trước), tiền sử nội ngoại khoa (tăng huyết áp, đái tháo đường, bệnh tuyến giáp, bệnh tự miễn, bệnh thận, động kinh, hen, trầm cảm/lo âu), tiền sử phụ khoa (chu kỳ kinh, ngày kinh cuối cùng – LMP, tiền sử nhiễm trùng đường sinh dục, pap smear gần nhất), tiền sử gia đình (bệnh di truyền, dị tật bẩm sinh, bệnh mạn tính), tiền sử dùng thuốc hiện tại và dị ứng, tiền sử tiêm chủng (rubella, thủy đậu, viêm gan B, HPV), và tiền sử phẫu thuật.

**Khám thực thể toàn thân:** Đo huyết áp (baseline – ngưỡng bình thường <140/90 mmHg; nếu ≥140/90 → đánh giá tăng huyết áp mạn tính). Đo chiều cao, cân nặng, tính BMI trước mang thai (quan trọng để xác định mức tăng cân khuyến nghị và phân tầng nguy cơ tiểu đường thai kỳ, tiền sản giật). Khám tim phổi, tuyến giáp, vú, bụng. Khám phụ khoa nếu có chỉ định (đánh giá kích thước tử cung so với tuổi thai, bất thường cổ tử cung). Đánh giá sức khỏe răng miệng (bệnh nha chu làm tăng nguy cơ sinh non – Evidence Rating: có lợi ích giảm sinh non khi điều trị nha chu).

**B. Xét nghiệm máu bắt buộc:**

Nhóm máu ABO và Rh(D) – nếu Rh(D) âm tính, cần theo dõi nguy cơ bất đồng nhóm máu và tiêm Anti-D tại tuần 28. Tổng phân tích máu (CBC) – đánh giá thiếu máu (thiếu máu thiếu sắt tăng nguy cơ sinh non, IUGR, trầm cảm chu sinh). Đường huyết lúc đói – phát hiện sớm đái tháo đường tiền thai kỳ ở nhóm nguy cơ cao. HBsAg (viêm gan B) – sàng lọc phổ quát. Anti-HCV (viêm gan C) – sàng lọc phổ quát (AAFP 2023, USPSTF khuyến nghị). HIV – sàng lọc phổ quát (opt-out). Giang mai (RPR/VDRL, nếu dương tính → xác nhận bằng FTA-ABS) – sàng lọc phổ quát. Rubella IgG – đánh giá miễn dịch. Varicella IgG – nếu chưa có tiền sử mắc hoặc tiêm chủng. TSH – chỉ khi có triệu chứng hoặc tiền sử bệnh tuyến giáp.

**C. Xét nghiệm nước tiểu:**

Tổng phân tích nước tiểu + cấy nước tiểu – phát hiện nhiễm khuẩn tiết niệu không triệu chứng (ảnh hưởng tới 15% thai phụ, 30% tiến triển thành viêm đài bể thận nếu không điều trị). Protein niệu – baseline.

**D. Xét nghiệm STI (Nhiễm trùng lây truyền qua đường tình dục):**

Chlamydia (PCR/NAAT từ mẫu cổ tử cung hoặc nước tiểu) – sàng lọc phổ quát. Lậu (Gonorrhea – NAAT) – sàng lọc phổ quát. Pap smear – nếu đến hạn sàng lọc theo lịch trình (phụ nữ 21–65 tuổi).

**E. Siêu âm:**

Siêu âm đầu dò âm đạo hoặc bụng xác nhận thai trong tử cung, số lượng thai, hoạt động tim thai, tuổi thai (CRL – chiều dài đầu-mông, chính xác ±5 ngày nếu <8 tuần 6 ngày), vị trí túi thai, phát hiện thai ngoài tử cung, đa thai, bất thường cấu trúc sớm.

**F. Sàng lọc tâm lý xã hội (Universal Screening – AAFP/ACOG khuyến nghị):**

Trầm cảm: dùng thang Edinburgh Postnatal Depression Scale (EPDS, sensitivity 81%, specificity 88%) hoặc PHQ-9 (sensitivity & specificity 88%). Lo âu: GAD-7 hoặc State-Trait Anxiety Inventory. Bạo lực gia đình/bạn tình: sàng lọc tại lần khám đầu và mỗi tam cá nguyệt. Sử dụng chất kích thích: hỏi về rượu, thuốc lá, ma túy – dùng công cụ 4Ps hoặc NIDA Quick Screen. An ninh lương thực: Hunger Vital Sign (sensitivity 97%).

**G. Tư vấn và chỉ định thuốc:**

Acid folic 400–800 mcg/ngày (bắt đầu lý tưởng từ 4 tuần trước thụ thai, tiếp tục đến hết tam cá nguyệt 1; giảm 78% nguy cơ dị tật ống thần kinh – Evidence Rating A). Nếu tiền sử thai có dị tật ống thần kinh hoặc đang dùng thuốc kháng folate → acid folic 4mg/ngày. Sắt bổ sung nếu có thiếu máu. DHA ít nhất 200 mg/ngày. Vitamin D 600 IU/ngày (có thể lên 1000–2000 IU). Canxi 1000 mg/ngày.

**Aspirin liều thấp 81 mg/ngày** – bắt đầu từ tuần 12–16, dùng đến lúc sinh – cho thai phụ có nguy cơ cao tiền sản giật (Evidence Rating B). Các yếu tố nguy cơ cao gồm: tiền sử tiền sản giật, đa thai, tăng huyết áp mạn, đái tháo đường type 1 hoặc 2, bệnh thận, bệnh tự miễn (lupus, hội chứng kháng phospholipid). Các yếu tố nguy cơ vừa (cần ≥2 yếu tố): con so, BMI >30, tiền sử gia đình tiền sản giật, tuổi ≥35, tiền sử thai kỳ bất lợi.

**H. Giáo dục sức khỏe:**

Dinh dưỡng thai kỳ (thêm 300–400 kcal/ngày, tránh thực phẩm sống, hải sản chứa thủy ngân cao, phô mai mềm chưa tiệt trùng, thịt nguội). Tăng cân theo khuyến nghị dựa trên BMI: BMI <18.5 → tăng 12.5–18 kg; BMI 18.5–24.9 → tăng 11.5–16 kg; BMI 25–29.9 → tăng 7–11.5 kg; BMI ≥30 → tăng 5–9 kg. Vận động: ít nhất 150 phút/tuần cường độ vừa phải (đi bộ, bơi, yoga prenatal, đạp xe tại chỗ). Tránh rượu, thuốc lá, ma túy tuyệt đối. Caffeine <300 mg/ngày. Tránh phơi nhiễm nhiệt độ cao (xông hơi, bồn nước nóng) trong tam cá nguyệt 1 (liên quan dị tật ống thần kinh).

**Tham chiếu:** AAFP 2023 Table 1; WHO ANC 2016 Rec A.1-A.5; ACOG Committee Opinion 804; USPSTF Screening Recommendations.

---

#### **LẦN KHÁM 2: Tuần 11–13 tuần 6 ngày (Sàng lọc Tam cá nguyệt 1)**

**Hình thức:** Trực tiếp bắt buộc

**Mục đích:** Sàng lọc lệch bội nhiễm sắc thể, đánh giá nguy cơ tiền sản giật sớm, xác nhận tuổi thai.

**A. Sàng lọc di truyền – Bước quan trọng nhất:**

**Phương pháp 1 – Combined First Trimester Screening (FTS):** Siêu âm đo độ mờ da gáy (Nuchal Translucency – NT), kết hợp xét nghiệm máu đo PAPP-A (Pregnancy-Associated Plasma Protein A) và free β-hCG, kết hợp với tuổi mẹ. Sensitivity cho trisomy 21 (Down syndrome): 83%; Specificity: 95%. Phát hiện thêm trisomy 18 (Edwards), trisomy 13 (Patau). Thời điểm tối ưu: 11 tuần 0 ngày – 13 tuần 6 ngày (CRL 45–84 mm). Ngoài khoảng này, kết quả không còn giá trị tin cậy.

**Phương pháp 2 – Cell-free DNA (cfDNA / NIPT – Non-Invasive Prenatal Testing):** Phân tích DNA tự do của thai nhi trong máu mẹ. Có thể thực hiện từ tuần 10 đến hết thai kỳ. Sensitivity cho trisomy 21: 99%; Specificity: ~100%. Sàng lọc thêm: trisomy 18, 13, bất thường nhiễm sắc thể giới tính, vi mất đoạn (microdeletion). ACOG khuyến nghị tư vấn và đề nghị sàng lọc lệch bội cho TẤT CẢ thai phụ, không phân biệt tuổi. Nếu kết quả sàng lọc dương tính → giới thiệu tư vấn di truyền + chẩn đoán xâm lấn: Sinh thiết gai nhau (CVS) tuần 11–13 hoặc Chọc ối (Amniocentesis) từ tuần 15.

**B. Siêu âm tam cá nguyệt 1:**

Xác nhận/điều chỉnh tuổi thai (chính xác ±7 ngày ở tuần 9–15 tuần 6 ngày). Đếm số thai, đánh giá tính đa thai (một bánh nhau hay hai bánh nhau – quan trọng cho quản lý song thai). Đánh giá hình thái thai nhi sớm (não, chi, bàng quang, dạ dày). Đánh giá xương mũi (vắng mặt xương mũi liên quan tăng nguy cơ trisomy 21). Đo Doppler ống tĩnh mạch (ductus venosus) nếu có chỉ định. Đánh giá tử cung và phần phụ.

**C. Xét nghiệm bổ sung theo chỉ định:**

Sàng lọc di truyền dựa trên nguồn gốc tổ tiên (ancestry-based, không phải race-based): Thiếu máu hồng cầu hình liềm (tổ tiên châu Phi – tần suất mang gen 1:10). Thalassemia (tổ tiên Đông Nam Á, Địa Trung Hải). Xơ nang (tổ tiên châu Âu – 1:25). Bệnh Tay-Sachs (tổ tiên Do Thái Ashkenazi). Nếu cả hai bố mẹ mang gen bệnh → tư vấn di truyền + chẩn đoán trước sinh.

**D. Đánh giá huyết áp & đánh giá nguy cơ tiền sản giật:**

Nếu chưa bắt đầu aspirin → bắt đầu ngay từ tuần 12 nếu có yếu tố nguy cơ.

**Tham chiếu:** ACOG Practice Bulletin 226; AAFP 2023 Table 4; NICE NG201 Section 1.3.

---

#### **LẦN KHÁM 3: Tuần 16 (Khám giữa tam cá nguyệt)**

**Hình thức:** Trực tiếp hoặc từ xa (tùy nguy cơ)

**A. Thăm khám thường quy:**

Đo huyết áp. Cân nặng. Tổng phân tích nước tiểu (protein, glucose, bạch cầu). Hỏi triệu chứng: ốm nghén, chảy máu, đau bụng, cử động thai (thường cảm nhận từ tuần 16–20 ở con rạ, 18–22 ở con so).

**B. Xét nghiệm:**

**Quadruple Screening (Quad test)** – nếu chưa thực hiện NIPT hoặc FTS: Tuần 15–22 (lý tưởng 16–18 tuần). Đo 4 chất: β-hCG, AFP (alpha-fetoprotein), Unconjugated Estriol, Dimeric Inhibin A. Sensitivity cho trisomy 21: 81%; Specificity: 95%. AFP đơn độc sàng lọc dị tật ống thần kinh (spina bifida, anencephaly).

**Integrated Screening** – nếu đã làm FTS + Quad test: Sensitivity tổng hợp cho trisomy 21: 96%; Specificity: 98%.

**C. Đánh giá chiều dài cổ tử cung:**

Dành cho thai phụ có tiền sử sinh non. Đo chiều dài cổ tử cung bằng siêu âm đầu dò âm đạo từ tuần 16–24. Nếu cổ tử cung ngắn (<25mm) → bổ sung progesterone (Evidence Rating B). Nếu tiền sử ≥3 lần sẩy thai liên tiếp quý 2 → cân nhắc khâu eo cổ tử cung (cerclage).

**Tham chiếu:** ACOG Practice Bulletin 234; AAFP 2023.

---

#### **LẦN KHÁM 4: Tuần 18–22 (Siêu âm hình thái học – Anatomy Scan)**

**Hình thức:** Trực tiếp bắt buộc

**Mục đích:** Đánh giá toàn diện cấu trúc giải phẫu thai nhi – đây là lần siêu âm chi tiết nhất trong thai kỳ.

**A. Siêu âm hình thái (Anomaly Scan / Level II Ultrasound):**

Kiểm tra hệ thống theo “Rule of Three” – 3 cấu trúc ở mỗi phần cơ thể:

**Đầu & Não:** Hình dạng hộp sọ, không gian trong sọ (não thất bên <10mm), đại não, tiểu não, cisterna magna, thể chai. Phát hiện: vô não, não úng thủy, thoát vị não-màng não.

**Mặt:** Mũi, môi, hàm – phát hiện khe hở môi/vòm miệng (cleft lip/palate). Ổ mắt, xương mũi.

**Cột sống:** Đánh giá liên tục toàn bộ cột sống trên 3 mặt cắt – phát hiện tật nứt đốt sống (spina bifida).

**Tim:** Mặt cắt 4 buồng, đường ra thất trái (LVOT), đường ra thất phải (RVOT), 3 mạch máu (3-vessel view), cung động mạch chủ. Phát hiện các dị tật tim bẩm sinh (chiếm ~1% thai nhi, là dị tật bẩm sinh thường gặp nhất).

**Ngực:** Phổi, vòm hoành – phát hiện thoát vị hoành.

**Bụng:** Dạ dày, thận, bàng quang, thành bụng, dây rốn (3 mạch: 2 động mạch + 1 tĩnh mạch), gan. Phát hiện: teo thực quản, tắc ruột, thoát vị rốn, hở thành bụng.

**Chi:** Đủ 4 chi, xương dài (đo chiều dài xương đùi), bàn tay, bàn chân. Phát hiện: thiếu chi, ngắn chi, bàn chân khoèo.

**Đánh giá phần phụ:** Vị trí nhau thai (phát hiện nhau tiền đạo), lượng nước ối (AFI hoặc deepest pocket), dây rốn.

**Các chỉ số sinh trắc học:** BPD (đường kính lưỡng đỉnh), HC (chu vi đầu), AC (chu vi bụng), FL (chiều dài xương đùi) → tính cân nặng ước tính thai nhi, đánh giá tăng trưởng.

**B. Khám lâm sàng:**

Huyết áp. Cân nặng. Chiều cao tử cung (bắt đầu đo từ tuần 20, ±2 cm so với tuần thai). Nghe tim thai bằng Doppler cầm tay. Protein niệu.

**Tham chiếu:** ACOG Practice Bulletin 175; ISUOG Practice Guidelines; BMUS Fetal Anomaly Scan Guidelines; Fetal Medicine Foundation.

---

#### **LẦN KHÁM 5: Tuần 24–28 (Sàng lọc tiểu đường thai kỳ & đánh giá tăng trưởng)**

**Hình thức:** Trực tiếp bắt buộc

**Mục đích:** Sàng lọc đái tháo đường thai kỳ (GDM), đánh giá tăng trưởng thai nhi, tiêm Anti-D cho mẹ Rh âm.

**A. Sàng lọc đái tháo đường thai kỳ – BẮT BUỘC cho tất cả thai phụ:**

**Phương pháp 2 bước (Two-Step – ACOG khuyến nghị):**

Bước 1 – Nghiệm pháp dung nạp glucose 50g (GCT): Không cần nhịn ăn. Uống 50g glucose, đo đường huyết sau 1 giờ. Ngưỡng dương tính: ≥130 mg/dL (7.2 mmol/L) hoặc ≥135 mg/dL hoặc ≥140 mg/dL (tùy cơ sở).

Bước 2 – Nghiệm pháp dung nạp glucose 100g (OGTT 3 giờ): Nhịn ăn qua đêm 8–14 giờ. Đo glucose máu tĩnh mạch: Lúc đói ≥95 mg/dL; 1 giờ ≥180 mg/dL; 2 giờ ≥155 mg/dL; 3 giờ ≥140 mg/dL (tiêu chuẩn Carpenter-Coustan). Chẩn đoán GDM: ≥2 giá trị bất thường.

**Phương pháp 1 bước (One-Step – IADPSG/WHO):**

Nhịn ăn qua đêm. Uống 75g glucose. Đo glucose: Lúc đói ≥92 mg/dL; 1 giờ ≥180 mg/dL; 2 giờ ≥153 mg/dL. Chẩn đoán GDM: ≥1 giá trị bất thường.

*Thai phụ có nguy cơ cao (béo phì, tiền sử GDM, tiền sử gia đình đái tháo đường type 2, PCOS) → sàng lọc sớm ngay lần khám đầu tiên + lặp lại ở tuần 24–28 nếu kết quả sớm bình thường.*

**B. Tiêm Anti-D immune globulin:**

Cho mẹ có Rh(D) âm tính: Tiêm 300 mcg anti-D tại tuần 28. Giảm nguy cơ bất đồng nhóm máu 80–90%. Tiêm lại trong vòng 72 giờ sau sinh nếu con Rh dương tính.

**C. Xét nghiệm máu bổ sung:**

CBC – đánh giá lại thiếu máu. Kháng thể bất thường (Indirect Coombs test) – đặc biệt quan trọng ở mẹ Rh âm.

**D. Khám lâm sàng thường quy:**

Huyết áp, cân nặng, chiều cao tử cung, tim thai, protein niệu. Đánh giá cử động thai (thường rõ từ tuần 24–28).

**E. Tư vấn:**

Dấu hiệu chuyển dạ sinh non. Đếm cử động thai (kick counts) từ tuần 28. Kế hoạch sinh con, chuẩn bị cho tam cá nguyệt 3.

**Tham chiếu:** ACOG Practice Bulletin 190 (GDM); USPSTF 2021; IADPSG Criteria; AAFP 2023.

---

#### **LẦN KHÁM 6: Tuần 28–30**

**Hình thức:** Trực tiếp

**A. Khám lâm sàng:**

Huyết áp, cân nặng, chiều cao tử cung, tim thai, protein niệu.

**B. Tiêm chủng:**

**Tdap (uốn ván – bạch hầu – ho gà):** Khuyến nghị tiêm từ tuần 27–36 (tối ưu tuần 27–32) ở MỖI lần mang thai. Lý do: Chuyển kháng thể thụ động qua nhau thai cho thai nhi, bảo vệ trẻ sơ sinh trong những tuần đầu trước khi trẻ được tiêm chủng. Ho gà là nguyên nhân hàng đầu gây tử vong do bệnh có thể phòng ngừa bằng vắc-xin ở trẻ <2 tháng tuổi.

**Cúm (Influenza):** Tiêm vào bất kỳ tam cá nguyệt nào trong mùa cúm. An toàn và khuyến nghị mạnh cho tất cả thai phụ.

**COVID-19:** Theo khuyến nghị hiện hành, tiêm cho thai phụ ở bất kỳ giai đoạn nào.

**C. Đánh giá tăng trưởng thai nhi:**

Siêu âm đánh giá tăng trưởng nếu có yếu tố nguy cơ (IUGR, tăng huyết áp, đái tháo đường, BMI >35, đa thai).

**D. Hướng dẫn đếm cử động thai:**

Bắt đầu từ tuần 28. Phương pháp: đếm 10 cử động trong khoảng 2 giờ, tốt nhất sau bữa ăn. Nếu <10 cử động trong 2 giờ → cần đến cơ sở y tế kiểm tra.

**Tham chiếu:** ACOG Committee Opinion 718 (Tdap); CDC ACIP Immunization Schedule; AAFP 2023.

---

#### **LẦN KHÁM 7: Tuần 32**

**Hình thức:** Trực tiếp hoặc từ xa

**A. Khám lâm sàng:**

Huyết áp, cân nặng, chiều cao tử cung, tim thai, protein niệu. Đánh giá triệu chứng tiền sản giật (nhức đầu dữ dội, thay đổi thị giác, đau thượng vị, phù mặt/tay nhanh).

**B. Siêu âm (nếu có chỉ định):**

Đánh giá tăng trưởng thai nhi. Đánh giá lượng nước ối. Kiểm tra vị trí nhau thai (nếu nhau bám thấp tại tuần 20 → xác nhận lại). Đánh giá ngôi thai.

**C. Tư vấn:**

Dấu hiệu chuyển dạ thật vs chuyển dạ giả. Kế hoạch sinh: địa điểm, phương pháp sinh, giảm đau (các lựa chọn). Cho con bú (khuyến nghị mạnh – Evidence Rating A).

---

#### **LẦN KHÁM 8: Tuần 34**

**Hình thức:** Trực tiếp

**A. Khám lâm sàng thường quy + đánh giá ngôi thai:**

Huyết áp, cân nặng, chiều cao tử cung, tim thai, protein niệu. Bắt đầu đánh giá ngôi thai bằng nghiệm pháp Leopold từ tuần 34–36. Nếu nghi ngờ ngôi mông/ngôi ngang → xác nhận bằng siêu âm.

**B. Tư vấn:**

Ngoại xoay thai (ECV) nếu ngôi mông (thực hiện từ tuần 36–37). Dấu hiệu cần đến bệnh viện ngay (xem Phần IV).

---

#### **LẦN KHÁM 9: Tuần 36 (Sàng lọc GBS)**

**Hình thức:** Trực tiếp bắt buộc

**Mục đích:** Sàng lọc Streptococcus nhóm B, đánh giá sẵn sàng cho cuộc sinh.

**A. Sàng lọc GBS (Group B Streptococcus):**

Lấy mẫu phết âm đạo-trực tràng (vaginal-rectal swab) nuôi cấy tại tuần 36–37 (tối ưu 36 tuần 0 ngày – 37 tuần 6 ngày). GBS dương tính → kháng sinh dự phòng trong chuyển dạ (Penicillin G tĩnh mạch). 25% thai phụ mang GBS; GBS là nguyên nhân hàng đầu gây nhiễm trùng sơ sinh nặng (nhiễm trùng huyết, viêm phổi, viêm màng não). *Nếu đã có tiểu cầu GBS trong thai kỳ hiện tại → xem như đã nhiễm, không cần cấy lại.*

**B. Khám lâm sàng:**

Huyết áp, cân nặng, chiều cao tử cung, tim thai, protein niệu. Đánh giá ngôi thai. Nếu ngôi mông ổn định → thảo luận ngoại xoay thai hoặc mổ lấy thai.

**C. Xét nghiệm máu (nếu có chỉ định):**

CBC (đặc biệt nếu tiền sử thiếu máu). Xét nghiệm lại giang mai, HIV nếu nhóm nguy cơ cao.

**Tham chiếu:** ACOG Committee Opinion 797 (GBS); CDC Prevention Guidelines; AAFP 2023.

---

#### **LẦN KHÁM 10: Tuần 37**

**Hình thức:** Trực tiếp

Khám lâm sàng thường quy. Huyết áp, tim thai, protein niệu. Đánh giá ngôi thai. Thảo luận kế hoạch sinh chi tiết: chỉ định mổ lấy thai (nếu có), khởi phát chuyển dạ (induction). Thai phụ nguy cơ thấp, đơn thai → có thể đề nghị khởi phát chuyển dạ tự chọn tại tuần 39 (dựa trên nghiên cứu ARRIVE Trial – giảm tỷ lệ mổ lấy thai mà không tăng biến chứng sơ sinh).

---

#### **LẦN KHÁM 11: Tuần 38**

**Hình thức:** Trực tiếp

Khám lâm sàng thường quy. Huyết áp, tim thai, protein niệu, đánh giá ngôi thai. Đánh giá dấu hiệu chuyển dạ. Tư vấn khi nào cần nhập viện.

---

#### **LẦN KHÁM 12: Tuần 39**

**Hình thức:** Trực tiếp

Khám lâm sàng thường quy. Khám cổ tử cung nếu có chỉ định hoặc theo yêu cầu (đánh giá Bishop Score cho khởi phát chuyển dạ). Thảo luận khởi phát chuyển dạ vs chờ đợi chuyển dạ tự nhiên.

---

#### **LẦN KHÁM 13: Tuần 40 (Thai đủ tháng)**

**Hình thức:** Trực tiếp bắt buộc

**A. Khám lâm sàng:** Huyết áp, tim thai, protein niệu, ngôi thai, cổ tử cung.

**B. Đánh giá sức khỏe thai nhi:**

NST (Non-Stress Test) – theo dõi tim thai liên tục. Đánh giá nước ối (AFI hoặc deepest pocket). Nếu bình thường → hẹn lại sau 3–4 ngày. Nếu bất thường → nhập viện.

**C. Lưu ý:**

Thai >41 tuần 0 ngày → khuyến nghị mạnh khởi phát chuyển dạ. Thai >42 tuần → nguy cơ tăng đáng kể (thai chết lưu, suy thai, hít phân su) → chỉ định chấm dứt thai kỳ.

**Tham chiếu:** ACOG Practice Bulletin 146 (Post-term Pregnancy); ARRIVE Trial (Grobman 2018 NEJM).

---

## PHẦN III: BẢNG TỔNG HỢP DINH DƯỠNG VÀ BỔ SUNG

### 3.1 Vi chất dinh dưỡng bắt buộc/khuyến nghị

| Vi chất      | Liều khuyến nghị                           | Thời điểm                                | Lý do                                                                   | Nguồn         |
| ------------- | --------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------ | -------------- |
| Acid folic    | 400–800 mcg/ngày (4 mg nếu nguy cơ cao)   | Trước thụ thai → hết tam cá nguyệt 1 | Giảm 78% dị tật ống thần kinh                                       | USPSTF Grade A |
| Sắt (Iron)   | 27 mg/ngày (bổ sung thêm nếu thiếu máu) | Cả thai kỳ                                | Phòng thiếu máu thiếu sắt → giảm sinh non, IUGR                   | WHO/ACOG       |
| Canxi         | 1000 mg/ngày                                 | Cả thai kỳ                                | Phát triển xương thai nhi, phòng tiền sản giật ở nhóm nguy cơ | WHO            |
| Vitamin D     | 600–2000 IU/ngày                            | Cả thai kỳ                                | Chuyển hóa canxi, phát triển xương                                 | IOM/ACOG       |
| DHA (Omega-3) | ≥200 mg/ngày                                | Cả thai kỳ                                | Phát triển não và mắt thai nhi                                      | ACOG           |
| Iodine        | 220 mcg/ngày                                 | Cả thai kỳ                                | Phát triển tuyến giáp và não thai nhi                              | WHO/AAP        |

### 3.2 Thực phẩm cần tránh (Dữ liệu cho module “Food Safety”)

Cá chứa thủy ngân cao (cá mập, cá kiếm, cá thu vua, cá ngói) – nguy cơ tổn thương thần kinh thai nhi. Hạn chế cá ngừ đóng hộp ≤340g/tuần. Phô mai mềm chưa tiệt trùng (feta, brie, camembert) – nguy cơ Listeria. Thịt sống/tái, trứng sống – nguy cơ Toxoplasma, Salmonella. Thịt nguội, pâté – nguy cơ Listeria (cần hâm nóng đến bốc hơi). Sữa chưa tiệt trùng – nguy cơ Listeria, Toxoplasma. Hải sản sống (sushi, hàu sống) – nguy cơ ký sinh trùng, Norovirus. Rượu – KHÔNG có ngưỡng an toàn (nguyên nhân hàng đầu rối loạn phát triển thần kinh có thể phòng ngừa – Fetal Alcohol Spectrum Disorder).

---

## PHẦN IV: HỆ THỐNG CẢNH BÁO DẤU HIỆU NGUY HIỂM

### 4.1 Dấu hiệu cần đến cơ sở y tế NGAY LẬP TỨC (Emergency – Red Flag)

Dev cần xây dựng hệ thống cảnh báo Push Notification / Alert Screen khi thai phụ báo cáo các triệu chứng sau:

| Dấu hiệu                                                        | Nguyên nhân có thể                                           | Mức độ           |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------- |
| Chảy máu âm đạo                                              | Sẩy thai, nhau tiền đạo, nhau bong non, chuyển dạ sinh non | KHẨN CẤP          |
| Đau bụng dữ dội không giảm                                  | Nhau bong non, vỡ tử cung, thai ngoài tử cung (sớm)         | KHẨN CẤP          |
| Nhức đầu dữ dội không đáp ứng thuốc                     | Tiền sản giật, tăng huyết áp nặng                         | KHẨN CẤP          |
| Thay đổi thị giác (mờ, nhìn đôi, chớp sáng)             | Tiền sản giật nặng                                           | KHẨN CẤP          |
| Phù mặt/tay đột ngột, nhanh                                  | Tiền sản giật                                                 | KHẨN CẤP          |
| Đau thượng vị/hạ sườn phải dữ dội                       | Hội chứng HELLP, tiền sản giật nặng                        | KHẨN CẤP          |
| Sốt ≥38°C (100.4°F)                                           | Nhiễm trùng (viêm đài bể thận, viêm màng ối, cúm)     | KHẨN CẤP          |
| Khó thở nặng                                                   | Thuyên tắc phổi, suy tim, hen nặng                           | KHẨN CẤP          |
| Đau ngực, tim đập nhanh                                       | Thuyên tắc phổi, bệnh tim                                    | KHẨN CẤP          |
| Co giật                                                          | Sản giật (eclampsia)                                           | KHẨN CẤP TỐI ĐA |
| Thai không cử động / giảm cử động rõ rệt (sau tuần 28) | Suy thai, thai chết lưu                                        | KHẨN CẤP          |
| Rỉ/ối (dịch lỏng liên tục từ âm đạo)                    | Vỡ ối non, vỡ ối sớm                                        | KHẨN CẤP          |
| Cơn gò tử cung đều đặn trước 37 tuần                    | Chuyển dạ sinh non                                             | KHẨN CẤP          |
| Chóng mặt, ngất                                                | Xuất huyết nội, hạ huyết áp, thiếu máu nặng             | KHẨN CẤP          |
| Ý định tự gây hại / gây hại con                           | Rối loạn tâm thần chu sinh                                   | KHẨN CẤP TỐI ĐA |

**Tham chiếu:** CDC HEAR HER Campaign – Urgent Maternal Warning Signs; ACOG/SMFM Severe Maternal Morbidity Indicators.

### 4.2 Dấu hiệu cần tư vấn y tế trong 24 giờ (Yellow Flag)

Ốm nghén nặng không ăn uống được >24 giờ (nguy cơ mất nước, Hyperemesis Gravidarum). Tiểu buốt, tiểu rắt, tiểu đau (nhiễm trùng tiết niệu). Ngứa toàn thân dữ dội (đặc biệt lòng bàn tay, bàn chân – nguy cơ ứ mật thai kỳ / Intrahepatic Cholestasis of Pregnancy). Phù chân tăng nhanh kèm tăng cân nhanh bất thường. Đau lưng/bụng dưới liên tục kèm tiết dịch âm đạo bất thường. Cảm giác áp lực vùng chậu sớm bất thường.

---

## PHẦN V: CÁC LƯU Ý TRONG THAI KỲ (Module “Pregnancy Tips”)

### 5.1 Vận động thể chất

ACOG khuyến nghị ít nhất 150 phút/tuần vận động cường độ vừa phải (30 phút × 5 ngày). Các hoạt động an toàn bao gồm đi bộ, bơi lội, đạp xe tại chỗ, yoga bầu (prenatal yoga), các bài tập aerobic cường độ thấp. Cần tránh các hoạt động có nguy cơ ngã hoặc chấn thương bụng (cưỡi ngựa, trượt tuyết, các môn đối kháng), lặn biển (nguy cơ bệnh giảm áp cho thai nhi), nằm ngửa kéo dài sau tuần 20 (chèn ép tĩnh mạch chủ dưới).

Chống chỉ định vận động: ra máu âm đạo, nhau tiền đạo sau tuần 26, chuyển dạ sinh non, hở eo cổ tử cung, vỡ ối, tiền sản giật nặng, bệnh tim phổi nặng.

### 5.2 Tình dục

An toàn trong hầu hết thai kỳ bình thường. Cần kiêng khi: nhau tiền đạo, cổ tử cung hở/ngắn, vỡ ối, chuyển dạ sinh non, đa thai có nguy cơ.

### 5.3 Du lịch

An toàn đến 36 tuần (34–35 tuần đối với nhiều hãng hàng không). Bay dài >4 giờ: tăng nguy cơ huyết khối tĩnh mạch → đeo tất áp lực, đi lại mỗi 1–2 giờ, uống đủ nước. Luôn kiểm tra điều kiện y tế tại điểm đến. Tránh vùng dịch bệnh (Zika, sốt rét) – tham khảo CDC Travel Advisories.

### 5.4 Tiếp xúc môi trường

Tránh tiếp xúc phân mèo (nguy cơ Toxoplasmosis). Tránh thuốc trừ sâu, dung môi (toluene, benzene), kim loại nặng (chì, thủy ngân). Tránh bức xạ ion hóa (X-quang) trừ khi cần thiết; siêu âm và MRI không dùng bức xạ ion hóa nên an toàn. Tránh nhiệt độ cực đoan (xông hơi, bồn nước nóng) đặc biệt trong tam cá nguyệt 1.

### 5.5 Dây an toàn trên xe

Luôn thắt dây an toàn 3 điểm. Dây ngang đặt DƯỚI bụng (ngang hông), dây chéo qua giữa ngực và vai.

### 5.6 Chăm sóc răng miệng

An toàn và khuyến nghị khám nha khoa trong thai kỳ. Điều trị nha chu có thể thực hiện ở tam cá nguyệt 2. Điều trị cấp cứu nha khoa có thể thực hiện bất kỳ lúc nào. Viêm nha chu không điều trị liên quan tăng nguy cơ sinh non.

---

## PHẦN VI: YÊU CẦU KỸ THUẬT CHO DEV

### 6.1 Kiến trúc đề xuất

**Core Engine – Pregnancy Calendar Engine:** Tính tuổi thai từ LMP hoặc từ ngày siêu âm điều chỉnh (EDD). Tự động sinh lịch khám dựa trên tuổi thai, phân tầng nguy cơ. Gửi thông báo (Push Notification) trước mỗi lần khám 3 ngày và 1 ngày. Alert System cho dấu hiệu nguy hiểm (real-time).

**Database Schema chính:**

```
Patient {
  patient_id, name, dob, blood_type, rh_factor,
  pre_pregnancy_bmi, lmp_date, edd_date, edd_source (LMP/US),
  gravida, para, risk_factors[], allergies[],
  medical_history[], obstetric_history[],
  vaccination_history[], current_medications[]
}

Visit {
  visit_id, patient_id, gestational_age_weeks, gestational_age_days,
  visit_date, visit_type, visit_modality,
  blood_pressure_systolic, blood_pressure_diastolic,
  weight_kg, fundal_height_cm, fetal_heart_rate,
  urine_protein, urine_glucose,
  clinical_findings, assessments[],
  labs_ordered[], labs_results[],
  ultrasound_findings{},
  vaccinations_given[],
  medications_prescribed[],
  education_provided[],
  warning_signs_reported[],
  next_visit_date, provider_notes
}

LabTest {
  test_id, visit_id, test_name, test_category,
  ordered_date, result_date, result_value,
  reference_range, is_abnormal, clinical_significance
}

Alert {
  alert_id, patient_id, alert_type (RED/YELLOW/GREEN),
  symptom_reported, timestamp, action_required,
  resolved_status, resolved_date
}

ScreeningProtocol {
  protocol_id, gestational_age_range,
  screening_name, mandatory (bool),
  description, evidence_reference,
  sensitivity, specificity
}
```

### 6.2 Quy tắc logic nghiệp vụ (Business Logic Rules)

**Rule 1 – Tính EDD:** Nếu EDD_LMP và EDD_US khác nhau >5 ngày (khi US <8w6d), >7 ngày (US 9w0d–15w6d), >10 ngày (US 16w0d–21w6d), >14 ngày (US 22w0d–27w6d), >21 ngày (US >28w0d) → dùng EDD_US.

**Rule 2 – Phân tầng nguy cơ tự động:** Input: tuổi mẹ, BMI, tiền sử sản khoa, bệnh lý nền, kết quả xét nghiệm. Output: LOW_RISK / MODERATE_RISK / HIGH_RISK. HIGH_RISK → tăng tần suất khám, thêm các xét nghiệm đặc thù, giới thiệu chuyên gia.

**Rule 3 – Trigger nhắc nhở xét nghiệm:**

* Tuần 11–13w6d → Nhắc FTS/NIPT
* Tuần 15–22 → Nhắc Quad test (nếu chưa NIPT)
* Tuần 18–22 → Nhắc Anomaly Scan
* Tuần 24–28 → Nhắc GCT/OGTT
* Tuần 27–36 → Nhắc Tdap
* Tuần 36–37 → Nhắc GBS culture
* Tuần 28 → Nhắc Anti-D (nếu Rh âm)

**Rule 4 – Alert Engine:**

* Thai phụ báo cáo ≥1 triệu chứng RED FLAG → hiển thị ALERT ĐỎ + hướng dẫn “ĐẾN CƠ SỞ Y TẾ GẦN NHẤT NGAY” + gọi đường dây nóng.
* Thai phụ báo cáo triệu chứng YELLOW FLAG → hiển thị ALERT VÀNG + hướng dẫn “LIÊN HỆ BÁC SĨ TRONG 24 GIỜ”.

**Rule 5 – Tăng cân tracking:**

Dựa trên BMI trước mang thai, hệ thống tự tính khoảng tăng cân khuyến nghị theo IOM và hiển thị biểu đồ so sánh tuần theo tuần.

### 6.3 Module chức năng

**Module 1 – Pregnancy Timeline:** Hiển thị dạng timeline/calendar với các mốc khám, xét nghiệm, tiêm chủng. Mã màu: xanh lá (đã hoàn thành), vàng (sắp đến hạn), đỏ (quá hạn/bỏ lỡ).

**Module 2 – Visit Checklist:** Mỗi lần khám → checklist tự động các hạng mục cần thực hiện. Bác sĩ/nhân viên y tế tick xác nhận. Thai phụ xem được kết quả.

**Module 3 – Symptom Checker / Alert System:** Thai phụ nhập triệu chứng → hệ thống phân loại RED / YELLOW / GREEN. Giao diện đơn giản, dễ hiểu, nhiều ngôn ngữ.

**Module 4 – Lab Results Tracker:** Hiển thị kết quả xét nghiệm theo timeline. So sánh với khoảng tham chiếu. Đánh dấu bất thường.

**Module 5 – Weight & Growth Tracker:** Biểu đồ tăng cân mẹ (so với IOM recommendations). Biểu đồ tăng trưởng thai (dựa trên Hadlock, INTERGROWTH-21st, hoặc WHO Fetal Growth Charts).

**Module 6 – Kick Counter:** Bộ đếm cử động thai tích hợp. Tính giờ tự động. Cảnh báo nếu <10 cử động trong 2 giờ.

**Module 7 – Education Hub:** Bài viết/video theo tuần tuổi thai. Nội dung được gắn evidence reference. Chủ đề: dinh dưỡng, vận động, triệu chứng thường gặp, chuẩn bị sinh, cho con bú.

**Module 8 – Contraction Timer:** Đo thời gian và khoảng cách cơn gò. Hướng dẫn khi nào cần đến bệnh viện (quy tắc 5-1-1: gò mỗi 5 phút, mỗi cơn gò kéo dài 1 phút, kéo dài ít nhất 1 giờ).

---

## PHẦN VII: BẢNG THAM CHIẾU KHOA HỌC TOÀN DIỆN

| #  | Nguồn         | Nội dung                                                                               | Năm                |
| -- | -------------- | --------------------------------------------------------------------------------------- | ------------------- |
| 1  | WHO            | Recommendations on Antenatal Care for a Positive Pregnancy Experience (8-contact model) | 2016                |
| 2  | ACOG           | Clinical Consensus – Tailored Prenatal Care Delivery                                   | 2025                |
| 3  | ACOG           | Practice Bulletin 226 – Screening for Chromosomal Abnormalities                        | 2020                |
| 4  | ACOG           | Committee Opinion 804 – Physical Activity and Exercise During Pregnancy                | 2020                |
| 5  | ACOG           | Practice Bulletin 190 – Gestational Diabetes Mellitus                                  | 2018                |
| 6  | ACOG           | Committee Opinion 797 – Prevention of GBS Early-Onset Disease                          | 2020                |
| 7  | ACOG           | Practice Advisory – Low-Dose Aspirin Use for Prevention of Preeclampsia                | 2021                |
| 8  | ACOG           | Practice Bulletin 146 – Management of Late-Term and Post-term Pregnancies              | 2014                |
| 9  | NICE           | NG201 – Antenatal Care                                                                 | 2021 (updated 2025) |
| 10 | AAFP           | Prenatal Care: An Evidence-Based Approach (Am Fam Physician)                            | 2023                |
| 11 | USPSTF         | Screening for Gestational Diabetes Mellitus                                             | 2021                |
| 12 | USPSTF         | Aspirin Use to Prevent Preeclampsia                                                     | 2021                |
| 13 | CDC            | HEAR HER – Urgent Maternal Warning Signs                                               | 2024                |
| 14 | IADPSG         | International Criteria for GDM Diagnosis                                                | 2010                |
| 15 | Grobman et al. | ARRIVE Trial – Labor Induction at 39 Weeks (NEJM)                                      | 2018                |
| 16 | ISUOG          | Practice Guidelines – Sonographic Examination of the Fetal CNS                         | 2007 (updated)      |
| 17 | IOM            | Weight Gain During Pregnancy: Reexamining the Guidelines                                | 2009                |
| 18 | SMFM           | Updated Checklists for Preeclampsia Risk-Factor Screening                               | 2026                |
| 19 | Bộ Y tế VN   | Thông tư 34/2016/TT-BYT – Quy định sàng lọc trước sinh và sơ sinh            | 2016                |

---

## PHẦN VIII: LƯU Ý TRIỂN KHAI

### 8.1 Localization (Bản địa hóa)

Hệ thống cần hỗ trợ đa ngôn ngữ (tối thiểu: Tiếng Việt, Tiếng Anh). Lịch khám cần có thể điều chỉnh theo protocol quốc gia (ví dụ: Bộ Y tế Việt Nam khuyến nghị tối thiểu 3 lần khám ở 3 tam cá nguyệt, nhưng khuyến khích 7–10 lần cho thai kỳ đầy đủ). Đơn vị đo lường cần linh hoạt (kg/lb, cm/in, mmol/L vs mg/dL).

### 8.2 Bảo mật dữ liệu

Tuân thủ quy định bảo vệ dữ liệu y tế: HIPAA (Mỹ), GDPR (EU), Luật An ninh mạng và Nghị định 13/2023 (Việt Nam). Mã hóa end-to-end cho dữ liệu bệnh nhân. Xác thực đa yếu tố cho nhân viên y tế.

### 8.3 Tuyên bố miễn trừ trách nhiệm

Công cụ này KHÔNG thay thế tư vấn y khoa chuyên nghiệp. Mọi quyết định lâm sàng cần được thực hiện bởi bác sĩ sản khoa có chứng chỉ hành nghề. Thông tin dựa trên các guidelines quốc tế tính đến thời điểm xây dựng và cần được cập nhật định kỳ.

---

**Tài liệu này cung cấp đủ chi tiết lâm sàng dựa trên bằng chứng để đội ngũ phát triển phần mềm có thể xây dựng chính xác các tính năng cốt lõi. Mỗi mục đều có tham chiếu tới guideline/nghiên cứu cụ thể để đảm bảo tính chính xác y khoa. Dev nên làm việc trực tiếp với bác sĩ sản khoa để review từng module trước khi release.**
