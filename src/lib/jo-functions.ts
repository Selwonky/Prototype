import type { DepartmentId } from "@/lib/prototype-data";

export interface JoFunctionPage {
  id: DepartmentId;
  name: string;
  summary: string;
  ormMeaning: string;
  objects: string[];
  connectsTo: DepartmentId[];
  interconnectivity: string;
}

export const joFunctions: JoFunctionPage[] = [
  {
    id: "sales",
    name: "Jo from Sales",
    summary: "Go-to-market workspace for prospects, outreach, partnerships, risk motions, proposals, and pipeline review.",
    ormMeaning: "Models prospects, briefs, drafts, proposals, partners, referrals, quote packages, and assessments as durable work objects.",
    objects: ["Prospect", "Research brief", "Outreach draft", "Proposal", "Partner", "Referral", "Quote package", "Assessment"],
    connectsTo: ["marketing", "finance", "legal", "operations"],
    interconnectivity: "Moves from prospect research to approval, proposal, contract review, financial setup, and delivery handoff.",
  },
  {
    id: "marketing",
    name: "Jo from Marketing",
    summary: "Demand, content, campaign, audience, brand, and publishing workspace.",
    ormMeaning: "Models campaign plans, content drafts, channel work, audience segments, calendars, and performance summaries.",
    objects: ["Content draft", "Campaign", "Audience", "Channel", "Launch calendar", "Performance summary"],
    connectsTo: ["sales", "technology", "operations"],
    interconnectivity: "Turns audience and content work into Sales enablement, launch support, tasks, and reporting signals.",
  },
  {
    id: "workforce",
    name: "Jo from Workforce",
    summary: "People, hiring, onboarding, contractors, role planning, and team coordination workspace.",
    ormMeaning: "Models applicants, jobs, employees, attendance, resources, onboarding checklists, and agreements.",
    objects: ["Applicant", "Job", "Employee", "Resource", "Checklist", "Agreement"],
    connectsTo: ["operations", "finance", "accounting", "legal"],
    interconnectivity: "Connects capacity, hiring, onboarding, contractor agreements, and people-related approvals into Commons workflows.",
  },
  {
    id: "finance",
    name: "Jo from Finance",
    summary: "Financial visibility, payments, cash flow, account moves, journals, providers, and reporting workspace.",
    ormMeaning: "Models payments, moves, journals, providers, forecast rows, budget records, and finance summaries.",
    objects: ["Payment", "Account move", "Journal", "Provider", "Forecast", "Budget", "Finance summary"],
    connectsTo: ["sales", "accounting", "legal", "operations"],
    interconnectivity: "Receives commitments from Sales and Operations, coordinates with Accounting, and tracks financial approvals in Commons.",
  },
  {
    id: "technology",
    name: "Jo from Technology",
    summary: "Systems, tools, users, modules, corpus models, infrastructure, and internal product operations workspace.",
    ormMeaning: "Models users, installed modules, corpus models, mail servers, tickets, deployments, and technical assets.",
    objects: ["User", "Module", "Corpus model", "Mail server", "Ticket", "Deployment", "Technical asset"],
    connectsTo: ["sales", "marketing", "support", "operations", "legal"],
    interconnectivity: "Provides tool access, integrations, data models, and technical workflows that every department depends on.",
  },
  {
    id: "support",
    name: "Jo from Support",
    summary: "Customer support, ticketing, live chat, response workflows, satisfaction, and service health workspace.",
    ormMeaning: "Models tickets, support messages, ratings, livechat channels, escalations, and knowledge references.",
    objects: ["Ticket", "Support message", "Rating", "Livechat channel", "Escalation", "Knowledge reference"],
    connectsTo: ["technology", "operations", "sales"],
    interconnectivity: "Escalates bugs to Technology, service issues to Operations, and customer context back to Sales.",
  },
  {
    id: "accounting",
    name: "Jo from Accounting",
    summary: "Bookkeeping, invoices, move lines, accounts, payment records, reconciliation, and period close workspace.",
    ormMeaning: "Models invoices, move lines, accounts, payments, ledger records, reconciliations, and close checklists.",
    objects: ["Invoice", "Move line", "Account", "Payment", "Ledger record", "Reconciliation", "Close checklist"],
    connectsTo: ["finance", "sales", "legal"],
    interconnectivity: "Turns commercial and financial activity into reconciled records, approvals, and close outputs.",
  },
  {
    id: "operations",
    name: "Jo from Operations",
    summary: "Delivery, project execution, staffing, process control, engagements, checklists, and governance workspace.",
    ormMeaning: "Models engagements, checklists, status reports, delivery tasks, blockers, resources, and operating reviews.",
    objects: ["Engagement", "Checklist", "Status report", "Delivery task", "Blocker", "Resource", "Operating review"],
    connectsTo: ["sales", "workforce", "support", "finance"],
    interconnectivity: "Receives handoffs from Sales, requests capacity from Workforce, resolves escalations with Support, and reports cost/risk to Finance.",
  },
  {
    id: "legal",
    name: "Jo from Legal",
    summary: "Contracts, attachments, compliance documents, messages, activities, policies, and entity/legal review workspace.",
    ormMeaning: "Models contracts, attachments, legal messages, activities, policies, approvals, and review records.",
    objects: ["Contract", "Attachment", "Legal message", "Activity", "Policy", "Approval", "Review record"],
    connectsTo: ["sales", "finance", "accounting", "workforce", "technology"],
    interconnectivity: "Reviews agreements, terms, access, policies, and approval records across every regulated workflow.",
  },
];

export const commonsOverview = {
  name: "The Commons",
  summary: "The shared object workspace that connects all 9 department workspaces through approvals, work objects, tools, outputs, tasks, notes, and activity.",
  ormMeaning: "Commons is the cross-functional object layer: every workflow, signal, job, task, action, block, output, inbox item, queue item, and tool connection is a reusable object with properties and relationships.",
  objects: ["Workflow", "Signal", "Job", "Task", "Action", "Block", "Note", "Output", "Inbox item", "Queue item", "Tool connection", "Calendar event"],
  interconnectivity: "Commons makes work move across departments without losing context: objects keep their title, owner, status, department, relationships, actions, and history as they travel between Jo from departments.",
};

export function getJoFunction(id?: string) {
  return joFunctions.find((fn) => fn.id === id);
}
