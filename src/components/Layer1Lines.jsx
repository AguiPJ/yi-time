import YaoLine from './YaoLine';
import './Layer1Lines.css';

/**
 * Layer1Lines — 第一层：阴阳两爻
 * 展示阳爻（金色长线）和阴爻（黑色双短线）
 */
export default function Layer1Lines() {
  return (
    <section className="layer layer-1">
      <h2 className="layer__title">第一层 · 两爻</h2>
      <div className="layer-1__items">
        <div className="layer-1__item">
          <YaoLine type="yang" size="lg" />
          <span className="layer-1__label layer-1__label--yang">阳</span>
        </div>
        <div className="layer-1__item">
          <YaoLine type="yin" size="lg" />
          <span className="layer-1__label layer-1__label--yin">阴</span>
        </div>
      </div>
    </section>
  );
}
