import { Link } from "react-router-dom";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jofrom/design-system/ui";
import { GridPageShell } from "@jofrom/design-system/shells";
import { PageHeader, Section } from "@/components/primitives";
import { commonsOverview, joFunctions } from "@/lib/jo-functions";

export function FunctionMapPage() {
  return (
    <>
      <PageHeader
        title="Jo from Functions"
        description="The 9 function workspaces and the Commons object layer that connects them."
      />

      <Section title="Commons layer">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle>{commonsOverview.name}</CardTitle>
                <CardDescription>{commonsOverview.summary}</CardDescription>
              </div>
              <Link className="text-theme-sm font-medium text-brand-600 hover:underline dark:text-brand-400" to="/commons">Open Commons</Link>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {commonsOverview.objects.slice(0, 8).map((object) => <Badge color="neutral" key={object} variant="outline">{object}</Badge>)}
          </CardContent>
        </Card>
      </Section>

      <GridPageShell columns={3} title="9 Jo from functions">
        {joFunctions.map((fn) => (
          <Card className="grid min-h-64 grid-rows-[1fr_auto] p-0" key={fn.id}>
            <div className="min-h-0">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle>{fn.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{fn.summary}</CardDescription>
                  </div>
                  <Badge color="brand" size="sm" variant="outline">{fn.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {fn.objects.slice(0, 2).map((object) => <Badge color="neutral" key={object}>{object}</Badge>)}
              </CardContent>
            </div>
            <div className="flex items-center border-t border-gray-200 p-4 dark:border-gray-800">
              <Link className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-control-border bg-white px-4 py-2 text-theme-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" to={`/functions/${fn.id}`}>
                Open function page
              </Link>
            </div>
          </Card>
        ))}
      </GridPageShell>
    </>
  );
}
