import { ORDERS, MONTHS, RANGE, DAYS } from "./constants.mjs";

export function mapDaysToCalendar(year, month, daysData) {
  const dates = [];

  for (const day of daysData) {
    if (!day?.monthName) continue;

    if (
      MONTHS[month]?.toLowerCase().trim() !== day.monthName.toLowerCase().trim()
    )
      continue;

    const weekday = DAYS[day.dayName];

    let date;

    if (day.occurrence === "last") {
      date = getLastOccurrence(year, month, weekday);
    } else {
      const occurrence = ORDERS[day.occurrence];
      date = getOccurrence(year, month, weekday, occurrence);
    }

    dates.push({
      date,
      name: day.name,
      monthName: day.monthName,
    });
  }

  return dates;
}

export function getOccurrence(year, month, weekday, occurrence) {
  const firstDayInMonth = new Date(year, month, 1).getDay();
  let offset = weekday - firstDayInMonth;

  if (offset < 0) offset += 7;

  return 1 + offset + (occurrence - 1) * 7;
}

export function getLastOccurrence(year, month, weekday) {
  let date = new Date(year, month + 1, 0).getDate();
  while (new Date(year, month, date).getDay() !== weekday) date--;
  return date;
}
