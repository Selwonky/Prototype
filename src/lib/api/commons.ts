import type { ApiSuccess, ApiListSuccess } from "@/lib/types/api";
import type {
  WorkObject, InboxItem, QueueAction, OutputRecord, ToolConn,
  CalendarEvent, MailMessage, TaskItem, NoteItem, SurfaceMeta,
} from "@/lib/types/commons";
import { commonsRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiPost, apiPut, ApiClientError, ModelUnavailableError } from "./client";
import * as fallback from "@/lib/data/commons";

function pending(route: string): SurfaceMeta {
  return { source: "prototype", contractStatus: "pending", route };
}

function live(route: string): SurfaceMeta {
  return { source: "api", contractStatus: "live", route };
}

function isFallback(e: unknown): boolean {
  return e instanceof ApiClientError || e instanceof ModelUnavailableError;
}

// ── Objects ──

export async function getObjects(): Promise<{ data: WorkObject[]; meta: SurfaceMeta }> {
  const route = commonsRoutes.objects;
  try {
    const res: ApiListSuccess<WorkObject> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getObjects(), meta: pending(route) };
    throw e;
  }
}

export async function getObject(id: string): Promise<{ data: WorkObject | undefined; meta: SurfaceMeta }> {
  const route = `${commonsRoutes.objects}/${id}`;
  try {
    const res: ApiSuccess<WorkObject> = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getObject(id), meta: pending(route) };
    throw e;
  }
}

// ── Inbox ──

export async function getInbox(): Promise<{ data: InboxItem[]; meta: SurfaceMeta }> {
  const route = commonsRoutes.inbox;
  try {
    const res: ApiListSuccess<InboxItem> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getInbox(), meta: pending(route) };
    throw e;
  }
}

export async function approveInboxItem(id: string): Promise<{ meta: SurfaceMeta }> {
  const route = `${commonsRoutes.actions}/${id}/approve`;
  try {
    await apiPost(route);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

export async function rejectInboxItem(id: string, reason: string): Promise<{ meta: SurfaceMeta }> {
  const route = `${commonsRoutes.actions}/${id}/reject`;
  try {
    await apiPost(route, { reason });
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

// ── Queue ──

export async function getQueue(): Promise<{ data: QueueAction[]; meta: SurfaceMeta }> {
  const route = commonsRoutes.queue;
  try {
    const res: ApiListSuccess<QueueAction> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getQueue(), meta: pending(route) };
    throw e;
  }
}

// ── Outputs ──

export async function getOutputs(): Promise<{ data: OutputRecord[]; meta: SurfaceMeta }> {
  const route = commonsRoutes.outputs;
  try {
    const res: ApiListSuccess<OutputRecord> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getOutputs(), meta: pending(route) };
    throw e;
  }
}

export async function getOutput(id: string): Promise<{ data: OutputRecord | undefined; meta: SurfaceMeta }> {
  const route = `${commonsRoutes.outputs}/${id}`;
  try {
    const res: ApiSuccess<OutputRecord> = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: undefined, meta: pending(route) };
    throw e;
  }
}

// ── Calendar ──

export async function getCalendar(): Promise<{ data: CalendarEvent[]; meta: SurfaceMeta }> {
  const route = commonsRoutes.calendar;
  try {
    const res: ApiListSuccess<CalendarEvent> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: [], meta: pending(route) };
    throw e;
  }
}

// ── Mail ──

export async function getMail(): Promise<{ data: MailMessage[]; meta: SurfaceMeta }> {
  const route = commonsRoutes.mail;
  try {
    const res: ApiListSuccess<MailMessage> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: [], meta: pending(route) };
    throw e;
  }
}

// ── Tasks ──

export async function getTasks(): Promise<{ data: TaskItem[]; meta: SurfaceMeta }> {
  const route = commonsRoutes.tasks;
  try {
    const res: ApiListSuccess<TaskItem> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: [], meta: pending(route) };
    throw e;
  }
}

export async function completeTask(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${commonsRoutes.tasks}/${id}/done`;
  try {
    await apiPost(route);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

// ── Notes ──

export async function getNotes(): Promise<{ data: NoteItem[]; meta: SurfaceMeta }> {
  const route = commonsRoutes.notes;
  try {
    const res: ApiListSuccess<NoteItem> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: [], meta: pending(route) };
    throw e;
  }
}

export async function createNote(body: { name: string; body?: string; model?: string; res_id?: number }): Promise<{ meta: SurfaceMeta }> {
  const route = commonsRoutes.notes;
  try {
    await apiPost(route, body);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

export async function updateNote(id: number, body: unknown): Promise<{ meta: SurfaceMeta }> {
  const route = `${commonsRoutes.notes}/${id}`;
  try {
    await apiPut(route, body);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

// ── Search ──

export async function search(q: string): Promise<{ data: WorkObject[]; meta: SurfaceMeta }> {
  const route = `${commonsRoutes.search}?q=${encodeURIComponent(q)}`;
  try {
    const res: ApiListSuccess<WorkObject> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.search(q), meta: pending(route) };
    throw e;
  }
}

// ── Tools ──

export async function getTools(): Promise<{ data: ToolConn[]; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/tools";
  try {
    const res: ApiListSuccess<ToolConn> = await apiGetList(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getTools(), meta: pending(route) };
    throw e;
  }
}

export async function connectTool(id: string): Promise<{ meta: SurfaceMeta }> {
  const route = `/api/v1/jo/tools/${id}/connect`;
  try {
    await apiPost(route);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

export async function disconnectTool(id: string): Promise<{ meta: SurfaceMeta }> {
  const route = `/api/v1/jo/tools/${id}/disconnect`;
  try {
    await apiPost(route);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

export async function syncTool(id: string): Promise<{ meta: SurfaceMeta }> {
  const route = `/api/v1/jo/tools/${id}/sync`;
  try {
    await apiPost(route);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

// ── OrgChart ──

export async function getOrgChart(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/orgchart";
  try {
    const res = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getOrgChart(), meta: pending(route) };
    throw e;
  }
}

export async function getOrgChartDepartments(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/orgchart/departments";
  try {
    const res = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getOrgChart(), meta: pending(route) };
    throw e;
  }
}

export async function getOrgChartDepartment(key: string): Promise<{ data: unknown; meta: SurfaceMeta }> {
  const route = `/api/v1/jo/orgchart/departments/${key}`;
  try {
    const res = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: undefined, meta: pending(route) };
    throw e;
  }
}

export async function getOrgChartWorkflows(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/orgchart/workflows";
  try {
    const res = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: [], meta: pending(route) };
    throw e;
  }
}

// ── Onboarding ──

export async function submitOnboarding(body: unknown): Promise<{ meta: SurfaceMeta }> {
  const route = "/api/v1/jo/onboarding";
  try {
    await apiPost(route, body);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

export async function getOnboardingStatus(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/onboarding/status";
  try {
    const res = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: null, meta: pending(route) };
    throw e;
  }
}

export async function updateOnboardingProfile(body: unknown): Promise<{ meta: SurfaceMeta }> {
  const route = "/api/v1/jo/onboarding/profile";
  try {
    await apiPut(route, body);
    return { meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { meta: pending(route) };
    throw e;
  }
}

// ── Department Categories ──

export async function getDepartmentCategories(departmentId: string): Promise<{ data: unknown; meta: SurfaceMeta }> {
  const route = `/api/v1/jo/departments/${departmentId}/categories`;
  try {
    const res = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (isFallback(e)) return { data: fallback.getDepartmentCategories(departmentId), meta: pending(route) };
    throw e;
  }
}
