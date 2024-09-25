"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { CircleCheckIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { Input } from "./shadcn/input";
import { useEffect, useState } from "react";
import { nanoid } from "@/lib/utils";

type Task = {
  id: string;
  description: string;
};

type TaskState = {
  tasks: Task[];
};

type TaskActions = {
  addTask: (description: string) => void;
  removeTask: (id: string) => void;
};

export default function useTasks(): TaskState & TaskActions {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from `localStorage` on mount.
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
  }, []);

  const addTask = (description: string) =>
    setTasks((previous) => {
      const tasks = [...previous, { id: nanoid(), description }];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    });

  const removeTask = (id: string) =>
    setTasks((previous) => {
      const tasks = previous.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    });

  return { tasks, addTask, removeTask };
}

export function TasksCard() {
  const { tasks, addTask, removeTask } = useTasks();
  const [input, setInput] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task List</CardTitle>
        <CardDescription>
          Create tasks and check them off as you go. Tasks are stored in your
          browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-md border p-2"
          >
            <p className="ml-2">{task.description}</p>
            <Button
              className="shrink-0"
              variant="ghost"
              size="icon"
              onClick={() => removeTask(task.id)}
            >
              <CircleCheckIcon className="size-4" />
            </Button>
          </div>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex w-full items-center gap-2 border-dashed"
            >
              <PlusCircleIcon className="size-4" />
              <span>Add a task</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mx-5 max-w-80">
            <h4 className="font-medium leading-none">Add a task</h4>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Describe your task, then press Enter to add it.
            </p>
            <Input
              value={input}
              maxLength={40}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && input.trim().length > 0) {
                  addTask(input);
                  setInput("");
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
