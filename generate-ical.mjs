import fs from "fs";
import daysData from "./days.json" with { type: "json" };
import { mapDaysToCalendar } from "./calendar-utils.mjs";

const START_YEAR = 2020;
const END_YEAR = 2030;

function formatDate(year, month, day) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}${mm}${dd}`;
}

let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n";

for (let year = START_YEAR; year <= END_YEAR; year++) {
  for (let month = 0; month < 12; month++) {
    const events = mapDaysToCalendar(year, month, daysData);

    for (const event of events) {
      const dateStr = formatDate(year, month, event.date);

      ics += `BEGIN:VEVENT
SUMMARY:${event.name}
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${dateStr}
END:VEVENT
`;
    }
  }
}

ics += "END:VCALENDAR";

fs.writeFileSync("days.ics", ics);
