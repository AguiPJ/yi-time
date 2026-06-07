import './ActiveHexagram.css';

/**
 * ActiveHexagram — 当前激活卦象信息面板
 * 显示：本卦（现状）→ 互卦（过程）→ 变卦（结果）
 *
 * Props:
 *   result:    timeToHexagram 返回的结果对象，null 表示无数据
 *   isManual:  boolean — 是否为手动选择的时间
 *   onCapture: () => void — 点击捕获回调
 */
export default function ActiveHexagram({ result, isManual, onCapture }) {
  if (!result) {
    return (
      <div className="active-hex active-hex--empty">
        <p className="active-hex__waiting">等待卦象…</p>
      </div>
    );
  }

  const { timeParts, benGua, dongYaoIndex, huGua, bianGua } = result;

  const formatTime = (p) =>
    `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')} ${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`;

  return (
    <div className="active-hex" onClick={onCapture} title="点击捕获到右侧面板">
      <div className="active-hex__time">
        <span className="active-hex__timestamp">{formatTime(timeParts)}</span>
        {isManual && <span className="active-hex__badge">手动</span>}
        <span className="active-hex__capture-hint">点击捕获 →</span>
      </div>

      {/* 本卦 → 互卦 → 变卦 */}
      <div className="active-hex__row">
        <div className="active-hex__gua active-hex__gua--main">
          <span className="active-hex__gua-label">本卦 · 现状</span>
          <span className="active-hex__gua-name">{benGua.name}</span>
          <span className="active-hex__gua-trigram">
            {benGua.lowerTrigram}{benGua.upperTrigram}
          </span>
        </div>

        <span className="active-hex__arrow">→</span>

        <div className="active-hex__gua active-hex__gua--mutual">
          <span className="active-hex__gua-label">互卦 · 过程</span>
          <span className="active-hex__gua-name">{huGua.name}</span>
          <span className="active-hex__gua-trigram">
            {huGua.lowerTrigram}{huGua.upperTrigram}
          </span>
        </div>

        <span className="active-hex__arrow">→</span>

        <div className="active-hex__gua active-hex__gua--changed">
          <span className="active-hex__gua-label">变卦 · 结果</span>
          <span className="active-hex__gua-name">{bianGua.name}</span>
          <span className="active-hex__gua-trigram">
            {bianGua.lowerTrigram}{bianGua.upperTrigram}
          </span>
        </div>
      </div>

      <div className="active-hex__dongyao">
        <span className="active-hex__dongyao-label">动爻：</span>
        <span className="active-hex__dongyao-value">
          第 {dongYaoIndex + 1} 爻
          <span className="active-hex__dongyao-type">
            （{benGua.lines[dongYaoIndex] === 'yang' ? '老阳 ⚊ → ⚋' : '老阴 ⚋ → ⚊'}）
          </span>
        </span>
      </div>
    </div>
  );
}
