import Link from "next/link";
import { Button } from "./shadcn/button";
import { GithubIcon, MailIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="mx-auto max-w-screen-md px-4">
        <div className="flex flex-col items-center justify-center gap-y-2 sm:flex-row sm:justify-between">
          <div className="flex items-center">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 All rights reserved.
            </p>
          </div>
          <ul className="not-prose flex flex-wrap gap-2" role="list">
            <li>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href="https://github.com/nicholasdly"
                  target="_blank"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <GithubIcon className="size-4" />
                </Link>
              </Button>
            </li>
            <li>
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
            </li>
            <li>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href="mailto:nick+pomodoro@nicholasly.com"
                  target="_blank"
                  aria-label="Email"
                  title="Email"
                >
                  <MailIcon className="size-4" />
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
