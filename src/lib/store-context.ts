import * as React from "react";
import type { InboxItem, OutputRecord, QueueAction, ToolConn } from "./prototype-data";

export type InboxStatus = "pending" | "processing" | "approved" | "rejected" | "edited";

export interface CommonsState {
  inbox: InboxItem[];
  inboxState: Record<string, InboxStatus>;
  rejectReasons: Record<string, string>;
  edits: Record<string, string>;
  toolState: Record<string, ToolConn["status"]>;
  queue: QueueAction[];
  recent: OutputRecord[];
  approve: (id: string) => void;
  reject: (id: string, reason: string) => void;
  saveEdit: (id: string, text: string) => void;
  toggleTool: (id: string) => void;
}

export const CommonsContext = React.createContext<CommonsState | null>(null);
