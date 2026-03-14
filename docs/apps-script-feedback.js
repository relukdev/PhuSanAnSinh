/**
 * Google Apps Script — Hệ Thống Góp Ý & Đánh Giá Khách Hàng
 * Phòng Khám An Sinh — Từ Sơn, Bắc Ninh
 * 
 * SETUP:
 * 1. Tạo Google Sheet mới
 * 2. Đặt tên tab (sheet) = "Feedback"
 * 3. Tạo hàng tiêu đề (Row 1):
 *    A: Thời gian | B: Họ tên | C: SĐT | D: Dịch vụ | E: Xếp hạng (Sao)
 *    F: Tags nhanh | G: Đánh giá chi tiết | H: Góp ý cải thiện | I: Nguồn trang
 * 4. Extensions > Apps Script > paste code này
 * 5. Deploy > New deployment > Web app (Execute as: Me, Access: Anyone)
 */

const SHEET_NAME = 'Feedback';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    // Đợi tối đa 10 giây để lấy lock tránh xung đột ghi đè dữ liệu
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error('Không tìm thấy tab "' + SHEET_NAME + '". Vui lòng tạo tab này trước.');
    }

    if (!e || !e.parameter) {
      throw new Error('Dữ liệu gửi lên không hợp lệ hoặc trống.');
    }

    const p = e.parameter;
    const now = new Date();
    
    // --- Ghi dữ liệu vào sheet ---
    // Insert at row 2 (ngay dưới header)
    sheet.insertRowAfter(1);
    const rowData = [
      now,                          // A: Thời gian
      p.name || 'Ẩn danh',          // B: Họ tên
      p.phone || '',                // C: SĐT
      p.service || '',              // D: Dịch vụ
      p.rating || '',               // E: Xếp hạng (Sao)
      p.tags || '',                 // F: Tags nhanh
      p.review_text || '',          // G: Đánh giá chi tiết
      p.suggestions || '',          // H: Góp ý cải thiện
      p.url || '',                  // I: Nguồn trang
    ];

    sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Cảm ơn bạn đã gửi đóng góp ý kiến!'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: err.toString().replace('Error: ', '') 
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
