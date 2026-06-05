import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ClientAccountDashboardTemplateView, getClientAccountDashboardTemplate } from "@jofrom/design-system/templates";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@jofrom/design-system/ui";
import { ButtonLink } from "@/components/primitives";
import { joFunctions } from "@/lib/jo-functions";

export function TemplateDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const template = slug ? getClientAccountDashboardTemplate(slug) : undefined;

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <ButtonLink to="/templates" variant="outline">Back to templates</ButtonLink>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Add to</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-56">
            <DropdownMenuLabel>Choose function workspace</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {joFunctions.map((fn) => (
              <DropdownMenuItem key={fn.id} onSelect={() => navigate(`/departments/${fn.id}`)}>
                {fn.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ClientAccountDashboardTemplateView template={template} />
    </>
  );
}
