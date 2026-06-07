import YaoLine from './YaoLine';
import './SidePanel.css';

/**
 * SidePanel — 右侧捕获展示面板
 * 点击后显示当前时间的三卦：本卦(现状) → 互卦(过程) → 变卦(结果)
 * 每卦完整展示6爻 + 解读文字预留区
 *
 * Props:
 *   captured: { timeLabel, benGua, huGua, bianGua } | null
 */
export default function SidePanel({ captured }) {
  if (!captured) {
    return (
      <aside className="side-panel side-panel--empty">
        <p className="side-panel__hint">点击上方卦象结果<br />捕获到此处</p>
      </aside>
    );
  }

  const { timeLabel, benGua, huGua, bianGua } = captured;

  return (
    <aside className="side-panel">
      <div className="side-panel__inner">
        <span className="side-panel__time">{timeLabel}</span>

        {/* 本卦 */}
        <div className="side-gua side-gua--ben">
          <h3 className="side-gua__title">
            <span className="side-gua__dot side-gua__dot--ben" />
            本卦 · 现状
          </h3>
          <span className="side-gua__name">{benGua.name}</span>
          <div className="side-gua__lines">
            {benGua.lines.map((type, i) => (
              <YaoLine
                key={i}
                type={type}
                size="sm"
                color={i < 3 ? benGua.lowerColor : benGua.upperColor}
              />
            ))}
          </div>
          <div className="side-gua__interpretation">
            <textarea
              className="side-gua__text"
              placeholder="本卦解读…"
              rows={2}
            />
          </div>
        </div>

        <span className="side-panel__arrow">↓</span>

        {/* 互卦 */}
        <div className="side-gua side-gua--hu">
          <h3 className="side-gua__title">
            <span className="side-gua__dot side-gua__dot--hu" />
            互卦 · 过程
          </h3>
          <span className="side-gua__name">{huGua.name}</span>
          <div className="side-gua__lines">
            {huGua.lines.map((type, i) => (
              <YaoLine
                key={i}
                type={type}
                size="sm"
                color={i < 3 ? huGua.lowerColor : huGua.upperColor}
              />
            ))}
          </div>
          <div className="side-gua__interpretation">
            <textarea
              className="side-gua__text"
              placeholder="互卦解读…"
              rows={2}
            />
          </div>
        </div>

        <span className="side-panel__arrow">↓</span>

        {/* 变卦 */}
        <div className="side-gua side-gua--bian">
          <h3 className="side-gua__title">
            <span className="side-gua__dot side-gua__dot--bian" />
            变卦 · 结果
          </h3>
          <span className="side-gua__name">{bianGua.name}</span>
          <div className="side-gua__lines">
            {bianGua.lines.map((type, i) => (
              <YaoLine
                key={i}
                type={type}
                size="sm"
                color={i < 3 ? bianGua.lowerColor : bianGua.upperColor}
              />
            ))}
          </div>
          <div className="side-gua__interpretation">
            <textarea
              className="side-gua__text"
              placeholder="变卦解读…"
              rows={2}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
