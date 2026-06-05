import * as React from "react";
import { BriefcaseBusiness, CircleDot, FileCheck2, GitBranch, MapPinned, Sparkles, Users } from "lucide-react";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from "@jofrom/design-system/ui";
import {
  DEPARTMENTS,
  departmentBackgroundStyle,
  departmentChipStyle,
  departmentPanelStyle,
  departmentTextStyle,
  lineStroke,
  patternLabel,
} from "@jofrom/design-system/data-display";
import { PageHeader } from "@/components/primitives";
import { orgChart, type OrgJob } from "@/lib/prototype-data";
import { cn } from "@/lib/utils";

const levelColor = { IC: "neutral", "Team Lead": "brand", Manager: "warning", "Head of": "accent" } as const;

function TransitStop({
  active,
  color,
  label,
  meta,
  onClick,
}: {
  active?: boolean;
  color: string;
  label: string;
  meta: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative z-10 min-w-[9.5rem] rounded-2xl border bg-background px-3 py-2 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        active && "ring-2 ring-ring",
      )}
    >
      <span
        className="mb-2 flex size-5 items-center justify-center rounded-full border-2 bg-background"
        style={{ borderColor: color }}
        aria-hidden="true"
      >
        <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
      </span>
      <span className="block text-sm font-semibold leading-tight">{label}</span>
      <span className="mt-1 block text-xs text-muted-foreground">{meta}</span>
    </button>
  );
}

function DepartmentRoute({
  active,
  department,
  selectedJob,
  onSelectDepartment,
  onSelectJob,
}: {
  active: boolean;
  department: (typeof orgChart)[number];
  selectedJob: OrgJob | null;
  onSelectDepartment: () => void;
  onSelectJob: (job: OrgJob) => void;
}) {
  const line = DEPARTMENTS[department.id];
  const width = Math.max(720, 180 + department.jobs.length * 184);
  const y = line.pattern === "double" ? 38 : 42;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all",
        active ? "border-foreground/20 bg-card shadow-md" : "bg-card/55 opacity-80 hover:opacity-100",
      )}
    >
      <CardContent className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={onSelectDepartment} className="flex items-center gap-3 text-left">
            <span className="flex size-10 items-center justify-center rounded-xl text-white shadow-sm" style={departmentBackgroundStyle(department.id)}>
              <GitBranch className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{department.label}</span>
              <span className="block text-xs text-muted-foreground">{line.line} · {line.colorName} · {patternLabel(line.pattern)}</span>
            </span>
          </button>
          <Badge variant="outline" color="neutral" size="sm">{department.jobs.length} stops</Badge>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="relative min-h-[132px]" style={{ width }}>
            <svg className="absolute left-0 top-0 h-24 w-full" viewBox={`0 0 ${width} 96`} preserveAspectRatio="none" aria-hidden="true">
              <line
                x1="42"
                y1={y}
                x2={width - 42}
                y2={y}
                stroke={line.hex}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={lineStroke(line.pattern)}
              />
              {line.pattern === "double" && (
                <line x1="42" y1="52" x2={width - 42} y2="52" stroke={line.hex} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
              )}
              <line x1="42" y1="78" x2={width - 42} y2="78" stroke="#6B7280" strokeWidth="3" strokeDasharray="7 7" opacity="0.45" />
            </svg>
            <div className="relative flex gap-6 pt-16">
              <TransitStop color={DEPARTMENTS.shared.hex} label="Jeremy" meta="Outcome Owner" active={active && !selectedJob} onClick={onSelectDepartment} />
              {department.jobs.map((job) => (
                <TransitStop
                  key={job.id}
                  color={line.hex}
                  label={job.title}
                  meta={`${job.level} · ${job.subFamily}`}
                  active={active && selectedJob?.id === job.id}
                  onClick={() => onSelectJob(job)}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function OrgChartPage() {
  const [deptId, setDeptId] = React.useState(orgChart[0].id);
  const dept = orgChart.find((d) => d.id === deptId) ?? orgChart[0];
  const [job, setJob] = React.useState<OrgJob | null>(dept.jobs[0] ?? null);
  const [seed, setSeed] = React.useState(0);
  const line = DEPARTMENTS[dept.id];

  const selectDept = (id: typeof deptId) => {
    const nextDept = orgChart.find((d) => d.id === id) ?? orgChart[0];
    setDeptId(nextDept.id);
    setJob(nextDept.jobs[0] ?? null);
    setSeed(0);
  };

  const selectJob = (nextJob: OrgJob) => {
    setJob(nextJob);
    setSeed(0);
  };

  return (
    <>
      <PageHeader
        title="OrgChart"
        description="A transit-map view of how work flows beneath the Outcome Owner: departments are lines, jobs are stops, and Workflow Seeds produce Compiler Records."
      />

      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_18rem]">
        <div className="rounded-2xl border bg-gradient-to-r from-muted/60 to-background p-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <MapPinned className="size-4" style={departmentTextStyle(dept.id)} />
            <span className="font-medium">Transit-map mode</span>
            <span className="text-muted-foreground">Every route pairs color with department name, line name, icon, and stop pattern.</span>
          </div>
        </div>
        <Card className="gap-0 p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl text-white" style={departmentBackgroundStyle("shared")}>
              <Users className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Jeremy</p>
              <p className="text-xs text-muted-foreground">{DEPARTMENTS.shared.line} · Outcome Owner</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          {orgChart.map((department) => (
            <DepartmentRoute
              key={department.id}
              active={department.id === deptId}
              department={department}
              selectedJob={department.id === deptId ? job : null}
              onSelectDepartment={() => selectDept(department.id)}
              onSelectJob={(nextJob) => {
                selectDept(department.id);
                selectJob(nextJob);
              }}
            />
          ))}
        </div>

        <div className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="size-3 rounded-full" style={departmentBackgroundStyle(dept.id)} />
                {dept.label}
              </CardTitle>
              <CardDescription>{line.line} · {line.colorName} · {line.hex}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border p-2">
                  <p className="text-muted-foreground">Route pattern</p>
                  <p className="font-semibold capitalize">{patternLabel(line.pattern)}</p>
                </div>
                <div className="rounded-lg border p-2">
                  <p className="text-muted-foreground">Stops</p>
                  <p className="font-semibold">{dept.jobs.length} jobs</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Palette separation: cobalt Finance, sky-cyan Support, deep-teal Accounting, gold Workforce, burnt-orange Operations, crimson Legal, magenta Marketing, purple Technology.
              </p>
            </CardContent>
          </Card>

          {job ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{job.title}</CardTitle>
                <CardDescription>{job.level} · {job.subFamily}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge variant="light" color={levelColor[job.level]} startIcon={<BriefcaseBusiness className="size-3" />}>{job.level}</Badge>
                <Separator />
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase text-muted-foreground"><CircleDot className="size-3.5" /> Task stops</p>
                  <div className="space-y-2">
                    {job.tasks.map((task) => (
                      <div key={task} className="flex items-center gap-2 text-sm">
                        <span className="size-2 rounded-full" style={departmentBackgroundStyle(dept.id)} />
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase text-muted-foreground"><Sparkles className="size-3.5" /> Workflow seeds</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.workflowSeeds.map((workflowSeed, index) => (
                      <button
                        key={workflowSeed.name}
                        type="button"
                        onClick={() => setSeed(index)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs transition-colors",
                          seed === index ? "text-white" : "hover:bg-accent",
                        )}
                        style={departmentChipStyle(dept.id, seed === index)}
                      >
                        {workflowSeed.name}
                      </button>
                    ))}
                  </div>
                  {job.workflowSeeds[seed] && (
                    <div className="mt-3 rounded-lg border p-3" style={departmentPanelStyle(dept.id)}>
                      <p className="mb-1 text-xs font-medium" style={departmentTextStyle(dept.id)}>Output preview</p>
                      <p className="text-sm">{job.workflowSeeds[seed].outputPreview}</p>
                    </div>
                  )}
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Compiler Records</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.compilerRecords.map((record) => (
                      <Badge key={record} variant="light" color="brand" startIcon={<FileCheck2 className="size-3" />}>{record}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
}
