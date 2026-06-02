import { Link } from "react-router-dom";
import { clientAccountDashboardTemplates } from "@jofrom/design-system/templates";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jofrom/design-system/ui";
import { GridPageShell } from "@jofrom/design-system/shells";
import { ButtonLink, PageHeader } from "@/components/primitives";

export function TemplatesPage() {
  return (
    <>
      <PageHeader
        title="Templates"
        description={`${clientAccountDashboardTemplates.length} reusable dashboard templates from the Jofrom design system.`}
        actions={<ButtonLink to="/home" variant="outline">Home</ButtonLink>}
      />

      <GridPageShell columns={3} title="">
        {clientAccountDashboardTemplates.map((template) => (
          <Card className="p-0" key={template.slug}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
                <Badge color="neutral" size="sm">{String(template.id).padStart(3, "0")}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge color="brand" variant="outline">{template.segment}</Badge>
                <Badge color="success" variant="outline">{template.metrics[0].value} health</Badge>
              </div>
              <Link
                className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-control-border bg-white px-4 py-2 text-theme-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                to={`/templates/${template.slug}`}
              >
                Open template
              </Link>
            </CardContent>
          </Card>
        ))}
      </GridPageShell>
    </>
  );
}
