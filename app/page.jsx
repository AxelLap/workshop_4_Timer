"use client";

import { useState } from "react";
import { useTimerContext, TimerProvider } from "./useTimerStore";
import { TimerList } from "./TimerList";

const Home = () => {
  const { addTimer } = useTimerContext();
  const [time, setTime] = useState({
    hours: "00",
    minutes: "01",
    seconds: "00",
    name: "Timer",
  });

  const formatTimeValue = (value, max) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0) return 0;
    return Math.min(numValue, max);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: formatTimeValue(value, name === "hours" ? 23 : 59),
    }));
  };

  const handleAddTimer = () => {
    const ms =
      parseInt(time.hours, 10) * 3600000 +
      parseInt(time.minutes, 10) * 60000 +
      parseInt(time.seconds, 10) * 1000;

    addTimer({ id: Date.now(), duration: ms, isRunning: true });
  };

  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <h1 className="mx-auto w-fit rounded-md bg-base-200 px-4 py-2 text-lg font-bold text-base-content">
        Timer
      </h1>
      <div className="mx-auto flex w-fit flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="flex-1 text-center text-neutral-content">Hours</p>
          <p className="flex-1 text-center text-neutral-content">Minutes</p>
          <p className="flex-1 text-center text-neutral-content">Seconds</p>
        </div>
        <div className="flex items-center rounded-md border border-neutral bg-base-200 p-2">
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
            name="hours"
            value={time.hours}
            onChange={handleInputChange}
          />
          <p className="text-lg">:</p>
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
            name="minutes"
            value={time.minutes}
            onChange={handleInputChange}
          />
          <p className="text-lg">:</p>
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
            name="seconds"
            value={time.seconds}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={handleAddTimer} className="btn btn-success">
            Add timer
          </button>
        </div>
      </div>
      <TimerList />
    </main>
  );
};

const App = () => {
  return (
    <TimerProvider>
      <Home />
    </TimerProvider>
  );
};

export default App;
