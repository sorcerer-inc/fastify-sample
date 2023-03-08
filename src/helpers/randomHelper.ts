const mt = require('mersenne-twister');

// 0.001%まで対応
const DEFAULT_MAX = 100000;

interface randomOpt {
  seed?: number,
  count?: number,
  max?: number
}

export function generateRandomNumbers(opt: randomOpt): number[] {
  // デフォルト値を設定
  const {seed = Date.now(), count = 1, max = DEFAULT_MAX} = opt;
  const mtGen = new mt(seed);
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(mtGen.random_int() % max);
  }
  return results;
}

// module.exports = generateRandomNumbers;
