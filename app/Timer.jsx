import { X, Play, Pause, Bell, Circle } from "lucide-react";

import useTimerStore from "./useTimerStore";

const getTimerText = (time) => {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let timeText = "";

  if (hours > 0) {
    timeText += `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else if (minutes > 0) {
    timeText += `${minutes}:${seconds.toString().padStart(2, "0")}`;
  } else {
    timeText += `${seconds}`;
  }

  return timeText;
};

const getEndAtText = (time) => {
  const endAtDate = new Date(time);
  const endAtText = endAtDate.toLocaleTimeString();
  return endAtText;
};

const Timer = ({ timerId }) => {
  const timer = useTimerStore((s) => s.timers.find((t) => t?.id === timerId));

  if (!timer) return null;

  const { id, duration, timeLeft, isRunning, endAt } = timer;

  const removeTimer = useTimerStore((state) => state.removeTimer);
  const toggleIsRunning = useTimerStore((state) => state.toggleIsRunning);

  const timeText = getTimerText(timeLeft);
  const endAtText = getEndAtText(endAt);

  return (
    <li className="m-auto size-fit" style={{ opacity: 1 }}>
      <div className="relative flex size-[224px] flex-col gap-2 rounded-2xl bg-base-200 p-4">
        <div className="relative flex size-full flex-col items-center justify-center gap-1">
          <svg width="198" height="198" className="absolute overflow-visible">
            {/* Cercle de fond */}
            <Circle
              width="199"
              height="199"
              r="99"
              strokeWidth="0.5"
              stroke="#d1d5db" // Couleur du fond (gris clair)
              fill="none"
            />
            {/* Cercle de progression */}
            <Circle
              width="199"
              height="199"
              r="99"
              strokeWidth="0.5"
              stroke="#fbbf24" // Couleur orange
              fill="none"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              className="transition-transform duration-500" // Animation fluide
            />
          </svg>
          <div className="flex items-center justify-between gap-2">
            <Bell />
            <p>{endAtText}</p>
          </div>
          <div className="relative flex items-center justify-center">
            <p className="text-base-content text-2xl">{timeText}</p>
          </div>
        </div>
        <button className="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-base-300 p-0 text-base-content">
          <X
            onClick={(e) => {
              removeTimer(id);
            }}
          />
        </button>
        {isRunning ? (
          <button className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full bg-warning p-0 text-warning-content">
            <Pause
              onClick={(e) => {
                toggleIsRunning(id);
              }}
            />
          </button>
        ) : (
          <button className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full bg-success p-0 text-success-content">
            <Play
              onClick={(e) => {
                toggleIsRunning(id);
              }}
            />
          </button>
        )}
      </div>
    </li>
  );
};

export default Timer;
