import YaoLine from './YaoLine';
import { TRIGRAMS } from '../data/trigrams';
import './Layer3EightTrigrams.css';

/**
 * Layer3EightTrigrams — 第三层：八卦
 * 每个卦象由三爻组成，颜色对应五行元素
 */
export default function Layer3EightTrigrams() {
  return (
    <section className="layer layer-3">
      <h2 className="layer__title">第三层 · 八卦</h2>
      <div className="layer-3__items">
        {TRIGRAMS.map((trigram) => (
          <div key={trigram.id} className="trigram-card">
            <div className="trigram-card__stack">
              {trigram.lines.map((type, i) => (
                <YaoLine key={i} type={type} size="sm" color={trigram.color} />
              ))}
            </div>
            <div className="trigram-card__info">
              <span className="trigram-card__symbol">{trigram.unicode}</span>
              <span className="trigram-card__name" style={{ color: trigram.color }}>
                {trigram.name}
              </span>
              <span className="trigram-card__element">{trigram.element}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
