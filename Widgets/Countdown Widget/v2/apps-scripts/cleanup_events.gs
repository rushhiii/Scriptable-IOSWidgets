// Utilities for cleaning up all events created in the tracker calendar.
// Copy this file as a separate script file into the same Apps Script project
// (so it can reuse the CONFIG.CALENDAR_ID defined in event_sync.gs).

/**
 * Delete ALL events (including recurring series and reminder events)
 * from the tracker calendar defined by CONFIG.CALENDAR_ID.
 *
 * WARNING: This cannot be undone. It clears the entire calendar.
 */
function deleteAllTrackerEvents() {
  var calendarId = (typeof CONFIG !== 'undefined' && CONFIG.CALENDAR_ID) ? CONFIG.CALENDAR_ID : 'primary';
  var calendar = CalendarApp.getCalendarById(calendarId);
  if (!calendar) {
    throw new Error('Calendar "' + calendarId + '" not found');
  }

  // Adjust range if you want to be more narrow.
  var start = new Date(2000, 0, 1);
  var end = new Date(2100, 0, 1);

  var events = calendar.getEvents(start, end);
  var seenSeries = {};

  for (var i = 0; i < events.length; i++) {
    var ev = events[i];
    try {
      // If it's part of a recurring series, delete the whole series once.
      var series = ev.getEventSeries && ev.getEventSeries();
      if (series) {
        var sid = series.getId();
        if (!seenSeries[sid]) {
          seenSeries[sid] = true;
          series.deleteEventSeries();
        }
      } else {
        // Single, non-recurring event.
        ev.deleteEvent();
      }
    } catch (e) {
      // If getEventSeries() fails for some reason, fall back to deleting the instance.
      try {
        ev.deleteEvent();
      } catch (inner) {
        // Ignore events we can't delete.
      }
    }
  }
}
