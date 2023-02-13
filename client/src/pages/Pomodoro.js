import React, { useState, useEffect } from "react";
import "../styles/Pomodoro.css";


export default function Pomodoro() {
  const [duration, setDuration] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    const id = setInterval(() => {
      setDuration((duration) => {
        if (duration === 0) {
          clearInterval(intervalId);
          setIsRunning(false);
        }
        return duration - 1;
      });
    }, 1000);
    setIsRunning(true);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;

  return (
    <div className="pomodoro">
      <h1>Pomodoro</h1>

      <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      {isRunning ? (
        <button onClick={stopTimer}>Stop</button>
      ) : (
        <button onClick={startTimer}>Start</button>
      )}
    </div>
  );
}

/* 

  const [pomodoros, setPomodoros] = useState([]);

  
useEffect(() => {
    async function fetchPomodoro() {
      const response = await fetch("http://localhost:3001/pomodoro");
      const data = await response.json();
      setPomodoros(data);

      console.log(data);
    }

    fetchPomodoro();
  }, []);



    {pomodoros.map((pomodoro) => (
        <div key={pomodoro._id}>
          <p>{pomodoro.duration}</p>
          <p>Duration: {formatDuration(pomodoro.duration)}</p>
        </div>
      ))}


       // function formatDuration(durationInSeconds) {
  //   const minutes = Math.floor((durationInSeconds % 3600) / 60);
  //   const seconds = durationInSeconds % 60;

  //   return `${minutes}:${seconds}`;
  // }
*/
