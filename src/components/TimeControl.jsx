import { useState, useEffect, useRef } from 'react';
import './TimeControl.css';

/**
 * TimeControl — 时间选择器 + 随机播放控制
 *
 * Props:
 *   onTimeChange: (date: Date, isManual: boolean) => void
 *   playing:      boolean
 *   onTogglePlay: () => void
 */
export default function TimeControl({ onTimeChange, playing, onTogglePlay }) {
  const [manualTime, setManualTime] = useState('');
  const intervalRef = useRef(null);

  // 随机播放
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        const start = new Date(1900, 0, 1).getTime();
        const end = new Date(2100, 11, 31).getTime();
        const ts = start + Math.random() * (end - start);
        onTimeChange(new Date(ts), false);
      }, 10000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, onTimeChange]);

  const handleManualSelect = (e) => {
    const value = e.target.value;
    setManualTime(value);
    if (value) {
      onTimeChange(new Date(value), true);
    }
  };

  return (
    <div className="time-control">
      <button
        className="time-control__btn"
        onClick={onTogglePlay}
        title={playing ? '暂停' : '播放'}
      >
        {playing ? '⏸ 暂停' : '▶ 播放'}
      </button>

      <label className="time-control__picker">
        <span className="time-control__label">选择时间：</span>
        <input
          type="datetime-local"
          className="time-control__input"
          value={manualTime}
          onChange={handleManualSelect}
        />
      </label>
    </div>
  );
}
