import React from "react";
import { useTimerContext } from "./useTimerStore";
import { TimerItem } from "./TimerItem";

export const TimerList = () => {
  const { timers } = useTimerContext();

  return (
    <ul className="grid grid-cols-1 gap-4">
      {timers.map((timer, index) => (
        <TimerItem key={timer.id} timer={timer} index={index} />
      ))}
    </ul>
  );
};
