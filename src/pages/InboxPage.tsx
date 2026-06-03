import * as React from "react";
import { Check, Pencil, X, Inbox as InboxIcon, Loader2 } from "lucide-react";
import { Card, Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Separator } from "@jofrom/design-system/ui";
import { Textarea } from "@jofrom/design-system/form";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter,
} from "@jofrom/design-system/ui";
import { PageHeader, EmptyState } from "@/components/primitives";
import { StatusBadge } from "@/components/StatusBadge";
import { deptLabel, objectById, type InboxItem } from "@/lib/prototype-data";
import { useCommons } from "@/lib/use-commons";

export function InboxPage() {
  const { inbox, inboxState, edits, rejectReasons, approve, reject, saveEdit } = useCommons();
  const [openItem, setOpenItem] = React.useState<InboxItem | null>(null);
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [rejectOpen, setRejectOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");

  const open = (item: InboxItem) => {
    setOpenItem(item);
    setEditing(false);
    const obj = objectById(item.objectId);
    setDraft(edits[item.id] ?? obj?.body ?? obj?.preview ?? "");
  };

  const pending = inbox.filter((i) => inboxState[i.id] === "pending");

  return (
    <>
      <PageHeader
        title="Inbox"
        description="Drafts, decisions, and handoffs that need your input."
      />

      {inbox.length === 0 || pending.length === 0 ? (
        <EmptyState
          icon={InboxIcon}
          title="Nothing needs your review right now."
          description="Jo from will surface drafts, decisions, and handoffs here when your input is needed."
        />
      ) : null}

      <Card className="gap-0 py-0">
        {inbox.map((item, i) => {
          const state = inboxState[item.id];
          const obj = objectById(item.objectId);
          return (
            <div
              key={item.id}
              className={`flex flex-wrap items-center gap-3 px-5 py-4 ${i > 0 ? "border-t" : ""} ${
                state !== "pending" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`size-2 shrink-0 rounded-full ${item.priority === "high" ? "bg-destructive" : item.priority === "medium" ? "bg-warning" : "bg-muted-foreground/40"}`} />
                <StatusBadge
                  kind={state === "approved" ? "done" : state === "rejected" ? "failed" : state === "processing" ? "in_progress" : item.statusKind}
                  label={state === "approved" ? "Approved" : state === "rejected" ? "Rejected" : state === "edited" ? "Edited" : state === "processing" ? "Approving…" : item.statusLabel}
                />
              </div>
              <button onClick={() => open(item)} className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium">{item.title} · {item.objectTitle}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {deptLabel(item.department)} · {obj?.owner ?? "Jo from"} · due {item.dueAt}
                </p>
              </button>
              {state === "pending" ? (
                <div className="flex shrink-0 items-center gap-1.5">
                  <Button size="sm" variant="ghost" onClick={() => open(item)}>
                    <Pencil className="size-3.5" /> Review
                  </Button>
                  <Button size="sm" onClick={() => approve(item.id)}>
                    <Check className="size-3.5" /> Approve
                  </Button>
                </div>
              ) : state === "processing" ? (
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" /> Working…
                </span>
              ) : (
                <span className="shrink-0 text-xs text-muted-foreground">
                  {state === "rejected" && rejectReasons[item.id] ? `Reason: ${rejectReasons[item.id]}` : "Done"}
                </span>
              )}
            </div>
          );
        })}
      </Card>

      {/* Detail / edit sheet */}
      <Sheet open={!!openItem} onOpenChange={(o) => !o && setOpenItem(null)}>
        <SheetContent className="flex w-full flex-col sm:max-w-lg">
          {openItem && (() => {
            const obj = objectById(openItem.objectId);
            const state = inboxState[openItem.id];
            return (
              <>
                <SheetHeader>
                  <div className="flex items-center gap-2">
                    <StatusBadge kind={openItem.statusKind} label={openItem.statusLabel} />
                    <span className="text-xs text-muted-foreground">{deptLabel(openItem.department)}</span>
                  </div>
                  <SheetTitle>{openItem.objectTitle}</SheetTitle>
                  <SheetDescription>{openItem.title} · due {openItem.dueAt}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {obj?.typeLabel ?? "Preview"}
                  </p>
                  {editing ? (
                    <Textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      className="min-h-48"
                    />
                  ) : (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {edits[openItem.id] ?? obj?.body ?? obj?.preview}
                    </p>
                  )}
                  {obj?.meta && !editing && (
                    <>
                      <Separator className="my-4" />
                      <dl className="space-y-1.5 text-sm">
                        {obj.meta.map((m) => (
                          <div key={m.label} className="flex justify-between">
                            <dt className="text-muted-foreground">{m.label}</dt>
                            <dd className="font-medium">{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  )}
                </div>

                <SheetFooter>
                  {state !== "pending" ? (
                    <p className="text-center text-sm text-muted-foreground">
                      This item is {state}.
                    </p>
                  ) : editing ? (
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setEditing(false)}>Cancel</Button>
                      <Button className="flex-1" onClick={() => { saveEdit(openItem.id, draft); setEditing(false); }}>
                        Save edit
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => setEditing(true)}>
                        <Pencil className="size-4" /> Edit
                      </Button>
                      <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => { setReason(""); setRejectOpen(true); }}>
                        <X className="size-4" /> Reject
                      </Button>
                      <Button className="flex-1" onClick={() => { approve(openItem.id); setOpenItem(null); }}>
                        <Check className="size-4" /> Approve
                      </Button>
                    </div>
                  )}
                </SheetFooter>
              </>
            );
          })()}
        </SheetContent>
      </Sheet>

      {/* Reject reason dialog */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject this item</DialogTitle>
            <DialogDescription>Add a short reason so Jo from can revise it.</DialogDescription>
          </DialogHeader>
          <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="What needs to change?" className="min-h-28" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)}>Cancel</Button>
            <Button
              className="text-destructive-foreground"
              onClick={() => {
                if (openItem) reject(openItem.id, reason || "No reason given");
                setRejectOpen(false);
                setOpenItem(null);
              }}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
