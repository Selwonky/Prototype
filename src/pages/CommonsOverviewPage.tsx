import { Link } from "react-router-dom";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jofrom/design-system/ui";
import { GridPageShell } from "@jofrom/design-system/shells";
import { ButtonLink, PageHeader, Section } from "@/components/primitives";
import { commonsOverview, joFunctions } from "@/lib/jo-functions";
import { departmentRailStyle } from "@/lib/department-theme";

export function CommonsOverviewPage() {
  return (
    <>
      <PageHeader
        title={commonsOverview.name}
        description={commonsOverview.summary}
        actions={<ButtonLink to="/functions" variant="outline">View 9 workspaces</ButtonLink>}
      />

      <Section title="Object-oriented workspace">
        <Card>
          <CardContent className="pt-5">
            <p className="text-theme-sm leading-6 text-gray-700 dark:text-gray-300">{commonsOverview.ormMeaning}</p>
          </CardContent>
        </Card>
      </Section>

      <GridPageShell columns={4} title="Commons objects">
        {commonsOverview.objects.map((object) => (
          <Card className="p-4" key={object}>
            <p className="text-theme-sm font-medium text-gray-900 dark:text-white">{object}</p>
            <p className="mt-2 text-theme-xs text-gray-500 dark:text-gray-400">Shared object available across departments.</p>
          </Card>
        ))}
      </GridPageShell>

      <Section title="Interconnectivity">
        <Card>
          <CardHeader>
            <CardTitle>How Commons connects work</CardTitle>
            <CardDescription>{commonsOverview.interconnectivity}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {joFunctions.map((fn) => {
              return (
                <Link
                  className="rounded-lg border p-3 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                  key={fn.id}
                  style={departmentRailStyle(fn.id)}
                  to={`/functions/${fn.id}`}
                >
                  <p className="text-theme-sm font-medium text-gray-900 dark:text-white">{fn.name}</p>
                  <Badge className="mt-2" color="neutral" size="sm" variant="outline">{fn.objects.length} objects</Badge>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
