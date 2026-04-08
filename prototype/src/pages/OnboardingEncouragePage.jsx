import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneFrame, TopBar } from "../components/Phone";

export default function OnboardingEncouragePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/onboarding/profile", { replace: true });
    }, 1800);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <PhoneFrame>
      <TopBar />
      <div className="phone-screen">
        <div className="center-stack">
          <div className="page-title compact">
            절제하려고 설치했구나. 여기까지 온 것만으로도 이미 좋은 시작이야!
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
