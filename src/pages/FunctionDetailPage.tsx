import { Link, Navigate, useParams } from "react-router-dom";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@jofrom/design-system/ui";
import { DetailPageShell, GridPageShell } from "@jofrom/design-system/shells";
import { ButtonLink, Section } from "@/components/primitives";
import { getJoFunction } from "@/lib/jo-functions";
import { departmentBadgeStyle, departmentSurfaceStyle } from "@/lib/department-theme";

export function FunctionDetailPage() {
  const { functionId } = useParams();
  const fn = getJoFunction(functionId);

  if (!fn) {
    return <Navigate to="/functions" replace />;
  }

  return (
    <DetailPageShell
      actions={<ButtonLink to={`/departments/${fn.id}`} variant="outline">Open workspace</ButtonLink>}
      backAction={<Link className="text-theme-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" to="/functions">Back to workspaces</Link>}
      description={fn.summary}
      sidebar={
        <Card>
          <CardHeader>
            <CardTitle>Connects to</CardTitle>
            <CardDescription>Related Jo from departments.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {fn.connectsTo.map((id) => {
              return <Badge key={id} style={departmentBadgeStyle(id)} variant="outline">{id}</Badge>;
            })}
          </CardContent>
        </Card>
      }
      title={fn.name}
    >
      <div className="space-y-8">
        <Section title="OOUX / ORM meaning">
          <Card>
            <CardContent className="pt-5">
              <p className="text-theme-sm leading-6 text-gray-700 dark:text-gray-300">{fn.ormMeaning}</p>
            </CardContent>
          </Card>
        </Section>

        <GridPageShell columns={3} title="Core objects">
          {fn.objects.map((object) => (
            <Card className="p-4" key={object} style={departmentSurfaceStyle(fn.id)}>
              <p className="text-theme-sm font-medium text-gray-900 dark:text-white">{object}</p>
              <p className="mt-2 text-theme-xs text-gray-500 dark:text-gray-400">Reusable object with owner, status, properties, actions, and relationships.</p>
            </Card>
          ))}
        </GridPageShell>

        <Section title="Interconnectivity">
          <Card>
            <CardContent className="pt-5">
              <p className="text-theme-sm leading-6 text-gray-700 dark:text-gray-300">{fn.interconnectivity}</p>
            </CardContent>
          </Card>
        </Section>
      </div>
    </DetailPageShell>
  );
}
