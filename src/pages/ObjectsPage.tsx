import { useParams, useNavigate } from "react-router-dom";
import { KanbanColumn, KanbanCard } from "@jofrom/design-system/data-display";
import { PageHeader } from "@/components/primitives";
import { workObjects, statusBadge, deptLabel, type StatusKind } from "@/lib/prototype-data";
import { getInitials } from "@/lib/utils";

const typeTitle: Record<string, string> = {
  workflow: "Workflows", signal: "Signals", job: "Jobs", task: "Tasks",
  action: "Actions", block: "Blocks",
};

const columns: { kinds: StatusKind[]; label: string; dotClassName: string }[] = [
  { kinds: ["scheduled", "neutral"], label: "Queue", dotClassName: "bg-accent-500" },
  { kinds: ["in_progress"], label: "Active", dotClassName: "bg-brand-500" },
  { kinds: ["attention", "failed"], label: "Blocked", dotClassName: "bg-warning-500" },
  { kinds: ["done"], label: "Done", dotClassName: "bg-success-500" },
];

export function ObjectsPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const title = typeTitle[type ?? ""] ?? "Objects";

  return (
    <>
      <PageHeader
        title={title}
        description="Every work object on one board, by status. Drag-and-drop is a later step; click a card to open it."
      />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const items = workObjects.filter((o) => col.kinds.includes(o.statusKind));
          return (
            <KanbanColumn key={col.label} title={col.label} count={items.length} dotClassName={col.dotClassName} className="flex-1">
              {items.map((o) => (
                <KanbanCard
                  key={o.id}
                  title={o.title}
                  description={o.preview}
                  tag={o.typeLabel}
                  tagColor={statusBadge[o.statusKind].color}
                  timestamp={o.dueAt}
                  metadata={<span className="text-theme-xs text-gray-500 dark:text-gray-400">{deptLabel(o.department)}</span>}
                  assignee={getInitials(o.owner.replace("Jo from ", ""))}
                  onClick={() => navigate(`/objects/detail/${o.id}`)}
                />
              ))}
            </KanbanColumn>
          );
        })}
      </div>
    </>
  );
}
