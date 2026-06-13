import daysData from "./days.json" with { type: "json" };

const calGrid = document.getElementById("cal-grid");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const prevYearBtn = document.getElementById("prev-year");
const nextYearBtn = document.getElementById("next-year");

const state = {};
const todayDate = new Date();

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const ORDERS = { first: 1, second: 2, third: 3, fourth: 4 };
const RANGE = 50;

// handler functions
const handleMonthSelectChange = function (e) {
  state.month = +e.target.value;
  renderCalendar();
  setDropDownsValues();
};
const handleYearSelectChange = function (e) {
  state.year = +e.target.value;
  renderCalendar();
  setDropDownsValues();
};
const handlePreNextBtns = function (direction, month = false) {
  if (month) state.month += direction;
  else state.year += direction;
  renderCalendar();
  setDropDownsValues();
};

// eventListeners
monthSelect.addEventListener("change", handleMonthSelectChange);
yearSelect.addEventListener("change", handleYearSelectChange);
prevMonthBtn.addEventListener("click", () => handlePreNextBtns(-1, true));
nextMonthBtn.addEventListener("click", () => handlePreNextBtns(1, true));
prevYearBtn.addEventListener("click", () => handlePreNextBtns(-1));
nextYearBtn.addEventListener("click", () => handlePreNextBtns(1));

// functions
function mapDaysToCalendar() {
  const { year, month } = state;

  const dates = [];

  for (const day of daysData) {
    if (MONTHS[month] !== day.monthName) continue;

    const weekday = DAYS[day.dayName];
    const occurrence = ORDERS[day.occurrence];

    let date;

    if (day.occurrence === "last") {
      date = getLastOccurrence(year, month, weekday);
    } else {
      date = getOccurrence(year, month, weekday, occurrence);
    }

    dates.push({
      date,
      name: day.name,
      descriptionURL: day.descriptionURL,
    });
  }

  return dates;
}

function getOccurrence(year, month, weekday, occurrence) {
  const firstDay = new Date(year, month, 1).getDay();

  let offset = weekday - firstDay;

  if (offset < 0) {
    offset += 7;
  }

  return 1 + offset + (occurrence - 1) * 7;
}

function getLastOccurrence(year, month, weekday) {
  let date = new Date(year, month + 1, 0).getDate();

  while (new Date(year, month, date).getDay() !== weekday) {
    date--;
  }

  return date;
}

function generateCalendar() {
  const { month, year } = state;
  calGrid.textContent = "";

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const firstDayInMonth = new Date(year, month, 1).getDay();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const calendar = [];
  for (let i = firstDayInMonth; i > 0; i--) {
    calendar.push({ day: daysInPreviousMonth + 1 - i, currentMonth: false });
  }
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendar.push({ day: i, currentMonth: true });
  }
  let i = 1;
  while (calendar.length < 35) {
    calendar.push({ day: i++, currentMonth: false });
  }
  return calendar;
}

function initState() {
  state.month = todayDate.getMonth();
  state.year = todayDate.getFullYear();
}

function populateDropdowns() {
  const { year, month } = state;
  const monthOptions = MONTHS.map((month, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = month;
    return option;
  });
  monthSelect.append(...monthOptions);

  const years = generateRangeOfYear();
  const yearOptions = years.map((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    return option;
  });
  yearSelect.append(...yearOptions);
}

function generateRangeOfYear() {
  const { year } = state;
  const yearsAfter = Array.from({ length: RANGE }, (_, i) => year + i + 1);
  const yearsBefore = Array.from({ length: RANGE }, (_, i) => year - 1 - i);
  return [...yearsBefore.reverse(), year, ...yearsAfter];
}

function setDropDownsValues() {
  monthSelect.value = state.month;
  yearSelect.value = state.year;
}

function renderCalendar() {
  const { month, year } = state;
  const calendar = generateCalendar();
  const specialDays = mapDaysToCalendar();

  calGrid.textContent = "";

  calendar.forEach((item) => {
    const cell = document.createElement("div");

    cell.className = item.currentMonth ? "cell" : "cell other-month";

    cell.textContent = item.day;

    const specialDay = item.currentMonth
      ? specialDays.find((d) => d.date === item.day)
      : null;

    if (specialDay) {
      cell.classList.add("special-day");
      cell.title = specialDay.name;
    }

    calGrid.appendChild(cell);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initState();
  populateDropdowns();
  setDropDownsValues();
  renderCalendar();
});
