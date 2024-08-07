import React, { createContext, useContext, useState } from "react";

const TimerContext = createContext();

export const useTimerContext = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);

  const addTimer = (timer) => {
    const endAt = Date.now() + timer.duration;
    setTimers((prev) => [
      ...prev,
      { ...timer, timeLeft: timer.duration, endAt },
    ]);
  };

  const startTimer = (index) => {
    setTimers((prev) => {
      const newTimers = [...prev];
      const timer = {
        ...newTimers[index],
        isRunning: true,
        endAt: Date.now() + newTimers[index].timeLeft,
      };
      newTimers[index] = timer;
      return newTimers;
    });
  };

  const stopTimer = (index) => {
    setTimers((prev) => {
      const newTimers = [...prev];
      const timer = {
        ...newTimers[index],
        isRunning: false,
        timeLeft: newTimers[index].endAt - Date.now(),
      };
      newTimers[index] = timer;
      return newTimers;
    });
  };

  const removeTimer = (index) => {
    setTimers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimer,
        startTimer,
        stopTimer,
        removeTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
