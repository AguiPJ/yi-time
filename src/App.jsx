import Layer1Lines from './components/Layer1Lines';
import Layer2FourImages from './components/Layer2FourImages';
import Layer3EightTrigrams from './components/Layer3EightTrigrams';
import Layer4SixtyFourHexagrams from './components/Layer4SixtyFourHexagrams';
import './App.css';

/**
 * App — 卦象时间墙主页面
 * 四层垂直排列：两爻 → 四象 → 八卦 → 六十四卦
 */
export default function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">卦象时间墙</h1>
        <p className="app__subtitle">Yi-Time · Hexagram Wall</p>
      </header>

      <Layer1Lines />
      <hr className="layer-divider" />
      <Layer2FourImages />
      <hr className="layer-divider" />
      <Layer3EightTrigrams />
      <hr className="layer-divider" />
      <Layer4SixtyFourHexagrams />

      <footer className="app__footer">
        <p>易有太极 · 是生两仪 · 两仪生四象 · 四象生八卦</p>
      </footer>
    </main>
  );
}
