// 八卦数据：自下而上 (bottom → top)
// type: 'yang' = 阳爻, 'yin' = 阴爻
// element: 五行属性

export const TRIGRAMS = [
  {
    id: 'qian',
    name: '乾',
    unicode: '☰',
    element: '金',
    color: '#C9A84C',
    lines: ['yang', 'yang', 'yang'], // ☰ 乾为天
  },
  {
    id: 'dui',
    name: '兑',
    unicode: '☱',
    element: '金',
    color: '#D4AF37',
    lines: ['yang', 'yang', 'yin'], // ☱ 兑为泽
  },
  {
    id: 'li',
    name: '离',
    unicode: '☲',
    element: '火',
    color: '#CC3333',
    lines: ['yang', 'yin', 'yang'], // ☲ 离为火
  },
  {
    id: 'zhen',
    name: '震',
    unicode: '☳',
    element: '木',
    color: '#4A8C3F',
    lines: ['yang', 'yin', 'yin'], // ☳ 震为雷
  },
  {
    id: 'xun',
    name: '巽',
    unicode: '☴',
    element: '木',
    color: '#5DA04E',
    lines: ['yin', 'yang', 'yang'], // ☴ 巽为风
  },
  {
    id: 'kan',
    name: '坎',
    unicode: '☵',
    element: '水',
    color: '#2C5F8A',
    lines: ['yin', 'yang', 'yin'], // ☵ 坎为水
  },
  {
    id: 'gen',
    name: '艮',
    unicode: '☶',
    element: '土',
    color: '#C4953A',
    lines: ['yin', 'yin', 'yang'], // ☶ 艮为山
  },
  {
    id: 'kun',
    name: '坤',
    unicode: '☷',
    element: '土',
    color: '#B8863C',
    lines: ['yin', 'yin', 'yin'], // ☷ 坤为地
  },
];

// 四象数据：上爻 + 下爻，下方爻带渐变
export const FOUR_IMAGES = [
  {
    id: 'laoyin',
    name: '老阴',
    top: 'yin',
    bottom: 'yin',
  },
  {
    id: 'shaoyin',
    name: '少阴',
    top: 'yang',
    bottom: 'yin',
  },
  {
    id: 'shaoyang',
    name: '少阳',
    top: 'yin',
    bottom: 'yang',
  },
  {
    id: 'laoyang',
    name: '老阳',
    top: 'yang',
    bottom: 'yang',
  },
];
