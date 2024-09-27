"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import {
  CircleCheckIcon,
  GripVerticalIcon,
  PlusCircleIcon,
} from "lucide-react";
import { Button } from "./shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { Input } from "./shadcn/input";
import { useEffect, useState } from "react";
import { cn, nanoid } from "@/lib/utils";
import {
  sortableKeyboardCoordinates,
  arrayMove,
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type Task = {
  id: string;
  description: string;
};

type TaskState = {
  tasks: Task[];
};

type TaskActions = {
  setTasks: (tasks: Task[]) => void;
  addTask: (description: string) => void;
  removeTask: (id: string) => void;
};

export default function useTasks(): TaskState & TaskActions {
  const [tasks, setTaskState] = useState<Task[]>([]);

  // Load tasks from `localStorage` on mount.
  useEffect(() => {
    setTaskState(JSON.parse(localStorage.getItem("tasks") || "[]"));
  }, []);

  const setTasks = (tasks: Task[]) => {
    setTaskState(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    });
  };

  const addTask = (description: string) =>
    setTaskState((previous) => {
      const tasks = [...previous, { id: nanoid(), description }];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    });

  const removeTask = (id: string) =>
    setTaskState((previous) => {
      const tasks = previous.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    });

  return { tasks, setTasks, addTask, removeTask };
}

export function Task({
  task,
  removeTask,
}: {
  task: Task;
  removeTask: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex w-full items-center rounded-md border p-1",
        isDragging && "z-10 cursor-move opacity-30 ring-2 ring-primary",
      )}
    >
      <Button
        className="cursor-grab text-muted-foreground"
        variant="ghost"
        size="icon"
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon className="size-5" />
        <span className="sr-only">Move task</span>
      </Button>
      <p className="ml-2">{task.description}</p>
      <Button
        className="ml-auto shrink-0 justify-self-end rounded-full"
        variant="ghost"
        size="icon"
        onClick={() => removeTask(task.id)}
      >
        <CircleCheckIcon className="size-4" />
        <span className="sr-only">Complete task</span>
      </Button>
    </div>
  );
}

export function TasksCard() {
  const { tasks, setTasks, addTask, removeTask } = useTasks();
  const [input, setInput] = useState("");
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              // I'm annoyed that I have to pass `removeTask` to each task,
              // but calling the `useTasks` hook in the `TaskCard` component
              // doesn't seem to be working.
              <Task key={task.id} task={task} removeTask={removeTask} />
            ))}
          </SortableContext>
        </DndContext>
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
