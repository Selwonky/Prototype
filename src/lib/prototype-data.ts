// Jo from PLG — clickable prototype mock data (local only, no backend).
// All data is FIXTURE / fictitious. No NAICS codes, no Labor Map, no MCP labels.

export type StatusKind =
  | "neutral"
  | "in_progress"
  | "scheduled"
  | "attention"
  | "failed"
  | "done";

export type ObjectType =
  | "prospect"
  | "research_brief"
  | "outreach_draft"
  | "proposal"
  | "engagement"
  | "checklist"
  | "status_report"
  | "content_draft"
  | "campaign"
  | "invoice"
  | "agreement"
  | "sprint"
  | "ticket"
  | "contract"
  | "signal"
  | "workflow"
  | "task"
  | "note"
  // GTM (under Sales): Risk + Partnerships motions
  | "insurance_prospect"
  | "quote_package"
  | "assessment"
  | "licensing"
  | "partner"
  | "referral"
  | "checkin";

export type DepartmentId =
  | "sales"
  | "marketing"
  | "workforce"
  | "finance"
  | "technology"
  | "support"
  | "accounting"
  | "operations"
  | "legal";

export interface Department {
  id: DepartmentId;
  label: string;
  summary: string;
  activeCount: number;
  needsApprovalCount: number;
  status: "active" | "quiet";
  rich: boolean; // Customer Zero rich view
}

export interface WorkObject {
  id: string;
  type: ObjectType;
  typeLabel: string;
  department: DepartmentId;
  title: string;
  statusLabel: string;
  statusKind: StatusKind;
  owner: string;
  nextAction?: string;
  dueAt?: string;
  preview: string;
  meta?: { label: string; value: string }[];
  body?: string; // detail body
  priority?: "high" | "medium" | "low";
  /** GTM motion under Sales: "Pipeline" | "Partnerships" | "Risk" (Sales only). */
  area?: "Pipeline" | "Partnerships" | "Risk";
}

export interface InboxItem {
  id: string;
  department: DepartmentId;
  title: string;
  objectTitle: string;
  objectId: string;
  priority: "high" | "medium" | "low";
  dueAt: string;
  statusKind: StatusKind;
  statusLabel: string;
  preview: string;
}

export type ActionStatus =
  | "draft"
  | "queued"
  | "running"
  | "needs_approval"
  | "completed"
  | "failed"
  | "cancelled";

export interface QueueAction {
  id: string;
  title: string;
  department: DepartmentId;
  status: ActionStatus;
  sourceObjectId?: string;
  updatedAt: string;
  step?: string;       // current step in the run
  nextOutput?: string; // estimated next output (Compiler Record)
}

export interface OutputRecord {
  id: string;
  title: string;
  type: string;
  department: DepartmentId;
  generatedBy: string;
  statusKind: StatusKind;
  statusLabel: string;
  timestamp: string;
  history: string[];
  summary: string;          // result summary
  sourceObjectId?: string;  // link back to the object
}

export interface OrgJob {
  id: string;
  title: string;
  level: "IC" | "Team Lead" | "Manager" | "Head of";
  subFamily: string;
  tasks: string[];
  workflowSeeds: { name: string; outputPreview: string }[];
  compilerRecords: string[]; // structured output artifacts the job produces
}

export interface OrgDepartment {
  id: DepartmentId;
  label: string;
  jobs: OrgJob[];
}

export type ToolStatus = "connected" | "not_connected" | "backend";
export interface ToolConn {
  id: string;
  label: string;
  status: ToolStatus;
  note: string;
  why: string;
  lastSynced?: string;
}

export interface IndustryMatch {
  id: string;
  label: string;
  confidence: number; // 0..1, shown as a soft hint only, never a code
  workAreas: string[];
}

// ── statusKind → DS Badge (variant × color) ──
export type DsBadgeColor = "brand" | "accent" | "success" | "warning" | "error" | "neutral";
export const statusBadge: Record<StatusKind, { variant: "light" | "solid" | "outline"; color: DsBadgeColor }> = {
  neutral: { variant: "light", color: "neutral" },
  in_progress: { variant: "light", color: "brand" },
  scheduled: { variant: "light", color: "accent" },
  attention: { variant: "light", color: "warning" },
  failed: { variant: "light", color: "error" },
  done: { variant: "light", color: "success" },
};

export const actionStatusKind: Record<ActionStatus, StatusKind> = {
  draft: "neutral",
  queued: "scheduled",
  running: "in_progress",
  needs_approval: "attention",
  completed: "done",
  failed: "failed",
  cancelled: "neutral",
};

export const actionStatusLabel: Record<ActionStatus, string> = {
  draft: "Queued",
  queued: "Queued",
  running: "Active",
  needs_approval: "Blocked",
  completed: "Done",
  failed: "Blocked",
  cancelled: "Blocked",
};

// ─────────────────────────────── Departments ───────────────────────────────
export const departments: Department[] = [
  { id: "sales", label: "Sales", summary: "Go-to-market: pipeline, partnerships, and risk/insurance motions.", activeCount: 9, needsApprovalCount: 4, status: "active", rich: true },
  { id: "operations", label: "Operations", summary: "Deliver client engagements, staffing, and governance.", activeCount: 2, needsApprovalCount: 1, status: "active", rich: true },
  { id: "marketing", label: "Marketing", summary: "Generate demand through content, search, and brand presence.", activeCount: 3, needsApprovalCount: 1, status: "active", rich: true },
  { id: "finance", label: "Finance", summary: "Manage invoices, collections, cash flow, and reporting.", activeCount: 2, needsApprovalCount: 2, status: "active", rich: true },
  { id: "workforce", label: "Workforce", summary: "Hiring, onboarding, contractor relationships, and coordination.", activeCount: 2, needsApprovalCount: 0, status: "active", rich: true },
  { id: "technology", label: "Technology", summary: "Build and maintain Jo from (Customer Zero, internal).", activeCount: 5, needsApprovalCount: 0, status: "active", rich: true },
  { id: "legal", label: "Legal", summary: "Contracts, IP protection, entity compliance, and documents.", activeCount: 1, needsApprovalCount: 1, status: "active", rich: true },
  { id: "support", label: "Support", summary: "Resolve customer questions and keep engagements healthy.", activeCount: 0, needsApprovalCount: 0, status: "quiet", rich: false },
  { id: "accounting", label: "Accounting", summary: "Bookkeeping, reconciliation, and period close.", activeCount: 0, needsApprovalCount: 0, status: "quiet", rich: false },
];

// ─────────────────────────────── Work objects ──────────────────────────────
export const workObjects: WorkObject[] = [
  // Sales › Pipeline
  { id: "obj_sales_acme", priority: "high", area: "Pipeline", type: "prospect", typeLabel: "Prospect", department: "sales", title: "Acme Manufacturing", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Sales Team Lead", nextAction: "Approve outreach draft", dueAt: "Today", preview: "Research brief and outreach draft ready for review.", meta: [{ label: "Stage", value: "Qualified · 10%" }, { label: "Contact", value: "Dana Reyes, VP Ops" }], body: "Acme Manufacturing is a 120-person precision-parts maker in Ohio. Jo from researched their site, recent hiring, and press, then drafted a first outreach email focused on reducing quote turnaround." },
  { id: "obj_sales_brief_acme", area: "Pipeline", type: "research_brief", typeLabel: "Research Brief", department: "sales", title: "Acme Manufacturing — Research Brief", statusLabel: "Done", statusKind: "done", owner: "Jo from Sales IC", preview: "Company profile, signals, and recommended angle.", meta: [{ label: "Sources", value: "Website, press, hiring" }], body: "Key signals: 3 new ops roles posted, new facility announced, quote-turnaround complaints in reviews. Recommended angle: speed-to-quote." },
  { id: "obj_sales_draft_acme", priority: "high", area: "Pipeline", type: "outreach_draft", typeLabel: "Outreach Draft", department: "sales", title: "Acme Manufacturing — Outreach Email", statusLabel: "Blocked", statusKind: "attention", owner: "Jo from Sales Team Lead", nextAction: "Approve to send", dueAt: "Today", preview: "First-touch email focused on quote turnaround.", body: "Hi Dana — noticed Acme is scaling ops with the new Dayton facility. Teams at your stage often lose deals to slow quotes; Jo from helps tighten quote turnaround without adding headcount. Worth a 20-min look?" },
  { id: "obj_sales_north", priority: "low", area: "Pipeline", type: "prospect", typeLabel: "Prospect", department: "sales", title: "Northwind Logistics", statusLabel: "Active", statusKind: "in_progress", owner: "Jo from Sales IC", preview: "Gathering signals before drafting outreach.", meta: [{ label: "Stage", value: "New" }] },
  { id: "obj_sales_summary", area: "Pipeline", type: "status_report", typeLabel: "Weekly Summary", department: "sales", title: "Sales — Weekly Summary", statusLabel: "Queued", statusKind: "neutral", owner: "Jo from Sales Team Lead", preview: "4 active prospects, 2 awaiting approval." },

  // Sales › Partnerships (GTM)
  { id: "obj_part_techstars", area: "Partnerships", type: "partner", typeLabel: "Partner", department: "sales", title: "Midwest SMB Alliance", statusLabel: "Done", statusKind: "done", owner: "Jo from Partnerships Lead", preview: "Referral partner; 2 intros this quarter.", meta: [{ label: "Type", value: "Referral partner" }, { label: "Intros", value: "2 this quarter" }], body: "The Midwest SMB Alliance refers member operators to Jo from. Relationship is healthy; last check-in was 3 weeks ago." },
  { id: "obj_part_referral", priority: "medium", area: "Partnerships", type: "referral", typeLabel: "Referral", department: "sales", title: "Referral — Lakeside Fabrication", statusLabel: "Blocked", statusKind: "attention", owner: "Jo from Partnerships Lead", nextAction: "Approve intro reply", dueAt: "Today", preview: "Warm intro from Midwest SMB Alliance; reply drafted.", body: "Lakeside Fabrication was referred by the Midwest SMB Alliance. Jo from drafted a warm reply proposing a 20-minute intro call this week." },
  { id: "obj_part_checkin", area: "Partnerships", type: "checkin", typeLabel: "Relationship Check-in", department: "sales", title: "Quarterly check-in — Midwest SMB Alliance", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Partnerships Lead", nextAction: "Confirm agenda", dueAt: "Next week", preview: "Agenda drafted: referral volume, co-marketing.", body: "Quarterly relationship check-in. Jo from prepared an agenda covering referral volume, a co-marketing idea, and renewal of the partner terms." },

  // Sales › Risk (GTM)
  { id: "obj_risk_prospect", priority: "high", area: "Risk", type: "insurance_prospect", typeLabel: "Insurance Prospect", department: "sales", title: "Cedar Valley Roofing — Coverage Review", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Risk Lead", nextAction: "Approve quote package", dueAt: "Today", preview: "GL + workers' comp review; quote package prepared.", meta: [{ label: "Lines", value: "GL, Workers' comp" }, { label: "Renewal", value: "60 days" }], body: "Cedar Valley Roofing's coverage renews in 60 days. Jo from reviewed exposure, flagged a gap in general liability limits, and assembled a quote package across two carriers." },
  { id: "obj_risk_quote", priority: "high", area: "Risk", type: "quote_package", typeLabel: "Quote Package", department: "sales", title: "Cedar Valley Roofing — Quote Package", statusLabel: "Blocked", statusKind: "attention", owner: "Jo from Risk Lead", nextAction: "Approve to send", dueAt: "Today", preview: "Two-carrier comparison with recommended option.", body: "Side-by-side of two carriers with premium, limits, and deductible. Recommended option raises GL limits to close the flagged gap for +$60/mo." },
  { id: "obj_risk_assessment", area: "Risk", type: "assessment", typeLabel: "Governance Assessment", department: "sales", title: "Square One Foundry — Governance Assessment", statusLabel: "Done", statusKind: "done", owner: "Jo from Risk IC", preview: "Light governance review for a new engagement.", body: "Reviewed data handling, access, and contract terms for the Square One Foundry engagement. No blockers; one recommendation logged." },
  { id: "obj_risk_licensing", area: "Risk", type: "licensing", typeLabel: "Licensing Reminder", department: "sales", title: "Producer license renewal — Ohio", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Risk Lead", nextAction: "Review renewal", dueAt: "In 3 weeks", preview: "Ohio producer license renews in 21 days.", body: "Ohio producer license renews in 21 days. Jo from prepared the renewal checklist and continuing-education confirmation." },

  // Operations
  { id: "obj_ops_foundry", priority: "high", type: "engagement", typeLabel: "Engagement", department: "operations", title: "Square One Foundry — Onboarding", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Operations Team Lead", nextAction: "Approve kickoff checklist", dueAt: "Today", preview: "Kickoff checklist prepared and ready for approval.", meta: [{ label: "Phase", value: "Kickoff" }], body: "New engagement with Square One Foundry. Jo from assembled the kickoff checklist, drafted the welcome note, and scheduled the kickoff call." },
  { id: "obj_ops_checklist", type: "checklist", typeLabel: "Onboarding Checklist", department: "operations", title: "Square One Foundry — Kickoff Checklist", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Operations IC", nextAction: "Approve", preview: "9 kickoff items prepared.", body: "1. Confirm point of contact 2. Share welcome packet 3. Schedule kickoff 4. Collect access 5. Define success metrics …" },
  { id: "obj_ops_status", priority: "medium", type: "status_report", typeLabel: "Status Report", department: "operations", title: "Weekly Client Status — Square One Foundry", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Operations Team Lead", nextAction: "Review & send", dueAt: "Tomorrow", preview: "On track. 2 deliverables shipped, 1 in progress.", body: "This week: shipped the data-mirror setup and the intake form. In progress: reporting view. No blockers. Next week: first automated weekly report." },

  // Marketing
  { id: "obj_mkt_li", priority: "medium", type: "content_draft", typeLabel: "Content Draft", department: "marketing", title: "LinkedIn post — Friday", statusLabel: "Blocked", statusKind: "attention", owner: "Jo from Marketing Team Lead", nextAction: "Approve / schedule", dueAt: "Fri", preview: "Short post on Human + Machine work for SMBs.", body: "Most small teams don't need more software — they need work to actually get done. Jo from puts a Human + Machine workspace where your operations already live. Here's what that looks like →" },
  { id: "obj_mkt_blog", type: "content_draft", typeLabel: "Content Draft", department: "marketing", title: "Blog — \"Operating workspace, not another dashboard\"", statusLabel: "Queued", statusKind: "neutral", owner: "Jo from Marketing IC", preview: "Long-form draft ready for first edit." },
  { id: "obj_mkt_campaign", type: "campaign", typeLabel: "Campaign", department: "marketing", title: "Q3 Demand — Field Services", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Marketing Team Lead", preview: "3-week sequence targeting field-service operators.", meta: [{ label: "Channels", value: "LinkedIn, email, search" }] },

  // Finance
  { id: "obj_fin_inv_foundry", priority: "high", type: "invoice", typeLabel: "Invoice", department: "finance", title: "Invoice — Square One Foundry", statusLabel: "Blocked", statusKind: "attention", owner: "Jo from Finance Team Lead", nextAction: "Approve send", dueAt: "Net 30", preview: "$4,500 · monthly engagement fee.", meta: [{ label: "Amount", value: "$4,500" }, { label: "Terms", value: "Net 30" }], body: "Monthly engagement fee for May. Line items: operations workspace ($3,000), reporting setup ($1,500)." },
  { id: "obj_fin_inv_acme", type: "invoice", typeLabel: "Invoice", department: "finance", title: "Invoice — Acme Manufacturing", statusLabel: "Blocked", statusKind: "attention", owner: "Jo from Finance Team Lead", nextAction: "Approve send", dueAt: "Net 15", preview: "$2,800 · pilot setup.", meta: [{ label: "Amount", value: "$2,800" }] },
  { id: "obj_fin_cash", type: "status_report", typeLabel: "Cash Flow Summary", department: "finance", title: "Cash Flow — May", statusLabel: "Done", statusKind: "done", owner: "Jo from Finance IC", preview: "Inflows, outflows, runway at a glance." },

  // Workforce
  { id: "obj_wf_ram", type: "agreement", typeLabel: "Contractor Agreement", department: "workforce", title: "Ram — Contractor Agreement", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Workforce Team Lead", nextAction: "Review agreement terms", dueAt: "In 2 weeks", preview: "Annual renewal; terms unchanged.", body: "Contractor agreement for Ram (engineering). Renews in 14 days. No rate change proposed." },
  { id: "obj_wf_onb", priority: "medium", type: "checklist", typeLabel: "Onboarding Checklist", department: "workforce", title: "New Contractor — Onboarding", statusLabel: "Active", statusKind: "in_progress", owner: "Jo from Workforce IC", preview: "4 of 7 steps complete." },

  // Technology (Customer Zero)
  { id: "obj_tech_sprint", type: "sprint", typeLabel: "Sprint Record", department: "technology", title: "Sprint 0 — Stabilization", statusLabel: "Active", statusKind: "in_progress", owner: "Jo from Technology Team Lead", nextAction: "Review worktree gate", preview: "5 items active; stabilization focus.", meta: [{ label: "Items", value: "5 active" }] },
  { id: "obj_tech_deploy", type: "ticket", typeLabel: "Deployment Record", department: "technology", title: "Deploy — Commons shell", statusLabel: "Done", statusKind: "done", owner: "Jo from Technology IC", preview: "Shell shipped to preview." },
  { id: "obj_tech_health", type: "status_report", typeLabel: "Tool Health Report", department: "technology", title: "Tool Health — Weekly", statusLabel: "Done", statusKind: "done", owner: "Jo from Technology IC", preview: "All connected Tools healthy." },

  // Legal
  { id: "obj_legal_sow", priority: "high", type: "contract", typeLabel: "Contract", department: "legal", title: "Square One Foundry — SOW", statusLabel: "Queued", statusKind: "scheduled", owner: "Jo from Legal Team Lead", nextAction: "Approve final language", dueAt: "Today", preview: "Statement of work, final language for sign-off.", body: "SOW covering the operations engagement. Jo from drafted scope, deliverables, and term. Final language ready for your approval." },
];

// ─────────────────────────────── Inbox ─────────────────────────────────────
export const inboxItems: InboxItem[] = [
  { id: "inbox_001", department: "sales", title: "Approve outreach draft", objectTitle: "Acme Manufacturing", objectId: "obj_sales_draft_acme", priority: "high", dueAt: "Today", statusKind: "attention", statusLabel: "Blocked", preview: "First-touch email focused on quote turnaround." },
  { id: "inbox_002", department: "operations", title: "Review weekly client status update", objectTitle: "Square One Foundry", objectId: "obj_ops_status", priority: "medium", dueAt: "Tomorrow", statusKind: "attention", statusLabel: "Blocked", preview: "On track. 2 deliverables shipped, 1 in progress." },
  { id: "inbox_003", department: "marketing", title: "Approve LinkedIn post for Friday", objectTitle: "LinkedIn post — Friday", objectId: "obj_mkt_li", priority: "medium", dueAt: "Fri", statusKind: "attention", statusLabel: "Blocked", preview: "Short post on Human + Machine work for SMBs." },
  { id: "inbox_004", department: "finance", title: "Approve invoice for Square One Foundry", objectTitle: "Invoice — Square One Foundry", objectId: "obj_fin_inv_foundry", priority: "high", dueAt: "Today", statusKind: "attention", statusLabel: "Blocked", preview: "$4,500 · monthly engagement fee." },
  { id: "inbox_005", department: "legal", title: "Review subcontractor agreement", objectTitle: "Square One Foundry — SOW", objectId: "obj_legal_sow", priority: "high", dueAt: "Today", statusKind: "attention", statusLabel: "Blocked", preview: "Statement of work, final language for sign-off." },
  { id: "inbox_006", department: "sales", title: "Approve insurance quote package", objectTitle: "Cedar Valley Roofing — Quote Package", objectId: "obj_risk_quote", priority: "high", dueAt: "Today", statusKind: "attention", statusLabel: "Blocked", preview: "Two-carrier comparison with recommended option." },
  { id: "inbox_007", department: "sales", title: "Approve referral intro reply", objectTitle: "Referral — Lakeside Fabrication", objectId: "obj_part_referral", priority: "medium", dueAt: "Today", statusKind: "attention", statusLabel: "Blocked", preview: "Warm intro from Midwest SMB Alliance; reply drafted." },
];

// ─────────────────────────────── Queue ─────────────────────────────────────
export const queueActions: QueueAction[] = [
  { id: "act_001", title: "Draft outreach — Acme Manufacturing", department: "sales", status: "needs_approval", sourceObjectId: "obj_sales_draft_acme", updatedAt: "2m ago", step: "Blocked", nextOutput: "Sent outreach email" },
  { id: "act_002", title: "Generate weekly status report — Square One Foundry", department: "operations", status: "needs_approval", sourceObjectId: "obj_ops_status", updatedAt: "11m ago", step: "Blocked", nextOutput: "Client status report" },
  { id: "act_003", title: "Prepare invoice — Square One Foundry", department: "finance", status: "needs_approval", sourceObjectId: "obj_fin_inv_foundry", updatedAt: "18m ago", step: "Blocked", nextOutput: "Sent invoice" },
  { id: "act_004", title: "Compile OrgChart record — Sales", department: "technology", status: "running", updatedAt: "just now", step: "Compiling structure", nextOutput: "Compiler Record" },
  { id: "act_005", title: "Sync document mirror — Square One Foundry", department: "operations", status: "running", updatedAt: "1m ago", step: "Indexing documents", nextOutput: "Indexed knowledge source" },
  { id: "act_006", title: "Research Northwind Logistics", department: "sales", status: "queued", sourceObjectId: "obj_sales_north", updatedAt: "5m ago", step: "Queued", nextOutput: "Research Brief" },
  { id: "act_007", title: "Draft Q3 demand campaign", department: "marketing", status: "queued", updatedAt: "20m ago", step: "Queued", nextOutput: "Campaign plan" },
  { id: "act_008", title: "Build cash flow summary — May", department: "finance", status: "completed", sourceObjectId: "obj_fin_cash", updatedAt: "1h ago", step: "Done", nextOutput: "Cash Flow Summary" },
  { id: "act_009", title: "Index intake documents", department: "operations", status: "completed", updatedAt: "2h ago", step: "Done", nextOutput: "Indexed documents" },
  { id: "act_010", title: "Sync calendar availability", department: "operations", status: "failed", updatedAt: "3h ago", step: "Connection needed", nextOutput: "Calendar availability" },
];

// ─────────────────────────────── Recent outputs ────────────────────────────
export const outputs: OutputRecord[] = [
  { id: "out_001", title: "Acme Manufacturing — Research Brief", type: "Research Brief", department: "sales", generatedBy: "Jo from Sales IC", statusKind: "done", statusLabel: "Done", timestamp: "Today, 9:14 AM", history: ["Queued", "Active", "Done"], summary: "Profile, 3 buying signals, and a speed-to-quote angle.", sourceObjectId: "obj_sales_brief_acme" },
  { id: "out_002", title: "Weekly Client Status — Square One Foundry", type: "Status Report", department: "operations", generatedBy: "Jo from Operations Team Lead", statusKind: "attention", statusLabel: "Blocked", timestamp: "Today, 8:02 AM", history: ["Queued", "Active", "Blocked"], summary: "On track — 2 deliverables shipped, 1 in progress.", sourceObjectId: "obj_ops_status" },
  { id: "out_003", title: "LinkedIn post — Friday", type: "Content Draft", department: "marketing", generatedBy: "Jo from Marketing Team Lead", statusKind: "attention", statusLabel: "Blocked", timestamp: "Yesterday, 4:30 PM", history: ["Queued", "Blocked"], summary: "Short post on Human + Machine work for SMBs.", sourceObjectId: "obj_mkt_li" },
  { id: "out_004", title: "Invoice — Square One Foundry", type: "Invoice", department: "finance", generatedBy: "Jo from Finance Team Lead", statusKind: "attention", statusLabel: "Blocked", timestamp: "Yesterday, 2:10 PM", history: ["Queued", "Active", "Blocked"], summary: "$4,500 monthly engagement fee, 2 line items.", sourceObjectId: "obj_fin_inv_foundry" },
  { id: "out_005", title: "Square One Foundry — SOW", type: "Contract Draft", department: "legal", generatedBy: "Jo from Legal Team Lead", statusKind: "attention", statusLabel: "Blocked", timestamp: "Yesterday, 11:45 AM", history: ["Queued", "Blocked"], summary: "Scope, deliverables, and term drafted for sign-off.", sourceObjectId: "obj_legal_sow" },
  { id: "out_006", title: "Cedar Valley Roofing — Quote Package", type: "Quote Package", department: "sales", generatedBy: "Jo from Risk Lead", statusKind: "attention", statusLabel: "Blocked", timestamp: "Yesterday, 9:20 AM", history: ["Queued", "Active", "Blocked"], summary: "Two-carrier comparison; recommended option closes a GL gap.", sourceObjectId: "obj_risk_quote" },
  { id: "out_007", title: "Sprint 0 — Stabilization", type: "Sprint Record", department: "technology", generatedBy: "Jo from Technology Team Lead", statusKind: "in_progress", statusLabel: "Active", timestamp: "Mon, 10:00 AM", history: ["Queued", "Active"], summary: "5 stabilization items tracked this sprint.", sourceObjectId: "obj_tech_sprint" },
];

// ─────────────────────────────── Maestro OrgChart ──────────────────────────
export const orgChart: OrgDepartment[] = [
  { id: "sales", label: "Sales", jobs: [
    { id: "sales_tl", title: "Sales Team Lead", level: "Team Lead", subFamily: "sales_outreach", tasks: ["Draft outreach", "Assemble proposal", "Coordinate IC research"], workflowSeeds: [{ name: "First-touch outreach", outputPreview: "A researched first-touch email tailored to the prospect's signals." }, { name: "Weekly pipeline summary", outputPreview: "A short summary of active prospects and approvals needed." }], compilerRecords: ["Outreach Email", "Pipeline Summary"] },
    { id: "sales_ic", title: "Sales Researcher", level: "IC", subFamily: "sales_research", tasks: ["Gather company signals", "Build research brief", "Find contacts"], workflowSeeds: [{ name: "Research brief", outputPreview: "Company profile, signals, and a recommended angle." }], compilerRecords: ["Research Brief", "Contact List"] },
    { id: "part_lead", title: "Partnerships Lead", level: "Manager", subFamily: "gtm_partnerships", tasks: ["Manage partner relationships", "Reply to referrals", "Run quarterly check-ins"], workflowSeeds: [{ name: "Referral reply", outputPreview: "A warm reply to a partner referral proposing an intro call." }, { name: "Check-in agenda", outputPreview: "A prepared agenda for a quarterly partner check-in." }], compilerRecords: ["Referral Reply", "Check-in Agenda"] },
    { id: "risk_lead", title: "Risk Lead", level: "Manager", subFamily: "gtm_risk", tasks: ["Review coverage", "Assemble quote packages", "Track licensing"], workflowSeeds: [{ name: "Quote package", outputPreview: "A two-carrier comparison with a recommended option." }, { name: "Licensing reminder", outputPreview: "A renewal checklist for an upcoming producer license." }], compilerRecords: ["Quote Package", "Governance Assessment"] },
  ] },
  { id: "operations", label: "Operations", jobs: [
    { id: "ops_tl", title: "Operations Team Lead", level: "Team Lead", subFamily: "ops_delivery", tasks: ["Run kickoff", "Track deliverables", "Send status reports"], workflowSeeds: [{ name: "Weekly status report", outputPreview: "An on-track / at-risk summary with shipped and in-progress work." }, { name: "Kickoff checklist", outputPreview: "A prepared onboarding checklist for a new engagement." }], compilerRecords: ["Status Report", "Kickoff Checklist"] },
    { id: "ops_mgr", title: "Operations Manager", level: "Manager", subFamily: "ops_governance", tasks: ["Handle escalations", "Approve deliverables"], workflowSeeds: [{ name: "Escalation brief", outputPreview: "A summary of an issue with options and a recommendation." }], compilerRecords: ["Escalation Brief"] },
  ] },
  { id: "marketing", label: "Marketing", jobs: [
    { id: "mkt_tl", title: "Marketing Team Lead", level: "Team Lead", subFamily: "content", tasks: ["Draft content", "Plan calendar", "Run campaigns"], workflowSeeds: [{ name: "LinkedIn post", outputPreview: "A short, on-brand post ready to approve and schedule." }], compilerRecords: ["Content Draft", "Campaign Plan"] },
  ] },
  { id: "finance", label: "Finance", jobs: [
    { id: "fin_tl", title: "Finance Team Lead", level: "Team Lead", subFamily: "billing", tasks: ["Prepare invoices", "Follow up collections", "Summarize cash flow"], workflowSeeds: [{ name: "Monthly invoice", outputPreview: "A prepared invoice with line items, ready to approve and send." }], compilerRecords: ["Invoice", "Cash Flow Summary"] },
  ] },
  { id: "legal", label: "Legal", jobs: [
    { id: "legal_tl", title: "Legal Team Lead", level: "Team Lead", subFamily: "contracts", tasks: ["Draft contracts", "Review terms", "Track filings"], workflowSeeds: [{ name: "Statement of work", outputPreview: "A drafted SOW with scope, deliverables, and term." }], compilerRecords: ["Contract Draft", "Filing Record"] },
  ] },
  { id: "workforce", label: "Workforce", jobs: [
    { id: "wf_tl", title: "Workforce Team Lead", level: "Team Lead", subFamily: "people_ops", tasks: ["Onboard contractors", "Track agreements", "Coordinate the team"], workflowSeeds: [{ name: "Onboarding checklist", outputPreview: "A prepared onboarding checklist for a new contractor." }, { name: "Renewal reminder", outputPreview: "A heads-up that a contractor agreement renews soon." }], compilerRecords: ["Onboarding Checklist", "Agreement Record"] },
  ] },
  { id: "technology", label: "Technology", jobs: [
    { id: "tech_tl", title: "Technology Team Lead", level: "Team Lead", subFamily: "build", tasks: ["Plan sprints", "Track tickets", "Watch tool health"], workflowSeeds: [{ name: "Sprint record", outputPreview: "A sprint summary with active items and blockers." }, { name: "Tool health report", outputPreview: "A weekly check on connected Tools." }], compilerRecords: ["Sprint Record", "Deployment Record", "Tool Health Report"] },
    { id: "tech_ic", title: "Technology IC", level: "IC", subFamily: "delivery", tasks: ["Ship tickets", "Record deployments"], workflowSeeds: [{ name: "Deployment record", outputPreview: "A record of what shipped and when." }], compilerRecords: ["Deployment Record"] },
  ] },
  { id: "support", label: "Support", jobs: [
    { id: "sup_tl", title: "Support Team Lead", level: "Team Lead", subFamily: "customer_care", tasks: ["Triage questions", "Draft replies", "Flag escalations"], workflowSeeds: [{ name: "Reply draft", outputPreview: "A drafted reply to a customer question, ready to review." }], compilerRecords: ["Reply Draft", "Escalation Note"] },
  ] },
  { id: "accounting", label: "Accounting", jobs: [
    { id: "acct_tl", title: "Accounting Team Lead", level: "Team Lead", subFamily: "books", tasks: ["Reconcile accounts", "Prepare period close", "Categorize expenses"], workflowSeeds: [{ name: "Reconciliation summary", outputPreview: "A reconciliation summary flagging anything unmatched." }], compilerRecords: ["Reconciliation Summary", "Close Packet"] },
  ] },
];

// ─────────────────────────────── Tools ─────────────────────────────────────
export const tools: ToolConn[] = [
  { id: "drive", label: "Google Drive", status: "not_connected", note: "Not connected", why: "Lets Jo from read and organize documents you choose to share." },
  { id: "calendar", label: "Google Calendar", status: "not_connected", note: "Not connected", why: "Lets Jo from see availability and schedule kickoff calls." },
  { id: "gmail", label: "Gmail", status: "not_connected", note: "Not connected", why: "Lets Jo from prepare and send approved emails on your behalf." },
  { id: "jira", label: "Jira", status: "connected", note: "Connected for Customer Zero", why: "Tracks Technology work for the Jo from team.", lastSynced: "2h ago" },
  { id: "corpus", label: "Document workspace", status: "backend", note: "Connected by your workspace", why: "Managed for you — no action needed.", lastSynced: "live" },
];

// ─────────────────────────────── Industry matches (onboarding) ─────────────
export const industryMatches: IndustryMatch[] = [
  { id: "prof_services", label: "Professional Services", confidence: 0.92, workAreas: ["Sales", "Operations", "Finance"] },
  { id: "field_services", label: "Field Services", confidence: 0.78, workAreas: ["Operations", "Workforce", "Sales"] },
  { id: "contracting", label: "Contracting", confidence: 0.64, workAreas: ["Operations", "Finance", "Legal"] },
];

export const moreIndustries: IndustryMatch[] = [
  { id: "manufacturing", label: "Manufacturing", confidence: 0, workAreas: ["Operations", "Sales", "Finance"] },
  { id: "healthcare_services", label: "Healthcare Services", confidence: 0, workAreas: ["Operations", "Workforce", "Legal"] },
  { id: "construction", label: "Construction", confidence: 0, workAreas: ["Operations", "Finance", "Workforce"] },
];

// helpers
export const deptLabel = (id: DepartmentId) =>
  departments.find((d) => d.id === id)?.label ?? id;

export const objectsByDept = (id: DepartmentId) =>
  workObjects.filter((o) => o.department === id);

export const objectById = (id: string) =>
  workObjects.find((o) => o.id === id);

export const outputBySourceObject = (objectId: string) =>
  outputs.find((o) => o.sourceObjectId === objectId);

// Sales GTM areas (Risk + Partnerships live under Sales, not as departments).
export const salesAreas = ["Pipeline", "Partnerships", "Risk"] as const;
