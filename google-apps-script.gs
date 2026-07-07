/**
 * Google Sheets — lead capture endpoint for the Klaviyo partner landing page.
 *
 * It receives one POST per step and UPSERTS a single row per visitor
 * (keyed by sessionId), so the sheet always shows each person's latest state
 * and you can see where people dropped off.
 *
 * SETUP
 * 1. Create a Google Sheet (any name).
 * 2. Extensions → Apps Script. Delete the starter code, paste this in, Save.
 * 3. Deploy → New deployment → type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Click Deploy, authorize when prompted.
 * 4. Copy the Web app URL (ends in /exec).
 * 5. In index.html, set:  const LEAD_ENDPOINT = "https://script.google.com/.../exec";
 *
 * The "Leads" tab and its header row are created automatically on first submit.
 */

const SHEET_NAME = 'Leads';
const HEADERS = [
  'sessionId', 'name', 'email',
  'path', 'pathLabel', 'category', 'categoryLabel',
  'step', 'startedAt', 'updatedAt',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid races when two people submit at once
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Ensure header row
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    const row = HEADERS.map(h => (data[h] !== undefined ? data[h] : ''));
    const lastRow = sheet.getLastRow();
    const ids = lastRow >= 2
      ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat()
      : [];
    const idx = ids.indexOf(data.sessionId);

    if (idx === -1) {
      sheet.appendRow(row);                                  // new visitor
    } else {
      sheet.getRange(idx + 2, 1, 1, HEADERS.length).setValues([row]); // update
    }
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}
