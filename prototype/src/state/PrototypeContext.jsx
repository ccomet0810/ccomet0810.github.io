import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT_APPS = ["Instagram", "YouTube", "TikTok"];
const DEFAULT_PERMISSIONS = {
  calendar: false,
  overlay: false,
  notifications: false,
  usage: false,
};
const DEFAULT_PROFILE = {
  name: "",
  age: "",
  gender: "",
  job: "",
};

const PrototypeContext = createContext(null);

const initialSchedules = {
  Instagram: [
    { id: 1, start: "00:00", end: "09:00" },
    { id: 2, start: "12:00", end: "15:00" },
  ],
  YouTube: [{ id: 3, start: "23:00", end: "07:00" }],
  TikTok: [],
};

function loadState() {
  try {
    const raw = localStorage.getItem("impulse-prototype-state");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeProfile(value) {
  return {
    name: value?.name ?? "",
    age: value?.age ?? "",
    gender: value?.gender ?? "",
    job: value?.job ?? "",
  };
}

export function PrototypeProvider({ children }) {
  const saved = loadState();

  const [permissions, setPermissions] = useState({ ...DEFAULT_PERMISSIONS });
  const [profile, setProfile] = useState({
    ...DEFAULT_PROFILE,
    ...normalizeProfile(saved?.profile),
  });
  const [selectedApps, setSelectedApps] = useState(saved?.selectedApps ?? []);
  const [scheduleMap, setScheduleMap] = useState(saved?.scheduleMap ?? initialSchedules);
  const [nextRangeId, setNextRangeId] = useState(saved?.nextRangeId ?? 4);

  useEffect(() => {
    localStorage.setItem(
      "impulse-prototype-state",
      JSON.stringify({ profile, selectedApps, scheduleMap, nextRangeId })
    );
  }, [profile, selectedApps, scheduleMap, nextRangeId]);

  const resetPermissions = useCallback(() => {
    setPermissions({ ...DEFAULT_PERMISSIONS });
  }, []);

  const appsToConfigure = selectedApps.length > 0 ? selectedApps : DEFAULT_APPS;

  const value = useMemo(() => {
    const togglePermission = (key) => {
      setPermissions((current) => ({ ...current, [key]: !current[key] }));
    };

    const grantPermission = (key) => {
      setPermissions((current) => ({ ...current, [key]: true }));
    };

    const updateProfile = (field, value) => {
      setProfile((current) => ({ ...current, [field]: value }));
    };

    const toggleAppSelection = (app) => {
      setSelectedApps((current) =>
        current.includes(app) ? current.filter((item) => item !== app) : [...current, app]
      );
    };

    const ensureAppSchedule = (app) => {
      setScheduleMap((current) => {
        if (current[app]) return current;
        return { ...current, [app]: [] };
      });
    };

    const updateRange = (app, id, field, value) => {
      setScheduleMap((current) => ({
        ...current,
        [app]: (current[app] ?? []).map((range) =>
          range.id === id ? { ...range, [field]: value } : range
        ),
      }));
    };

    const addRange = (app) => {
      setScheduleMap((current) => ({
        ...current,
        [app]: [...(current[app] ?? []), { id: nextRangeId, start: "18:00", end: "21:00" }],
      }));
      setNextRangeId((current) => current + 1);
    };

    const removeRange = (app, id) => {
      setScheduleMap((current) => ({
        ...current,
        [app]: (current[app] ?? []).filter((range) => range.id !== id),
      }));
    };

    return {
      permissions,
      profile,
      selectedApps,
      scheduleMap,
      nextRangeId,
      appsToConfigure,
      togglePermission,
      grantPermission,
      updateProfile,
      toggleAppSelection,
      ensureAppSchedule,
      updateRange,
      addRange,
      removeRange,
      resetPermissions,
    };
  }, [permissions, profile, selectedApps, scheduleMap, nextRangeId, appsToConfigure, resetPermissions]);

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) throw new Error("usePrototype must be used within PrototypeProvider");
  return context;
}
