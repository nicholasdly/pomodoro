"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { Slider } from "./shadcn/slider";
import { Button } from "./shadcn/button";
import { PlayIcon, RotateCcwIcon, PauseIcon } from "lucide-react";
import { useEffect } from "react";
import { create } from "zustand";

type TimerState = {
  status: "running" | "stopped" | "paused";
  mode: "working" | "break";
  timeLeft: number;
  workTime: number;
  breakTime: number;
};

type TimerActions = {
  tick: () => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setWorkTime: (duration: number) => void;
  setBreakTime: (duration: number) => void;
};

const useTimerStore = create<TimerState & TimerActions>((set) => ({
  status: "stopped",
  mode: "working",
  timeLeft: 25 * 60,
  workTime: 25,
  breakTime: 5,
  tick: () =>
    set((state) => {
      if (state.timeLeft > 0) return { timeLeft: state.timeLeft - 1 };

      const mode = state.mode === "working" ? "break" : "working";
      const timeLeft =
        mode === "working" ? state.workTime * 60 : state.breakTime * 60;

      return { mode, timeLeft };
    }),
  start: () => set(() => ({ status: "running" })),
  pause: () => set(() => ({ status: "paused" })),
  reset: () =>
    set((state) => ({
      status: "stopped",
      mode: "working",
      timeLeft: state.workTime * 60,
    })),
  setWorkTime: (minutes: number) =>
    set(() => ({ timeLeft: minutes * 60, workTime: minutes })),
  setBreakTime: (minutes: number) => set(() => ({ breakTime: minutes })),
}));

export function TimerCard() {
  const { status, mode, timeLeft, tick } = useTimerStore();

  // Start the timer when the timer state is "running".
  useEffect(() => {
    const isActive = status === "running";
    const interval = isActive ? setInterval(tick, 1000) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, tick]);

  const state = status === "running" ? mode : status;
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  return (
    <Card className="flex h-full flex-col items-center justify-center p-6">
      <p className="font-base font-mono text-7xl">
        {minutes}:{seconds}
      </p>
      <p className="text-sm uppercase tracking-wider">{state}</p>
    </Card>
  );
}

export function TimerControlsCard() {
  const {
    status: state,
    workTime,
    breakTime,
    start,
    pause,
    reset,
    setWorkTime,
    setBreakTime,
  } = useTimerStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timer Controls</CardTitle>
        <CardDescription>
          Modify and control the timer to fit your needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="work" className="text-nowrap text-sm">
            {workTime} work minutes
          </label>
          <Slider
            id="work"
            max={90}
            min={1}
            step={1}
            defaultValue={[workTime]}
            onValueChange={(values) => setWorkTime(values[0])}
            disabled={state !== "stopped"}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="break" className="text-nowrap text-sm">
            {breakTime} break minutes
          </label>
          <Slider
            id="break"
            max={20}
            min={1}
            step={1}
            defaultValue={[breakTime]}
            onValueChange={(values) => setBreakTime(values[0])}
            disabled={state !== "stopped"}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={state === "running"}
            onClick={start}
          >
            <PlayIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={state !== "running"}
            onClick={pause}
          >
            <PauseIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={state !== "paused"}
            onClick={reset}
          >
            <RotateCcwIcon className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
