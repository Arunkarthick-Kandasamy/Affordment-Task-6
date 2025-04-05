import React, { useState, useEffect } from "react";
import "./index.css";

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      setBlink(true);
    }
    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const startPause = () => setIsRunning(!isRunning);

  const reset = () => {
    setMinutes(1);
    setSeconds(0);
    setIsRunning(false);
    setBlink(false);
  };

  return (
    <>
    <div className="timer-container">
      <h1 className={`timer ${blink ? "blink" : ""}`}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>
      <div className="inputs">
        <input className="box"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
          disabled={isRunning}
        />
        <span>:</span>
        <input className="box"
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
          disabled={isRunning}
        />
      </div>
      <div className="buttons">
        <button onClick={startPause} className={isRunning ? "pause" : "start"}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={reset} className="reset">Reset</button>
      </div>
    </div>
    </>
  );
};

export default CountdownTimer;
