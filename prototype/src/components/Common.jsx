import React from "react";
import { Check, ChevronRight } from "lucide-react";

export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function SectionHeader({ title, meta }) {
  return (
    <div className="section-header">
      <div className="section-header-title">{title}</div>
      {meta ? <div className="section-header-meta">{meta}</div> : null}
    </div>
  );
}

export function SectionBlock({ title, meta, children, className = "" }) {
  return (
    <section className={classNames("section-block", className)}>
      <SectionHeader title={title} meta={meta} />
      <div className="section-block-content">{children}</div>
    </section>
  );
}

export function PermissionCard({ title, body, enabled, icon, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={classNames("surface-card card-button", enabled && "card-active")}
    >
      <div className="permission-head">
        <div className="icon-badge">{icon}</div>
        <div className="permission-copy">
          <div className="row-title">{title}</div>
          <div className="row-meta">{body}</div>
        </div>
        <CheckBox checked={enabled} />
      </div>
    </button>
  );
}

export function CheckboxRow({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={classNames("surface-card card-button inline-between", checked && "card-active")}
    >
      <div className="row-title no-margin">{label}</div>
      <CheckBox checked={checked} />
    </button>
  );
}

export function AppRow({ name, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={classNames("list-row", checked && "card-active")}
    >
      <CheckBox checked={checked} />
      <div className="row-title no-margin">{name}</div>
    </button>
  );
}

export function SelectedAppPills({ selectedApps }) {
  if (selectedApps.length === 0) return null;

  return (
    <div className="surface-card pills-box">
      <div className="micro-label">선택된 앱</div>
      <div className="pill-wrap">
        {selectedApps.map((app) => (
          <div key={app} className="pill">
            {app}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SummaryCard({ label, value }) {
  return (
    <div className="surface-card summary-card">
      <div className="micro-label">{label}</div>
      <div className="summary-value">{value}</div>
    </div>
  );
}

export function SettingsAppRow({ app, ranges, onOpen }) {
  return (
    <button type="button" onClick={onOpen} className="settings-row">
      <div>
        <div className="row-title">{app}</div>
        <div className="row-meta">
          {ranges.length > 0 ? `${ranges.length}개 시간대 설정됨` : "시간대 없음"}
        </div>
      </div>
      <ChevronRight size={16} className="chevron-icon" />
    </button>
  );
}

export function ScheduleRangeEditor({ label, range, onChange, onRemove }) {
  return (
    <div className="surface-card range-editor">
      <div className="range-head">
        <div className="row-title no-margin">{label}</div>
        {onRemove ? (
          <button
            type="button"
            className="range-delete-button"
            onClick={onRemove}
            aria-label={`${label} 삭제`}
          >
            삭제
          </button>
        ) : null}
      </div>
      <div className="range-grid">
        <TimeField
          label={`${label} 시작 시간`}
          value={range.start}
          onChange={(value) => onChange("start", value)}
        />
        <div className="range-separator">~</div>
        <TimeField
          label={`${label} 종료 시간`}
          value={range.end}
          onChange={(value) => onChange("end", value)}
        />
      </div>
    </div>
  );
}

export function ScheduleTimeline({ ranges }) {
  const segments = ranges.flatMap(getSegments);

  return (
    <div className="surface-card timeline-box">
      <div className="row-title">잠금 시간대</div>
      <div className="timeline-track">
        {segments.map((segment, index) => {
          const left = `${(segment.start / 1440) * 100}%`;
          const width = `${((segment.end - segment.start) / 1440) * 100}%`;

          return (
            <div
              key={`${segment.start}-${segment.end}-${index}`}
              className="timeline-segment"
              style={{ left, width }}
            />
          );
        })}
      </div>
      <div className="timeline-labels">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
}

export function AppIcon({ label, active = false, onClick }) {
  return (
    <button type="button" onClick={onClick} className="app-icon">
      <div className={classNames("app-square", active && "active")}>
        {label === "Instagram" ? "IG" : label.slice(0, 2)}
      </div>
      <div className="app-label">{label}</div>
    </button>
  );
}

function CheckBox({ checked }) {
  return (
    <div className={classNames("checkbox", checked && "checked")}>
      {checked ? <Check size={12} /> : null}
    </div>
  );
}

function timeToMinutes(value) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function formatTimeLabel(value) {
  const [hourText = "00", minuteText = "00"] = (value ?? "00:00").split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return "오전 12:00";

  const period = hour >= 12 ? "오후" : "오전";
  const hour12 = hour % 12 || 12;
  return `${period} ${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function parseTimeParts(value) {
  const [hourText = "00", minuteText = "00"] = (value ?? "00:00").split(":");
  const hour24 = Number(hourText);
  const minute = Number(minuteText);
  if (Number.isNaN(hour24) || Number.isNaN(minute)) {
    return { period: "am", hour12: 12, minute: 0 };
  }

  return {
    period: hour24 >= 12 ? "pm" : "am",
    hour12: hour24 % 12 || 12,
    minute: Math.max(0, Math.min(59, minute)),
  };
}

function to24Hour(period, hour12) {
  if (period === "pm") {
    return hour12 === 12 ? 12 : hour12 + 12;
  }

  return hour12 === 12 ? 0 : hour12;
}

function buildTimeValue(period, hour12, minute) {
  const hour24 = to24Hour(period, hour12);
  return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function TimeField({ label, value, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  const parts = parseTimeParts(value);
  const minuteOptions = React.useMemo(() => {
    return Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"));
  }, []);

  React.useEffect(() => {
    if (!isOpen) return undefined;

    const onPointerDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isOpen]);

  const applyChange = (next) => {
    const nextPeriod = next.period ?? parts.period;
    const nextHour12 = next.hour12 ?? parts.hour12;
    const nextMinute = next.minute ?? parts.minute;
    onChange(buildTimeValue(nextPeriod, nextHour12, nextMinute));
  };

  return (
    <div className="time-field" ref={wrapRef}>
      <button
        type="button"
        className={`time-field-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={label}
      >
        <span className="time-field-value">{formatTimeLabel(value)}</span>
        <span className="time-field-caret">▾</span>
      </button>

      {isOpen ? (
        <div className="time-picker-popover" role="dialog" aria-label={`${label} 선택`}>
          <div className="time-picker-period">
            <button
              type="button"
              className={`time-period-button ${parts.period === "am" ? "active" : ""}`}
              onClick={() => applyChange({ period: "am" })}
            >
              오전
            </button>
            <button
              type="button"
              className={`time-period-button ${parts.period === "pm" ? "active" : ""}`}
              onClick={() => applyChange({ period: "pm" })}
            >
              오후
            </button>
          </div>

          <div className="time-picker-select-row">
            <select
              className="time-picker-select"
              value={parts.hour12}
              onChange={(event) => applyChange({ hour12: Number(event.target.value) })}
              aria-label="시 선택"
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map((hour) => (
                <option key={hour} value={hour}>
                  {String(hour).padStart(2, "0")}
                </option>
              ))}
            </select>
            <span className="time-picker-divider">:</span>
            <select
              className="time-picker-select"
              value={String(parts.minute).padStart(2, "0")}
              onChange={(event) => applyChange({ minute: Number(event.target.value) })}
              aria-label="분 선택"
            >
              {minuteOptions.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function getSegments(range) {
  const start = timeToMinutes(range.start);
  const end = timeToMinutes(range.end);
  if (Number.isNaN(start) || Number.isNaN(end)) return [];
  if (start === end) return [{ start: 0, end: 1440 }];
  if (end > start) return [{ start, end }];
  return [{ start, end: 1440 }, { start: 0, end }];
}
