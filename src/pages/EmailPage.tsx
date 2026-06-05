import { Mail, Send, ShieldCheck } from "lucide-react";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jofrom/design-system/ui";
import { PageHeader, Section } from "@/components/primitives";

const threads = [
  { title: "Client kickoff follow-up", status: "Queue", owner: "Operations", preview: "Draft reply with next steps and meeting recap." },
  { title: "Proposal clarification", status: "Active", owner: "Sales", preview: "Response in progress for scope and pricing questions." },
  { title: "Contract language review", status: "Blocked", owner: "Legal", preview: "Waiting on final approval before sending." },
];

export function EmailPage() {
  return (
    <>
      <PageHeader title="Email" description="Drafts, sent threads, and inbox messages connected to Commons work objects." />
      <Section title="Email queue">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {threads.map((thread) => (
            <Card key={thread.title}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <Mail className="mt-1 size-4 shrink-0 text-gray-400" aria-hidden />
                  <Badge color={thread.status === "Blocked" ? "warning" : thread.status === "Active" ? "brand" : "neutral"}>{thread.status}</Badge>
                </div>
                <CardTitle className="text-base">{thread.title}</CardTitle>
                <CardDescription>{thread.preview}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-theme-sm text-gray-500 dark:text-gray-400">
                <span>{thread.owner}</span>
                {thread.status === "Queue" ? <Send className="size-4" aria-hidden /> : <ShieldCheck className="size-4" aria-hidden />}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
