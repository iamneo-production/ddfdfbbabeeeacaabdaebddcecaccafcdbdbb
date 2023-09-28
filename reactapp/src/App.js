import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const milliseconds = Math.floor((timeInSeconds * 100) % 100);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  const startStopwatch = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    setIsRunning(!isRunning);
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, formatTime(time)]);
  };

  return (
    <div>
      <div className="time-display">{formatTime(time)}</div>
      <button onClick={startStopwatch} disabled={laps.length > 0 && !isRunning}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={resetStopwatch}>Reset</button>
      <button onClick={addLap} disabled={!isRunning}>
        Add Lap
      </button>
      <ul className="laps-list">
        {laps.map((lap, index) => (
          <li key={index} className="lap-item">
            Lap {index + 1}: {lap}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
