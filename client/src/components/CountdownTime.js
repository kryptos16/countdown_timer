import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const CountdownTime = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const intervalRef = useRef(null);
  const totalSeconds = useRef(0);
  const audioRef = useRef(null);

  const calculateTimeLeft = (total) => {
    const d = Math.floor(total / (3600 * 24));
    const h = Math.floor((total % (3600 * 24)) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = Math.floor(total % 60);
    return { d, h, m, s };
  };

  const startTimer = () => {
    totalSeconds.current = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds.current <= 0) return;

    setIsRunning(true);
    setIsFinished(false);
    intervalRef.current = setInterval(() => {
      totalSeconds.current -= 1;
      if (totalSeconds.current <= 0) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsFinished(true);
        if (audioRef.current) {
          // Check if the audio is ready to play
          audioRef.current.play().catch((error) => {
            console.log('Error playing audio:', error);
          });
        }
      }
      const timeLeft = calculateTimeLeft(totalSeconds.current);
      setDays(timeLeft.d);
      setHours(timeLeft.h);
      setMinutes(timeLeft.m);
      setSeconds(timeLeft.s);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(10);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="container">
      {isFinished && (
        <div className="overlay">
          <h2> Time's up! </h2>
        </div>
      )}
      <h1 className="title">⏳ Countdown Timer</h1>
      <div className="inputs">
        <div><label>Days</label><input type="number" value={days} onChange={(e) => setDays(+e.target.value)} /></div>
        <div><label>Hours</label><input type="number" value={hours} onChange={(e) => setHours(+e.target.value)} /></div>
        <div><label>Minutes</label><input type="number" value={minutes} onChange={(e) => setMinutes(+e.target.value)} /></div>
        <div><label>Seconds</label><input type="number" value={seconds} onChange={(e) => setSeconds(+e.target.value)} /></div>
      </div>

      <div className="countdown">
        <div className="time-box"><span>{days}</span><p>Days</p></div>
        <div className="time-box"><span>{hours}</span><p>Hours</p></div>
        <div className="time-box"><span>{minutes}</span><p>Minutes</p></div>
        <div className="time-box"><span>{seconds}</span><p>Seconds</p></div>
      </div>

      <div className="buttons">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <audio ref={audioRef} preload="auto">
  <source src="/alarm.mp3/siren.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

    </div>
  );
};

export default CountdownTime;



