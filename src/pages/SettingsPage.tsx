import { useParams } from "react-router-dom";
import { Shield, CreditCard, Compass, Plug, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button } from "@jofrom/design-system/ui";
import { IntegrationCard } from "@jofrom/design-system/data-display";
import { PageHeader, EmptyState } from "@/components/primitives";
import { tools } from "@/lib/prototype-data";
import { useCommons } from "@/lib/use-commons";

function ToolsSettings() {
  const { toolState, toggleTool } = useCommons();
  return (
    <>
      <PageHeader
        title="Tools"
        description="Connect Drive, Calendar, or Gmail when you're ready. Jo from can still prepare work inside The Commons."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tools.map((t) => {
          const status = toolState[t.id];
          const connected = status === "connected";
          const backend = status === "backend";
          const sync = connected ? ` · Synced ${t.lastSynced ?? "just now"}` : backend ? " · Syncs continuously" : "";
          return (
            <IntegrationCard
              key={t.id}
              icon={<Plug className="size-5" />}
              title={t.label}
              description={`${t.why}${sync}`}
              status={connected ? t.note : backend ? t.note : "Not connected"}
              statusColor={connected ? "success" : "neutral"}
              actions={
                backend ? undefined : (
                  <Button size="sm" variant={connected ? "outline" : "default"} onClick={() => toggleTool(t.id)}>
                    {connected ? "Disconnect" : "Connect"}
                  </Button>
                )
              }
            />
          );
        })}
      </div>
      <p className="mt-6 text-theme-xs text-gray-500 dark:text-gray-400">
        Connections are local to this prototype. Security &amp; Access settings control who can connect Tools.
      </p>
    </>
  );
}

export function SettingsPage() {
  const { setting } = useParams<{ setting: string }>();

  if (setting === "tools") return <ToolsSettings />;

  if (setting === "onboarding") {
    return (
      <>
        <PageHeader title="Onboarding" description="Your company profile and the work areas it unlocked." />
        <EmptyState
          icon={Compass}
          title="Company profile complete"
          description="Industries: Professional Services (primary), Field Services. Work areas unlocked: Sales, Operations, Finance, Workforce. Re-run onboarding to extend your profile."
          action={<Button variant="outline">Re-run onboarding</Button>}
        />
      </>
    );
  }

  if (setting === "security") {
    return (
      <>
        <PageHeader title="Security & Access" description="Who can review, approve, and connect Tools in your workspace." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Shield className="size-4 text-gray-400" /> Access mode</CardTitle>
              <CardDescription>Customer Zero — single-user.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-theme-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-800 dark:text-gray-100">Jeremy Knowles</span>
                <Badge variant="light" color="success" startIcon={<Check className="size-3" />}>Full access · Outcome Owner</Badge>
              </div>
              <p className="text-gray-500 dark:text-gray-400">You can review, approve, edit, reject, and connect Tools.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team access</CardTitle>
              <CardDescription>Inviting teammates with scoped access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-theme-sm">
              <Badge variant="outline" color="neutral">Coming later</Badge>
              <p className="text-gray-500 dark:text-gray-400">Multi-user access is deferred for the Customer Zero prototype — no enterprise controls are live yet.</p>
            </CardContent>
          </Card>
        </div>
        <p className="mt-6 text-theme-xs text-gray-500 dark:text-gray-400">Prototype: access state is illustrative. No sign-in, sessions, or credentials are stored.</p>
      </>
    );
  }

  // billing
  return (
    <>
      <PageHeader title="Billing" description="Plan and access — a commercial placeholder for the prototype." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><CreditCard className="size-4 text-gray-400" /> Current plan</CardTitle>
            <CardDescription>Customer Zero</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-theme-sm">
            <Badge variant="light" color="neutral">Internal · not billed</Badge>
            <p className="text-gray-500 dark:text-gray-400">The commercial version will show plan tier, usage, and invoices here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment</CardTitle>
            <CardDescription>No payment processing in the prototype.</CardDescription>
          </CardHeader>
          <CardContent className="text-theme-sm text-gray-500 dark:text-gray-400">
            Billing and entitlements are part of commercial hardening — intentionally not wired here.
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>Manage plan (coming later)</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
