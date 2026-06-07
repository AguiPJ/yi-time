import { useState, useCallback } from 'react';
import Layer3EightTrigrams from './components/Layer3EightTrigrams';
import Layer4SixtyFourHexagrams from './components/Layer4SixtyFourHexagrams';
import TimeControl from './components/TimeControl';
import ActiveHexagram from './components/ActiveHexagram';
import SidePanel from './components/SidePanel';
import { timeToHexagram } from './utils/timeToHexagram';
import './App.css';

let captureId = 0;

/**
 * App — 卦象时间墙主页面
 * 时间驱动卦象：随机播放 + 手动选择 + 右侧收集面板
 */
export default function App() {
  const [result, setResult] = useState(null);
  const [isManual, setIsManual] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [captured, setCaptured] = useState([]);

  const handleTimeChange = useCallback((date, manual) => {
    const r = timeToHexagram(date);
    setResult(r);
    setIsManual(manual);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setPlaying((p) => {
      if (p) setIsManual(true);
      return !p;
    });
  }, []);

  const handleCapture = useCallback(() => {
    if (!result) return;
    const timeLabel =
      `${result.timeParts.year}-${String(result.timeParts.month).padStart(2, '0')}-${String(result.timeParts.day).padStart(2, '0')} ` +
      `${String(result.timeParts.hour).padStart(2, '0')}:${String(result.timeParts.minute).padStart(2, '0')}`;
    setCaptured((prev) => [
      {
        id: ++captureId,
        timeLabel,
        timestamp: result.timestamp,
        timeParts: result.timeParts,
        benGua: result.benGua,
        huGua: result.huGua,
        bianGua: result.bianGua,
      },
      ...prev,
    ]);
  }, [result]);

  return (
    <main className="app">
      <SidePanel entries={captured} />

      <header className="app__header">
        <h1 className="app__title">卦象时间墙</h1>
        <p className="app__subtitle">Yi-Time · Hexagram Wall</p>
      </header>

      <TimeControl
        onTimeChange={handleTimeChange}
        playing={playing}
        onTogglePlay={handleTogglePlay}
      />
      <ActiveHexagram
        result={result}
        isManual={isManual}
        onCapture={handleCapture}
      />

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
