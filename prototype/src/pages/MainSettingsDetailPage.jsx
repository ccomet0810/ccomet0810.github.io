import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScheduleRangeEditor, ScheduleTimeline } from "../components/Common";
import { BottomAction, PageContent, PageHeader, PhoneFrame, TopBar } from "../components/Phone";
import { usePrototype } from "../state/PrototypeContext";

export default function MainSettingsDetailPage() {
  const navigate = useNavigate();
  const { appName = "Instagram" } = useParams();
  const decodedAppName = decodeURIComponent(appName);
  const { scheduleMap, ensureAppSchedule, updateRange, addRange, removeRange } = usePrototype();

  useEffect(() => {
    ensureAppSchedule(decodedAppName);
  }, [decodedAppName, ensureAppSchedule]);

  const ranges = scheduleMap[decodedAppName] ?? [];

  return (
    <PhoneFrame>
      <TopBar />
      <div className="phone-screen">
        <PageHeader title={`${decodedAppName} 시간 설정`} onBack={() => navigate("/main/settings")} />

        <PageContent className="settings-detail-scroll">
          <ScheduleTimeline ranges={ranges} />

          <div className="stack-gap settings-range-stack">
            {ranges.map((range, index) => (
              <ScheduleRangeEditor
                key={range.id}
                label={`시간대 ${index + 1}`}
                range={range}
                onChange={(field, value) => updateRange(decodedAppName, range.id, field, value)}
                onRemove={() => removeRange(decodedAppName, range.id)}
              />
            ))}
          </div>

          <button
            type="button"
            className="ghost-button settings-add-button"
            onClick={() => addRange(decodedAppName)}
          >
            <Plus size={16} />
            시간대 추가
          </button>
        </PageContent>

        <BottomAction>
          <button type="button" className="primary-button" onClick={() => navigate("/main/settings")}>
            저장
          </button>
        </BottomAction>
      </div>
    </PhoneFrame>
  );
}
