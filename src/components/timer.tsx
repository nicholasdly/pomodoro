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
import { Howl } from "howler";

type TimerState = {
  status: "running" | "stopped" | "paused";
  mode: "working" | "break";
  timeLeft: number;
  workTime: number;
  breakTime: number;
  volume: number;
};

type TimerActions = {
  tick: () => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setWorkTime: (duration: number) => void;
  setBreakTime: (duration: number) => void;
  setVolume: (volume: number) => void;
};

const WORK_SOUND = new Howl({ src: ["/sounds/work.mp3"] });
const BREAK_SOUND = new Howl({ src: ["/sounds/break.mp3"] });

const useTimerStore = create<TimerState & TimerActions>((set) => ({
  status: "stopped",
  mode: "working",
  timeLeft: 25 * 60,
  workTime: 25,
  breakTime: 5,
  volume: 50,
  tick: () =>
    set((state) => {
      if (state.timeLeft > 0) return { timeLeft: state.timeLeft - 1 };

      const mode = state.mode === "working" ? "break" : "working";
      const timeLeft =
        mode === "working" ? state.workTime * 60 : state.breakTime * 60;

      if (mode === "working") {
        WORK_SOUND.volume(state.volume / 100);
        WORK_SOUND.play();
      } else {
        BREAK_SOUND.volume(state.volume / 100);
        BREAK_SOUND.play();
      }

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
  setVolume: (volume: number) => {
    set(() => ({ volume }));
    BREAK_SOUND.volume(volume / 100);
    WORK_SOUND.volume(volume / 100);
    BREAK_SOUND.play();
  },
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
    status,
    workTime,
    breakTime,
    volume,
    start,
    pause,
    reset,
    setWorkTime,
    setBreakTime,
    setVolume,
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
            min={5}
            step={5}
            defaultValue={[workTime]}
            onValueChange={(values) => setWorkTime(values[0])}
            disabled={status !== "stopped"}
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
            disabled={status !== "stopped"}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="volume" className="text-nowrap text-sm">
            {volume}% alert volume
          </label>
          <Slider
            id="volume"
            max={100}
            min={0}
            step={10}
            defaultValue={[volume]}
            onValueChange={(values) => setVolume(values[0])}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={status === "running"}
            onClick={start}
          >
            <PlayIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={status !== "running"}
            onClick={pause}
          >
            <PauseIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={status !== "paused"}
            onClick={reset}
          >
            <RotateCcwIcon className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
