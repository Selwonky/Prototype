import { Sparkles, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/primitives";

export function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-500/10 to-transparent" />
      <span className="relative grid size-14 place-items-center rounded-lg brand-gradient text-white shadow-theme-lg">
        <Sparkles className="size-7" />
      </span>
      <h1 className="relative mt-6 text-title-sm font-semibold tracking-tight text-gray-900 dark:text-white">
        Welcome to The Commons
      </h1>
      <p className="relative mt-3 max-w-md text-lg text-gray-500 dark:text-gray-400">
        Your Human + Machine operating workspace. Review approvals, track work, and
        see what Jo from has prepared across your company.
      </p>
      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink to="/onboarding" size="lg" className="brand-gradient text-white hover:opacity-90">
          Start onboarding <ArrowRight className="size-4" />
        </ButtonLink>
        <ButtonLink to="/home" size="lg" variant="outline">
          Enter The Commons
        </ButtonLink>
      </div>
      <p className="relative mt-10 text-xs text-gray-500 dark:text-gray-400">
        Clickable prototype · fixture data · no sign-in required
      </p>
    </div>
  );
}
