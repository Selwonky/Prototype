import * as React from "react";
import { CheckCircle2, ListFilter } from "lucide-react";
import { Badge, Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@jofrom/design-system/ui";
import { PageHeader, Section } from "@/components/primitives";

const tasks = [
  { title: "Review kickoff checklist", owner: "Operations", due: "Today", status: "Queue" },
  { title: "Compile status report", owner: "Operations", due: "Tomorrow", status: "Active" },
  { title: "Approve invoice", owner: "Finance", due: "Today", status: "Blocked" },
  { title: "Send research brief", owner: "Sales", due: "Done", status: "Done" },
  { title: "Review final language", owner: "Legal", due: "Today", status: "Blocked" },
  { title: "Update delivery plan", owner: "Technology", due: "Friday", status: "Active" },
] as const;

const taskFeed = Array.from({ length: 8 }, (_, group) => tasks.map((task, index) => ({
  ...task,
  title: `${task.title} #${group + 1}.${index + 1}`,
  due: group === 0 ? task.due : `${group + index + 1}d`,
}))).flat();

const statuses = ["All", "Queue", "Active", "Blocked", "Done"] as const;

function tone(status: string) {
  return status === "Blocked" ? "warning" : status === "Done" ? "success" : status === "Active" ? "brand" : "neutral";
}

export function TasksPage() {
  const [view, setView] = React.useState<"list" | "kanban">("list");
  const [filter, setFilter] = React.useState<(typeof statuses)[number]>("All");
  const filtered = filter === "All" ? taskFeed : taskFeed.filter((task) => task.status === filter);

  return (
    <>
      <PageHeader title="Tasks" description="Switch between task list and kanban board with status filters." actions={<Button size="sm">New task</Button>} />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => <Button key={status} onClick={() => setFilter(status)} size="sm" variant={filter === status ? "secondary" : "outline"}>{status}</Button>)}
        </div>
        <div className="flex gap-2">
          <Button size="sm" startIcon={<ListFilter aria-hidden="true" />} variant="outline">Filter</Button>
          <Button size="sm" onClick={() => setView("list")} variant={view === "list" ? "secondary" : "outline"}>List</Button>
          <Button size="sm" onClick={() => setView("kanban")} variant={view === "kanban" ? "secondary" : "outline"}>Kanban</Button>
        </div>
      </div>
      {view === "list" ? (
        <Section title="Task list">
          <Card>
            <CardContent className="pt-5">
              <Table>
                <TableHeader><TableRow><TableHead>Task</TableHead><TableHead>Owner</TableHead><TableHead>Due</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {filtered.map((task) => <TableRow key={task.title}><TableCell>{task.title}</TableCell><TableCell>{task.owner}</TableCell><TableCell>{task.due}</TableCell><TableCell><Badge color={tone(task.status)}>{task.status}</Badge></TableCell></TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Section>
      ) : (
        <Section title="Task kanban">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {statuses.filter((status) => status !== "All").map((status) => (
              <Card className="p-4" key={status}>
                <div className="mb-4 flex items-center justify-between gap-3"><p className="text-theme-sm font-medium text-gray-900 dark:text-white">{status}</p><Badge color={tone(status)}>{taskFeed.filter((task) => task.status === status).length}</Badge></div>
                <div className="space-y-3">{taskFeed.filter((task) => task.status === status).map((task) => <Card className="border-dashed p-3" key={task.title}><CardContent className="flex items-center gap-3 p-0"><CheckCircle2 className="size-4 shrink-0 text-gray-400" /><span className="text-theme-sm text-gray-700 dark:text-gray-300">{task.title}</span></CardContent></Card>)}</div>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
