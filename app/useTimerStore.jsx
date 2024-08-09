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
      timers: state.timers.map((timer) => {
        if (timer.id === timerId) {
          if (timer.isRunning) {
            // Si le timer est actuellement en marche, on le met en pause
            const remainingTime = timer.endAt - Date.now();
            return {
              ...timer,
              isRunning: false,
              timeLeft: remainingTime, // Met à jour le temps restant
            };
          } else {
            const newEndAt =
              timer.timeLeft === 0
                ? Date.now() + timer.duration
                : Date.now() + timer.timeLeft;
            return {
              ...timer,
              isRunning: true,
              endAt: newEndAt,
            };
          }
        }
        return timer;
      }),
    })),
}));

export default useTimerStore;
