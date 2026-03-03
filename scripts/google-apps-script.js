/**
 * Google Apps Script — Phòng Khám An Sinh Booking Form Handler
 * 
 * Nhận dữ liệu form từ website và lưu vào Google Sheet.
 * 
 * SETUP:
 * 1. Tạo Google Sheet mới tên "An Sinh — Đặt Lịch Khám"
 * 2. Đổi tên sheet đầu tiên thành "DatLich"
 * 3. Thêm header row A1:I1 như sau:
 *    Timestamp | SĐT | Tên | Khung giờ | Dịch vụ | Lưu ý | Loại form | Trang nguồn | Bước
 * 4. Extensions > Apps Script > Paste code này
 * 5. Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy Web App URL → paste vào APPS_SCRIPT_URL trong BaseLayout.astro
 */

const SHEET_NAME = 'DatLich';
const NOTIFICATION_EMAIL = ''; // Thêm email nếu muốn nhận thông báo

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

        if (!sheet) {
            return ContentService.createTextOutput(
                JSON.stringify({ status: 'error', message: 'Sheet not found' })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        const params = e.parameter;
        const timestamp = new Date();
        const phone = (params.phone || '').trim();
        const name = (params.name || '').trim();
        const timeSlot = (params.timeSlot || '').trim();
        const service = (params.service || '').trim();
        const note = (params.note || '').trim();
        const formType = (params.formType || '').trim();
        const url = (params.url || '').trim();
        const step = (params.step || '').trim();

        // Validate phone
        if (!phone || !/^0\d{8,10}$/.test(phone.replace(/\s/g, ''))) {
            return ContentService.createTextOutput(
                JSON.stringify({ status: 'error', message: 'Invalid phone' })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        // Check for duplicate phone-only submissions within last 5 minutes
        if (step === 'phone-only') {
            const data = sheet.getDataRange().getValues();
            const fiveMinAgo = new Date(timestamp.getTime() - 5 * 60 * 1000);

            for (let i = data.length - 1; i >= 1; i--) {
                const rowTime = new Date(data[i][0]);
                if (rowTime < fiveMinAgo) break;
                if (data[i][1] === phone && data[i][8] === 'phone-only') {
                    // Already have this phone recently, skip
                    return ContentService.createTextOutput(
                        JSON.stringify({ status: 'ok', message: 'Duplicate skipped' })
                    ).setMimeType(ContentService.MimeType.JSON);
                }
            }
        }

        // Append row
        sheet.appendRow([
            timestamp,
            phone,
            name,
            timeSlot,
            service,
            note,
            formType,
            url,
            step
        ]);

        // Optional: Send email notification for full submissions
        if (NOTIFICATION_EMAIL && step === 'full') {
            const subject = `[An Sinh] Đặt lịch mới — ${phone}`;
            const body = [
                `📞 SĐT: ${phone}`,
                `👤 Tên: ${name || 'Chưa cung cấp'}`,
                `⏰ Khung giờ: ${timeSlot || 'Chưa chọn'}`,
                `🏥 Dịch vụ: ${service || 'Chưa chọn'}`,
                `📝 Lưu ý: ${note || 'Không'}`,
                `📋 Loại: ${formType}`,
                `🔗 Trang: ${url}`,
                `⏱ Thời gian: ${timestamp.toLocaleString('vi-VN')}`
            ].join('\n');

            MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
        }

        return ContentService.createTextOutput(
            JSON.stringify({ status: 'ok', message: 'Saved successfully' })
        ).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(
            JSON.stringify({ status: 'error', message: error.toString() })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

// GET handler for testing
function doGet(e) {
    return ContentService.createTextOutput(
        JSON.stringify({ status: 'ok', message: 'An Sinh Booking API is running' })
    ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create initial headers (run once manually)
 * Menu: Run > onOpen
 */
function setupHeaders() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
        SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
    }
    const target = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    target.getRange('A1:I1').setValues([[
        'Timestamp', 'SĐT', 'Tên', 'Khung giờ', 'Dịch vụ', 'Lưu ý', 'Loại form', 'Trang nguồn', 'Bước'
    ]]);
    target.getRange('A1:I1').setFontWeight('bold');
    target.getRange('A1:I1').setBackground('#f0f0f0');
    target.setFrozenRows(1);

    // Auto-resize columns
    for (let i = 1; i <= 9; i++) {
        target.autoResizeColumn(i);
    }
}
