const mt = require('mersenne-twister');

// 0.001%まで対応
const DEFAULT_MAX = 100000;

interface randomOpt {
  /** シード */
  seed?: number,
  /** 生成する数 */
  count?: number,
  /** 乱数の最大値。 0 < num < max の範囲で生成する。デフォルトは100000。 */
  max?: number
}

/**
 * シード対応の乱数の配列を生成する
 */
export function generateRandomNumbers(opt?: randomOpt): number[] {
  // デフォルト値を設定
  const {seed = Date.now(), count = 1, max = DEFAULT_MAX} = opt || {};
  if (max < 0) {
    throw new Error("max number is invalid")
  }
  const mtGen = new mt(seed);
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(mtGen.random_int() % max);
  }

  if (results.length != count || results.length < 1) {
    throw new Error("generated number is invalid")
  }
  return results;
}
