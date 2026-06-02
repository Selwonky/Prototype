import type { SurfaceMeta } from "@/lib/types/commons";
import type { User, CorpusModel, InstalledModule, MailServer } from "@/lib/types/technology";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.technology;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Users ──
export async function getUsers(): Promise<{ data: User[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<User>(R.users); return { data: res.data, meta: live(R.users) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.users) }; throw e; }
}

export async function getUser(id: number): Promise<{ data: User | undefined; meta: SurfaceMeta }> {
  const route = `${R.users}/${id}`;
  try { const res = await apiGet<User>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createUser(body: Partial<User>): Promise<{ data: User | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<User>(R.users, body); return { data: res.data, id: res.id, meta: live(R.users) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.users) }; throw e; }
}

export async function updateUser(id: number, body: Partial<User>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.users}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteUser(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.users}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Models ──
export async function getModels(): Promise<{ data: CorpusModel[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<CorpusModel>(R.models); return { data: res.data, meta: live(R.models) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.models) }; throw e; }
}

export async function getModel(id: number): Promise<{ data: CorpusModel | undefined; meta: SurfaceMeta }> {
  const route = `${R.models}/${id}`;
  try { const res = await apiGet<CorpusModel>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createModel(body: Partial<CorpusModel>): Promise<{ data: CorpusModel | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<CorpusModel>(R.models, body); return { data: res.data, id: res.id, meta: live(R.models) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.models) }; throw e; }
}

export async function updateModel(id: number, body: Partial<CorpusModel>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.models}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteModel(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.models}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Modules ──
export async function getModules(): Promise<{ data: InstalledModule[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<InstalledModule>(R.modules); return { data: res.data, meta: live(R.modules) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.modules) }; throw e; }
}

export async function getModule(id: number): Promise<{ data: InstalledModule | undefined; meta: SurfaceMeta }> {
  const route = `${R.modules}/${id}`;
  try { const res = await apiGet<InstalledModule>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createModule(body: Partial<InstalledModule>): Promise<{ data: InstalledModule | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<InstalledModule>(R.modules, body); return { data: res.data, id: res.id, meta: live(R.modules) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.modules) }; throw e; }
}

export async function updateModule(id: number, body: Partial<InstalledModule>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.modules}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteModule(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.modules}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Mail Servers ──
export async function getMailServers(): Promise<{ data: MailServer[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<MailServer>(R.mailServers); return { data: res.data, meta: live(R.mailServers) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.mailServers) }; throw e; }
}

export async function getMailServer(id: number): Promise<{ data: MailServer | undefined; meta: SurfaceMeta }> {
  const route = `${R.mailServers}/${id}`;
  try { const res = await apiGet<MailServer>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createMailServer(body: Partial<MailServer>): Promise<{ data: MailServer | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<MailServer>(R.mailServers, body); return { data: res.data, id: res.id, meta: live(R.mailServers) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.mailServers) }; throw e; }
}

export async function updateMailServer(id: number, body: Partial<MailServer>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.mailServers}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteMailServer(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.mailServers}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}
