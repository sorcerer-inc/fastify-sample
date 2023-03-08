
import {generateRandomNumbers} from "../../src/helpers/randomHelper";

test("seedを指定すれば毎回同じ乱数が発生する", () => {
  const seed = 1;
  const count = 10;
  const result = generateRandomNumbers({seed, count});
  // console.log(result);
  expect(result).toEqual([95845, 76139, 70124, 3368, 91263, 90313, 8491, 46341, 11759, 94432]);
})

test("countがマイナス値のとき", () => {
  const count = -1;
  const result = generateRandomNumbers({count});
  // TODO 例外が発生する
  expect(result).toEqual([]);
})

