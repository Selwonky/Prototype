import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { CommonsProvider } from "@/lib/store";
import { CommonsShell } from "@/components/CommonsShell";
import { HomePage } from "@/pages/HomePage";
import { InboxPage } from "@/pages/InboxPage";
import { QueuePage } from "@/pages/QueuePage";
import { RecentPage } from "@/pages/RecentPage";
import { ObjectsPage } from "@/pages/ObjectsPage";
import { ObjectDetailPage } from "@/pages/ObjectDetailPage";

const WelcomePage = lazy(() => import("@/pages/WelcomePage").then(m => ({ default: m.WelcomePage })));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage").then(m => ({ default: m.OnboardingPage })));
const DepartmentPage = lazy(() => import("@/pages/DepartmentPage").then(m => ({ default: m.DepartmentPage })));
const OrgChartPage = lazy(() => import("@/pages/OrgChartPage").then(m => ({ default: m.OrgChartPage })));
const SettingsPage = lazy(() => import("@/pages/SettingsPage").then(m => ({ default: m.SettingsPage })));
const TemplatesPage = lazy(() => import("@/pages/TemplatesPage").then(m => ({ default: m.TemplatesPage })));
const TemplateDetailPage = lazy(() => import("@/pages/TemplateDetailPage").then(m => ({ default: m.TemplateDetailPage })));

export default function App() {
  return (
    <CommonsProvider>
      <Toaster position="bottom-right" richColors closeButton />
      <BrowserRouter>
        <Suspense fallback={null}>
        <Routes>
          {/* Entry points (no shell). */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Every workspace page lives at /{page} under the Commons shell. */}
          <Route element={<CommonsShell />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/recent" element={<RecentPage />} />
            <Route path="/orgchart" element={<OrgChartPage />} />
            <Route path="/objects/detail/:id" element={<ObjectDetailPage />} />
            <Route path="/objects/:type" element={<ObjectsPage />} />
            <Route path="/departments/:dept" element={<DepartmentPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/templates/:slug" element={<TemplateDetailPage />} />
            <Route path="/settings/:setting" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </CommonsProvider>
  );
}
