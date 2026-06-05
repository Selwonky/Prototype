import { CheckCircle2 } from "lucide-react";
import { Badge, Card, CardContent } from "@jofrom/design-system/ui";
import { PageHeader, Section } from "@/components/primitives";

const groups = [
  { label: "Queue", items: ["Review kickoff checklist", "Confirm renewal agenda"] },
  { label: "Active", items: ["Compile status report", "Update delivery plan"] },
  { label: "Blocked", items: ["Approve invoice", "Review final language"] },
  { label: "Done", items: ["Send research brief", "Publish tool health note"] },
];

export function TasksPage() {
  return (
    <>
      <PageHeader title="Tasks" description="Assigned, due, and tracked work items across Commons objects." />
      <Section title="Task board">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {groups.map((group) => (
            <Card className="p-4" key={group.label}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-theme-sm font-medium text-gray-900 dark:text-white">{group.label}</p>
                <Badge color={group.label === "Blocked" ? "warning" : group.label === "Done" ? "success" : group.label === "Active" ? "brand" : "neutral"}>{group.items.length}</Badge>
              </div>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <Card className="border-dashed p-3" key={item}>
                    <CardContent className="flex items-center gap-3 p-0">
                      <CheckCircle2 className="size-4 shrink-0 text-gray-400" aria-hidden />
                      <span className="text-theme-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
