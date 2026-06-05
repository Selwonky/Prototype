import { CalendarDays } from "lucide-react";
import { Badge, Card, CardDescription } from "@jofrom/design-system/ui";
import { PageHeader, Section } from "@/components/primitives";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const events = [
  { day: "Monday", title: "Pipeline review", time: "9:00 AM", status: "Active" },
  { day: "Wednesday", title: "Delivery check-in", time: "1:30 PM", status: "Queue" },
  { day: "Friday", title: "Weekly report send", time: "3:00 PM", status: "Blocked" },
];

export function CalendarPage() {
  return (
    <>
      <PageHeader title="Calendar" description="Meetings, milestones, and scheduled work across the Commons." />
      <Section title="Week view">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {days.map((day) => (
            <Card className="p-4" key={day}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-theme-sm font-medium text-gray-900 dark:text-white">{day}</p>
                <CalendarDays className="size-4 text-gray-400" aria-hidden />
              </div>
              <div className="space-y-3">
                {events.filter((event) => event.day === day).map((event) => (
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-800" key={event.title}>
                    <p className="text-theme-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <CardDescription>{event.time}</CardDescription>
                      <Badge color={event.status === "Blocked" ? "warning" : event.status === "Active" ? "brand" : "neutral"} size="sm">{event.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
