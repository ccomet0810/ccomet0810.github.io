import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneFrame, TopBar } from "../components/Phone";

export default function OnboardingWelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/onboarding/encourage", { replace: true });
    }, 1300);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <PhoneFrame>
      <TopBar />
      <div className="phone-screen">
        <div className="center-stack">
          <div className="page-title">안녕!</div>
        </div>
      </div>
    </PhoneFrame>
  );
}
