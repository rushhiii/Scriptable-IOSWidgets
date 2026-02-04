# Usage Guide

This guide explains how to use the system day‑to‑day, including the meaning of each column, reminder formats, and how Notion ↔ Sheets mappings should be set up.


## 1) Core columns (Sheet)

These columns must exist in your Google Sheet (tab `Main` by default):

- **Event Name**
  - The person or event title.
  - Example: `HArry`

- **Event Date**
  - Date of the event (year is used for the next occurrence).
  - Example: `Jul 2, 1986`

- **Event Type**
  - Used for emoji mapping and all‑day behavior.
  - Example values: `Birthday`, `Anniversary`, `Event`, `Ended`

- **Owner Timezone**
  - Timezone of the person or event owner.
  - Example: `Asia/Kolkata`, `America/Toronto`

- **All Day?**
  - `Yes` / `No`
  - Birthdays and anniversaries are forced to all‑day even if this is `No`.

- **Exact Local Time**
  - Optional time (HH:MM) for the reminder series.
  - If blank and reminders exist, the script derives a time from `Relative Reminders`.

- **Relative Reminders**
  - Comma‑separated list of **days before** the event.
  - Examples:
    - `7,1` → 1 week + 1 day before
    - `7,1,0.125` → 1 week + 1 day + 3 hours before (0.125 days)

- **Notes**
  - Optional description for the event.

- **Active?**
  - `Yes` or `No`
  - Only rows marked active are synced.

- **Widget Emoji**
  - Emoji used by the widget (auto‑filled if empty).

- **Widget Clr**
  - Hex color for the widget tile (e.g., `#2980b9`).


## 2) Notion property names (mapping)

When using Addsync, map your Notion properties to the sheet columns like this:

- **Title** → Event Name
- **Event Date** → Event Date
- **Event Type** → Event Type
- **Owner Timezone** → Owner Timezone
- **All Day?** → All Day?
- **Exact Local Time** → Exact Local Time
- **Reminders** → Relative Reminders
- **Description** → Notes
- **Active?** → Active?
- **Widget Emoji** → Widget Emoji
- **Widget Clr** → Widget Clr

Note: In Notion, the reminders field is called **Reminders**. It should map to **Relative Reminders** in Sheets.


## 3) How reminders work

- If the owner timezone differs in offset, a separate reminder series is created in Google Calendar.
- If the timezone offsets are the same, reminders attach directly to the main event.
- Every event also gets a **0‑minute popup reminder** at its start time.


## 4) Adding new events

1. Add a new row in Notion (or Sheets).
2. Make sure required fields are filled.
3. The script will create the calendar event and write the ID back into the sheet.


## 5) Editing or deleting events

- **Edit**: change any field and the next sync updates the event.
- **Delete**: removing a row deletes both the main event and its reminder series.


## 6) Widget fields used

The widget only reads:

- Event Name
- Event Date
- Widget Emoji
- Widget Clr


## 7) Example row

| Event Name | Event Date | Event Type | Owner Timezone | All Day? | Relative Reminders | Widget Emoji | Widget Clr |
|---|---|---|---|---|---|---|---|
| Yasvi | Jul 2, 1986 | Birthday | Asia/Kolkata | Yes | 7,1,0.125 | 🎂 | #7b9a50 |
