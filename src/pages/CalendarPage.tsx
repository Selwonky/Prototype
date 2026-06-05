import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge, Button, Card } from "@jofrom/design-system/ui";
import { PageHeader } from "@/components/primitives";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days = Array.from({ length: 35 }, (_, index) => index + 1);
const events: Record<number, Array<{ title: string; status: "Queue" | "Active" | "Blocked" | "Done" }>> = {
  3: [{ title: "Pipeline review", status: "Active" }],
  7: [{ title: "Kickoff checklist", status: "Queue" }],
  12: [{ title: "Contract review", status: "Blocked" }],
  16: [{ title: "Tool health note", status: "Done" }],
  19: [{ title: "Delivery check-in", status: "Active" }, { title: "Invoice review", status: "Blocked" }],
  24: [{ title: "Monthly report", status: "Queue" }],
  28: [{ title: "Team review", status: "Active" }],
};

function statusColor(status: "Queue" | "Active" | "Blocked" | "Done") {
  return status === "Blocked" ? "warning" : status === "Done" ? "success" : status === "Active" ? "brand" : "neutral";
}

export function CalendarPage() {
  return (
    <>
      <PageHeader title="Calendar" description="Traditional month view for meetings, milestones, and scheduled work." actions={<Button size="sm">New event</Button>} />
      <Card className="overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-4 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">June 2026</h2>
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">Commons schedule</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" aria-label="Previous month"><ChevronLeft /></Button>
            <Button size="sm" variant="outline">Today</Button>
            <Button size="icon" variant="outline" aria-label="Next month"><ChevronRight /></Button>
          </div>
        </header>
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/5">
          {weekDays.map((day) => <div className="px-3 py-2 text-center text-theme-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => (
            <div className="min-h-32 border-b border-r border-gray-100 p-2 last:border-r-0 dark:border-gray-800" key={day}>
              <div className="mb-2 flex items-center justify-between">
                <span className={`flex size-7 items-center justify-center rounded-full text-theme-sm ${day === 5 ? "bg-brand-600 text-white" : "text-gray-700 dark:text-gray-300"}`}>{day}</span>
              </div>
              <div className="space-y-1">
                {(events[day] ?? []).map((event) => (
                  <div className="truncate rounded-md bg-gray-50 px-2 py-1 dark:bg-white/5" key={event.title}>
                    <Badge color={statusColor(event.status)} size="sm">{event.status}</Badge>
                    <p className="mt-1 truncate text-theme-xs text-gray-700 dark:text-gray-300">{event.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
