// Google Apps Script for Birthday & Event Tracker (Sheet → Google Calendar)
// Copy this into the Script Editor bound to your Google Sheet.

const CONFIG = {
  CALENDAR_ID: 'b....@group.calendar.google.com', // use 'primary' or any other calendar ID
  SHEET_NAME: 'Main',

  HEADER_ROW: 1
};

// Expected header names in the Events sheet:
// ID | Event Name | Event Date | Event Type | Owner Timezone | All Day? | Exact Local Time | Relative Reminders (days, comma-separated) | Notes | Active?

function syncEventsFromSheet() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) {
    return; // another sync is already running
  }

  const props = PropertiesService.getScriptProperties();
  const now = Date.now();
  const lastRun = Number(props.getProperty('last_sync_ts') || 0);
  if (now - lastRun < 60000) { // 60s debounce to avoid double triggers
    lock.releaseLock();
    return;
  }
  props.setProperty('last_sync_ts', String(now));

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    lock.releaseLock();
    throw new Error('Sheet "' + CONFIG.SHEET_NAME + '" not found');
  }

  const calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!calendar) {
    lock.releaseLock();
    throw new Error('Calendar "' + CONFIG.CALENDAR_ID + '" not found');
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow <= CONFIG.HEADER_ROW) return; // no data

  const dataRange = sheet.getRange(CONFIG.HEADER_ROW, 1, lastRow, lastCol);
  const values = dataRange.getValues();
  const headers = values[0].map(String);

  const idx = {
    id: headers.indexOf('ID'),
    name: headers.indexOf('Event Name'),
    date: headers.indexOf('Event Date'),
    type: headers.indexOf('Event Type'),
    ownerTz: headers.indexOf('Owner Timezone'),
    allDay: headers.indexOf('All Day?'),
    exactLocalTime: headers.indexOf('Exact Local Time'),
    relReminders: headers.indexOf('Relative Reminders'),
    notes: headers.indexOf('Notes'),
    active: headers.indexOf('Active?'),
    widgetEmoji: headers.indexOf('Widget Emoji')
  };

  // Basic header validation
  const requiredHeaders = [
    'ID',
    'Event Name',
    'Event Date',
    'Event Type',
    'Owner Timezone',
    'All Day?',
    'Exact Local Time',
    'Relative Reminders',
    'Notes',
    'Active?'
  ];
  requiredHeaders.forEach(h => {
    if (headers.indexOf(h) === -1) {
      throw new Error('Missing header column: ' + h);
    }
  });

  // Iterate rows (skip header row)
  const currentMainEventIds = {};
  const currentTitles = {};

  for (let r = CONFIG.HEADER_ROW + 1; r <= lastRow; r++) {
    const row = sheet.getRange(r, 1, 1, lastCol).getValues()[0];

    const active = String(row[idx.active] || '').toLowerCase();
    if (active !== 'yes' && active !== 'y' && active !== 'true') {
      continue; // skip inactive rows
    }

    const eventId = String(row[idx.id] || '').trim();
    const name = String(row[idx.name] || '').trim();
    const eventType = String(row[idx.type] || '').trim();
    const notes = String(row[idx.notes] || '').trim();
    const ownerTz = String(row[idx.ownerTz] || '').trim() || Session.getScriptTimeZone();
    // Auto-fill widget emoji based on event type, if column exists and empty
    if (idx.widgetEmoji !== -1) {
      const existingEmoji = String(row[idx.widgetEmoji] || '').trim();
      if (!existingEmoji) {
        const autoEmoji = getEmojiForEventType_(eventType);
        if (autoEmoji) {
          sheet.getRange(r, idx.widgetEmoji + 1).setValue(autoEmoji);
        }
      }
    }
    const allDayFlag = String(row[idx.allDay] || '').toLowerCase();
    let isAllDay = allDayFlag === 'yes' || allDayFlag === 'y' || allDayFlag === 'true';

    // Force birthdays and anniversaries to be all-day events, even if
    // the sheet flag is wrong or missing.
    const typeLower = eventType.trim().toLowerCase();
    if (typeLower === 'birthday' || typeLower === 'anniversary') {
      isAllDay = true;
    }

    const dateCell = parseDateCell_(row[idx.date]);
    if (!(dateCell instanceof Date)) {
      // skip invalid date rows
      continue;
    }

    let targetExactTimeStr = String(row[idx.exactLocalTime] || '').trim();
    const relRemindersStr = String(row[idx.relReminders] || '').trim();

    const scriptTz = Session.getScriptTimeZone();

    // Compute this year's occurrence (or next year if already passed)
    const today = new Date();
    const year = today.getFullYear();
    const month = dateCell.getMonth();
    const day = dateCell.getDate();

    let eventStart = new Date(year, month, day); // treated in script timezone
    if (isAllDay) {
      // All-day event: just the date; if already in the past, move to next year
      if (eventStart < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        eventStart = new Date(year + 1, month, day);
      }
    } else {
      // Timed events: keep time from dateCell
      eventStart = new Date(year, month, day, dateCell.getHours(), dateCell.getMinutes());
      if (eventStart < today) {
        eventStart = new Date(year + 1, month, day, dateCell.getHours(), dateCell.getMinutes());
      }
    }

    const sameOffset = areTimezonesAlignedForDate_(eventStart, ownerTz, scriptTz);

    // If Exact Local Time is empty, auto-calculate it based on the
    // event date and owner's timezone (owner day start mapped to local time).
    if (!targetExactTimeStr && ownerTz && !sameOffset) {
      const baseForTz = new Date(new Date().getFullYear(), dateCell.getMonth(), dateCell.getDate());
      const autoTime = computeExactLocalTimeFromOwnerMidnight_(baseForTz, ownerTz, scriptTz);
      if (autoTime) {
        targetExactTimeStr = autoTime;
        // Persist back to the sheet so it stays visible/editable.
        sheet.getRange(r, idx.exactLocalTime + 1).setValue(autoTime);
      }
    }

    // Local date-time when it becomes the owner's birthday (00:00 in owner timezone)
    const ownerMidnightLocal = computeOwnerMidnightLocalDateTime_(
      new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate()),
      ownerTz,
      scriptTz
    );

    const description = buildDescription(notes, dateCell, ownerTz, scriptTz);
    const title = buildEventTitle(name, eventType);
    let remindersMinutes = parseRelativeReminders(relRemindersStr);
    if (sameOffset) {
      // Same timezone (or same offset): do not create a separate reminder series.
      // Keep relative reminders so they are applied directly to the main event.
      targetExactTimeStr = '';
      if (idx.exactLocalTime !== -1 && String(row[idx.exactLocalTime] || '').trim()) {
        sheet.getRange(r, idx.exactLocalTime + 1).setValue('');
      }
    }

    // If Exact Local Time is empty, derive it from the smallest relative reminder
    // so reminders still fire at the intended absolute times.
    if (!sameOffset && !targetExactTimeStr && remindersMinutes && remindersMinutes.length) {
      const anchor = ownerMidnightLocal || eventStart;
      const derived = deriveExactTimeFromReminders_(anchor, remindersMinutes, scriptTz);
      if (derived) {
        targetExactTimeStr = derived.timeStr;
        remindersMinutes = derived.adjustedReminders;
        // Persist back to the sheet so it stays visible/editable.
        sheet.getRange(r, idx.exactLocalTime + 1).setValue(targetExactTimeStr);
      }
    }

    // Create or update calendar event
    const newEventId = upsertCalendarEvent_(calendar, {
      eventId,
      title,
      eventType,
      notes: description,
      isAllDay,
      eventStart,
      ownerMidnightLocal,
      scriptTz,
      targetExactTimeStr,
      remindersMinutes
    });

    // Write back new event ID if changed
    if (newEventId && newEventId !== eventId) {
      sheet.getRange(r, idx.id + 1).setValue(newEventId);
    }

    if (newEventId) {
      currentMainEventIds[newEventId] = true;
    }
    if (title) {
      currentTitles[title] = true;
    }
  }

  // Delete main events that were removed from the sheet
  cleanupRemovedMainEvents_(calendar, currentMainEventIds, currentTitles);

  lock.releaseLock();
}

function buildDescription(notes, eventDate, ownerTz, scriptTz) {
  let desc = notes || '';

  // For events where the owner's timezone differs from the script/user
  // timezone, append the owner's original event-date info.
  if (eventDate instanceof Date && ownerTz && scriptTz && ownerTz !== scriptTz) {
    const ownerDateStr = Utilities.formatDate(eventDate, ownerTz, 'yyyy-MM-dd');

    desc += (desc ? '\n\n' : '');
    desc += 'Original Date: ' + ownerDateStr + ' (' + ownerTz + ')';
  }

  return desc;
}

// Build a friendly title like "Yasvi's Birthday" from name + type.
function buildEventTitle(name, eventType) {
  const cleanName = String(name || '').trim();
  const cleanType = String(eventType || '').trim();

  if (!cleanName && !cleanType) return '';
  if (!cleanType) return cleanName;
  if (!cleanName) return cleanType;

  let possessive = cleanName;
  if (/s$/i.test(cleanName)) {
    possessive += "'";
  } else {
    possessive += "'s";
  }
  return possessive + ' ' + cleanType;
}

function parseRelativeReminders(relRemindersStr) {
  if (!relRemindersStr) return [7 * 24 * 60, 1 * 24 * 60]; // default: 1 week, 1 day
  const parts = relRemindersStr.split(',').map(s => s.trim()).filter(Boolean);
  const minutes = [];
  parts.forEach(p => {
    const days = parseFloat(p);
    if (!isNaN(days) && days >= 0) {
      minutes.push(Math.round(days * 24 * 60));
    }
  });
  if (!minutes.length) {
    return [7 * 24 * 60, 1 * 24 * 60];
  }
  return minutes;
}

function getEmojiForEventType_(eventType) {
  const t = String(eventType || '').trim().toLowerCase();
  if (!t) return '';
  if (t === 'birthday') return '🎂';
  if (t === 'anniversary') return '🥂';
  if (t === 'event') return '🗓';
  if (t === 'ended') return '🗓';
  return '📅';
}

function deriveExactTimeFromReminders_(anchorDate, remindersMinutes, scriptTz) {
  if (!anchorDate || !(anchorDate instanceof Date)) return null;
  if (!remindersMinutes || !remindersMinutes.length) return null;
  const min = Math.min.apply(null, remindersMinutes);
  const eventTime = new Date(anchorDate.getTime() - min * 60 * 1000);
  const timeStr = Utilities.formatDate(eventTime, scriptTz, 'HH:mm');
  const adjusted = remindersMinutes.map(m => Math.max(0, m - min));
  return { timeStr: timeStr, adjustedReminders: adjusted };
}

// Returns true when the owner timezone and script timezone share the
// same UTC offset for the given date (e.g., New York and Toronto).
function areTimezonesAlignedForDate_(dateObj, ownerTz, scriptTz) {
  if (!ownerTz || !scriptTz) return false;
  try {
    const ownerOffset = Utilities.formatDate(dateObj, ownerTz, 'Z');
    const scriptOffset = Utilities.formatDate(dateObj, scriptTz, 'Z');
    return ownerOffset === scriptOffset;
  } catch (e) {
    return false;
  }
}

function upsertCalendarEvent_(calendar, cfg) {
  const {
    eventId,
    title,
    notes,
    isAllDay,
    eventStart,
    ownerMidnightLocal,
    scriptTz,
    targetExactTimeStr,
    remindersMinutes
  } = cfg;

  if (!title) return eventId; // nothing to create

  const event = findOrCreateMainEvent_(calendar, eventId, title, isAllDay, eventStart, notes);
  if (!event) return eventId;

  // Clear existing reminders and set new ones on the main event
  event.removeAllReminders();

  // Always keep a basic notification on the main event itself
  // so every event has a notification at start time.
  event.addPopupReminder(0);

  // Optional exact-time reminder on the day of event in local timezone
  if (targetExactTimeStr) {
    createOrUpdateExactTimeReminder_(
      calendar,
      ownerMidnightLocal || eventStart,
      targetExactTimeStr,
      title,
      notes,
      remindersMinutes
    );
  } else if (remindersMinutes && remindersMinutes.length) {
    // If there's no exact-time reminder event, attach reminders directly to the main event.
    remindersMinutes.forEach(function (m) {
      event.addPopupReminder(m);
    });
  }

  return event.getId();
}

function findOrCreateMainEvent_(calendar, eventId, title, isAllDay, eventStart, notes) {
  let event = null;

  if (eventId) {
    try {
      event = calendar.getEventById(eventId);
      // Ignore reminder events
      if (event && event.getTitle && event.getTitle().indexOf('Reminder:') === 0) {
        event = null;
      }
    } catch (e) {
      event = null;
    }
  }

  // If no event found by ID, try to locate the main event by title on the day.
  if (!event && title) {
    try {
      const dayEvents = calendar.getEventsForDay(eventStart);
      for (let i = 0; i < dayEvents.length; i++) {
        const ev = dayEvents[i];
        if (ev.getTitle && ev.getTitle() === title) {
          event = ev;
          break;
        }
      }
    } catch (e) {
      // Ignore lookup failures and create a new event.
    }
  }

  const recurrence = CalendarApp.newRecurrence().addYearlyRule();
  if (!event) {
    // Create new recurring event (series)
    if (isAllDay) {
      event = calendar.createAllDayEventSeries(title, eventStart, recurrence, {
        description: notes
      });
    } else {
      const end = new Date(eventStart.getTime() + 60 * 60 * 1000);
      event = calendar.createEventSeries(title, eventStart, end, recurrence, {
        description: notes
      });
    }
  } else {
    // Update existing event series basic fields
    if (isAllDay) {
      event.setAllDayDate(eventStart);
    } else {
      const end = new Date(eventStart.getTime() + 60 * 60 * 1000);
      event.setTime(eventStart, end);
    }
    event.setTitle(title);
    event.setDescription(notes);
  }

  return event;
}

function createOrUpdateExactTimeReminder_(calendar, anchorDate, timeStr, mainTitle, description, remindersMinutes) {
  // timeStr format: "HH:MM" in your local/script timezone.
  // We create a separate timed recurring event on the same date with a 0-minute popup.
  const title = 'Reminder: ' + mainTitle;
  const recurrence = CalendarApp.newRecurrence().addYearlyRule();

   // First, clean up any existing reminder series with the same title
   // around the anchor date so repeated syncs don't create duplicates.
   const cleanupStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() - 1);
   const cleanupEnd = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() + 2);
   const existing = calendar.getEvents(cleanupStart, cleanupEnd);
   for (let i = 0; i < existing.length; i++) {
     const ev = existing[i];
     if (ev.getTitle && ev.getTitle() === title) {
       try {
         if (ev.getEventSeries) {
           const series = ev.getEventSeries();
           series.deleteEventSeries();
         } else {
           ev.deleteEvent();
         }
       } catch (e) {
         // Ignore failures; continue with creating the new series.
       }
     }
   }

  // Use the owner's birthday midnight converted to local time as the base,
  // and apply the desired local time-of-day.
  const startDate = anchorDate;
  let h, m;
  if (timeStr) {
    const parts = timeStr.split(':');
    const hStr = parts[0];
    const mStr = parts.length > 1 ? parts[1] : '0';
    h = parseInt(hStr, 10);
    m = parseInt(mStr, 10);
  }
  if (isNaN(h)) h = startDate.getHours();
  if (isNaN(m)) m = startDate.getMinutes();

  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), h, m);
  const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutes

  // For simplicity, we create a new event series each time; user can distinguish by title.
  const reminderEvent = calendar.createEventSeries(title, start, end, recurrence, {
    description: description
  });
  reminderEvent.removeAllReminders();
  if (remindersMinutes && remindersMinutes.length) {
    remindersMinutes.forEach(function (mins) {
      reminderEvent.addPopupReminder(mins);
    });
  } else {
    // Fallback: at the exact time if no offsets provided.
    reminderEvent.addPopupReminder(0);
  }
}

// Helper: manual test entry point
function testSync() {
  syncEventsFromSheet();
}

// Compute the local/script timezone time-of-day (HH:MM) at which the
// owner's day for this event begins (00:00 in owner timezone on the
// event date). This is used to auto-fill "Exact Local Time".
function computeExactLocalTimeFromOwnerMidnight_(eventDate, ownerTz, scriptTz) {
  const dt = computeOwnerMidnightLocalDateTime_(eventDate, ownerTz, scriptTz);
  if (!dt) return '';
  return Utilities.formatDate(dt, scriptTz, 'HH:mm');
}

function parseDateCell_(value) {
  if (value instanceof Date) return value;
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  if (!s) return null;
  // Try Date parsing for formats like "Jul 2, 1986"
  const parsed = new Date(s);
  if (!isNaN(parsed)) return parsed;
  return null;
}

// Trigger on edits: when a row has all required values, sync events.
function onEdit(e) {
  try {
    if (!e || !e.range) return;
    const sheet = e.range.getSheet();
    if (sheet.getName() !== CONFIG.SHEET_NAME) return;
    const row = e.range.getRow();
    if (row <= CONFIG.HEADER_ROW) return;
    if (!rowIsComplete_(sheet, row)) return;
    syncEventsFromSheet();
  } catch (err) {
    // Ignore trigger errors
  }
}

// Optional: installable change trigger for external edits (e.g., Notion sync)
function onChange(e) {
  try {
    if (!e || !e.changeType) return;
    if (e.changeType === 'EDIT' || e.changeType === 'INSERT_ROW' || e.changeType === 'REMOVE_ROW') {
      syncEventsFromSheet();
    }
  } catch (err) {
    // Ignore trigger errors
  }
}

function rowIsComplete_(sheet, row) {
  const header = sheet.getRange(CONFIG.HEADER_ROW, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  const idx = {
    name: header.indexOf('Event Name'),
    date: header.indexOf('Event Date'),
    type: header.indexOf('Event Type'),
    ownerTz: header.indexOf('Owner Timezone'),
    active: header.indexOf('Active?')
  };
  if (idx.name === -1 || idx.date === -1 || idx.type === -1 || idx.ownerTz === -1 || idx.active === -1) {
    return false;
  }
  const rowVals = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  const active = String(rowVals[idx.active] || '').toLowerCase();
  if (active !== 'yes' && active !== 'y' && active !== 'true') return false;
  const name = String(rowVals[idx.name] || '').trim();
  const type = String(rowVals[idx.type] || '').trim();
  const ownerTz = String(rowVals[idx.ownerTz] || '').trim();
  const dateCell = parseDateCell_(rowVals[idx.date]);
  return !!(name && type && ownerTz && dateCell instanceof Date);
}

// Run once to create installable triggers (recommended for Notion sync edits)
function setupTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  let hasChange = false;
  let hasEdit = false;
  triggers.forEach(t => {
    if (t.getHandlerFunction() === 'onChange') hasChange = true;
    if (t.getHandlerFunction() === 'onEdit') hasEdit = true;
  });
  if (!hasEdit) {
    ScriptApp.newTrigger('onEdit').forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
  }
  if (!hasChange) {
    ScriptApp.newTrigger('onChange').forSpreadsheet(SpreadsheetApp.getActive()).onChange().create();
  }
}

function cleanupRemovedMainEvents_(calendar, currentIdsMap, currentTitlesMap) {
  try {
    const props = PropertiesService.getScriptProperties();
    const prevRaw = props.getProperty('known_main_event_ids');
    const prevIds = prevRaw ? JSON.parse(prevRaw) : [];
    const prevTitlesRaw = props.getProperty('known_event_titles');
    const prevTitles = prevTitlesRaw ? JSON.parse(prevTitlesRaw) : [];
    const toDelete = prevIds.filter(id => !currentIdsMap[id]);
    const titlesToDelete = prevTitles.filter(t => !currentTitlesMap[t]);

    toDelete.forEach(id => {
      try {
        const ev = calendar.getEventById(id);
        if (ev && ev.deleteEvent) {
          ev.deleteEvent();
        }
      } catch (e) {
        // Ignore if already deleted
      }
    });

    // Also delete reminder series for removed rows
    if (titlesToDelete.length) {
      const start = new Date(2000, 0, 1);
      const end = new Date(2100, 0, 1);
      const events = calendar.getEvents(start, end);
      for (let i = 0; i < events.length; i++) {
        const ev = events[i];
        const title = ev.getTitle && ev.getTitle();
        if (!title) continue;
        for (let j = 0; j < titlesToDelete.length; j++) {
          const reminderTitle = 'Reminder: ' + titlesToDelete[j];
          if (title === reminderTitle) {
            try {
              if (ev.getEventSeries) {
                ev.getEventSeries().deleteEventSeries();
              } else {
                ev.deleteEvent();
              }
            } catch (e) {
              // Ignore delete failures
            }
            break;
          }
        }
      }
    }

    props.setProperty('known_main_event_ids', JSON.stringify(Object.keys(currentIdsMap)));
    props.setProperty('known_event_titles', JSON.stringify(Object.keys(currentTitlesMap)));
  } catch (e) {
    // Ignore cleanup errors
  }
}

// Compute the Date (in the script's local timezone) corresponding to
// the moment when it becomes the owner's birthday (00:00) in their
// timezone, for the given calendar year.
function computeOwnerMidnightLocalDateTime_(eventDate, ownerTz, scriptTz) {
  if (!(eventDate instanceof Date)) return null;

  const y = eventDate.getFullYear();
  const m = eventDate.getMonth();
  const d = eventDate.getDate();

  // If owner and script timezones are the same, owner's midnight is
  // simply local midnight on that day.
  if (ownerTz && scriptTz && ownerTz === scriptTz) {
    return new Date(y, m, d, 0, 0, 0, 0);
  }

  // Treat the event date as a date-only (avoid timezone shifting).
  const ownerDay = [y, pad2_(m + 1), pad2_(d)].join('-');

  // Search around local noon on that date for the instant when it is
  // exactly that day at 00:00 in the owner's timezone.
  const baseLocal = new Date(y, m, d, 12, 0, 0, 0);
  const oneDayMs = 24 * 60 * 60 * 1000;
  const startMs = baseLocal.getTime() - oneDayMs * 2; // +/- 48h window
  const endMs = baseLocal.getTime() + oneDayMs * 2;
  const stepMs = 5 * 60 * 1000; // 5-minute steps to handle non-hour offsets

  for (let t = startMs; t <= endMs; t += stepMs) {
    const dt = new Date(t);
    const ownerStamp = Utilities.formatDate(dt, ownerTz, 'yyyy-MM-dd HH:mm');
    if (ownerStamp === ownerDay + ' 00:00') {
      return dt; // local time when owner's day starts
    }
  }

  // Fallback: could not find exact match; return local midnight.
  return new Date(y, m, d, 0, 0, 0, 0);
}

function pad2_(n) {
  return (n < 10 ? '0' : '') + n;
}
