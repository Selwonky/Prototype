import { Link } from "react-router-dom";
import { Inbox, Compass, ArrowRight, ListChecks, Activity, History } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge } from "@jofrom/design-system/ui";
import { KPIGrid } from "@jofrom/design-system/widgets";
import { PageHeader, Section, ButtonLink } from "@/components/primitives";
import { ObjectCard } from "@/components/ObjectCard";
import { StatusBadge } from "@/components/StatusBadge";
import { deptIcon } from "@/lib/navigation";
import { departments, workObjects, outputs } from "@/lib/prototype-data";
import { useCommons } from "@/lib/use-commons";
import { departmentSurfaceStyle } from "@/lib/department-theme";

export function HomePage() {
  const { inbox, inboxState } = useCommons();
  const pending = inbox.filter((i) => inboxState[i.id] === "pending");
  const todays = workObjects.filter((o) => o.statusKind === "attention").slice(0, 3);
  const richDepts = departments.filter((d) => d.rich);

  return (
    <>
      <PageHeader
        title="Home"
        description="Review approvals, track work, and see what Jo from has prepared across your company."
        actions={
          <>
            <ButtonLink to="/orgchart" variant="outline"><Compass className="size-4" /> OrgChart</ButtonLink>
            <ButtonLink to="/inbox"><Inbox className="size-4" /> Review Inbox{pending.length ? ` (${pending.length})` : ""}</ButtonLink>
          </>
        }
      />

      <div className="mb-8">
        <KPIGrid
          columns={4}
          items={[
            { label: "Inbox needs you", value: pending.length, icon: <Inbox className="size-5" /> },
            { label: "Active work", value: workObjects.length, icon: <Activity className="size-5" /> },
            { label: "Departments", value: richDepts.length, icon: <ListChecks className="size-5" /> },
            { label: "Recent outputs", value: outputs.length, icon: <History className="size-5" /> },
          ]}
        />
      </div>

      <Section title="Today's work">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {todays.map((o) => <ObjectCard key={o.id} obj={o} />)}
        </div>
      </Section>

      <Section
        title="Inbox requiring you"
        action={<Link to="/inbox" className="text-theme-sm font-medium text-brand-600 hover:underline">View all →</Link>}
      >
        <Card className="overflow-hidden">
          {pending.slice(0, 4).map((item, i) => (
            <Link
              key={item.id}
              to="/inbox"
              className={`flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${i > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""}`}
            >
              <StatusBadge kind={item.statusKind} label={item.statusLabel} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-theme-sm font-medium text-gray-800 dark:text-gray-100">{item.title} · {item.objectTitle}</p>
                <p className="truncate text-theme-xs text-gray-500 dark:text-gray-400">{item.preview}</p>
              </div>
              <span className="shrink-0 text-theme-xs text-gray-500">{item.dueAt}</span>
              <ArrowRight className="size-4 shrink-0 text-gray-400" />
            </Link>
          ))}
          {pending.length === 0 && (
            <p className="px-5 py-6 text-center text-theme-sm text-gray-500">Nothing needs your review right now.</p>
          )}
        </Card>
      </Section>

      <Section
        title="Work areas"
        action={<Link to="/departments/sales" className="text-theme-sm font-medium text-brand-600 hover:underline">All departments →</Link>}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {richDepts.map((d) => {
            const Icon = deptIcon[d.id];
            return (
              <Card key={d.id} className="transition-shadow hover:shadow-theme-md" style={departmentSurfaceStyle(d.id)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="size-4 text-gray-400" aria-hidden /> {d.label}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{d.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Badge variant="light" color="neutral">{d.activeCount} active</Badge>
                  {d.needsApprovalCount > 0 && (
                    <Badge variant="light" color="warning">{d.needsApprovalCount} approval{d.needsApprovalCount > 1 ? "s" : ""}</Badge>
                  )}
                </CardContent>
                <CardFooter>
                  <ButtonLink to={`/departments/${d.id}`} variant="ghost" size="sm" className="ml-auto">
                    Open <ArrowRight className="size-3.5" />
                  </ButtonLink>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section
        title="Recent outputs"
        action={<Link to="/recent" className="text-theme-sm font-medium text-brand-600 hover:underline">View all →</Link>}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {outputs.slice(0, 3).map((o) => (
            <Card key={o.id}>
              <CardHeader>
                <CardTitle className="text-theme-sm">{o.title}</CardTitle>
                <CardDescription>{o.type} · {o.timestamp}</CardDescription>
              </CardHeader>
              <CardFooter>
                <StatusBadge kind={o.statusKind} label={o.statusLabel} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
