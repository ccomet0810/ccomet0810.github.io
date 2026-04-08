import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { PrototypeProvider } from "./state/PrototypeContext";
import OnboardingWelcomePage from "./pages/OnboardingWelcomePage";
import OnboardingEncouragePage from "./pages/OnboardingEncouragePage";
import OnboardingProfilePage from "./pages/OnboardingProfilePage";
import OnboardingPermissionsPage from "./pages/OnboardingPermissionsPage";
import OnboardingAppsPage from "./pages/OnboardingAppsPage";
import OnboardingFinishPage from "./pages/OnboardingFinishPage";
import MainSettingsPage from "./pages/MainSettingsPage";
import MainSettingsDetailPage from "./pages/MainSettingsDetailPage";
import MainInterventionPage from "./pages/MainInterventionPage";
import "./styles.css";

const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/onboarding/welcome" replace /> },
      { path: "onboarding/welcome", element: <OnboardingWelcomePage /> },
      { path: "onboarding/encourage", element: <OnboardingEncouragePage /> },
      { path: "onboarding/profile", element: <OnboardingProfilePage /> },
      { path: "onboarding/permissions", element: <OnboardingPermissionsPage /> },
      { path: "onboarding/apps", element: <OnboardingAppsPage /> },
      { path: "onboarding/finish", element: <OnboardingFinishPage /> },
      { path: "main/settings", element: <MainSettingsPage /> },
      { path: "main/settings/detail/:appName", element: <MainSettingsDetailPage /> },
      { path: "main/intervention", element: <MainInterventionPage /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrototypeProvider>
      <RouterProvider router={router} />
    </PrototypeProvider>
  </React.StrictMode>
);
