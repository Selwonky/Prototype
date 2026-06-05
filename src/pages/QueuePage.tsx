import { Link } from "react-router-dom";
import { Card } from "@jofrom/design-system/ui";
import { WorkflowStatusBadge, type WorkflowStatus } from "@jofrom/design-system/data-display";
import { PageHeader, Section } from "@/components/primitives";
import { StatusBadge } from "@/components/StatusBadge";
import {
  actionStatusKind, actionStatusLabel, deptLabel,
  type ActionStatus,
} from "@/lib/prototype-data";
import { useCommons } from "@/lib/use-commons";

const statusGroups: { status: WorkflowStatus; statuses: ActionStatus[] }[] = [
  { status: "queue", statuses: ["draft", "queued"] },
  { status: "active", statuses: ["running"] },
  { status: "blocked", statuses: ["needs_approval", "failed", "cancelled"] },
  { status: "done", statuses: ["completed"] },
];

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
          return <WorkflowStatusBadge count={count} key={group.status} status={group.status} />;
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
