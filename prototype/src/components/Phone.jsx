import React from "react";
import { ChevronLeft } from "lucide-react";

export function PhoneFrame({ children }) {
  return <div className="phone-frame">{children}</div>;
}

export function TopBar({ absolute = false }) {
  return (
    <div className={`top-bar ${absolute ? "absolute" : ""}`}>
      <div className="top-time">9:41</div>
      <div className="battery-wrap">
        <div className="battery-box">
          <div className="battery-fill" />
        </div>
        <div className="battery-cap" />
      </div>
    </div>
  );
}

export function BottomAction({ children }) {
  return <div className="bottom-action">{children}</div>;
}

export function IosBackButton({ onClick }) {
  return (
    <button type="button" className="ios-back-button" onClick={onClick}>
      <ChevronLeft size={18} />
    </button>
  );
}

export function PageHeader({ title, onBack, className = "" }) {
  const classes = ["page-header-block", className].filter(Boolean).join(" ");
  const hasBackButton = typeof onBack === "function";

  return (
    <header className={classes}>
      <div className={`page-header-row ${hasBackButton ? "with-leading" : "without-leading"}`}>
        {hasBackButton ? (
          <div className="page-header-leading">
            <IosBackButton onClick={onBack} />
          </div>
        ) : null}

        <div className="page-header-text">
          <div className="page-header-title page-title compact">{title}</div>
        </div>
      </div>
    </header>
  );
}

export function PageContent({ children, className = "" }) {
  const classes = ["page-content", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}

export function OnboardingIntro({ title, className = "" }) {
  const classes = ["onboarding-intro", className].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      <div className="onboarding-intro-title page-title compact">{title}</div>
    </div>
  );
}
