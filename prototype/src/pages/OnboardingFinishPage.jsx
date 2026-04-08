import React from "react";
import { useNavigate } from "react-router-dom";
import { BottomAction, PhoneFrame, TopBar } from "../components/Phone";

export default function OnboardingFinishPage() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <TopBar />
      <div className="phone-screen">
        <div className="center-stack">
          <div className="page-title compact">준비 끝! 이제 같이 조금씩 절제해보자.</div>
        </div>

        <BottomAction>
          <button type="button" className="primary-button" onClick={() => navigate("/main/settings")}>
            시작하기
          </button>
        </BottomAction>
      </div>
    </PhoneFrame>
  );
}
