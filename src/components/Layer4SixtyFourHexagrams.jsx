import YaoLine from './YaoLine';
import { TRIGRAMS } from '../data/trigrams';
import { HEXAGRAMS } from '../data/hexagrams';
import './Layer4SixtyFourHexagrams.css';

/**
 * Layer4SixtyFourHexagrams — 第四层：六十四卦
 * 8×8 网格，上卦为行(纵)，下卦为列(横)
 * 每卦6爻：下3爻用下卦颜色，上3爻用上卦颜色
 */
export default function Layer4SixtyFourHexagrams() {
  return (
    <section className="layer layer-4">
      <h2 className="layer__title">第四层 · 六十四卦</h2>

      {/* 列头：下卦 */}
      <div className="hex-grid__header-row">
        <div className="hex-grid__corner" />
        {TRIGRAMS.map((t) => (
          <div key={t.id} className="hex-grid__col-label" style={{ color: t.color }}>
            <span className="hex-grid__col-symbol">{t.unicode}</span>
            <span className="hex-grid__col-name">{t.name}</span>
            <span className="hex-grid__col-sub">下卦</span>
          </div>
        ))}
      </div>

      {/* 8×8 卦象网格 */}
      {HEXAGRAMS.map((row, r) => (
        <div key={r} className="hex-grid__row">
          {/* 行头：上卦 */}
          <div
            className="hex-grid__row-label"
            style={{ color: TRIGRAMS[r].color }}
          >
            <span className="hex-grid__row-symbol">{TRIGRAMS[r].unicode}</span>
            <span className="hex-grid__row-name">{TRIGRAMS[r].name}</span>
            <span className="hex-grid__row-sub">上卦</span>
          </div>

          {row.map((hex) => (
            <div key={hex.id} className="hex-cell">
              <div className="hex-cell__lines">
                {hex.lines.map((type, i) => {
                  // 下3爻 = 下卦颜色, 上3爻 = 上卦颜色
                  const color = i < 3 ? hex.lowerColor : hex.upperColor;
                  return (
                    <YaoLine key={i} type={type} size="sm" color={color} />
                  );
                })}
              </div>
              <span className="hex-cell__name">{hex.name}</span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
