import { getOccurrence, getLastOccurrence } from "./calendar-utils.mjs";
import assert from "node:assert";
import test from "node:test";

test("getOccurrence: second Tuesday of October 2024 is the 8th (Ada Lovelace Day)", () => {
  assert.equal(getOccurrence(2024, 9, 2, 2), 8);
});

test("getLastOccurrence: last Friday of October 2024 is the 25th (World Lemur Day)", () => {
  assert.equal(getLastOccurrence(2024, 9, 5), 25);
});
