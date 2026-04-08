import React, { useEffect } from "react";
import { Bell, CalendarDays, Check, Layers, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionBlock } from "../components/Common";
import { BottomAction, OnboardingIntro, PageContent, PhoneFrame, TopBar } from "../components/Phone";
import { usePrototype } from "../state/PrototypeContext";

const REQUIRED_KEYS = ["usage", "overlay"];

const permissionItems = [
  {
    key: "usage",
    title: "사용 정보 접근",
    body: "앱 사용 패턴을 보고 개입 시점을 판단해야 해.",
    required: true,
    icon: Shield,
  },
  {
    key: "overlay",
    title: "다른 앱 위에 표시",
    body: "실행 중인 앱 위에 멈춤 메시지를 띄워야 해.",
    required: true,
    icon: Layers,
  },
  {
    key: "calendar",
    title: "캘린더",
    body: "일정을 보고 상황에 맞게 조절해줄게.",
    required: false,
    icon: CalendarDays,
  },
  {
    key: "notifications",
    title: "알림",
    body: "중요한 이벤트나 시간을 알림으로 알려줄게.",
    required: false,
    icon: Bell,
  },
];

export default function OnboardingPermissionsPage() {
  const navigate = useNavigate();
  const { permissions, grantPermission, resetPermissions } = usePrototype();
  const allRequiredAllowed = REQUIRED_KEYS.every((key) => permissions[key]);
  const requiredItems = permissionItems.filter((item) => item.required);
  const optionalItems = permissionItems.filter((item) => !item.required);

  useEffect(() => {
    resetPermissions();
  }, [resetPermissions]);

  const renderPermissionCard = (item) => {
    const Icon = item.icon;
    const enabled = permissions[item.key];

    return (
      <div key={item.key} className={`surface-card permission-allow-card ${enabled ? "card-active" : ""}`}>
        <div className="permission-card-main">
          <div className="icon-badge">
            <Icon size={16} />
          </div>
          <div className="permission-copy">
            <div className="row-title no-margin">{item.title}</div>
            <div className="row-meta">{item.body}</div>
          </div>
        </div>

        <button
          type="button"
          className={`permission-check ${enabled ? "checked" : ""}`}
          onClick={() => grantPermission(item.key)}
          aria-label={`${item.title} ${enabled ? "허용 완료" : "허용"}`}
          aria-pressed={enabled}
        >
          {enabled ? <Check size={12} /> : null}
        </button>
      </div>
    );
  };

  return (
    <PhoneFrame>
      <TopBar />
      <div className="phone-screen">
        <OnboardingIntro title="도움을 위해 몇 가지 권한을 허용해줘" />
        <PageContent className="onboarding-page-content">
          <SectionBlock title="꼭 필요한 권한" className="permission-section">
            <div className="stack-gap permission-stack">{requiredItems.map(renderPermissionCard)}</div>
          </SectionBlock>

          <SectionBlock title="잘 도와주는 권한" className="permission-section">
            <div className="stack-gap permission-stack">{optionalItems.map(renderPermissionCard)}</div>
          </SectionBlock>
        </PageContent>

        <BottomAction>
          <button
            type="button"
            className="primary-button"
            disabled={!allRequiredAllowed}
            onClick={() => navigate("/onboarding/apps")}
          >
            다음
          </button>
        </BottomAction>
      </div>
    </PhoneFrame>
  );
}
