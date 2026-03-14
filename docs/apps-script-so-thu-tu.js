/**
 * Google Apps Script — Hệ Thống Lấy Số Thứ Tự Khám v2.0
 * Phòng Khám An Sinh — Từ Sơn, Bắc Ninh
 *
 * CẤU TRÚC DATABASE TRÊN GOOGLE SHEET:
 * Cần tạo 3 tabs (sheet) sau trong cùng 1 Spreadsheet:
 * 
 * 1. "SoThuTu": Lưu lịch sử khách lấy số (A: STT, B: Thời gian, C: Họ tên, D: Ngày sinh, E: Giới tính, F: SĐT, G: Khu vực, H: Nhu cầu khám, I: Ghi chú, J: Nguồn, K: Trạng thái (Đang chờ/Đã gọi))
 * 2. "Config_Rooms": Cấu hình phòng khám (A: Mã Phòng, B: Tên Bác sĩ, C: Dịch vụ hỗ trợ (cách nhau dấu phẩy), D: Trạng thái (Active/Inactive))
 * 3. "Current_Status": Trạng thái hiện tại của màn hình (A: Mã Phòng, B: Số đang gọi, C: Tên khách, D: Thời gian gọi)
 *
 * API ENDPOINTS (thông qua tham số ?action=...):
 * - GET ?action=getConfig -> Trả về danh sách phòng đang active
 * - GET ?action=getCurrent -> Trả về số đang gọi ở các phòng hiển thị lên Tivi
 * - POST ?action=book -> Khách lấy số mới (thêm vào sheet SoThuTu)
 * - POST ?action=adminCallNext -> Bác sĩ gọi số tiếp theo (cập nhật Current_Status và đánh dấu 'Đã gọi' bên SoThuTu)
 */

const SHEET_HISTORY = 'SoThuTu';
const SHEET_CONFIG = 'Config_Rooms';
const SHEET_STATUS = 'Current_Status';

/**
 * Mã viết tắt cho từng dịch vụ khám.
 */
const SERVICE_CODES = {
  'Khám thai định kỳ': 'KT',
  'Siêu âm 5D':       'SA',
  'Khám phụ khoa':    'PK',
  'Khám nam khoa':    'NK',
  'Điều trị vô sinh': 'HM',
  'Tư vấn tránh thai':'TT',
  'Tư vấn chung':     'CH',
};

function doPost(e) {
  try {
    const action = e.parameter.action || '';
    let data;
    
    if (action === 'book') {
      data = handleBook(e);
    } else if (action === 'adminCallNext') {
      data = handleAdminCallNext(e);
    } else {
      throw new Error('Action POST không hợp lệ: ' + action);
    }
    return jsonResponse(data);
  } catch (err) {
    return jsonResponse({
      status: 'error',
      message: err.toString().replace('Error: ', '')
    });
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action || 'getCurrent';
    let data;

    if (action === 'getConfig') {
      data = handleGetConfig();
    } else if (action === 'getCurrent') {
      data = handleGetCurrent();
    } else {
      throw new Error('Action GET không hợp lệ: ' + action);
    }

    // CORS JSONP Support
    const cb = e.parameter.callback;
    if (cb) {
      return ContentService.createTextOutput(cb + '(' + JSON.stringify(data) + ');')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return jsonResponse(data);
  } catch (err) {
    const errorData = { status: 'error', message: err.toString().replace('Error: ', '') };
    const cb = e && e.parameter && e.parameter.callback;
    if (cb) {
      return ContentService.createTextOutput(cb + '(' + JSON.stringify(errorData) + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return jsonResponse(errorData);
  }
}

// ============================================================================
// CÁC HÀM XỬ LÝ CHÍNH
// ============================================================================

/**
 * [GET] /?action=getConfig
 * Trả về danh sách phòng đang hoạt động và bác sĩ từ tab Config_Rooms
 */
function handleGetConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_CONFIG);
  if (!sheet) throw new Error('Không tìm thấy tab ' + SHEET_CONFIG);

  const data = sheet.getDataRange().getValues();
  const rooms = [];
  
  // Bỏ qua dòng header (dòng 0)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const roomId = row[0];
    const doctorName = row[1];
    const services = row[2];
    const status = (row[3] || '').toString().trim().toUpperCase();
    
    if (roomId && status === 'ACTIVE') {
      rooms.push({
        roomId: roomId,
        doctorName: doctorName,
        services: services.split(',').map(s => s.trim()).filter(s => s)
      });
    }
  }

  return { status: 'success', data: rooms };
}

/**
 * [GET] /?action=getCurrent
 * Trả về danh sách số đang thực hiện khám tại các phòng từ tab Current_Status
 */
function handleGetCurrent() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_STATUS);
  if (!sheet) throw new Error('Không tìm thấy tab ' + SHEET_STATUS);

  const data = sheet.getDataRange().getValues();
  const currentNum = {};
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const roomId = row[0];
    if (roomId) {
      currentNum[roomId] = {
        queueNumber: row[1] || '',
        customerName: row[2] || '',
        timeCalled: row[3] || ''
      };
    }
  }

  return { status: 'success', data: currentNum };
}

/**
 * [POST] /?action=book
 * Xử lý khách hàng bốc số mới
 */
function handleBook(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetHistory = ss.getSheetByName(SHEET_HISTORY);
    if (!sheetHistory) throw new Error('Không tìm thấy tab ' + SHEET_HISTORY);

    const p = e.parameter;
    const now = new Date();
    
    // Validate
    const name = (p.name || '').trim();
    const phone = (p.phone || '').trim().replace(/\s/g, '');
    const serviceName = (p.service || '').trim();

    if (!name) throw new Error('Họ và tên là bắt buộc.');
    if (!phone) throw new Error('Số điện thoại là bắt buộc.');
    if (!/^0\d{8,10}$/.test(phone)) throw new Error('Số điện thoại không đúng (0xxx).');
    if (!SERVICE_CODES[serviceName]) throw new Error('Dịch vụ không hợp lệ.');

    const serviceCode = SERVICE_CODES[serviceName];
    const queueNumber = generateQueueNumber(sheetHistory, now, serviceCode);

    // Ghi dữ liệu vào sheet (dòng 2)
    sheetHistory.insertRowAfter(1);
    const rowData = [
      queueNumber,                  // A: STT
      now,                          // B: Thời gian hẹn
      name,                         // C: Họ tên
      p.dob || '',                  // D: Ngày sinh
      p.gender || 'Nữ',             // E: Giới tính
      phone,                        // F: SĐT
      p.area || '',                 // G: Khu vực
      serviceName,                  // H: Nhu cầu khám
      p.note || '',                 // I: Ghi chú
      p.url || '',                  // J: Nguồn trang
      'Đang chờ'                    // K: Trạng thái
    ];

    sheetHistory.getRange(2, 1, 1, 11).setValues([rowData]);

    return {
      status: 'success',
      queueNumber: queueNumber,
      name: name,
      service: serviceName,
      time: Utilities.formatDate(now, 'Asia/Ho_Chi_Minh', 'HH:mm dd/MM/yyyy')
    };

  } finally {
    lock.releaseLock();
  }
}

/**
 * [POST] /?action=adminCallNext
 * Dành cho Bác sĩ/Admin: Gọi người tiếp theo vào phòng
 * Cần truyền tham số: roomId (Mã phòng), nextQueueNumber (Số gọi tiếp theo)
 */
function handleAdminCallNext(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    const roomId = e.parameter.roomId;
    const nextQueueNumber = e.parameter.nextQueueNumber;
    
    if (!roomId) throw new Error('Tham số roomId là bắt buộc.');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetStatus = ss.getSheetByName(SHEET_STATUS);
    const sheetHistory = ss.getSheetByName(SHEET_HISTORY);
    const now = new Date();
    
    // 1. Cập nhật Số đang gọi vào bảng Current_Status
    const statusData = sheetStatus.getDataRange().getValues();
    let foundRoom = false;
    let customerName = 'Khách hàng';

    // Tìm tên khách hàng trong history
    if (nextQueueNumber) {
        const histData = sheetHistory.getDataRange().getValues();
        // Giới hạn tìm 1000 người gần nhất
        for(let j = 1; j < Math.min(histData.length, 1000); j++) {
            if (histData[j][0] === nextQueueNumber) {
                customerName = histData[j][2]; // Họ tên ở cột C
                // Cập nhật trạng thái người này thành Đã gọi
                sheetHistory.getRange(j + 1, 11).setValue('Đã gọi'); // Cột K thay vì chỉ insert
                break;
            }
        }
    } else {
        customerName = ''; // Không truyền số thì dọn trống phòng
    }

    for (let i = 1; i < statusData.length; i++) {
      if (statusData[i][0] == roomId) {
        sheetStatus.getRange(i + 1, 2, 1, 3).setValues([[
          nextQueueNumber || '',
          customerName,
          now
        ]]);
        foundRoom = true;
        break;
      }
    }
    
    if (!foundRoom) {
      // Nếu phòng chưa có trong list, thêm mới (A,B,C,D)
      sheetStatus.appendRow([roomId, nextQueueNumber || '', customerName, now]);
    }

    return {
      status: 'success',
      roomId: roomId,
      calledNumber: nextQueueNumber,
      customerName: customerName
    };
    
  } finally {
    lock.releaseLock();
  }
}

// ============================================================================
// UTILITIES
// ============================================================================

function generateQueueNumber(sheet, now, serviceCode) {
  const tz = 'Asia/Ho_Chi_Minh';
  const dateStr = Utilities.formatDate(now, tz, 'yyMMdd');
  const datePrefix = dateStr + '-';

  const lastRow = sheet.getLastRow();
  let maxNum = 0;

  if (lastRow > 1) {
    const startRow = Math.max(2, lastRow - 999);
    const numRows = lastRow - startRow + 1;
    const sttRange = sheet.getRange(startRow, 1, numRows, 1).getValues();
    
    for (let i = 0; i < sttRange.length; i++) {
      const stt = String(sttRange[i][0]);
      if (stt.startsWith(datePrefix)) {
        const parts = stt.split('-');
        if (parts.length === 3) {
          const num = parseInt(parts[2], 10);
          if (!isNaN(num) && num > maxNum) {
            maxNum = num;
          }
        }
      }
    }
  }

  const nextNum = String(maxNum + 1).padStart(3, '0');
  return dateStr + '-' + serviceCode + '-' + nextNum;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
