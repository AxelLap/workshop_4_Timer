import { useState } from "react";
export default function useTimerStore() {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "01",
    seconds: "00",
  });
  return [time, setTime];
}
