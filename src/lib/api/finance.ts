import type { SurfaceMeta } from "@/lib/types/commons";
import type { Payment, AccountMove, AccountJournal, PaymentProvider } from "@/lib/types/finance";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.finance;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Payments ──
export async function getPayments(): Promise<{ data: Payment[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Payment>(R.payments); return { data: res.data, meta: live(R.payments) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.payments) }; throw e; }
}

export async function getPayment(id: number): Promise<{ data: Payment | undefined; meta: SurfaceMeta }> {
  const route = `${R.payments}/${id}`;
  try { const res = await apiGet<Payment>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createPayment(body: Partial<Payment>): Promise<{ data: Payment | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Payment>(R.payments, body); return { data: res.data, id: res.id, meta: live(R.payments) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.payments) }; throw e; }
}

export async function updatePayment(id: number, body: Partial<Payment>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.payments}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deletePayment(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.payments}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Moves ──
export async function getMoves(): Promise<{ data: AccountMove[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<AccountMove>(R.moves); return { data: res.data, meta: live(R.moves) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.moves) }; throw e; }
}

export async function getMove(id: number): Promise<{ data: AccountMove | undefined; meta: SurfaceMeta }> {
  const route = `${R.moves}/${id}`;
  try { const res = await apiGet<AccountMove>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createMove(body: Partial<AccountMove>): Promise<{ data: AccountMove | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<AccountMove>(R.moves, body); return { data: res.data, id: res.id, meta: live(R.moves) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.moves) }; throw e; }
}

export async function updateMove(id: number, body: Partial<AccountMove>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.moves}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteMove(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.moves}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Journals ──
export async function getJournals(): Promise<{ data: AccountJournal[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<AccountJournal>(R.journals); return { data: res.data, meta: live(R.journals) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.journals) }; throw e; }
}

export async function getJournal(id: number): Promise<{ data: AccountJournal | undefined; meta: SurfaceMeta }> {
  const route = `${R.journals}/${id}`;
  try { const res = await apiGet<AccountJournal>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createJournal(body: Partial<AccountJournal>): Promise<{ data: AccountJournal | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<AccountJournal>(R.journals, body); return { data: res.data, id: res.id, meta: live(R.journals) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.journals) }; throw e; }
}

export async function updateJournal(id: number, body: Partial<AccountJournal>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.journals}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteJournal(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.journals}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Payment Providers ──
export async function getPaymentProviders(): Promise<{ data: PaymentProvider[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<PaymentProvider>(R.paymentProviders); return { data: res.data, meta: live(R.paymentProviders) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.paymentProviders) }; throw e; }
}

export async function getPaymentProvider(id: number): Promise<{ data: PaymentProvider | undefined; meta: SurfaceMeta }> {
  const route = `${R.paymentProviders}/${id}`;
  try { const res = await apiGet<PaymentProvider>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createPaymentProvider(body: Partial<PaymentProvider>): Promise<{ data: PaymentProvider | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<PaymentProvider>(R.paymentProviders, body); return { data: res.data, id: res.id, meta: live(R.paymentProviders) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.paymentProviders) }; throw e; }
}

export async function updatePaymentProvider(id: number, body: Partial<PaymentProvider>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.paymentProviders}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deletePaymentProvider(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.paymentProviders}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}
