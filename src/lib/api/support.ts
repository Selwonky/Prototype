import type { SurfaceMeta } from "@/lib/types/commons";
import type { Ticket, SupportMessage, Rating, LivechatChannel } from "@/lib/types/support";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.support;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Tickets ──
export async function getTickets(): Promise<{ data: Ticket[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Ticket>(R.tickets); return { data: res.data, meta: live(R.tickets) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.tickets) }; throw e; }
}

export async function getTicket(id: number): Promise<{ data: Ticket | undefined; meta: SurfaceMeta }> {
  const route = `${R.tickets}/${id}`;
  try { const res = await apiGet<Ticket>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createTicket(body: Partial<Ticket>): Promise<{ data: Ticket | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Ticket>(R.tickets, body); return { data: res.data, id: res.id, meta: live(R.tickets) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.tickets) }; throw e; }
}

export async function updateTicket(id: number, body: Partial<Ticket>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.tickets}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteTicket(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.tickets}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Messages ──
export async function getMessages(): Promise<{ data: SupportMessage[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<SupportMessage>(R.messages); return { data: res.data, meta: live(R.messages) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.messages) }; throw e; }
}

export async function getMessage(id: number): Promise<{ data: SupportMessage | undefined; meta: SurfaceMeta }> {
  const route = `${R.messages}/${id}`;
  try { const res = await apiGet<SupportMessage>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createMessage(body: Partial<SupportMessage>): Promise<{ data: SupportMessage | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<SupportMessage>(R.messages, body); return { data: res.data, id: res.id, meta: live(R.messages) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.messages) }; throw e; }
}

export async function updateMessage(id: number, body: Partial<SupportMessage>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.messages}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteMessage(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.messages}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Ratings ──
export async function getRatings(): Promise<{ data: Rating[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Rating>(R.ratings); return { data: res.data, meta: live(R.ratings) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.ratings) }; throw e; }
}

export async function getRating(id: number): Promise<{ data: Rating | undefined; meta: SurfaceMeta }> {
  const route = `${R.ratings}/${id}`;
  try { const res = await apiGet<Rating>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createRating(body: Partial<Rating>): Promise<{ data: Rating | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Rating>(R.ratings, body); return { data: res.data, id: res.id, meta: live(R.ratings) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.ratings) }; throw e; }
}

export async function updateRating(id: number, body: Partial<Rating>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.ratings}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteRating(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.ratings}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Livechat Channels ──
export async function getLivechatChannels(): Promise<{ data: LivechatChannel[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<LivechatChannel>(R.livechatChannels); return { data: res.data, meta: live(R.livechatChannels) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.livechatChannels) }; throw e; }
}

export async function getLivechatChannel(id: number): Promise<{ data: LivechatChannel | undefined; meta: SurfaceMeta }> {
  const route = `${R.livechatChannels}/${id}`;
  try { const res = await apiGet<LivechatChannel>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createLivechatChannel(body: Partial<LivechatChannel>): Promise<{ data: LivechatChannel | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<LivechatChannel>(R.livechatChannels, body); return { data: res.data, id: res.id, meta: live(R.livechatChannels) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.livechatChannels) }; throw e; }
}

export async function updateLivechatChannel(id: number, body: Partial<LivechatChannel>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.livechatChannels}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteLivechatChannel(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.livechatChannels}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}
