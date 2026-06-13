import { getDateForYear } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

// Helper: formats a Date as "YYYY-MM-DD" for readable assertions
function fmt(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

// ── Ada Lovelace Day: second Tuesday of October
const adaLovelace = {
    name: "Ada Lovelace Day",
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
};

test("Ada Lovelace Day 2024 is October 8th", () => {
    assert.equal(fmt(getDateForYear(adaLovelace, 2024)), "2024-10-08");
});

test("Ada Lovelace Day 2025 is October 14th", () => {
    assert.equal(fmt(getDateForYear(adaLovelace, 2025)), "2025-10-14");
});

test("Ada Lovelace Day 2020 is October 13th", () => {
    assert.equal(fmt(getDateForYear(adaLovelace, 2020)), "2020-10-13");
});

// ── World Lemur Day: last Friday of October
const worldLemur = {
    name: "World Lemur Day",
    monthName: "October",
    dayName: "Friday",
    occurrence: "last",
};

test("World Lemur Day 2024 is October 25th", () => {
    assert.equal(fmt(getDateForYear(worldLemur, 2024)), "2024-10-25");
});

test("World Lemur Day 2020 is October 30th", () => {
    assert.equal(fmt(getDateForYear(worldLemur, 2020)), "2020-10-30");
});

// ── International Binturong Day: second Saturday of May
const binturong = {
    name: "International Binturong Day",
    monthName: "May",
    dayName: "Saturday",
    occurrence: "second",
};

test("International Binturong Day 2030 is May 11th", () => {
    assert.equal(fmt(getDateForYear(binturong, 2030)), "2030-05-11");
});

// ── International Vulture Awareness Day: first Saturday of September 
const vulture = {
    name: "International Vulture Awareness Day",
    monthName: "September",
    dayName: "Saturday",
    occurrence: "first",
};

test("International Vulture Awareness Day 2024 is September 7th", () => {
    assert.equal(fmt(getDateForYear(vulture, 2024)), "2024-09-07");
});

// ── International Red Panda Day: third Saturday of September 
const redPanda = {
    name: "International Red Panda Day",
    monthName: "September",
    dayName: "Saturday",
    occurrence: "third",
};

test("International Red Panda Day 2024 is September 21st", () => {
    assert.equal(fmt(getDateForYear(redPanda, 2024)), "2024-09-21");
});