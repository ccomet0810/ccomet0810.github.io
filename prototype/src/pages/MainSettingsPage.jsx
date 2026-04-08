import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { SettingsAppRow } from "../components/Common";
import { PageContent, PageHeader, PhoneFrame, TopBar } from "../components/Phone";
import { usePrototype } from "../state/PrototypeContext";

export default function MainSettingsPage() {
  const navigate = useNavigate();
  const { appsToConfigure, scheduleMap, ensureAppSchedule } = usePrototype();

  const openApp = (app) => {
    ensureAppSchedule(app);
    navigate(`/main/settings/detail/${encodeURIComponent(app)}`);
  };

  return (
    <PhoneFrame>
      <TopBar />
      <div className="phone-screen">
        <PageHeader title="제한 앱 설정" />

        <PageContent className="settings-page-content">
          <button
            type="button"
            className="ghost-button settings-add-app-button"
            onClick={() => navigate("/onboarding/apps?return=main-settings")}
          >
            <Plus size={16} />
            제한 앱 추가
          </button>

          <div className="stack-gap">
            {appsToConfigure.map((app) => (
              <SettingsAppRow
                key={app}
                app={app}
                ranges={scheduleMap[app] ?? []}
                onOpen={() => openApp(app)}
              />
            ))}
          </div>
        </PageContent>
      </div>
    </PhoneFrame>
  );
}
