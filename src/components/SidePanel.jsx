import './SidePanel.css';

/**
 * SidePanel — 右侧收集面板
 * 每次点击 ActiveHexagram 捕获本卦→互卦→变卦三卦
 */
export default function SidePanel({ entries }) {
  return (
    <aside className="side-panel">
      <h3 className="side-panel__title">卦象收集</h3>
      {entries.length === 0 && (
        <p className="side-panel__empty">点击上方卦象结果<br />捕获到此处</p>
      )}
      <div className="side-panel__list">
        {entries.map((entry) => (
          <div key={entry.id} className="side-entry">
            <span className="side-entry__time">{entry.timeLabel}</span>
            <div className="side-entry__guas">
              <div className="side-entry__gua side-entry__gua--ben">
                <span className="side-entry__tag">本</span>
                <span className="side-entry__name">{entry.benGua.name}</span>
              </div>
              <span className="side-entry__arrow">→</span>
              <div className="side-entry__gua side-entry__gua--hu">
                <span className="side-entry__tag">互</span>
                <span className="side-entry__name">{entry.huGua.name}</span>
              </div>
              <span className="side-entry__arrow">→</span>
              <div className="side-entry__gua side-entry__gua--bian">
                <span className="side-entry__tag">变</span>
                <span className="side-entry__name">{entry.bianGua.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
