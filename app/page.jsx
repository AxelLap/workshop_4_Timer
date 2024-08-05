"use client";

import useTimerStore from "./useTimerStore";
import { X, Bell, Play, Pause, Circle } from "lucide-react";

export default function Home() {
  const [time, setTime] = useTimerStore();

  const formatTimeValue = (value, max) => {
    const numValue = parseInt(value, 10);

    if (isNaN(numValue) || numValue < 0) {
      return 0;
    }

    const formatedValue = value > max ? max : value;

    return formatedValue;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedTime = formatTimeValue(value, name === "hours" ? 23 : 59);
    setTime((prevTime) => ({
      ...prevTime,
      [name]: formattedTime,
    }));
  };

  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <h1 className="mx-auto w-fit rounded-md bg-base-200 px-4 py-2 text-lg font-bold text-base-content">
        Timer
      </h1>
      <div className="mx-auto flex w-fit flex-col gap-4">
        <div className="flex items-center justify-between ">
          <p className="flex-1 text-center text-neutral-content">Hours</p>
          <p className="flex-1 text-center text-neutral-content">Minutes</p>
          <p className="flex-1 text-center text-neutral-content">Seconds</p>
        </div>

        <div className="flex items-center rounded-md border border-neutral bg-base-200 p-2">
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
            name="hours"
            value={time.hours}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <p className="text-lg">:</p>
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
            name="minutes"
            value={time.minutes}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <p className="text-lg">:</p>
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
            name="seconds"
            value={time.seconds}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button className="btn btn-success">Add timer</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="m-auto size-fit" style={{ opacity: 1 }}>
          <div className="relative flex size-[224px] flex-col gap-2 rounded-2xl bg-base-200 p-4">
            <div className="relative flex size-full flex-col items-center justify-center gap-1">
              <svg width={198} height={198} className="absolute">
                <Circle width={198} height={198} strokeWidth="0.5" />
              </svg>
              <div className="flex items-center justify-between gap-2">
                <Bell />
                <p>12:00</p>
              </div>
              <div className="relative flex items-center justify-center">
                <p className="text-base-content text-2xl">00:00:00</p>
              </div>
            </div>
            <button className="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-base-300 p-0 text-base-content">
              <X />
            </button>
            <button className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full bg-success p-0 text-success-content">
              <Play />
            </button>
            <button className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full bg-warning p-0 text-warning-content">
              <Pause />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
