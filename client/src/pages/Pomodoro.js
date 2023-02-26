import React, { useState, useEffect } from "react";
import "../styles/Pomodoro.css";
import pauseIcon from "../styles/icons/pause.svg";
import startIcon from "../styles/icons/start.svg";


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
                    duration = 0;
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
            <h1 className="heading">Pomodoro</h1>

            <div className="mainPomodoro">
                <div className="counter">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
                {isRunning ? (
                    <button className="actionBtn" onClick={stopTimer}>
                        <img className="actionIcon pauseIcon" src={pauseIcon} alt="Pause" />
                    </button>
                ) : (
                    <button className="actionBtn" onClick={startTimer}>
                        <img className="actionIcon startIcon" src={startIcon} alt="Start" />
                    </button>
                )}
            </div>
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
