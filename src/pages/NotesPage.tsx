import { PenLine } from "lucide-react";
import { Badge, Card } from "@jofrom/design-system/ui";
import { PageHeader } from "@/components/primitives";

const sections = ["Facts", "Issue", "Analysis", "Next draft"];
const draftingSections = Array.from({ length: 10 }, (_, group) => sections.map((section) => `${section} ${group + 1}`)).flat();

export function NotesPage() {
  return (
    <>
      <PageHeader title="Notes" description="Legal-pad style drafting book for decisions, questions, and working notes." />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-3">
          {draftingSections.slice(0, 16).map((section, index) => (
            <Card className="p-4" key={section}>
              <div className="flex items-center justify-between gap-3"><p className="text-theme-sm font-medium text-gray-900 dark:text-white">{section}</p><Badge color="neutral" size="sm">{index + 1}</Badge></div>
            </Card>
          ))}
        </aside>
        <Card className="overflow-hidden border-warning-200 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/10">
          <div className="flex items-center justify-between gap-3 border-b border-warning-200 px-6 py-4 dark:border-warning-500/30">
            <div><h2 className="text-lg font-semibold text-gray-900 dark:text-white">Drafting book</h2><p className="text-theme-sm text-gray-600 dark:text-gray-300">Working notes for review and drafting.</p></div>
            <PenLine className="size-5 text-warning-700 dark:text-warning-500" />
          </div>
          <div className="relative min-h-[38rem] bg-[linear-gradient(to_bottom,transparent_0,transparent_31px,rgba(217,119,6,0.22)_32px)] bg-[length:100%_32px] px-8 py-7 dark:bg-[linear-gradient(to_bottom,transparent_0,transparent_31px,rgba(245,158,11,0.18)_32px)]">
            <div className="absolute bottom-0 left-16 top-0 w-px bg-error-300/70 dark:bg-error-500/50" />
            <div className="relative ml-12 space-y-8 font-serif text-[1.05rem] leading-8 text-gray-800 dark:text-gray-100">
              {draftingSections.map((section, index) => (
                <section key={section}>
                  <h3 className="font-semibold">{section}</h3>
                  <p>{index % 4 === 0 ? "Capture the record, source object, owner, and current status before drafting." : index % 4 === 1 ? "State the question in one sentence. Keep the open item visible until it moves out of Blocked." : index % 4 === 2 ? "Write the reasoning, references, and tradeoffs here. Link decisions back to Commons objects." : "Prepare the final wording, note reviewers, and mark follow-up tasks for the Queue."}</p>
                </section>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
