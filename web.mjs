// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
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

const RANGE = 50;

// handler functions
const handleMonthSelectChange = function (e) {
  state.month = +e.target.value;
  generateCalendar();
  setDropDownsValues();
};
const handleYearSelectChange = function (e) {
  state.year = +e.target.value;
  generateCalendar();
  setDropDownsValues();
};
const handlePreNextBtns = function (direction, month = false) {
  if (month) state.month += direction;
  else state.year += direction;
  generateCalendar();
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
  const cells = calendar.map((item) => {
    const cell = document.createElement("div");
    cell.textContent = item.day;
    cell.className = item.currentMonth ? "cell" : "cell other-month";
    return cell;
  });
  calGrid.append(...cells);
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

document.addEventListener("DOMContentLoaded", function () {
  initState();
  generateCalendar();
  populateDropdowns();
  setDropDownsValues();
});
