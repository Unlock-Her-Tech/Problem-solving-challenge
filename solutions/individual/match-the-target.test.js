import test from "node:test";
import assert from "node:assert/strict";
import countPairs from "./match-the-target.js";

test("counts pairs that add up to target", () => {

  assert.deepStrictEqual(countPairs([1, 5, 7, -1, 5], 6), 3);

  assert.deepStrictEqual(countPairs([3, 3, 3], 6), 2);

  assert.deepStrictEqual(countPairs([], 6), 0);
});
