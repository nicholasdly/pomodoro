import { TasksCard } from "@/components/tasks";
import { TimerCard, TimerControlsCard } from "@/components/timer";

export default function Home() {
  return (
    <main className="grid gap-4 sm:grid-cols-2">
      <section>
        <TimerCard />
      </section>
      <section>
        <TimerControlsCard />
      </section>
      <section className="sm:col-span-2">
        <TasksCard />
      </section>
    </main>
  );
}
