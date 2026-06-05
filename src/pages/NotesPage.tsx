import { StickyNote } from "lucide-react";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jofrom/design-system/ui";
import { PageHeader, Section } from "@/components/primitives";

const notes = [
  { title: "Decision log", type: "Reference", body: "Capture key decisions and linked objects from this week." },
  { title: "Client context", type: "Brief", body: "Notes from recent calls, blockers, and relationship details." },
  { title: "Open questions", type: "Queue", body: "Questions to resolve before the next operating review." },
  { title: "Retrospective", type: "Done", body: "What shipped, what changed, and what should improve next cycle." },
];

export function NotesPage() {
  return (
    <>
      <PageHeader title="Notes" description="Quick captures, decisions, and reference notes connected to workspace objects." />
      <Section title="Note collection">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <Card key={note.title}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <StickyNote className="mt-1 size-4 shrink-0 text-gray-400" aria-hidden />
                  <Badge color="neutral" variant="outline">{note.type}</Badge>
                </div>
                <CardTitle className="text-base">{note.title}</CardTitle>
                <CardDescription>{note.body}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-dashed border-gray-200 p-4 text-theme-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">Write here...</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
