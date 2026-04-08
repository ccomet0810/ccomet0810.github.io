import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { SectionBlock } from "./Common";

function routeClass({ isActive }) {
  return `route-pill ${isActive ? "active" : ""}`;
}

function subRouteClass({ isActive }) {
  return `route-pill route-pill-sub ${isActive ? "active" : ""}`;
}

const onboardingRoutes = [
  { to: "/onboarding/welcome", label: "onboarding/welcome" },
  { to: "/onboarding/encourage", label: "onboarding/encourage" },
  { to: "/onboarding/profile", label: "onboarding/profile" },
  { to: "/onboarding/permissions", label: "onboarding/permissions" },
  { to: "/onboarding/apps", label: "onboarding/apps" },
  { to: "/onboarding/finish", label: "onboarding/finish" },
];

export default function AppLayout() {
  const location = useLocation();
  const inOnboarding = location.pathname.startsWith("/onboarding");
  const [showLayoutGuides, setShowLayoutGuides] = useState(false);

  return (
    <div className={`app-shell ${showLayoutGuides ? "layout-guides-on" : ""}`}>
      <div className="main-grid">
        <aside className="side-panel">
          {inOnboarding ? (
            <SectionBlock title="온보딩 화면 흐름">
              <div className="info-stack">
                <div className="info-card">1-1. 문구: 안녕! / 캐릭터 연출: 손 흔들기 (자동 전환)</div>
                <div className="info-card">1-2. 문구: 여기까지 온 것만으로도 좋은 시작이야 / 캐릭터 연출: 엄지척 (자동 전환)</div>
                <div className="info-card">3. 프로필 입력(이름/나이/성별/직업) / 캐릭터 연출: 궁금한 표정 + 직업별 외형 변화</div>
                <div className="info-card">4. 권한 허용 카드 4종 / 캐릭터 연출: 부탁하는 표정과 부드러운 모션</div>
                <div className="info-card">5. 앱 검색 + 다중 선택 / 캐릭터 연출: 기본·중립 표정</div>
                <div className="info-card">6. 준비 완료 + 시작하기 / 캐릭터 연출: 아자! 힘찬 포즈</div>
              </div>
            </SectionBlock>
          ) : location.pathname.startsWith("/main/settings") ? (
            <SectionBlock title="설정 화면 흐름">
              <div className="info-stack">
                <div className="info-card">1. 앱 진입 시 제한 앱 상태 화면이 먼저 보임</div>
                <div className="info-card">2. 제한하고 싶은 앱을 눌러 상세 설정으로 이동</div>
                <div className="info-card">3. 잠금 시간대 설정</div>
                <div className="info-card">4. 시간대 추가로 다른 구간도 등록</div>
              </div>
            </SectionBlock>
          ) : (
            <SectionBlock title="개입 화면 흐름">
              <div className="info-stack">
                <div className="info-card">1. 홈 화면에서 설정한 제한 앱 클릭</div>
                <div className="info-card">2. 해당 앱 화면이 열린 상태로 전환</div>
                <div className="info-card">3. 반투명 오버레이가 덮이며 왜 켰는지 질문</div>
                <div className="info-card">4. 이유 입력 또는 빠른 선택 가능</div>
              </div>
            </SectionBlock>
          )}
        </aside>

        <section className="phone-stage">
          <Outlet />
        </section>
      </div>

      <div className="bottom-route-strip">
        <NavLink to="/onboarding/welcome" className={routeClass}>
          온보딩
        </NavLink>
        <NavLink to="/main/settings" className={routeClass}>
          설정 화면
        </NavLink>
        <NavLink to="/main/intervention" className={routeClass}>
          개입 예시
        </NavLink>
      </div>

      <div className="bottom-route-strip bottom-route-substrip">
        {onboardingRoutes.map((route) => (
          <NavLink key={route.to} to={route.to} className={subRouteClass}>
            {route.label}
          </NavLink>
        ))}
      </div>

      <div className="bottom-route-strip">
        <button
          type="button"
          className={`route-pill guide-toggle-button ${showLayoutGuides ? "active" : ""}`}
          onClick={() => setShowLayoutGuides((current) => !current)}
        >
          {showLayoutGuides ? "여백/경계 가이드 숨기기" : "여백/경계 가이드 보기"}
        </button>
      </div>
    </div>
  );
}
