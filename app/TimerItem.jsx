import React, { useEffect, useState, useRef } from "react";
import { useTimerContext } from "./useTimerStore";
import { X, Play, Pause, Bell, Circle } from "lucide-react";

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const formatEndAt = (endAt) => {
  const date = new Date(endAt);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const TimerItem = ({ timer, index }) => {
  const { startTimer, stopTimer, removeTimer } = useTimerContext();
  const [timeLeft, setTimeLeft] = useState(timer.timeLeft);
  const [progress, setProgress] = useState(0);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!timer.isRunning) return;

    const updateTimer = () => {
      const newTimeLeft = timer.endAt - Date.now();
      setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);

      // Update progress
      const newProgress = Math.max(
        (timer.duration - newTimeLeft) / timer.duration,
        0
      );
      setProgress(newProgress);

      if (newTimeLeft <= 0) {
        stopTimer(index); // Automatically stop the timer when it reaches zero
      } else {
        requestAnimationFrame(updateTimer); // Schedule next update
      }
    };

    updateTimer(); // Start updating

    return () => cancelAnimationFrame(updateTimer); // Clean up on unmount
  }, [timer.isRunning, timer.endAt, stopTimer, index, timer.duration]);

  const circumference = 2 * Math.PI * 99; // Circonférence du cercle
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <li className="m-auto size-fit" style={{ opacity: 1 }}>
      <div className="relative flex size-[224px] flex-col gap-2 rounded-2xl bg-base-200 p-4">
        <div className="relative flex size-full flex-col items-center justify-center gap-1">
          <svg width="198" height="198" className="absolute overflow-visible">
            {/* Cercle de fond */}
            <circle
              cx="99"
              cy="99"
              r="99"
              strokeWidth="4"
              stroke="#d1d5db" // Couleur du fond (gris clair)
              fill="none"
            />
            {/* Cercle de progression */}
            <circle
              ref={circleRef}
              cx="99"
              cy="99"
              r="99"
              strokeWidth="4"
              strokeDasharray={circumference} // Circonférence du cercle
              strokeDashoffset={strokeDashoffset}
              stroke="#fbbf24" // Couleur orange
              fill="none"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              className="transition-transform duration-500" // Animation fluide
            />
          </svg>
          <div className="flex items-center justify-between gap-2">
            <Bell />
            <p>{formatEndAt(timer.endAt)}</p>
          </div>
          <div className="relative flex items-center justify-center">
            <p className="text-base-content text-2xl">{formatTime(timeLeft)}</p>
          </div>
        </div>
        <button
          className="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-base-300 p-0 text-base-content"
          onClick={() => removeTimer(index)}
        >
          <X />
        </button>
        {timer.isRunning ? (
          <button
            className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full bg-warning p-0 text-warning-content"
            onClick={() => stopTimer(index)}
          >
            <Pause />
          </button>
        ) : (
          <button
            className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full bg-success p-0 text-success-content"
            onClick={() => startTimer(index)}
          >
            <Play />
          </button>
        )}
      </div>
    </li>
  );
};
