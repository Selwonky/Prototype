import * as React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Badge } from "@jofrom/design-system/ui";
import { FilterTabs } from "@jofrom/design-system/data-display";
import { PageHeader, EmptyState, ButtonLink } from "@/components/primitives";
import { ObjectCard } from "@/components/ObjectCard";
import { deptIcon, deptCategories } from "@/lib/navigation";
import {
  departments, objectsByDept,
  type DepartmentId, type WorkObject,
} from "@/lib/prototype-data";

// Consistent across every department.
const statusTabs = [
  { value: "queued", label: "Queued" },
  { value: "active", label: "Active" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" },
] as const;

export function DepartmentPage() {
  const { dept, functionId } = useParams<{ dept?: string; functionId?: string }>();
  const [searchParams] = useSearchParams();
  const workspaceId = functionId ?? dept;
  const meta = departments.find((d) => d.id === workspaceId);
  const objs = objectsByDept(workspaceId as DepartmentId);
  const categories = deptCategories[workspaceId as DepartmentId];
  const categoryParam = searchParams.get("cat") ?? categories?.[0].value ?? "all";

  const [status, setStatus] = React.useState<string>("queued");

  if (!meta) {
    return <EmptyState icon={Boxes} title="Unknown department" description="This work area isn't part of the prototype yet." />;
  }

  const activeCategory = categories?.find((c) => c.value === categoryParam);
  const byCategory = activeCategory?.types
    ? objs.filter((o) => activeCategory.types!.includes(o.type))
    : objs;
  const filtered: WorkObject[] =
    status === "queued" ? byCategory.filter((o) => o.statusKind === "scheduled" || o.statusKind === "neutral")
    : status === "active" ? byCategory.filter((o) => o.statusKind === "in_progress")
    : status === "blocked" ? byCategory.filter((o) => o.statusKind === "attention" || o.statusKind === "failed")
    : status === "done" ? byCategory.filter((o) => o.statusKind === "done")
    : byCategory;

  const Icon = deptIcon[meta.id];

  return (
    <>
      <PageHeader
        title={meta.label}
        description={meta.summary}
        actions={
          <>
            <Badge variant="light" color="neutral">{meta.activeCount} active</Badge>
            {meta.needsApprovalCount > 0 && <Badge variant="light" color="warning">{meta.needsApprovalCount} blocked</Badge>}
          </>
        }
      />

      {/* Consistent status tabs (every department). Dept-specific category
          tabs live in the topbar header now. */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs
          tabs={statusTabs.map((t) => ({ label: t.label, value: t.value }))}
          activeTab={status}
          onChange={setStatus}
        />
        <ButtonLink to="/orgchart" variant="ghost" size="sm">View in OrgChart</ButtonLink>
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((o) => <ObjectCard key={o.id} obj={o} />)}
        </div>
      ) : (
        <EmptyState icon={Icon} title="Nothing here yet" description="No items match this view." />
      )}
    </>
  );
}
