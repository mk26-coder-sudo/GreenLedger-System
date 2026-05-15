import { useState } from "react";

const navItems = [
  {
    label: "Zones",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    badge: "18",
  },
  {
    label: "Optimize",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const stats = [
  { label: "Critical", value: "5", color: "#F09595" },
  { label: "Stable", value: "6", color: "#9FE1CB" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Zones");

  return (
    <aside
      className="flex flex-col w-60 min-h-screen"
      style={{ background: "#163D2A", borderRight: "0.5px solid rgba(255,255,255,0.07)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
          style={{ background: "rgba(159,225,203,0.15)", border: "0.5px solid rgba(159,225,203,0.25)" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C10 2 5 6 5 11a5 5 0 0010 0c0-5-5-9-5-9z" fill="#9FE1CB" />
            <path d="M10 11V18" stroke="#9FE1CB" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 15l-3-2.5" stroke="#9FE1CB" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M10 13l2.5-2" stroke="#9FE1CB" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#E1F5EE", letterSpacing: "-0.01em" }}>GreenLedger</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Urban Zone Monitor</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-4 pt-4 pb-2 grid grid-cols-2 gap-2">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="rounded-lg px-3 py-2"
            style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
            <p className="text-lg font-semibold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Section label */}
      <div className="px-5 pt-4 pb-1">
        <p className="text-xs font-medium"
          style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Menu
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-3 mt-1">
        {navItems.map(({ label, icon, badge }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-all"
              style={{
                background: isActive ? "rgba(159,225,203,0.12)" : "transparent",
                color: isActive ? "#9FE1CB" : "rgba(255,255,255,0.45)",
                border: isActive ? "0.5px solid rgba(159,225,203,0.2)" : "0.5px solid transparent",
              }}
            >
              <span style={{ color: "inherit" }}>{icon}</span>
              <span className="flex-1" style={{ fontWeight: isActive ? 500 : 400 }}>{label}</span>
              {badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-md"
                  style={{
                    background: isActive ? "rgba(159,225,203,0.2)" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#9FE1CB" : "rgba(255,255,255,0.3)",
                  }}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-4" style={{ height: "0.5px", background: "rgba(255,255,255,0.07)" }} />

      {/* Health summary */}
      <div className="px-4 mb-4">
        <div className="rounded-xl px-4 py-3"
          style={{ background: "rgba(159,225,203,0.07)", border: "0.5px solid rgba(159,225,203,0.15)" }}>
          <p className="text-xs font-medium mb-2" style={{ color: "rgba(159,225,203,0.6)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Zone Health
          </p>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 rounded-full overflow-hidden" style={{ height: "4px", background: "rgba(255,255,255,0.1)" }}>
              <div style={{ width: "33%", height: "100%", background: "#F09595", borderRadius: "9999px" }} />
            </div>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-full overflow-hidden" style={{ height: "4px", background: "rgba(255,255,255,0.1)" }}>
              <div style={{ width: "67%", height: "100%", background: "#9FE1CB", borderRadius: "9999px" }} />
            </div>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Healthy</span>
          </div>
        </div>
      </div>

      {/* User footer */}
      <div className="mt-auto px-3 pb-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.04)" }}>
          <div className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 text-xs font-semibold"
            style={{ background: "#0F6E56", color: "#9FE1CB", border: "1.5px solid rgba(159,225,203,0.3)" }}>
            GL
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium truncate" style={{ color: "rgba(255,255,255,0.8)" }}>Admin</p>
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.3)" }}>admin@greenledger.io</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
            <path d="M5 10l4-3-4-3" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </aside>
  );
}