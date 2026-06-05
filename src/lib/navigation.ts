import {
  LayoutGrid, Inbox, Activity, History, Workflow, Radio, Briefcase, CircleCheck,
  Zap, Boxes, Megaphone, Users, Wallet, Server, LifeBuoy, Calculator, Workflow as Ops,
  Scale, Shield, Plug, CreditCard, Compass, TrendingUp, Network, FlaskConical, PanelsTopLeft, Waypoints,
  type LucideIcon,
} from "lucide-react";
import type { DepartmentId, ObjectType } from "./prototype-data";

export interface DeptCategory {
  value: string;
  label: string;
  types?: ObjectType[];
}

export interface NavLink {
  label: string;
  to: string;
  icon: LucideIcon;
  children?: NavLink[];
}
export interface NavGroup {
  label: string;
  items: NavLink[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Start",
    items: [
      { label: "Home", to: "/home", icon: LayoutGrid },
      { label: "Commons", to: "/commons", icon: Waypoints },
      { label: "Inbox", to: "/inbox", icon: Inbox },
      { label: "Queue", to: "/queue", icon: Activity },
      { label: "Recent", to: "/recent", icon: History },
    ],
  },
  {
    label: "Maestro",
    items: [
      { label: "OrgChart", to: "/orgchart", icon: Network },
    ],
  },
  {
    label: "Functions",
    items: [
      { label: "Overview", to: "/functions", icon: Network },
      { label: "Sales", to: "/functions/sales", icon: TrendingUp },
      { label: "Marketing", to: "/functions/marketing", icon: Megaphone },
      { label: "Workforce", to: "/functions/workforce", icon: Users },
      { label: "Finance", to: "/functions/finance", icon: Wallet },
      { label: "Technology", to: "/functions/technology", icon: Server },
      { label: "Support", to: "/functions/support", icon: LifeBuoy },
      { label: "Accounting", to: "/functions/accounting", icon: Calculator },
      { label: "Operations", to: "/functions/operations", icon: Ops },
      { label: "Legal", to: "/functions/legal", icon: Scale },
    ],
  },
  {
    label: "Objects",
    items: [
      { label: "Workflows", to: "/objects/workflow", icon: Workflow },
      { label: "Signals", to: "/objects/signal", icon: Radio },
      { label: "Jobs", to: "/objects/job", icon: Briefcase },
      { label: "Tasks", to: "/objects/task", icon: CircleCheck },
      { label: "Actions", to: "/objects/action", icon: Zap },
      { label: "Blocks", to: "/objects/block", icon: Boxes },
      { label: "Templates", to: "/templates", icon: PanelsTopLeft },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        label: "Admin / Security & Access",
        to: "/settings/security",
        icon: Shield,
        children: [
          { label: "Tools", to: "/settings/tools", icon: Plug },
          { label: "Billing", to: "/settings/billing", icon: CreditCard },
          { label: "Onboarding", to: "/settings/onboarding", icon: Compass },
          { label: "Prototype · fixture data", to: "/settings/prototype", icon: FlaskConical },
        ],
      },
    ],
  },
];

export const deptCategories: Record<DepartmentId, DeptCategory[]> = {
  sales: [
    { value: "all", label: "All" },
    { value: "pipeline", label: "Pipeline", types: ["prospect", "research_brief", "outreach_draft", "proposal", "status_report"] },
    { value: "partnerships", label: "Partnerships", types: ["partner", "referral", "checkin"] },
    { value: "risk", label: "Risk", types: ["insurance_prospect", "quote_package", "assessment", "licensing"] },
  ],
  operations: [
    { value: "all", label: "All" },
    { value: "delivery", label: "Delivery", types: ["engagement", "checklist", "status_report"] },
  ],
  marketing: [
    { value: "all", label: "All" },
    { value: "content", label: "Content", types: ["content_draft"] },
    { value: "campaigns", label: "Campaigns", types: ["campaign"] },
  ],
  finance: [
    { value: "all", label: "All" },
    { value: "billing", label: "Billing", types: ["invoice"] },
    { value: "reporting", label: "Reporting", types: ["status_report"] },
  ],
  workforce: [
    { value: "all", label: "All" },
    { value: "agreements", label: "Agreements", types: ["agreement"] },
    { value: "onboarding", label: "Onboarding", types: ["checklist"] },
  ],
  technology: [
    { value: "all", label: "All" },
    { value: "sprints", label: "Sprints", types: ["sprint"] },
    { value: "deploy", label: "Deployments", types: ["ticket"] },
    { value: "health", label: "Health", types: ["status_report"] },
  ],
  legal: [
    { value: "all", label: "All" },
    { value: "contracts", label: "Contracts", types: ["contract"] },
  ],
  support: [
    { value: "all", label: "All" },
  ],
  accounting: [
    { value: "all", label: "All" },
  ],
};

export const deptIcon: Record<DepartmentId, LucideIcon> = {
  sales: TrendingUp, marketing: Megaphone, workforce: Users, finance: Wallet,
  technology: Server, support: LifeBuoy, accounting: Calculator, operations: Ops,
  legal: Scale,
};
