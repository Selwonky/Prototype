import { Navigate, useParams } from "react-router-dom";
import { ClientAccountDashboardTemplateView, getClientAccountDashboardTemplate } from "@jofrom/design-system/templates";
import { ButtonLink } from "@/components/primitives";

export function TemplateDetailPage() {
  const { slug } = useParams();
  const template = slug ? getClientAccountDashboardTemplate(slug) : undefined;

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  return (
    <>
      <div className="mb-6">
        <ButtonLink to="/templates" variant="outline">Back to templates</ButtonLink>
      </div>
      <ClientAccountDashboardTemplateView template={template} />
    </>
  );
}
