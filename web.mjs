import daysData from "./days.json" with { type: "json" };
import { MONTHS, RANGE } from "./constants.mjs";
import { mapDaysToCalendar } from "./calendar-utils.mjs";
import { state } from "./state.mjs";

const calGrid = document.getElementById("cal-grid");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const prevYearBtn = document.getElementById("prev-year");
const nextYearBtn = document.getElementById("next-year");

// handler functions
const handleMonthSelectChange = function (e) {
  state.month = +e.target.value;
  syncUI();
};
const handleYearSelectChange = function (e) {
  state.year = +e.target.value;
  syncUI();
};
const handleMonthPreNextBtns = function (direction) {
  const { month, year } = state;
  if (month === 11 && direction === 1) {
    state.month = 0;
    state.year++;
  } else if (month === 0 && direction === -1) {
    state.month = 11;
    state.year--;
  } else state.month += direction;

  syncUI();
};

const handleYearPreNextBtns = function (direction) {
  state.year += direction;
  syncUI();
};

// eventListeners
monthSelect.addEventListener("change", handleMonthSelectChange);
yearSelect.addEventListener("change", handleYearSelectChange);
prevMonthBtn.addEventListener("click", () => handleMonthPreNextBtns(-1));
nextMonthBtn.addEventListener("click", () => handleMonthPreNextBtns(1));
prevYearBtn.addEventListener("click", () => handleYearPreNextBtns(-1));
nextYearBtn.addEventListener("click", () => handleYearPreNextBtns(1));

// functions

function generateCalendar() {
  const { month, year } = state;

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
  while (calendar.length < 42) {
    calendar.push({ day: i++, currentMonth: false });
  }
  return calendar;
}
function enableDisablePrevNextBtns() {
  const thisYear = new Date().getFullYear();
  nextYearBtn.disabled = state.year === thisYear + RANGE;
  prevYearBtn.disabled = state.year === thisYear - RANGE;
  nextMonthBtn.disabled = state.year === thisYear + RANGE && state.month === 11;
  prevMonthBtn.disabled = state.year === thisYear - RANGE && state.month === 0;
}

function syncUI() {
  renderCalendar();
  setDropDownsValues();
  enableDisablePrevNextBtns();
}

function initState() {
  state.month = new Date().getMonth();
  state.year = new Date().getFullYear();
}

function populateDropdowns() {
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

  const specialDays = mapDaysToCalendar(year, month, daysData);

  calGrid.textContent = "";

  const cells = calendar.map((item) => {
    const cell = document.createElement("div");

    cell.className = item.currentMonth ? "cell" : "cell other-month";

    cell.textContent = item.day;
    cell.dataset.currentMonth = item.currentMonth;

    const specialDay = item.currentMonth
      ? specialDays.find((d) => d.date === item.day)
      : null;

    if (specialDay) {
      cell.classList.add("special-day");
      cell.title = specialDay.name;
    }

    return cell;
  });

  for (let i = 4; i < 6; i++) {
    const row = cells.slice(i * 7, i * 7 + 7);

    if (row.every((cell) => cell.dataset.currentMonth === "false")) {
      row.forEach((cell) => cell.classList.add("hidden"));
    }
  }

  calGrid.append(...cells);
}

document.addEventListener("DOMContentLoaded", function () {
  initState();
  populateDropdowns();
  setDropDownsValues();
  renderCalendar();
});
