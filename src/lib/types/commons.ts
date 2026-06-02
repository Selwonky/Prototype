import type { ContractStatus, DataSource } from "./api";

export type InboxStatus = "pending" | "processing" | "approved" | "rejected" | "edited";

export type StatusKind = "neutral" | "in_progress" | "scheduled" | "attention" | "failed" | "done";

export interface WorkObject {
  id: string | number;
  type: string;
  typeLabel: string;
  title: string;
  preview?: string;
  body?: string;
  statusLabel: string;
  statusKind: StatusKind;
  priority?: "high" | "medium" | "low";
  area?: string;
  owner: string;
  department: string;
  dueAt?: string;
  nextAction?: string;
  meta?: { label: string; value: string }[];
}

export interface InboxItem {
  id: string | number;
  department: string;
  title: string;
  objectTitle: string;
  objectId: string;
  priority?: "high" | "medium" | "low";
  dueAt?: string;
  statusKind: StatusKind;
  statusLabel: string;
  preview: string;
  owner?: string;
  nextAction?: string;
}

export interface QueueAction {
  id: string | number;
  title: string;
  department: string;
  status: string;
  sourceObjectId?: string;
  updatedAt: string;
  step?: string;
  nextOutput?: string;
}

export interface OutputRecord {
  id: string | number;
  title: string;
  type: string;
  department: string;
  generatedBy: string;
  statusKind: StatusKind;
  statusLabel: string;
  timestamp: string;
  history: string[];
  summary: string;
  sourceObjectId?: string;
}

export interface ToolConn {
  id: string | number;
  label: string;
  status: "connected" | "not_connected" | "backend";
  note: string;
  why: string;
  lastSynced?: string;
}

export interface CalendarEvent {
  id: number;
  name: string;
  start: string;
  stop: string;
  allday?: boolean;
  description?: string;
  department?: string;
}

export interface MailMessage {
  id: number;
  subject?: string;
  body: string;
  author?: string;
  date: string;
  model?: string;
  res_id?: number;
}

export interface TaskItem {
  id: number;
  name: string;
  date_deadline?: string;
  state?: string;
  user_id?: number;
  project_id?: number;
  department?: string;
}

export interface NoteItem {
  id: number;
  name: string;
  body?: string;
  date?: string;
  model?: string;
  res_id?: number;
}

export interface SurfaceMeta {
  source: DataSource;
  contractStatus: ContractStatus;
  route?: string;
}
