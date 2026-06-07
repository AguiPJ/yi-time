import YaoLine from './YaoLine';
import { FOUR_IMAGES } from '../data/trigrams';
import './Layer2FourImages.css';

/**
 * Layer2FourImages — 第二层：四象
 * 上爻保留原色，下爻应用渐变效果
 */
export default function Layer2FourImages() {
  return (
    <section className="layer layer-2">
      <h2 className="layer__title">第二层 · 四象</h2>
      <div className="layer-2__items">
        {FOUR_IMAGES.map((img) => (
          <div key={img.id} className="four-image">
            <div className="four-image__stack">
              {/* 上爻：原色 */}
              <YaoLine type={img.top} size="md" />
              {/* 下爻：渐变 */}
              <YaoLine type={img.bottom} size="md" gradient />
            </div>
            <span className="four-image__name">{img.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
