import { Link } from "react-router-dom";
import { Badge, Card } from "@jofrom/design-system/ui";
import { PageHeader, Section } from "@/components/primitives";
import { StatusBadge } from "@/components/StatusBadge";
import {
  actionStatusKind, actionStatusLabel, deptLabel, type DsBadgeColor,
  type ActionStatus,
} from "@/lib/prototype-data";
import { useCommons } from "@/lib/use-commons";

const statusGroups: { label: "Queue" | "Active" | "Blocked" | "Done"; statuses: ActionStatus[] }[] = [
  { label: "Queue", statuses: ["draft", "queued"] },
  { label: "Active", statuses: ["running"] },
  { label: "Blocked", statuses: ["needs_approval", "failed", "cancelled"] },
  { label: "Done", statuses: ["completed"] },
];

const statusGroupColor: Record<(typeof statusGroups)[number]["label"], DsBadgeColor> = {
  Queue: "warning",
  Active: "success",
  Blocked: "error",
  Done: "neutral",
};

export function QueuePage() {
  const { queue } = useCommons();
  return (
    <>
      <PageHeader
        title="Queue"
        description="Work Jo from is preparing and running. This is machine work in flight — anything that needs a human decision moves to your Inbox."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {statusGroups.map((group) => {
          const count = queue.filter((q) => group.statuses.includes(q.status)).length;
          return <Badge key={group.label} color={statusGroupColor[group.label]} variant={group.label === "Done" ? "outline" : "light"}>{group.label} · {count}</Badge>;
        })}
      </div>

      {(["needs_approval", "running", "queued", "completed", "failed"] as ActionStatus[]).map((status) => {
        const items = queue.filter((q) => q.status === status);
        if (!items.length) return null;
        return (
          <Section key={status} title={actionStatusLabel[status]}>
            <Card className="gap-0 py-0">
              {items.map((a, i) => (
                <div key={a.id} className={`flex items-center gap-3 px-5 py-3.5 ${i > 0 ? "border-t" : ""}`}>
                  <StatusBadge kind={actionStatusKind[a.status]} label={actionStatusLabel[a.status]} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {deptLabel(a.department)}
                      {a.step && <> · {a.step}</>}
                      {a.nextOutput && <> · next: <span className="font-medium text-foreground/70">{a.nextOutput}</span></>}
                      {" · "}{a.updatedAt}
                    </p>
                  </div>
                  {a.status === "needs_approval" && (
                    <Link to="/inbox" className="shrink-0 text-sm font-medium text-primary hover:underline">Review →</Link>
                  )}
                </div>
              ))}
            </Card>
          </Section>
        );
      })}
    </>
  );
}
