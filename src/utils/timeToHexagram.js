import { TRIGRAMS, findTrigramIndex } from '../data/trigrams';
import { HEXAGRAMS } from '../data/hexagrams';

/**
 * 时间→卦象映射（梅花易数启发）
 *
 * 上卦 index = (year + month + day) % 8       → 天时
 * 下卦 index = (hour + minute) % 8            → 人事
 * 动爻 index = (year + month + day + hour + minute) % 6  → 变爻
 *
 * @param {Date} date
 * @returns {{
 *   timestamp: number,
 *   timeParts: { year, month, day, hour, minute },
 *   benGua: object,        // 本卦（当前卦象）
 *   dongYaoIndex: number,  // 动爻位置 0-5 (自下而上)
 *   bianGua: object,       // 变卦（动爻翻转后）
 *   huGua: object|null,    // 互卦
 * }}
 */
export function timeToHexagram(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-indexed → 1-indexed
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  // 上卦 index: (year + month + day) % 8
  const upperIndex = (year + month + day) % 8;
  // 下卦 index: (hour + minute) % 8
  const lowerIndex = (hour + minute) % 8;
  // 动爻 index: (全量) % 6  → 0-5
  const dongYaoIndex = (year + month + day + hour + minute) % 6;

  // 本卦 = 上卦(row) + 下卦(col)
  const benGua = HEXAGRAMS[upperIndex][lowerIndex];

  // 变卦：翻转动爻
  const flippedLines = [...benGua.lines];
  flippedLines[dongYaoIndex] =
    flippedLines[dongYaoIndex] === 'yang' ? 'yin' : 'yang';

  // 变卦的上卦/下卦 index
  const flippedUpper = findTrigramIndex(flippedLines.slice(3, 6));
  const flippedLower = findTrigramIndex(flippedLines.slice(0, 3));
  const bianGua = HEXAGRAMS[flippedUpper][flippedLower];

  // 互卦：lines[1,2,3] → 下, lines[2,3,4] → 上
  const huLower = findTrigramIndex([
    benGua.lines[1],
    benGua.lines[2],
    benGua.lines[3],
  ]);
  const huUpper = findTrigramIndex([
    benGua.lines[2],
    benGua.lines[3],
    benGua.lines[4],
  ]);
  const huGua = HEXAGRAMS[huUpper][huLower];

  return {
    timestamp: date.getTime(),
    timeParts: { year, month, day, hour, minute },
    benGua: {
      ...benGua,
      row: upperIndex,
      col: lowerIndex,
    },
    dongYaoIndex,
    bianGua: {
      ...bianGua,
      row: flippedUpper,
      col: flippedLower,
    },
    huGua: {
      ...huGua,
      row: huUpper,
      col: huLower,
    },
  };
}

/**
 * 生成随机时间戳（用于默认随机播放）
 * @returns {Date}
 */
export function randomTimestamp() {
  const start = new Date(1900, 0, 1).getTime();
  const end = new Date(2100, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}
