// useTimerStore.js
"use client";
import { create } from "zustand";

const useTimerStore = create((set) => ({
  timers: [],

  addTimer: (ms) =>
    set((state) => {
      const newTimer = {
        id: Date.now(),
        duration: ms,
        timeLeft: ms,
        endAt: Date.now() + ms,
        isRunning: true,
      };
      return { timers: [...state.timers, newTimer] };
    }),

  removeTimer: (timerId) =>
    set((state) => ({
      timers: state.timers.filter((timer) => timer.id !== timerId),
    })),

  toggleIsRunning: (timerId) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === timerId ? { ...timer, isRunning: !timer.isRunning } : timer
      ),
    })),
}));

export default useTimerStore;
