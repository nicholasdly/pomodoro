import Link from "next/link";
import { ThemeToggle } from "./theme";
import { Button } from "./shadcn/button";
import { GithubIcon, TwitterIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-6 flex items-center justify-between">
      <Button variant="ghost" className="h-fit justify-self-start" asChild>
        <Link href="/" target="_self" className="flex items-baseline gap-2">
          <span className="text-xl font-semibold sm:text-2xl">pomodoro</span>
          <span className="hidden text-sm text-muted-foreground sm:block">
            by Nicholas Ly
          </span>
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://github.com/nicholasdly/pomodoro"
            target="_blank"
            aria-label="GitHub"
            title="GitHub"
          >
            <GithubIcon className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://x.com/nichdly"
            target="_blank"
            aria-label="Twitter"
            title="Twitter"
          >
            <TwitterIcon className="size-4" />
          </Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
