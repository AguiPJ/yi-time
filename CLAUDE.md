# Yi-Time 卦象时间墙

基于 React + Vite 的卦象可视化时间墙。时间驱动六十四卦动态变化。

## 技术
React 18 函数组件 + Vite 5 + 纯 CSS + JavaScript

## 开发
```bash
npm run dev          # 本地
npx vite --host      # 局域网(手机访问)
npm run build && npx gh-pages -d dist  # 部署
```

## 结构
- `src/data/trigrams.js` — 八卦数据 + 四象
- `src/data/hexagrams.js` — 64卦 8×8 生成
- `src/utils/timeToHexagram.js` — 时间→卦象算法
- `src/algorithm/TIME_HEXAGRAM_ALGORITHM.md` — 算法文档
- `src/components/YaoLine.jsx` — 核心爻组件
- `src/components/Layer3EightTrigrams.jsx` — 八卦
- `src/components/Layer4SixtyFourHexagrams.jsx` — 64卦网格
- `src/components/TimeControl.jsx` — 播放/暂停
- `src/components/ActiveHexagram.jsx` — 卦象面板
- `src/components/SidePanel.jsx` — 右侧捕获(本→互→变+体用)

## 状态
App.jsx 管理: result, playing, isManual, captured
