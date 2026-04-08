import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppRow, SelectedAppPills } from "../components/Common";
import { BottomAction, OnboardingIntro, PageContent, PhoneFrame, TopBar } from "../components/Phone";
import { usePrototype } from "../state/PrototypeContext";

const apps = [
  "Instagram",
  "YouTube",
  "X",
  "TikTok",
  "Chrome",
  "Threads",
  "Discord",
  "Reddit",
  "Netflix",
  "KakaoTalk",
  "Safari",
  "Pinterest",
];

export default function OnboardingAppsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedApps, toggleAppSelection } = usePrototype();
  const [search, setSearch] = useState("");
  const returnTarget = searchParams.get("return");
  const nextPath = returnTarget === "main-settings" ? "/main/settings" : "/onboarding/finish";

  const filteredApps = useMemo(
    () => apps.filter((app) => app.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <PhoneFrame>
      <TopBar />
      <div className="phone-screen">
        <OnboardingIntro title="잠금할 앱을 선택해줘" />
        <PageContent className="onboarding-page-content">
          <div className="search-row">
            <Search size={16} className="search-icon" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="앱 검색"
            />
          </div>

          <SelectedAppPills selectedApps={selectedApps} />

          <div className="scroll-list">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <AppRow
                  key={app}
                  name={app}
                  checked={selectedApps.includes(app)}
                  onToggle={() => toggleAppSelection(app)}
                />
              ))
            ) : (
              <div className="empty-state">검색 결과 없음</div>
            )}
          </div>
        </PageContent>

        <BottomAction>
          <button
            type="button"
            className="primary-button"
            disabled={selectedApps.length === 0}
            onClick={() => navigate(nextPath)}
          >
            선택 완료
          </button>
        </BottomAction>
      </div>
    </PhoneFrame>
  );
}
