import type { SurfaceMeta } from "@/lib/types/commons";
import type {
  Employee, Applicant, Job, Attendance, Resource, LunchOrder,
} from "@/lib/types/workforce";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.workforce;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Employees ──
export async function getEmployees(): Promise<{ data: Employee[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Employee>(R.employees); return { data: res.data, meta: live(R.employees) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.employees) }; throw e; }
}

export async function getEmployee(id: number): Promise<{ data: Employee | undefined; meta: SurfaceMeta }> {
  const route = `${R.employees}/${id}`;
  try { const res = await apiGet<Employee>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createEmployee(body: Partial<Employee>): Promise<{ data: Employee | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Employee>(R.employees, body); return { data: res.data, id: res.id, meta: live(R.employees) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.employees) }; throw e; }
}

export async function updateEmployee(id: number, body: Partial<Employee>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.employees}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteEmployee(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.employees}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Applicants ──
export async function getApplicants(): Promise<{ data: Applicant[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Applicant>(R.applicants); return { data: res.data, meta: live(R.applicants) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.applicants) }; throw e; }
}

export async function getApplicant(id: number): Promise<{ data: Applicant | undefined; meta: SurfaceMeta }> {
  const route = `${R.applicants}/${id}`;
  try { const res = await apiGet<Applicant>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createApplicant(body: Partial<Applicant>): Promise<{ data: Applicant | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Applicant>(R.applicants, body); return { data: res.data, id: res.id, meta: live(R.applicants) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.applicants) }; throw e; }
}

export async function updateApplicant(id: number, body: Partial<Applicant>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.applicants}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteApplicant(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.applicants}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Jobs ──
export async function getJobs(): Promise<{ data: Job[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Job>(R.jobs); return { data: res.data, meta: live(R.jobs) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.jobs) }; throw e; }
}

export async function getJob(id: number): Promise<{ data: Job | undefined; meta: SurfaceMeta }> {
  const route = `${R.jobs}/${id}`;
  try { const res = await apiGet<Job>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createJob(body: Partial<Job>): Promise<{ data: Job | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Job>(R.jobs, body); return { data: res.data, id: res.id, meta: live(R.jobs) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.jobs) }; throw e; }
}

export async function updateJob(id: number, body: Partial<Job>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.jobs}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteJob(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.jobs}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Attendance ──
export async function getAttendanceRecords(): Promise<{ data: Attendance[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Attendance>(R.attendance); return { data: res.data, meta: live(R.attendance) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.attendance) }; throw e; }
}

export async function getAttendanceRecord(id: number): Promise<{ data: Attendance | undefined; meta: SurfaceMeta }> {
  const route = `${R.attendance}/${id}`;
  try { const res = await apiGet<Attendance>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createAttendanceRecord(body: Partial<Attendance>): Promise<{ data: Attendance | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Attendance>(R.attendance, body); return { data: res.data, id: res.id, meta: live(R.attendance) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.attendance) }; throw e; }
}

export async function updateAttendanceRecord(id: number, body: Partial<Attendance>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.attendance}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteAttendanceRecord(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.attendance}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Resources ──
export async function getResources(): Promise<{ data: Resource[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Resource>(R.resources); return { data: res.data, meta: live(R.resources) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.resources) }; throw e; }
}

export async function getResource(id: number): Promise<{ data: Resource | undefined; meta: SurfaceMeta }> {
  const route = `${R.resources}/${id}`;
  try { const res = await apiGet<Resource>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createResource(body: Partial<Resource>): Promise<{ data: Resource | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Resource>(R.resources, body); return { data: res.data, id: res.id, meta: live(R.resources) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.resources) }; throw e; }
}

export async function updateResource(id: number, body: Partial<Resource>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.resources}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteResource(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.resources}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Lunch Orders ──
export async function getLunchOrders(): Promise<{ data: LunchOrder[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<LunchOrder>(R.lunchOrders); return { data: res.data, meta: live(R.lunchOrders) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.lunchOrders) }; throw e; }
}

export async function getLunchOrder(id: number): Promise<{ data: LunchOrder | undefined; meta: SurfaceMeta }> {
  const route = `${R.lunchOrders}/${id}`;
  try { const res = await apiGet<LunchOrder>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createLunchOrder(body: Partial<LunchOrder>): Promise<{ data: LunchOrder | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<LunchOrder>(R.lunchOrders, body); return { data: res.data, id: res.id, meta: live(R.lunchOrders) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.lunchOrders) }; throw e; }
}

export async function updateLunchOrder(id: number, body: Partial<LunchOrder>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.lunchOrders}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteLunchOrder(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.lunchOrders}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}
