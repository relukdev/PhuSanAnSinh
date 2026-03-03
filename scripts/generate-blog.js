import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const MATRIX_V2 = path.join(__dirname, 'content-matrix-v2.json');
const MATRIX_V1 = path.join(__dirname, 'content-matrix.json');

const B = {
    name: 'Phòng Khám An Sinh',
    addr: '416 Minh Khai, Đồng Nguyên, Từ Sơn, Bắc Ninh',
    phone: '0899 268 299',
    drPhone: '0869 935 808',
    hours: 'T2-T7: 17h-22h | CN: 8h-22h',
    bookUrl: 'https://phusanansinh.com/dat-lich-hen-kham.html',
    usp: ['BS chuyên khoa 20+ năm kinh nghiệm', 'Đánh giá 5.0⭐ Google Maps', 'Siêu âm 5D thế hệ mới', 'Kết quả online - tra cứu mọi lúc', 'Bảng giá công khai, minh bạch'],
};

const uspCheck = B.usp.map(u => '- ✅ **' + u + '**').join('\n');
const uspStar = B.usp.map(u => '- 🌟 **' + u + '**').join('\n');
const uspHeart = B.usp.map(u => '- 💚 **' + u + '**').join('\n');

const contactBlock = [
    '- **Địa chỉ:** ' + B.addr,
    '- **Hotline:** ' + B.phone,
    '- **BS tư vấn:** ' + B.drPhone,
    '- **Giờ khám:** ' + B.hours,
].join('\n');

const defaultWhenToSee = '- Khi các triệu chứng kéo dài\n- Kèm theo đau đớn dữ dội\n- Ảnh hưởng đến sinh hoạt hàng ngày';
const ctaFooter = (a) => '**' + a.ctaLine + '** [Đặt lịch khám](' + B.bookUrl + ') | Hotline: **' + B.phone + '**';
const disclaimer = '*Bài viết được biên soạn bởi đội ngũ bác sĩ chuyên khoa tại ' + B.name + '. Thông tin mang tính tham khảo, không thay thế tư vấn y khoa trực tiếp.*';

const templates = {
    guide(a) {
        const lines = [];
        lines.push('**' + a.hookLine + '**');
        lines.push('');
        lines.push('## ' + (a.h2_1 || 'Tổng quan'));
        lines.push('');
        lines.push(a.intro);
        lines.push('');
        lines.push(a.mainContent);
        if (a.tableSection) { lines.push(''); lines.push(a.tableSection); }
        lines.push('');
        lines.push('## Tại ' + B.name);
        lines.push('');
        lines.push('Tại ' + B.addr + ', chúng tôi cung cấp dịch vụ chất lượng cao:');
        lines.push('');
        lines.push(uspCheck);
        lines.push('');
        lines.push('> **💡 Lời khuyên từ bác sĩ:** ' + a.doctorAdvice);
        lines.push('');
        lines.push('## Khi nào nên đến gặp bác sĩ?');
        lines.push('');
        lines.push(a.whenToSee || defaultWhenToSee);
        lines.push('');
        lines.push('## Câu hỏi thường gặp');
        lines.push('');
        lines.push(a.faqItems || '');
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push(ctaFooter(a));
        lines.push('');
        lines.push(disclaimer);
        return lines.join('\n');
    },

    faq(a) {
        const lines = [];
        lines.push('**' + a.hookLine + '**');
        lines.push('');
        lines.push('## ' + a.title.split(':')[0]);
        lines.push('');
        lines.push(a.intro);
        lines.push('');
        lines.push(a.mainContent);
        if (a.tableSection) { lines.push(''); lines.push(a.tableSection); }
        lines.push('');
        lines.push('## Các câu hỏi thường gặp');
        lines.push('');
        lines.push(a.faqItems);
        lines.push('');
        lines.push('## Bác sĩ An Sinh giải đáp');
        lines.push('');
        lines.push('> "' + a.doctorAdvice + '" — BS. An Sinh');
        lines.push('');
        lines.push('## Tại sao chọn ' + B.name + '?');
        lines.push('');
        lines.push(uspStar);
        lines.push('');
        lines.push('### Thông tin liên hệ');
        lines.push('');
        lines.push(contactBlock);
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push(ctaFooter(a));
        lines.push('');
        lines.push(disclaimer);
        return lines.join('\n');
    },

    symptom(a) {
        const lines = [];
        lines.push('**' + a.hookLine + '**');
        lines.push('');
        lines.push('## ' + (a.h2_1 || 'Tổng quan'));
        lines.push('');
        lines.push(a.intro);
        lines.push('');
        lines.push('## Dấu hiệu nhận biết');
        lines.push('');
        lines.push(a.symptoms);
        lines.push('');
        lines.push(a.mainContent);
        if (a.tableSection) { lines.push(''); lines.push(a.tableSection); }
        lines.push('');
        lines.push('## Nguyên nhân');
        lines.push('');
        lines.push(a.causes);
        lines.push('');
        lines.push('## Điều trị tại ' + B.name);
        lines.push('');
        lines.push(a.treatment);
        lines.push('');
        lines.push(uspCheck);
        lines.push('');
        lines.push('> **💡 Lời khuyên:** ' + a.doctorAdvice);
        lines.push('');
        lines.push('## Phòng ngừa');
        lines.push('');
        lines.push(a.prevention);
        lines.push('');
        lines.push('## Khi nào cần đến gặp bác sĩ?');
        lines.push('');
        lines.push(a.whenToSee || defaultWhenToSee);
        lines.push('');
        lines.push('## Câu hỏi thường gặp');
        lines.push('');
        lines.push(a.faqItems || '');
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push(ctaFooter(a));
        lines.push('');
        lines.push('*Lưu ý: Bài viết mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa.*');
        return lines.join('\n');
    },

    local(a) {
        const lines = [];
        lines.push('**' + a.hookLine + '**');
        lines.push('');
        lines.push('## Tại sao nên ' + (a.localAction || 'khám') + ' tại ' + (a.localArea || 'Từ Sơn Bắc Ninh') + '?');
        lines.push('');
        lines.push(a.localReasons);
        lines.push('');
        lines.push(a.mainContent);
        lines.push('');
        lines.push('## So sánh ' + B.name + ' vs Bệnh viện tuyến trên');
        lines.push('');
        lines.push(a.tableSection);
        lines.push('');
        lines.push('## Dịch vụ tại ' + B.name);
        lines.push('');
        lines.push(a.services);
        lines.push('');
        lines.push('## Câu hỏi thường gặp');
        lines.push('');
        lines.push(a.faqItems || '');
        lines.push('');
        lines.push('> **💡 Lời khuyên từ bác sĩ:** ' + a.doctorAdvice);
        lines.push('');
        lines.push('## Thông tin phòng khám');
        lines.push('');
        lines.push(contactBlock);
        lines.push('- **Google Maps:** ⭐ 5.0 — Đánh giá cao nhất khu vực');
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push(ctaFooter(a));
        lines.push('');
        lines.push('*' + B.name + ' — Đồng hành cùng sức khỏe gia đình bạn.*');
        return lines.join('\n');
    },

    comparison(a) {
        const lines = [];
        lines.push('**' + a.hookLine + '**');
        lines.push('');
        lines.push('## ' + (a.h2_1 || 'Tổng quan'));
        lines.push('');
        lines.push(a.intro);
        lines.push('');
        lines.push('## So sánh chi tiết');
        lines.push('');
        lines.push(a.tableSection);
        lines.push('');
        lines.push(a.mainContent);
        lines.push('');
        lines.push('> "' + a.doctorAdvice + '" — BS. An Sinh');
        lines.push('');
        lines.push('## Câu hỏi thường gặp');
        lines.push('');
        lines.push(a.faqItems || '');
        lines.push('');
        lines.push('## Tại ' + B.name);
        lines.push('');
        lines.push(uspCheck);
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push(ctaFooter(a));
        return lines.join('\n');
    },

    checklist(a) {
        const lines = [];
        lines.push('**' + a.hookLine + '**');
        lines.push('');
        lines.push('## ' + (a.h2_1 || 'Tổng quan'));
        lines.push('');
        lines.push(a.intro);
        lines.push('');
        lines.push('## Checklist chi tiết');
        lines.push('');
        lines.push(a.checklistItems);
        lines.push('');
        lines.push(a.mainContent);
        if (a.tableSection) { lines.push(''); lines.push(a.tableSection); }
        lines.push('');
        lines.push('> **💡 Bác sĩ khuyên:** ' + a.doctorAdvice);
        lines.push('');
        lines.push('## Câu hỏi thường gặp');
        lines.push('');
        lines.push(a.faqItems || '');
        lines.push('');
        lines.push('## Tại ' + B.name);
        lines.push('');
        lines.push(uspCheck);
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push(ctaFooter(a));
        return lines.join('\n');
    },

    journey(a) {
        const lines = [];
        lines.push('**' + a.hookLine + '**');
        lines.push('');
        lines.push('## ' + (a.h2_1 || 'Tổng quan'));
        lines.push('');
        lines.push(a.intro);
        lines.push('');
        lines.push(a.mainContent);
        if (a.tableSection) { lines.push(''); lines.push(a.tableSection); }
        lines.push('');
        lines.push('## Hành trình tại ' + B.name);
        lines.push('');
        lines.push(a.journeySteps);
        lines.push('');
        lines.push('> "' + a.doctorAdvice + '" — BS. An Sinh');
        lines.push('');
        lines.push('## Câu hỏi thường gặp');
        lines.push('');
        lines.push(a.faqItems || '');
        lines.push('');
        lines.push('## Bạn không đơn độc');
        lines.push('');
        lines.push(uspHeart);
        lines.push('');
        lines.push('### Liên hệ');
        lines.push('');
        lines.push(contactBlock);
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push(ctaFooter(a));
        lines.push('');
        lines.push('*' + B.name + ' — Đồng hành cùng bạn trên hành trình tìm con.*');
        return lines.join('\n');
    },

    treatment(a) {
        const lines = [];
        lines.push('**' + a.hookLine + '**');
        lines.push('');
        lines.push('## ' + (a.h2_1 || 'Tổng quan'));
        lines.push('');
        lines.push(a.intro);
        lines.push('');
        lines.push('## Phương pháp điều trị');
        lines.push('');
        lines.push(a.mainContent);
        if (a.tableSection) { lines.push(''); lines.push(a.tableSection); }
        lines.push('');
        lines.push('## Điều trị tại ' + B.name);
        lines.push('');
        lines.push(a.treatment);
        lines.push('');
        lines.push(uspCheck);
        lines.push('');
        lines.push('> **💡 Lời khuyên:** ' + a.doctorAdvice);
        lines.push('');
        lines.push('## Câu hỏi thường gặp');
        lines.push('');
        lines.push(a.faqItems || '');
        lines.push('');
        lines.push('## Khi nào nên đến gặp bác sĩ?');
        lines.push('');
        lines.push(a.whenToSee || defaultWhenToSee);
        lines.push('');
        lines.push('---');
        lines.push('');
        lines.push(ctaFooter(a));
        lines.push('');
        lines.push('*Lưu ý: Thông tin mang tính tham khảo. Hãy tham khảo ý kiến bác sĩ chuyên khoa.*');
        return lines.join('\n');
    },
};

function generateFrontmatter(article) {
    const pubDate = generateDate(article.index);
    const wordCount = countWords(article);
    const readTime = Math.max(5, Math.round(wordCount / 200));
    const featured = article.index <= 10 || article.index % 20 === 0;
    return '---\ntitle: "' + article.title + '"\ndescription: "' + article.description + '"\npubDate: ' + pubDate + '\ncategory: "' + article.category + '"\ntags: ' + JSON.stringify(article.tags) + '\nauthor: "BS. An Sinh"\nreadingTime: ' + readTime + '\nfeatured: ' + featured + '\n---';
}

function countWords(article) {
    const type = article.type || 'guide';
    const tmpl = templates[type] || templates.guide;
    const body = tmpl(article);
    return body.split(/\s+/).filter(w => w.length > 0).length;
}

function generateDate(index) {
    const base = new Date('2026-02-15');
    base.setDate(base.getDate() + Math.floor(index / 3));
    return base.toISOString().split('T')[0];
}

function generateMDX(article) {
    const type = article.type || 'guide';
    const tmpl = templates[type] || templates.guide;
    const fm = generateFrontmatter(article);
    const body = tmpl(article);
    return fm + '\n' + body.trim() + '\n';
}

function main() {
    const matrixFile = fs.existsSync(MATRIX_V2) ? MATRIX_V2 : MATRIX_V1;
    console.log('📖 Using matrix: ' + path.basename(matrixFile));

    const articles = JSON.parse(fs.readFileSync(matrixFile, 'utf-8'));
    if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

    const skipSlugs = new Set([
        'acog-vs-nice-sang-loc-tien-san-giat',
        'cong-thuc-hadlock-intergrowth-21st-can-nang-thai-nhi',
        'cong-thuc-naegele-acog-700-tinh-ngay-du-sinh',
        'lich-kham-thai-theo-tuan',
        'mo-hinh-fmf-quipp-du-doan-sinh-non',
        'phong-kham-phu-khoa-tu-son',
        'phuong-phap-tinh-ngay-rung-trung-pha-hoang-the',
        'sieu-am-5d-la-gi',
    ]);

    let created = 0, skipped = 0, wordCounts = [];
    const forceOverwrite = process.argv.includes('--force');

    for (const article of articles) {
        if (skipSlugs.has(article.slug)) { skipped++; continue; }
        const filePath = path.join(BLOG_DIR, article.slug + '.mdx');
        if (fs.existsSync(filePath) && !forceOverwrite) { skipped++; continue; }

        const content = generateMDX(article);
        const wc = content.split(/\s+/).filter(w => w.length > 0).length;
        wordCounts.push(wc);
        fs.writeFileSync(filePath, content, 'utf-8');
        created++;
    }

    const avg = wordCounts.length ? Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length) : 0;
    const min = wordCounts.length ? Math.min(...wordCounts) : 0;
    const max = wordCounts.length ? Math.max(...wordCounts) : 0;

    console.log('\n✅ Done!');
    console.log('📝 Created: ' + created + ' | Skipped: ' + skipped + ' | Total: ' + articles.length);
    console.log('📊 Word counts — Avg: ' + avg + ' | Min: ' + min + ' | Max: ' + max);
}

main();
