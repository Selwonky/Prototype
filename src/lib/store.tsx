import * as React from "react";
import { toast } from "sonner";
import {
  inboxItems as seedInbox,
  tools as seedTools,
  queueActions as seedQueue,
  outputs as seedOutputs,
  objectById,
  deptLabel,
  type ToolConn,
  type QueueAction,
  type OutputRecord,
} from "./prototype-data";
import { CommonsContext, type CommonsState, type InboxStatus } from "./store-context";

export function CommonsProvider({ children }: { children: React.ReactNode }) {
  const [inboxState, setInboxState] = React.useState<Record<string, InboxStatus>>(
    () => Object.fromEntries(seedInbox.map((i) => [i.id, "pending"]))
  );
  const [rejectReasons, setRejectReasons] = React.useState<Record<string, string>>({});
  const [edits, setEdits] = React.useState<Record<string, string>>({});
  const [toolState, setToolState] = React.useState<Record<string, ToolConn["status"]>>(
    () => Object.fromEntries(seedTools.map((t) => [t.id, t.status]))
  );
  const [queue, setQueue] = React.useState<QueueAction[]>(seedQueue);
  const [recent, setRecent] = React.useState<OutputRecord[]>(seedOutputs);

  const approve = (id: string) => {
    const item = seedInbox.find((i) => i.id === id);
    if (!item || inboxState[id] === "processing") return;
    setInboxState((s) => ({ ...s, [id]: "processing" }));
    const t = toast.loading(`Approving ${item.objectTitle}…`);
    // simulate the Action Broker running the approved work
    window.setTimeout(() => {
      setInboxState((s) => ({ ...s, [id]: "approved" }));
      setQueue((q) =>
        q.map((a) =>
          a.sourceObjectId === item.objectId
            ? { ...a, status: "completed", step: "Done", updatedAt: "just now" }
            : a
        )
      );
      // a Compiler Record appears in Recent
      const obj = objectById(item.objectId);
      setRecent((r) => [
        {
          id: `out_${id}`,
          title: obj?.title ?? item.objectTitle,
          type: obj?.typeLabel ?? "Output",
          department: item.department,
          generatedBy: obj?.owner ?? "Jo from",
          statusKind: "done",
          statusLabel: "Approved",
          timestamp: "Just now",
          history: ["Blocked", "Active", "Done"],
          summary: obj?.preview ?? "Approved and compiled.",
          sourceObjectId: item.objectId,
        },
        ...r.filter((x) => x.id !== `out_${id}`),
      ]);
      toast.success(`Approved · ${deptLabel(item.department)}`, {
        id: t,
        description: "A Compiler Record was added to Recent.",
      });
    }, 900);
  };

  const reject = (id: string, reason: string) => {
    setInboxState((s) => ({ ...s, [id]: "rejected" }));
    setRejectReasons((r) => ({ ...r, [id]: reason }));
    const item = seedInbox.find((i) => i.id === id);
    toast(`Sent back for changes · ${item ? deptLabel(item.department) : ""}`, {
      description: reason ? `Reason: ${reason}` : undefined,
    });
  };

  const saveEdit = (id: string, text: string) => {
    setEdits((e) => ({ ...e, [id]: text }));
    setInboxState((s) => ({ ...s, [id]: s[id] === "pending" ? "edited" : s[id] }));
    toast.success("Edit saved", { description: "Your changes are kept locally." });
  };

  const toggleTool = (id: string) =>
    setToolState((s) => {
      const next = s[id] === "connected" ? "not_connected" : s[id] === "not_connected" ? "connected" : s[id];
      const tool = seedTools.find((t) => t.id === id);
      if (tool) toast(next === "connected" ? `${tool.label} connected` : `${tool.label} disconnected`);
      return { ...s, [id]: next };
    });

  const value: CommonsState = {
    inbox: seedInbox,
    inboxState,
    rejectReasons,
    edits,
    toolState,
    queue,
    recent,
    approve,
    reject,
    saveEdit,
    toggleTool,
  };
  return <CommonsContext.Provider value={value}>{children}</CommonsContext.Provider>;
}
