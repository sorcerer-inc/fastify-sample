
import {generateRandomNumbers} from "../../src/helpers/randomHelper";
import exp = require("constants");

test("seedを指定すれば毎回同じ乱数が発生する", () => {
  expect.assertions(1);
  const seed = 1;
  const count = 10;
  const result = generateRandomNumbers({seed, count});
  // console.log(result);
  expect(result).toEqual([95845, 76139, 70124, 3368, 91263, 90313, 8491, 46341, 11759, 94432]);
})

test("countがマイナス値のとき", () => {
  expect.assertions(1);
  try {
    generateRandomNumbers({count: -1});
  } catch (e) {
    expect(e).toBeDefined();
  }
})

test("maxがマイナス値のとき", () => {
  expect.assertions(1);
  try {
    generateRandomNumbers({max: -1});
  } catch (e) {
    expect(e).toBeDefined();
  }
})
test("引数が空のとき", () => {
  expect.assertions(2);
  const results = generateRandomNumbers();
  expect(results).toHaveLength(1);
  expect(results[0] >= 0).toBeTruthy();
})

