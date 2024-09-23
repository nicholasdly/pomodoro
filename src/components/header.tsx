import Link from "next/link";
import { ThemeToggle } from "./theme";
import { Button } from "./shadcn/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background/50 backdrop-blur-md">
      <div className="mx-auto max-w-screen-md px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Button variant="link" asChild>
            <Link href="/" target="_self" className="text-xl font-semibold">
              pomodoro.nicholasly.com
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
