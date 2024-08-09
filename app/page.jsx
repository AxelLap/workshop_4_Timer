"use client";

import { useState } from "react";
import useTimerStore from "./useTimerStore"; // Importer le store Zustand
import Timer from "./Timer";
import useTimerInterval from "./useTimerInterval";

export default function Home() {
  const [time, setTime] = useState({ hrs: "00", mins: "01", secs: "00" });
  const timers = useTimerStore((state) => state.timers); // Récupérer les timers depuis le store
  const addTimer = useTimerStore((state) => state.addTimer); // Récupérer la fonction addTimer

  const handleAddTimer = () => {
    const ms =
      parseInt(time.hrs, 10) * 3600000 +
      parseInt(time.mins, 10) * 60000 +
      parseInt(time.secs, 10) * 1000;

    if (ms < 10000) {
      alert("Timer must be at least 10 seconds");
      return;
    }

    addTimer(ms); // Appeler la fonction addTimer du store Zustand
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = Math.min(value, name === "hrs" ? 23 : 59);
    setTime((prevTime) => ({ ...prevTime, [name]: formattedValue }));
  };

  useTimerInterval();

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
            name="hrs"
            value={time.hrs}
            onChange={handleInputChange}
          />
          <p className="text-lg">:</p>
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
            name="mins"
            value={time.mins}
            onChange={handleInputChange}
          />
          <p className="text-lg">:</p>
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
            name="secs"
            value={time.secs}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={handleAddTimer} className="btn btn-success">
            Add timer
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4">
        {timers.map((timer) => (
          <Timer key={timer.id} timerId={timer.id} />
        ))}
      </ul>
    </main>
  );
}
