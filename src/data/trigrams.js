// 八卦数据：自下而上 (bottom → top)
// type: 'yang' = 阳爻, 'yin' = 阴爻
// element: 五行属性
// nature: 卦象自然象征
// associations: 卦象引申意象

export const TRIGRAMS = [
  {
    id: 'qian',
    name: '乾',
    unicode: '☰',
    element: '金',
    nature: '天',
    associations: '父、首、马、健、君',
    color: '#C9A84C',
    lines: ['yang', 'yang', 'yang'], // ☰ 乾为天
  },
  {
    id: 'dui',
    name: '兑',
    unicode: '☱',
    element: '金',
    nature: '泽',
    associations: '少女、口、羊、悦、花',
    color: '#D4AF37',
    lines: ['yang', 'yang', 'yin'], // ☱ 兑为泽
  },
  {
    id: 'li',
    name: '离',
    unicode: '☲',
    element: '火',
    nature: '火',
    associations: '中女、目、光明、文书、惊扰',
    color: '#CC3333',
    lines: ['yang', 'yin', 'yang'], // ☲ 离为火
  },
  {
    id: 'zhen',
    name: '震',
    unicode: '☳',
    element: '木',
    nature: '雷',
    associations: '长男、足、龙、动、震怒',
    color: '#4A8C3F',
    lines: ['yang', 'yin', 'yin'], // ☳ 震为雷
  },
  {
    id: 'xun',
    name: '巽',
    unicode: '☴',
    element: '木',
    nature: '风',
    associations: '长女、股、鸡、入、不定',
    color: '#5DA04E',
    lines: ['yin', 'yang', 'yang'], // ☴ 巽为风
  },
  {
    id: 'kan',
    name: '坎',
    unicode: '☵',
    element: '水',
    nature: '水',
    associations: '中男、耳、豕、陷、盗',
    color: '#2C5F8A',
    lines: ['yin', 'yang', 'yin'], // ☵ 坎为水
  },
  {
    id: 'gen',
    name: '艮',
    unicode: '☶',
    element: '土',
    nature: '山',
    associations: '少男、手、狗、止、石',
    color: '#C4953A',
    lines: ['yin', 'yin', 'yang'], // ☶ 艮为山
  },
  {
    id: 'kun',
    name: '坤',
    unicode: '☷',
    element: '土',
    nature: '地',
    associations: '母、腹、牛、顺、众',
    color: '#B8863C',
    lines: ['yin', 'yin', 'yin'], // ☷ 坤为地
  },
];

// 四象数据：上爻 + 下爻，下方爻带渐变
export const FOUR_IMAGES = [
  { id: 'laoyin', name: '老阴', top: 'yin', bottom: 'yin' },
  { id: 'shaoyin', name: '少阴', top: 'yang', bottom: 'yin' },
  { id: 'shaoyang', name: '少阳', top: 'yin', bottom: 'yang' },
  { id: 'laoyang', name: '老阳', top: 'yang', bottom: 'yang' },
];

/** 根据爻数组查找八卦索引 */
export function findTrigramIndex(lines) {
  return TRIGRAMS.findIndex(
    (t) =>
      t.lines[0] === lines[0] &&
      t.lines[1] === lines[1] &&
      t.lines[2] === lines[2],
  );
}
