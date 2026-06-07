import YaoLine from './YaoLine';
import { TRIGRAMS } from '../data/trigrams';
import { HEXAGRAMS } from '../data/hexagrams';
import './Layer4SixtyFourHexagrams.css';

/**
 * Layer4SixtyFourHexagrams — 第四层：六十四卦
 * 8×8 网格，上卦为行(纵)，下卦为列(横)
 * 高亮 本卦→互卦→变卦 三卦
 *
 * Props:
 *   activeResult: timeToHexagram 的结果或 null
 */
export default function Layer4SixtyFourHexagrams({ activeResult }) {
  const benRow = activeResult?.benGua?.row;
  const benCol = activeResult?.benGua?.col;
  const huRow = activeResult?.huGua?.row;
  const huCol = activeResult?.huGua?.col;
  const bianRow = activeResult?.bianGua?.row;
  const bianCol = activeResult?.bianGua?.col;
  const dongYaoIdx = activeResult?.dongYaoIndex;

  // 判断某个单元格是什么类型的高亮
  function getCellType(r, c) {
    if (r === benRow && c === benCol) return 'ben';
    if (r === huRow && c === huCol) return 'hu';
    if (r === bianRow && c === bianCol) return 'bian';
    return null;
  }

  return (
    <section className="layer layer-4">
      <h2 className="layer__title">第四层 · 六十四卦</h2>

      {/* 列头：下卦 */}
      <div className="hex-grid__header-row">
        <div className="hex-grid__corner" />
        {TRIGRAMS.map((t, ci) => (
          <div
            key={t.id}
            className={
              'hex-grid__col-label' +
              (benCol === ci ? ' hex-grid__col-label--active' : '')
            }
            style={{ color: t.color }}
          >
            <span className="hex-grid__col-symbol">{t.unicode}</span>
            <span className="hex-grid__col-name">{t.name}</span>
            <span className="hex-grid__col-sub">下卦</span>
          </div>
        ))}
      </div>

      {/* 8×8 卦象网格 */}
      {HEXAGRAMS.map((row, r) => (
        <div key={r} className="hex-grid__row">
          <div
            className={
              'hex-grid__row-label' +
              (benRow === r ? ' hex-grid__row-label--active' : '')
            }
            style={{ color: TRIGRAMS[r].color }}
          >
            <span className="hex-grid__row-symbol">{TRIGRAMS[r].unicode}</span>
            <span className="hex-grid__row-name">{TRIGRAMS[r].name}</span>
            <span className="hex-grid__row-sub">上卦</span>
          </div>

          {row.map((hex, c) => {
            const cellType = getCellType(r, c);
            const isBen = cellType === 'ben';
            return (
              <div
                key={hex.id}
                className={
                  'hex-cell' +
                  (cellType ? ` hex-cell--${cellType}` : '') +
                  (cellType && activeResult?.timestamp
                    ? ' hex-cell--glow'
                    : '')
                }
              >
                <div className="hex-cell__lines">
                  {hex.lines.map((type, i) => {
                    const color = i < 3 ? hex.lowerColor : hex.upperColor;
                    const isDongYao = isBen && dongYaoIdx === i;
                    return (
                      <div
                        key={i}
                        className={
                          'hex-cell__line-wrap' +
                          (isDongYao ? ' hex-cell__line-wrap--dongyao' : '')
                        }
                      >
                        <YaoLine type={type} size="sm" color={color} />
                      </div>
                    );
                  })}
                </div>
                <span className="hex-cell__name">{hex.name}</span>
              </div>
            );
          })}
        </div>
      ))}

      {/* 流程条：本卦 → 互卦 → 变卦 */}
      {activeResult && (
        <div className="hex-flow">
          <div className="hex-flow__item hex-flow__item--ben">
            <span className="hex-flow__dot" />
            <span className="hex-flow__label">本卦 · 现状</span>
            <span className="hex-flow__name">{activeResult.benGua.name}</span>
          </div>
          <span className="hex-flow__arrow">→</span>
          <div className="hex-flow__item hex-flow__item--hu">
            <span className="hex-flow__dot" />
            <span className="hex-flow__label">互卦 · 过程</span>
            <span className="hex-flow__name">{activeResult.huGua.name}</span>
          </div>
          <span className="hex-flow__arrow">→</span>
          <div className="hex-flow__item hex-flow__item--bian">
            <span className="hex-flow__dot" />
            <span className="hex-flow__label">变卦 · 结果</span>
            <span className="hex-flow__name">{activeResult.bianGua.name}</span>
          </div>
        </div>
      )}
    </section>
  );
}
