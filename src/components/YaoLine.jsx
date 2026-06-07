import './YaoLine.css';

/**
 * YaoLine — 基础爻组件（函数组件）
 *
 * Props:
 *   type:     'yang' | 'yin'   — 阳爻（长线）或阴爻（双短线）
 *   color:    string            — 线条颜色，默认 yang=金色 yin=黑色
 *   gradient: boolean           — 是否应用渐变效果（Layer 2 下方爻使用）
 *   size:     'sm' | 'md' | 'lg' — 尺寸档位
 */
export default function YaoLine({
  type = 'yang',
  color,
  gradient = false,
  size = 'md',
}) {
  const isYang = type === 'yang';
  const lineColor = color || (isYang ? '#C9A84C' : '#1a1a1a');

  const className = [
    'yao-line',
    `yao-line--${size}`,
    isYang ? 'yao-line--yang' : 'yao-line--yin',
    gradient ? 'yao-line--gradient' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} style={{ '--yao-color': lineColor }}>
      {isYang ? (
        <span className="yao-line__bar yao-line__bar--full" />
      ) : (
        <>
          <span className="yao-line__bar yao-line__bar--left" />
          <span className="yao-line__bar yao-line__bar--right" />
        </>
      )}
    </div>
  );
}
