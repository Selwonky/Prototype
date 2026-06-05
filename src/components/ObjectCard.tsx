import {
  Workflow, Radio, Briefcase, CircleCheck, Zap, FileText, StickyNote,
  Calendar, Megaphone, Wallet, FileSignature, Boxes, Search, Mail,
  Handshake, Users, Shield, ShieldCheck, FileBadge, BadgeCheck, type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@jofrom/design-system/ui";
import { Avatar } from "@jofrom/design-system/ui";
import { StatusBadge } from "./StatusBadge";
import { ButtonLink } from "./primitives";
import { getInitials } from "@/lib/utils";
import { deptLabel, type ObjectType, type WorkObject } from "@/lib/prototype-data";
import { departmentSurfaceStyle } from "@jofrom/design-system/data-display";

const typeGlyph: Partial<Record<ObjectType, LucideIcon>> = {
  workflow: Workflow, signal: Radio, engagement: Briefcase, task: CircleCheck,
  outreach_draft: Mail, prospect: Search, research_brief: FileText, proposal: FileText,
  checklist: CircleCheck, status_report: FileText, content_draft: FileText,
  campaign: Megaphone, invoice: Wallet, agreement: FileSignature, sprint: Boxes,
  ticket: Zap, contract: FileSignature, note: StickyNote,
  partner: Handshake, referral: Users, checkin: Handshake,
  insurance_prospect: Shield, quote_package: ShieldCheck, assessment: BadgeCheck,
  licensing: FileBadge,
};

export function ObjectCard({ obj }: { obj: WorkObject }) {
  const Glyph = typeGlyph[obj.type] ?? Calendar;
  const priorityDot =
    obj.priority === "high" ? "bg-error-500" : obj.priority === "medium" ? "bg-warning-500" : "bg-gray-300 dark:bg-gray-600";
  const priorityLabel =
    obj.priority === "high" ? "High priority" : obj.priority === "medium" ? "Medium priority" : "Low priority";

  return (
    <Card className="grid h-80 min-w-0 grid-rows-[1fr_4.5rem] overflow-hidden transition-shadow hover:shadow-theme-md" style={departmentSurfaceStyle(obj.department)}>
      <div className="min-h-0 flex-1 overflow-hidden">
        <CardHeader className="space-y-2">
          <div className="flex min-w-0 items-start gap-2">
            {obj.priority && (
              <span className={`mt-1 size-2 shrink-0 rounded-full ${priorityDot}`} role="img" aria-label={priorityLabel} title={priorityLabel} />
            )}
            <Glyph className="mt-0.5 size-4 shrink-0 text-gray-400" aria-hidden />
            <span className="min-w-0 flex-1 truncate text-base font-semibold text-gray-900 dark:text-white">{obj.title}</span>
            <StatusBadge kind={obj.statusKind} label={obj.statusLabel} />
          </div>
          <p className="line-clamp-2 text-theme-sm text-gray-500 dark:text-gray-400">{obj.preview}</p>
        </CardHeader>

      {(obj.meta?.length || obj.nextAction || obj.dueAt) && (
        <CardContent className="space-y-1.5 text-theme-sm">
          {obj.meta?.slice(0, 3).map((m) => (
            <div key={m.label} className="flex justify-between gap-3">
              <span className="shrink-0 text-gray-500 dark:text-gray-400">{m.label}</span>
              <span className="truncate text-right font-medium text-gray-800 dark:text-gray-100">{m.value}</span>
            </div>
          ))}
          {obj.nextAction && (
            <div className="flex justify-between gap-3">
              <span className="shrink-0 text-gray-500 dark:text-gray-400">Next action</span>
              <span className="truncate text-right font-medium text-gray-800 dark:text-gray-100">{obj.nextAction}</span>
            </div>
          )}
          {obj.dueAt && (
            <div className="flex justify-between gap-3">
              <span className="shrink-0 text-gray-500 dark:text-gray-400">Due</span>
              <span className="truncate text-right font-medium text-gray-800 dark:text-gray-100">{obj.dueAt}</span>
            </div>
          )}
        </CardContent>
      )}
      </div>

      <CardFooter className="h-full min-h-0 overflow-hidden gap-2 text-theme-sm text-gray-500 dark:text-gray-400">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Avatar size="xs" fallback={getInitials(obj.owner.replace("Jo from ", ""))} />
          <span className="truncate">{obj.owner}</span>
          <span className="shrink-0 text-gray-300 dark:text-gray-600">·</span>
          <span className="shrink-0">{deptLabel(obj.department)}</span>
        </div>
        <ButtonLink to={`/objects/detail/${obj.id}`} variant="link" size="sm" className="shrink-0">
          Open →
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
