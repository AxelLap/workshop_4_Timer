"use client";

import { useEffect } from "react";
import useTimerStore from "./useTimerStore";

const useTimerInterval = () => {
  useEffect(() => {
    const audio = new Audio("/sounds/ring.mp3");
    const intervalId = setInterval(() => {
      useTimerStore.setState((state) => ({
        timers: state.timers.map((timer) => {
          if (!timer || !timer.isRunning) return timer; // Vérifiez si le timer est défini et s'il est en cours d'exécution

          const now = Date.now();
          const newTime = timer.endAt - now;

          if (newTime <= 0) {
            audio.play().catch((error) => {
              console.error("Erreur lors de la lecture du son:", error);
            });
            return {
              ...timer,
              isRunning: false,
              timeLeft: 0,
            };
          }

          return {
            ...timer,
            timeLeft: newTime,
          };
        }),
      }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
};

export default useTimerInterval;
