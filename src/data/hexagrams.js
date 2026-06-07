import { TRIGRAMS, findTrigramIndex } from './trigrams';

// 六十四卦：上卦(行) × 下卦(列) = 8×8 = 64
// 按 乾兑离震巽坎艮坤 排列，上卦为行，下卦为列
// 每卦6爻：下3爻来自下卦，上3爻来自上卦（自下而上）

const HEXAGRAM_NAMES = [
  // 上卦 乾
  ['乾', '夬', '大有', '大壮', '小畜', '需', '大畜', '泰'],
  // 上卦 兑
  ['履', '兑', '睽', '归妹', '中孚', '节', '损', '临'],
  // 上卦 离
  ['同人', '革', '离', '丰', '家人', '既济', '贲', '明夷'],
  // 上卦 震
  ['无妄', '随', '噬嗑', '震', '益', '屯', '颐', '复'],
  // 上卦 巽
  ['姤', '大过', '鼎', '恒', '巽', '井', '蛊', '升'],
  // 上卦 坎
  ['讼', '困', '未济', '解', '涣', '坎', '蒙', '师'],
  // 上卦 艮
  ['遯', '咸', '旅', '小过', '渐', '蹇', '艮', '谦'],
  // 上卦 坤
  ['否', '萃', '晋', '豫', '观', '比', '剥', '坤'],
];

/**
 * 生成六十四卦数据
 * @returns {Array<Array<Object>>} 8×8 二维数组，hexagrams[row][col]
 *   row = 上卦索引, col = 下卦索引
 *   每个卦: { name, upperTrigram, lowerTrigram, lines[6], upperColor, lowerColor }
 */
export function generateHexagrams() {
  const rows = [];
  for (let r = 0; r < 8; r++) {
    const row = [];
    const upper = TRIGRAMS[r]; // 上卦
    for (let c = 0; c < 8; c++) {
      const lower = TRIGRAMS[c]; // 下卦
      row.push({
        id: `hex-${r}-${c}`,
        name: HEXAGRAM_NAMES[r][c],
        upperTrigram: upper.name,
        lowerTrigram: lower.name,
        // 下卦3爻(底部) + 上卦3爻(顶部)，自下而上共6爻
        lines: [...lower.lines, ...upper.lines],
        upperColor: upper.color,
        lowerColor: lower.color,
      });
    }
    rows.push(row);
  }
  return rows;
}

export const HEXAGRAMS = generateHexagrams();
