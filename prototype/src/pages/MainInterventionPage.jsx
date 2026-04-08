import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { AppIcon } from "../components/Common";
import { PageHeader, PhoneFrame, TopBar } from "../components/Phone";
import { usePrototype } from "../state/PrototypeContext";

const allApps = [
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

export default function MainInterventionPage() {
  const { appsToConfigure } = usePrototype();
  const [openedApp, setOpenedApp] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [reason, setReason] = useState("");

  const homeApps = useMemo(() => {
    return [...appsToConfigure, ...allApps.filter((app) => !appsToConfigure.includes(app))].slice(0, 8);
  }, [appsToConfigure]);

  const openApp = (app) => {
    setOpenedApp(app);
    setOverlayOpen(appsToConfigure.includes(app));
    setReason("");
  };

  if (openedApp) {
    return (
      <PhoneFrame>
        <div className="app-preview">
          <TopBar />
          <PageHeader title={openedApp} onBack={() => setOpenedApp(null)} className="app-preview-header" />

          <div className="app-content app-content-empty" />

          {overlayOpen && appsToConfigure.includes(openedApp) && (
            <div className="overlay">
              <div className="overlay-card">
                <div className="overlay-header">
                  <div>
                    <div className="overlay-title">왜 켰어?</div>
                    <div className="overlay-copy">지금 {openedApp}을 연 이유를 짧게 적어줘.</div>
                  </div>
                  <button type="button" className="icon-button" onClick={() => setOverlayOpen(false)}>
                    <X size={16} />
                  </button>
                </div>

                <div className="overlay-input-box">
                  <textarea
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="예: 습관적으로 눌렀어 / 확인하려고 / 그냥 심심해서"
                  />
                </div>

                <div className="chip-wrap">
                  {["습관적으로 눌렀어", "DM 확인하려고", "새 게시물 보려고", "심심해서"].map((item) => (
                    <button key={item} type="button" className="chip-button" onClick={() => setReason(item)}>
                      {item}
                    </button>
                  ))}
                </div>

                <button type="button" className="primary-button" disabled={!reason.trim()}>
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="home-screen">
        <TopBar absolute />
        <div className="home-grid">
          {homeApps.map((app) => (
            <AppIcon key={app} label={app} active={appsToConfigure.includes(app)} onClick={() => openApp(app)} />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
