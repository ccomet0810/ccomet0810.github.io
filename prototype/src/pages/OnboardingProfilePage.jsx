import React from "react";
import { useNavigate } from "react-router-dom";
import { BottomAction, OnboardingIntro, PageContent, PhoneFrame, TopBar } from "../components/Phone";
import { usePrototype } from "../state/PrototypeContext";

const genderOptions = [
  { label: "여성", value: "female" },
  { label: "남성", value: "male" },
  { label: "기타", value: "other" },
];

const jobOptions = [
  { label: "학생", value: "student" },
  { label: "직장인", value: "worker" },
  { label: "주부", value: "homemaker" },
  { label: "백수", value: "unemployed" },
];

export default function OnboardingProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = usePrototype();
  const ready =
    profile.name.trim().length > 0 &&
    profile.age.trim().length > 0 &&
    profile.gender.trim().length > 0 &&
    profile.job.trim().length > 0;

  return (
    <PhoneFrame>
      <TopBar />
      <div className="phone-screen">
        <OnboardingIntro title="시작하기 앞서 너에 대해 알고 싶어" />
        <PageContent className="onboarding-page-content">
          <div className="profile-form">
            <label className="profile-label" htmlFor="profile-name">
              이름
            </label>
            <input
              id="profile-name"
              className="profile-input"
              placeholder="이름을 입력해줘"
              value={profile.name}
              onChange={(event) => updateProfile("name", event.target.value)}
            />

            <label className="profile-label" htmlFor="profile-age">
              나이
            </label>
            <input
              id="profile-age"
              className="profile-input"
              type="number"
              min="1"
              max="120"
              placeholder="나이를 입력해줘"
              value={profile.age}
              onChange={(event) => updateProfile("age", event.target.value)}
            />

            <div className="profile-row">
              <div>
                <label className="profile-label" htmlFor="profile-gender">
                  성별
                </label>
                <select
                  id="profile-gender"
                  className="profile-select"
                  value={profile.gender}
                  onChange={(event) => updateProfile("gender", event.target.value)}
                >
                  <option value="">선택</option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="profile-label" htmlFor="profile-job">
                  직업
                </label>
                <select
                  id="profile-job"
                  className="profile-select"
                  value={profile.job}
                  onChange={(event) => updateProfile("job", event.target.value)}
                >
                  <option value="">선택</option>
                  {jobOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </PageContent>

        <BottomAction>
          <button
            type="button"
            className="primary-button"
            disabled={!ready}
            onClick={() => navigate("/onboarding/permissions")}
          >
            다음
          </button>
        </BottomAction>
      </div>
    </PhoneFrame>
  );
}
