# How it works (Developer view)

This document explains the architecture, data model, and runtime behavior of the v2 widget stack from a developer POV.


## 1) Architecture overview

**Pipeline**: Notion → Google Sheets → Apps Script → Google Calendar → Scriptable

**Why this stack**

- **Notion**: user-friendly source of truth (editable by non-devs).
- **Sheets**: stable integration layer and audit-friendly table.
- **Apps Script**: serverless automation + calendar integration.
- **Google Calendar**: native reminders and timezone handling.
- **Scriptable**: fast, local UI for iOS widgets.


## 2) Data model (Sheet schema)

Core columns (used by sync and widget):

- Event Name
- Event Date
- Event Type
- Owner Timezone
- All Day?
- Exact Local Time
- Relative Reminders
- Notes
- Active?
- Widget Emoji
- Widget Clr

**Notes**

- `Event Date` can be a Date cell or a text date (e.g., `Jul 2, 1986`).
- `Relative Reminders` uses days (e.g., `7,1,0.125`).
- `Exact Local Time` is optional and can be derived.
- `Widget Emoji` auto-fills from Event Type if empty.


## 3) Sync engine (Apps Script)

**Main scripts**

- `event_sync.gs`: end-to-end sync (events + reminders + deletions)
- `build_events_only.gs`: only main calendar events
- `build_reminders_only.gs`: only reminder series
- `cleanup_events.gs`: wipe all events in the calendar (use carefully)

**Key behaviors**

- **Create/update**: uses ID if present, else searches by title/day.
- **Deletion**: compares current sheet IDs against previously known IDs to remove deleted events.
- **Debounce + lock**: avoids duplicate syncs from multiple triggers.
- **Auto emoji**: fills `Widget Emoji` based on `Event Type`.


## 4) Timezone & reminders logic

**Offset check**

- If owner timezone has the **same UTC offset** as the user on that date:
  - No separate reminder series is created.
  - Relative reminders are applied directly to the main event.

**Different offset**

- A dedicated reminder series is created at the owner’s midnight mapped to local time.
- Relative reminders are attached to the reminder series, not the main event.

**Exact Local Time derivation**

- If `Exact Local Time` is blank and relative reminders exist:
  - It derives a local time from the smallest reminder offset.
  - Writes the derived time back to the sheet.


## 5) Widget data feed

The web app (Code.gs) returns a minimal JSON payload:

```json
[
  {"name":"Asha","date":"1986-07-02","icon":"🎂","color":"#7b9a50"}
]
```

The widget expects:

- `name`
- `date` (YYYY-MM-DD or a parseable date string)
- `icon`
- `color` (optional)


## 6) Widget rendering

- Sorts events by next upcoming date in the current year.
- Shows 1 / 3 / 6 items based on size.
- Small widget supports optional “age mode.”


## 7) Notifications

- Google Calendar handles precise alerts.
- Notion Calendar can also alert if you want a second channel.

To avoid duplicates, disable alerts in one of the calendars.



## 8) Extensibility

- Add new event types: update emoji mapping in Apps Script.
- Change colors: update `Widget Clr` in Sheets.
- Swap UI layout: modify Scriptable stacks.
- Add fields: update Code.gs + widget parser.


## 9) Known tradeoffs

- Apps Script has rate limits; batch updates accordingly.
- Date-only events can shift if you don’t parse them as local dates.
- Duplicates can happen if triggers overlap (mitigated by lock/debounce).
