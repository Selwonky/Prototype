import type { SurfaceMeta } from "@/lib/types/commons";
import type { Attachment, LegalMessage, LegalActivity } from "@/lib/types/legal";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.legal;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Attachments ──
export async function getAttachments(): Promise<{ data: Attachment[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Attachment>(R.attachments); return { data: res.data, meta: live(R.attachments) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.attachments) }; throw e; }
}

export async function getAttachment(id: number): Promise<{ data: Attachment | undefined; meta: SurfaceMeta }> {
  const route = `${R.attachments}/${id}`;
  try { const res = await apiGet<Attachment>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createAttachment(body: Partial<Attachment>): Promise<{ data: Attachment | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Attachment>(R.attachments, body); return { data: res.data, id: res.id, meta: live(R.attachments) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.attachments) }; throw e; }
}

export async function updateAttachment(id: number, body: Partial<Attachment>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.attachments}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteAttachment(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.attachments}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Messages ──
export async function getMessages(): Promise<{ data: LegalMessage[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<LegalMessage>(R.messages); return { data: res.data, meta: live(R.messages) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.messages) }; throw e; }
}

export async function getMessage(id: number): Promise<{ data: LegalMessage | undefined; meta: SurfaceMeta }> {
  const route = `${R.messages}/${id}`;
  try { const res = await apiGet<LegalMessage>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createMessage(body: Partial<LegalMessage>): Promise<{ data: LegalMessage | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<LegalMessage>(R.messages, body); return { data: res.data, id: res.id, meta: live(R.messages) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.messages) }; throw e; }
}

export async function updateMessage(id: number, body: Partial<LegalMessage>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.messages}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteMessage(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.messages}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Activities ──
export async function getActivities(): Promise<{ data: LegalActivity[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<LegalActivity>(R.activities); return { data: res.data, meta: live(R.activities) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.activities) }; throw e; }
}

export async function getActivity(id: number): Promise<{ data: LegalActivity | undefined; meta: SurfaceMeta }> {
  const route = `${R.activities}/${id}`;
  try { const res = await apiGet<LegalActivity>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createActivity(body: Partial<LegalActivity>): Promise<{ data: LegalActivity | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<LegalActivity>(R.activities, body); return { data: res.data, id: res.id, meta: live(R.activities) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.activities) }; throw e; }
}

export async function updateActivity(id: number, body: Partial<LegalActivity>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.activities}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteActivity(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.activities}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}
