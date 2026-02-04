const WIDGET_CONFIG = {
  SHEET_NAME: 'Main',
  // Header labels to read from the sheet
  NAME_HEADER: 'Event Name',
  DATE_HEADER: 'Event Date',
  ICON_HEADER: 'Widget Emoji',
  COLOR_HEADER: 'Widget Clr'
};

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WIDGET_CONFIG.SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet "' + WIDGET_CONFIG.SHEET_NAME + '" not found');
  }

  const data = sheet.getDataRange().getValues();
  const events = [];
  if (data.length < 2) {
    return ContentService
      .createTextOutput(JSON.stringify(events))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = data[0].map(String);
  const idx = {
    name: headers.indexOf(WIDGET_CONFIG.NAME_HEADER),
    date: headers.indexOf(WIDGET_CONFIG.DATE_HEADER),
    icon: headers.indexOf(WIDGET_CONFIG.ICON_HEADER),
    color: headers.indexOf(WIDGET_CONFIG.COLOR_HEADER)
  };

  if (idx.name === -1 || idx.date === -1) {
    throw new Error('Missing required headers: ' + WIDGET_CONFIG.NAME_HEADER + ' / ' + WIDGET_CONFIG.DATE_HEADER);
  }

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const name = row[idx.name];
    const date = row[idx.date];
    const icon = idx.icon !== -1 ? (row[idx.icon] || '📅') : '📅';
    const color = idx.color !== -1 ? (row[idx.color] || '') : '';

    // Skip empty rows
    if (!name || !date) continue;

    // Always format the date string as "Mon D, YYYY"
    let formattedDate;
    if (date instanceof Date) {
      formattedDate = formatDateLong_(date, Session.getScriptTimeZone());
    } else {
      formattedDate = String(date || '').trim(); // fallback to what's in the cell
    }

    // Build event object
    const event = {
      name: name,
      date: formattedDate,
      icon: icon
    };

    // Only add color if present
    if (color) {
      event.color = color;
    }

    events.push(event);
  }

  return ContentService
    .createTextOutput(JSON.stringify(events))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatDateLong_(dateObj, tz) {
  const monthName = Utilities.formatDate(dateObj, tz, 'MMM');
  const dayNum = Utilities.formatDate(dateObj, tz, 'd');
  const yearNum = Utilities.formatDate(dateObj, tz, 'yyyy');
  return monthName + ' ' + dayNum + ', ' + yearNum;
}