import { Loader2, AlertCircle, Inbox, FlaskConical, CloudOff } from "lucide-react";
import type { SurfaceMeta } from "@/lib/types/commons";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <Loader2 className="size-6 animate-spin" />
      <p className="text-theme-sm">{label}</p>
    </div>
  );
}

export function ErrorState({ detail = "Something went wrong." }: { detail?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <AlertCircle className="size-6 text-error-500" />
      <p className="text-theme-sm">{detail}</p>
    </div>
  );
}

export function EmptyListState({ title = "Nothing here yet", description }: { title?: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <Inbox className="size-6" />
      <p className="text-theme-sm font-medium">{title}</p>
      {description && <p className="text-theme-xs">{description}</p>}
    </div>
  );
}

export function PendingContractState({ route }: { route?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <FlaskConical className="size-6" />
      <p className="text-theme-sm font-medium">Prototype only</p>
      <p className="text-theme-xs">Pending backend contract{route ? `: ${route}` : ""}</p>
    </div>
  );
}

export function UnavailableState({ label = "This feature is not available yet." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <CloudOff className="size-6" />
      <p className="text-theme-sm">{label}</p>
    </div>
  );
}

export function ContractBadge({ meta }: { meta: SurfaceMeta }) {
  if (import.meta.env.PROD) return null;
  const label = meta.contractStatus === "live" ? "Live API" : "Prototype";
  const color = meta.contractStatus === "live"
    ? "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400"
    : "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption font-medium ${color}`}>
      {meta.source === "prototype" && <FlaskConical className="size-2.5" />}
      {label}
    </span>
  );
}
