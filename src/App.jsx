import { useState, useCallback } from 'react';
import Layer1Lines from './components/Layer1Lines';
import Layer2FourImages from './components/Layer2FourImages';
import Layer3EightTrigrams from './components/Layer3EightTrigrams';
import Layer4SixtyFourHexagrams from './components/Layer4SixtyFourHexagrams';
import TimeControl from './components/TimeControl';
import ActiveHexagram from './components/ActiveHexagram';
import { timeToHexagram } from './utils/timeToHexagram';
import './App.css';

/**
 * App — 卦象时间墙主页面
 * 时间驱动卦象：随机播放 + 手动选择
 */
export default function App() {
  const [result, setResult] = useState(null);
  const [isManual, setIsManual] = useState(false);
  const [playing, setPlaying] = useState(true);

  const handleTimeChange = useCallback((date, manual) => {
    const r = timeToHexagram(date);
    setResult(r);
    setIsManual(manual);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setPlaying((p) => {
      if (p) {
        // 暂停 → 保持当前卦象
        setIsManual(true);
      }
      return !p;
    });
  }, []);

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">卦象时间墙</h1>
        <p className="app__subtitle">Yi-Time · Hexagram Wall</p>
      </header>

      <TimeControl
        onTimeChange={handleTimeChange}
        playing={playing}
        onTogglePlay={handleTogglePlay}
      />
      <ActiveHexagram result={result} isManual={isManual} />

      <hr className="layer-divider" />
      <Layer1Lines />
      <hr className="layer-divider" />
      <Layer2FourImages />
      <hr className="layer-divider" />
      <Layer3EightTrigrams />
      <hr className="layer-divider" />
      <Layer4SixtyFourHexagrams activeResult={result} />

      <footer className="app__footer">
        <p>易有太极 · 是生两仪 · 两仪生四象 · 四象生八卦</p>
      </footer>
    </main>
  );
}
