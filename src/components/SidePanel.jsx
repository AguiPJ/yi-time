import YaoLine from './YaoLine';
import { TRIGRAMS } from '../data/trigrams';
import './SidePanel.css';

// 五行生克
const ELEMENTS = ['木', '火', '土', '金', '水'];

/** 检查生克关系 */
function elementRelation(bodyEl, useEl) {
  const bi = ELEMENTS.indexOf(bodyEl);
  const ui = ELEMENTS.indexOf(useEl);
  if (bi === -1 || ui === -1) return { text: '', status: '' };

  // 同元素 → 比和
  if (bi === ui) return { text: `${bodyEl}${useEl}比和`, status: 'neutral' };

  // 体克用: 体→用 (interval = (bi+1)%5 === ui? No, 克 is skip-one)
  // 克: 0→2, 1→3, 2→4, 3→0, 4→1  = (i+2)%5
  if ((bi + 2) % 5 === ui) return { text: `体克用 (${bodyEl}克${useEl})`, status: 'good' };

  // 用克体: 用→体
  if ((ui + 2) % 5 === bi) return { text: `用克体 (${useEl}克${bodyEl})`, status: 'bad' };

  // 体生用: 体→用 (生: 0→1→2→3→4→0)
  if ((bi + 1) % 5 === ui) return { text: `体生用 (${bodyEl}生${useEl})`, status: 'drain' };

  // 用生体: 用→体
  if ((ui + 1) % 5 === bi) return { text: `用生体 (${useEl}生${bodyEl})`, status: 'good' };

  return { text: '', status: '' };
}

const STATUS_LABELS = {
  good: '吉',
  bad: '凶',
  drain: '泄',
  neutral: '平',
};

/**
 * SidePanel — 右侧捕获面板
 * 显示 本卦→互卦→变卦，含完整6爻 + 体用生克解读
 */
export default function SidePanel({ captured }) {
  if (!captured) {
    return (
      <aside className="side-panel side-panel--empty">
        <p className="side-panel__hint">点击上方卦象结果<br />捕获到此处</p>
      </aside>
    );
  }

  const { timeLabel, benGua, huGua, bianGua, dongYaoIndex } = captured;

  return (
    <aside className="side-panel">
      <div className="side-panel__inner">
        <span className="side-panel__time">{timeLabel}</span>

        <GuaBlock
          type="ben"
          label="本卦"
          gua={benGua}
          dongYaoIndex={dongYaoIndex}
          showTiYong
        />
        <span className="side-panel__arrow">↓</span>

        <GuaBlock type="hu" label="互卦" gua={huGua} />
        <span className="side-panel__arrow">↓</span>

        <GuaBlock type="bian" label="变卦" gua={bianGua} />
      </div>
    </aside>
  );
}

/** 单个卦块 */
function GuaBlock({ type, label, gua, dongYaoIndex, showTiYong }) {
  // 卦名标题: e.g. "本卦 · 地风升"
  const natureUp = TRIGRAMS.find((t) => t.name === gua.upperTrigram)?.nature || '';
  const natureDown = TRIGRAMS.find((t) => t.name === gua.lowerTrigram)?.nature || '';
  const fullTitle = `${label} · ${natureUp}${natureDown}${gua.name}`;

  // 体用分析 (仅本卦)
  let tiYong = null;
  if (showTiYong && dongYaoIndex !== undefined) {
    // 动爻在下卦(0-2) → 用=下, 体=上；动爻在上卦(3-5) → 体=下, 用=上
    const isDongInLower = dongYaoIndex < 3;
    const bodyTri = isDongInLower
      ? TRIGRAMS.find((t) => t.name === gua.upperTrigram)
      : TRIGRAMS.find((t) => t.name === gua.lowerTrigram);
    const useTri = isDongInLower
      ? TRIGRAMS.find((t) => t.name === gua.lowerTrigram)
      : TRIGRAMS.find((t) => t.name === gua.upperTrigram);

    if (bodyTri && useTri) {
      const rel = elementRelation(bodyTri.element, useTri.element);
      tiYong = {
        body: bodyTri,
        use: useTri,
        relation: rel,
      };
    }
  }

  return (
    <div className={`side-gua side-gua--${type}`}>
      <h3 className="side-gua__title">{fullTitle}</h3>
      <div className="side-gua__lines">
        {gua.lines.map((t, i) => {
          const isDong =
            showTiYong && dongYaoIndex !== undefined && dongYaoIndex === i;
          return (
            <div
              key={i}
              className={`side-gua__line-row${isDong ? ' side-gua__line-row--dong' : ''}`}
            >
              <span className="side-gua__line-num">{i + 1}</span>
              <YaoLine
                type={t}
                size="sm"
                color={i < 3 ? gua.lowerColor : gua.upperColor}
              />
              <span className={`side-gua__line-tag${isDong ? ' side-gua__line-tag--visible' : ''}`}>动</span>
            </div>
          );
        })}
      </div>

      {/* 体用解读 */}
      {tiYong && (
        <div className="side-gua__tiyong">
          <p className="side-gua__tiyong-line">
            <span className="side-gua__tiyong-tag side-gua__tiyong-tag--body">体</span>
            {tiYong.body.name}（{tiYong.body.element}）— {tiYong.body.associations}
          </p>
          <p className="side-gua__tiyong-line">
            <span className="side-gua__tiyong-tag side-gua__tiyong-tag--use">用</span>
            {tiYong.use.name}（{tiYong.use.element}）— {tiYong.use.associations}
          </p>
          <p className="side-gua__tiyong-result">
            {tiYong.relation.text}
            <span className={`side-gua__tiyong-status side-gua__tiyong-status--${tiYong.relation.status}`}>
              [{STATUS_LABELS[tiYong.relation.status] || ''}]
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
