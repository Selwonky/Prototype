import { Archive, Mail, Paperclip, Search, Send } from "lucide-react";
import { Badge, Button, Card } from "@jofrom/design-system/ui";
import { PageHeader } from "@/components/primitives";

const folders = ["Inbox", "Drafts", "Sent", "Archived"];
const threads = [
  { from: "Dana Reyes", company: "Acme Manufacturing", subject: "Quote turnaround follow-up", time: "9:14 AM", status: "Active", unread: true, body: "Thanks for the thoughtful note. We are reviewing options this week and would like to understand the onboarding timeline, operating cadence, and what your team needs from us before the pilot starts.", attachments: 1 },
  { from: "Maya Chen", company: "Square One Foundry", subject: "Kickoff checklist", time: "Yesterday", status: "Queue", unread: true, body: "The kickoff checklist looks good. Please confirm whether the access request and reporting setup can happen before the Wednesday call.", attachments: 0 },
  { from: "Jordan Ellis", company: "Cedar Valley Roofing", subject: "Coverage package review", time: "Mon", status: "Blocked", unread: false, body: "We need one more look at the recommended option before this goes out. Please hold the send until final review is complete.", attachments: 2 },
  { from: "Priya Shah", company: "Midwest SMB Alliance", subject: "Referral intro", time: "Fri", status: "Done", unread: false, body: "Intro reply was sent and the next check-in is scheduled. Notes are attached to the account timeline.", attachments: 0 },
];

const inboxThreads = Array.from({ length: 12 }, (_, group) => threads.map((thread, index) => ({
  ...thread,
  subject: `${thread.subject} #${group + 1}.${index + 1}`,
  time: group === 0 ? thread.time : `${group + 1}d ago`,
}))).flat();

export function EmailPage() {
  const selected = threads[0];

  return (
    <>
      <PageHeader title="Email" description="Inbox, drafts, and sent threads connected to Commons work objects." />
      <div className="grid min-h-[36rem] grid-cols-1 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark lg:grid-cols-[220px_minmax(320px,0.9fr)_minmax(0,1.4fr)]">
        <aside className="border-b border-gray-200 p-4 dark:border-gray-800 lg:border-b-0 lg:border-r">
          <Button className="w-full" startIcon={<Send aria-hidden="true" />}>Compose</Button>
          <nav className="mt-5 space-y-1">
            {folders.map((folder, index) => (
              <button className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-theme-sm ${index === 0 ? "bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-400" : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"}`} key={folder} type="button">
                <span>{folder}</span>
                {index === 0 ? <Badge color="brand" size="sm">{inboxThreads.length}</Badge> : null}
              </button>
            ))}
          </nav>
        </aside>

        <section className="border-b border-gray-200 dark:border-gray-800 lg:border-b-0 lg:border-r">
          <div className="border-b border-gray-200 p-4 dark:border-gray-800">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" aria-hidden />
              <input className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-theme-sm outline-none focus:ring-4 focus:ring-brand-500/15 dark:border-gray-800 dark:bg-gray-dark" placeholder="Search email" />
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {inboxThreads.map((thread, index) => (
              <button className={`w-full p-4 text-left transition-colors ${index === 0 ? "bg-gray-50 dark:bg-white/5" : "hover:bg-gray-50 dark:hover:bg-white/5"}`} key={thread.subject} type="button">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className={`truncate text-theme-sm ${thread.unread ? "font-semibold text-gray-900 dark:text-white" : "font-medium text-gray-700 dark:text-gray-300"}`}>{thread.from}</p>
                    <p className="truncate text-theme-xs text-gray-500 dark:text-gray-400">{thread.company}</p>
                  </div>
                  <span className="shrink-0 text-theme-xs text-gray-500 dark:text-gray-400">{thread.time}</span>
                </div>
                <p className="mt-2 truncate text-theme-sm font-medium text-gray-900 dark:text-white">{thread.subject}</p>
                <p className="mt-1 line-clamp-2 text-theme-xs text-gray-500 dark:text-gray-400">{thread.body}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge color={thread.status === "Blocked" ? "warning" : thread.status === "Done" ? "success" : thread.status === "Active" ? "brand" : "neutral"} size="sm">{thread.status}</Badge>
                  {thread.attachments ? <span className="inline-flex items-center gap-1 text-theme-xs text-gray-500"><Paperclip className="size-3" />{thread.attachments}</span> : null}
                </div>
              </button>
            ))}
          </div>
        </section>

        <article className="flex min-h-0 flex-col">
          <header className="border-b border-gray-200 p-5 dark:border-gray-800">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-title-sm font-semibold text-gray-900 dark:text-white">{selected.subject}</h2>
                <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{selected.from} · {selected.company}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" startIcon={<Archive aria-hidden="true" />}>Archive</Button>
                <Button size="sm" startIcon={<Mail aria-hidden="true" />}>Reply</Button>
              </div>
            </div>
          </header>
          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            <Card className="p-5">
              <p className="text-theme-sm leading-6 text-gray-700 dark:text-gray-300">{selected.body}</p>
            </Card>
            <Card className="border-dashed p-5">
              <p className="text-theme-sm font-medium text-gray-900 dark:text-white">Draft reply</p>
              <div className="mt-3 min-h-40 rounded-lg border border-gray-200 p-4 text-theme-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">Write response...</div>
            </Card>
          </div>
        </article>
      </div>
    </>
  );
}
