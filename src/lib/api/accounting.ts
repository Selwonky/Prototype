import type { SurfaceMeta } from "@/lib/types/commons";
import type { Invoice, MoveLine, Account, AccountingPayment } from "@/lib/types/accounting";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.accounting;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Invoices ──
export async function getInvoices(): Promise<{ data: Invoice[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Invoice>(R.invoices); return { data: res.data, meta: live(R.invoices) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.invoices) }; throw e; }
}

export async function getInvoice(id: number): Promise<{ data: Invoice | undefined; meta: SurfaceMeta }> {
  const route = `${R.invoices}/${id}`;
  try { const res = await apiGet<Invoice>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createInvoice(body: Partial<Invoice>): Promise<{ data: Invoice | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Invoice>(R.invoices, body); return { data: res.data, id: res.id, meta: live(R.invoices) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.invoices) }; throw e; }
}

export async function updateInvoice(id: number, body: Partial<Invoice>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.invoices}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteInvoice(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.invoices}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Move Lines ──
export async function getMoveLines(): Promise<{ data: MoveLine[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<MoveLine>(R.moveLines); return { data: res.data, meta: live(R.moveLines) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.moveLines) }; throw e; }
}

export async function getMoveLine(id: number): Promise<{ data: MoveLine | undefined; meta: SurfaceMeta }> {
  const route = `${R.moveLines}/${id}`;
  try { const res = await apiGet<MoveLine>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createMoveLine(body: Partial<MoveLine>): Promise<{ data: MoveLine | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<MoveLine>(R.moveLines, body); return { data: res.data, id: res.id, meta: live(R.moveLines) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.moveLines) }; throw e; }
}

export async function updateMoveLine(id: number, body: Partial<MoveLine>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.moveLines}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteMoveLine(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.moveLines}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Accounts ──
export async function getAccounts(): Promise<{ data: Account[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Account>(R.accounts); return { data: res.data, meta: live(R.accounts) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.accounts) }; throw e; }
}

export async function getAccount(id: number): Promise<{ data: Account | undefined; meta: SurfaceMeta }> {
  const route = `${R.accounts}/${id}`;
  try { const res = await apiGet<Account>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createAccount(body: Partial<Account>): Promise<{ data: Account | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Account>(R.accounts, body); return { data: res.data, id: res.id, meta: live(R.accounts) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.accounts) }; throw e; }
}

export async function updateAccount(id: number, body: Partial<Account>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.accounts}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteAccount(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.accounts}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Payments ──
export async function getPayments(): Promise<{ data: AccountingPayment[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<AccountingPayment>(R.payments); return { data: res.data, meta: live(R.payments) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.payments) }; throw e; }
}

export async function getPayment(id: number): Promise<{ data: AccountingPayment | undefined; meta: SurfaceMeta }> {
  const route = `${R.payments}/${id}`;
  try { const res = await apiGet<AccountingPayment>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createPayment(body: Partial<AccountingPayment>): Promise<{ data: AccountingPayment | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<AccountingPayment>(R.payments, body); return { data: res.data, id: res.id, meta: live(R.payments) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.payments) }; throw e; }
}

export async function updatePayment(id: number, body: Partial<AccountingPayment>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.payments}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deletePayment(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.payments}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}
