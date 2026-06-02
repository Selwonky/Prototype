import type { SurfaceMeta } from "@/lib/types/commons";
import type {
  SalesDashboardSummary, CrmStage, CrmLead, Contact, Company,
  SalesActivity, SalesActivityType, CrmTag, UtmSource, UtmMedium, UtmCampaign, CrmLostReason,
} from "@/lib/types/sales";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiPost, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.sales;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Dashboard ──
export async function getDashboardSummary(): Promise<{ data: SalesDashboardSummary | null; meta: SurfaceMeta }> {
  try { const res = await apiGet<SalesDashboardSummary>(R.summary); return { data: res.data ?? null, meta: live(R.summary) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.summary) }; throw e; }
}

// ── Stages ──
export async function getStages(): Promise<{ data: CrmStage[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<CrmStage>(R.stages); return { data: res.data, meta: live(R.stages) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.stages) }; throw e; }
}

// ── Pipeline ──
export async function getPipeline(): Promise<{ data: CrmLead[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<CrmLead>(R.pipeline); return { data: res.data, meta: live(R.pipeline) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.pipeline) }; throw e; }
}

export async function moveLeadStage(leadId: number, stageId: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/${leadId}/stage`;
  try { await apiPut(route, { stage_id: stageId }); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function markLeadWon(leadId: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/${leadId}/won`;
  try { await apiPost(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function markLeadLost(leadId: number, reasonId?: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/${leadId}/lost`;
  try { await apiPost(route, reasonId ? { lost_reason_id: reasonId } : undefined); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Leads ──
export async function getLeads(): Promise<{ data: CrmLead[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<CrmLead>(R.leads); return { data: res.data, meta: live(R.leads) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.leads) }; throw e; }
}

export async function getLead(id: number): Promise<{ data: CrmLead | undefined; meta: SurfaceMeta }> {
  const route = `${R.leads}/${id}`;
  try { const res = await apiGet<CrmLead>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createLead(body: Partial<CrmLead>): Promise<{ data: CrmLead | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<CrmLead>(R.leads, body); return { data: res.data, id: res.id, meta: live(R.leads) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.leads) }; throw e; }
}

export async function updateLead(id: number, body: Partial<CrmLead>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteLead(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function syncLeads(): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/sync`;
  try { await apiPost(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function qualifyLead(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/${id}/qualify`;
  try { await apiPost(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function convertToOpportunity(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/convert-to-opportunity`;
  try { await apiPost(route, { lead_id: id }); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function getLeadNotes(id: number): Promise<{ data: unknown[]; meta: SurfaceMeta }> {
  const route = `${R.leads}/${id}/notes`;
  try { const res = await apiGetList(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

export async function createLeadNote(id: number, body: unknown): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.leads}/${id}/notes`;
  try { await apiPost(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Contacts ──
export async function getContacts(): Promise<{ data: Contact[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Contact>(R.contacts); return { data: res.data, meta: live(R.contacts) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.contacts) }; throw e; }
}

export async function getContact(id: number): Promise<{ data: Contact | undefined; meta: SurfaceMeta }> {
  const route = `${R.contacts}/${id}`;
  try { const res = await apiGet<Contact>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createContact(body: Partial<Contact>): Promise<{ id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Contact>(R.contacts, body); return { id: res.id, meta: live(R.contacts) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(R.contacts) }; throw e; }
}

export async function updateContact(id: number, body: Partial<Contact>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.contacts}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteContact(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.contacts}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function getContactNotes(id: number): Promise<{ data: unknown[]; meta: SurfaceMeta }> {
  const route = `${R.contacts}/${id}/notes`;
  try { const res = await apiGetList(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

export async function createContactNote(id: number, body: unknown): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.contacts}/${id}/notes`;
  try { await apiPost(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Companies ──
export async function getCompanies(): Promise<{ data: Company[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Company>(R.companies); return { data: res.data, meta: live(R.companies) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.companies) }; throw e; }
}

export async function getCompany(id: number): Promise<{ data: Company | undefined; meta: SurfaceMeta }> {
  const route = `${R.companies}/${id}`;
  try { const res = await apiGet<Company>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createCompany(body: Partial<Company>): Promise<{ id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Company>(R.companies, body); return { id: res.id, meta: live(R.companies) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(R.companies) }; throw e; }
}

export async function updateCompany(id: number, body: Partial<Company>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.companies}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteCompany(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.companies}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function getCompanyNotes(id: number): Promise<{ data: unknown[]; meta: SurfaceMeta }> {
  const route = `${R.companies}/${id}/notes`;
  try { const res = await apiGetList(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

export async function createCompanyNote(id: number, body: unknown): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.companies}/${id}/notes`;
  try { await apiPost(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Activities ──
export async function getActivityTypes(): Promise<{ data: SalesActivityType[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<SalesActivityType>(R.activityTypes); return { data: res.data, meta: live(R.activityTypes) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.activityTypes) }; throw e; }
}

export async function getActivities(): Promise<{ data: SalesActivity[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<SalesActivity>(R.activities); return { data: res.data, meta: live(R.activities) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.activities) }; throw e; }
}

export async function createActivity(body: Partial<SalesActivity>): Promise<{ id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<SalesActivity>(R.activities, body); return { id: res.id, meta: live(R.activities) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(R.activities) }; throw e; }
}

export async function updateActivity(id: number, body: Partial<SalesActivity>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.activities}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteActivity(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.activities}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function markActivityDone(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.activities}/${id}/done`;
  try { await apiPost(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Reference Data ──
export async function getLeadTags(): Promise<{ data: CrmTag[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<CrmTag>(R.leadTags); return { data: res.data, meta: live(R.leadTags) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.leadTags) }; throw e; }
}

export async function getContactTags(): Promise<{ data: CrmTag[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<CrmTag>(R.contactTags); return { data: res.data, meta: live(R.contactTags) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.contactTags) }; throw e; }
}

export async function getUtmSources(): Promise<{ data: UtmSource[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<UtmSource>(R.utmSources); return { data: res.data, meta: live(R.utmSources) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.utmSources) }; throw e; }
}

export async function getUtmMediums(): Promise<{ data: UtmMedium[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<UtmMedium>(R.utmMediums); return { data: res.data, meta: live(R.utmMediums) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.utmMediums) }; throw e; }
}

export async function getUtmCampaigns(): Promise<{ data: UtmCampaign[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<UtmCampaign>(R.utmCampaigns); return { data: res.data, meta: live(R.utmCampaigns) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.utmCampaigns) }; throw e; }
}

export async function getLostReasons(): Promise<{ data: CrmLostReason[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<CrmLostReason>(R.lostReasons); return { data: res.data, meta: live(R.lostReasons) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.lostReasons) }; throw e; }
}
