import * as React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Badge } from "@jofrom/design-system/ui";
import { FilterTabs } from "@jofrom/design-system/data-display";
import { PageHeader, EmptyState, ButtonLink } from "@/components/primitives";
import { ObjectCard } from "@/components/ObjectCard";
import { deptIcon, workspaceFolders } from "@/lib/navigation";
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
  const { dept } = useParams<{ dept: string }>();
  const [searchParams] = useSearchParams();
  const meta = departments.find((d) => d.id === dept);
  const objs = objectsByDept(dept as DepartmentId);
  const folders = workspaceFolders[dept as DepartmentId];
  const folderParam = searchParams.get("cat") ?? folders?.[0].value ?? "all";

  const [status, setStatus] = React.useState<string>("queued");

  if (!meta) {
    return <EmptyState icon={Boxes} title="Unknown department" description="This work area isn't part of the prototype yet." />;
  }

  const activeFolder = folders?.find((folder) => folder.value === folderParam);
  const byFolder = activeFolder?.types
    ? objs.filter((o) => activeFolder.types!.includes(o.type))
    : objs;
  const filtered: WorkObject[] =
    status === "queued" ? byFolder.filter((o) => o.statusKind === "scheduled" || o.statusKind === "neutral")
    : status === "active" ? byFolder.filter((o) => o.statusKind === "in_progress")
    : status === "blocked" ? byFolder.filter((o) => o.statusKind === "attention" || o.statusKind === "failed")
    : status === "done" ? byFolder.filter((o) => o.statusKind === "done")
    : byFolder;

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

      {/* Consistent status tabs. Workspace folders live in the topbar header. */}
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
