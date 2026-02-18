import { useNavigate } from "react-router-dom";

const screens = [
  {
    path: "/main-menu",
    name: "MAIN MENU",
    icon: "\u{1F3CF}",
    desc: "Mode selector with 10 game modes, player info, season pass, event banners, bottom nav.",
    status: "DONE",
    tags: ["5 themes", "Portrait + Landscape", "Scrollable modes"],
    versions: [
      { v: "v8", label: "v8", desc: "Current" },
    ],
  },
  {
    path: "/end-of-match",
    name: "END OF MATCH",
    icon: "\u{1F3C6}",
    desc: "Result banner, scorecard, wagon wheel with shot placement, rewards, action buttons.",
    status: "DONE",
    tags: ["Wagon wheel", "XP + Coins + Gems", "Share card"],
    versions: [
      { v: "v2", label: "v2", desc: "Current" },
    ],
  },
  {
    path: "/pre-match",
    name: "PRE-MATCH SETUP",
    icon: "\u2699\ufe0f",
    desc: "Team selection, overs, difficulty, stadium with day/night, START MATCH.",
    status: "DONE",
    tags: ["12 teams", "5 stadiums", "Day/Night toggle", "Interactive"],
    versions: [
      { v: "v1", label: "v1", desc: "Current" },
    ],
  },
  {
    path: "/gameplay-hud",
    name: "GAMEPLAY HUD",
    icon: "\u{1F3AE}",
    desc: "In-game overlay with score, overs, this-over tracker, ball speed, shot pop-ups, mode bars.",
    status: "DONE",
    tags: ["4 game modes", "Interactive sim", "Shot pop-ups", "Chase/Power/Gauntlet"],
    versions: [
      { v: "v1", label: "v1", desc: "TV scorestrip" },
      { v: "v2", label: "v2", desc: "Minimal top-left" },
      { v: "v3", label: "v3", desc: "Stadium scoreboard" },
    ],
  },
  {
    path: "/daily-challenge",
    name: "DAILY CHALLENGE HUB",
    icon: "\u2B50",
    desc: "3 daily challenges + weekly mega, progress tracking, countdown timer, rewards collection.",
    status: "DONE",
    tags: ["3 daily + 1 bonus", "Weekly mega", "Live countdown", "Interactive"],
    versions: [
      { v: "v1", label: "v1", desc: "Current" },
    ],
  },
  {
    path: "/leaderboard",
    name: "LEADERBOARDS",
    icon: "\u{1F4CA}",
    desc: "Top 3 podium, scrollable rankings, 6 tabs (Weekly/Survival/Power Over/World Cup/Gauntlet/Friends), scope toggle.",
    status: "DONE",
    tags: ["6 leaderboards", "Podium + ranks", "Global/Country/Friends", "Sticky my rank"],
    versions: [
      { v: "v1", label: "v1", desc: "Current" },
    ],
  },
  {
    path: "/shop",
    name: "SHOP",
    icon: "\u{1F6CD}\uFE0F",
    desc: "6 tabs (Bats/Balls/Celebrations/Badges/Bundles/Gems), daily deal, item grid, gem packs IAP, free spin.",
    status: "DONE",
    tags: ["6 categories", "3-col item grid", "Daily deal", "Free spin", "Gem packs IAP"],
    versions: [
      { v: "v1", label: "v1", desc: "Current" },
    ],
  },
  {
    path: "/settings",
    name: "SETTINGS",
    icon: "\u{1F527}",
    desc: "Single scrollable list: Camera, Gameplay, Audio, Notifications, Account. Toggles, sliders, switches.",
    status: "DONE",
    tags: ["5 sections", "Interactive controls", "Small Room Mode", "Volume sliders"],
    versions: [
      { v: "v1", label: "v1", desc: "Current" },
    ],
  },
  {
    path: "/camera-calibration",
    name: "CAMERA CALIBRATION",
    icon: "\u{1F4F7}",
    desc: "Full-screen camera overlay with body tracking panel, ghost silhouette, distance feedback bar, countdown. Tap to cycle states.",
    status: "DONE",
    tags: ["AR camera view", "Body tracking", "Distance feedback", "9 states"],
    versions: [{ v: "v1", label: "v1", desc: "Current" }],
  },
  {
    path: "/player-profile",
    name: "PLAYER PROFILE",
    icon: "\u{1F464}",
    desc: "Hero section, 8 career stats, achievement grid, hexagonal mastery radar chart, match history, player ID.",
    status: "DONE",
    tags: ["Stats grid", "Achievements", "SVG radar chart", "Match history"],
    versions: [{ v: "v1", label: "v1", desc: "Current" }],
  },
  {
    path: "/onboarding",
    name: "ONBOARDING",
    icon: "\u{1F44B}",
    desc: "6-step FTUE: welcome, device setup, positioning, hand pointer, batting, ready. Step dots, illustrations, voice hint.",
    status: "DONE",
    tags: ["6 steps", "Illustrations", "Voice commands", "Interactive"],
    versions: [{ v: "v1", label: "v1", desc: "Current" }],
  },
];

const planned = [];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u{1F3CF}"}</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#FF4081", letterSpacing: 4, margin: 0 }}>
          TOP SPOT CRICKET
        </h1>
        <p style={{ fontSize: 13, color: "#888", marginTop: 6, letterSpacing: 1 }}>
          UI Screen Preview
        </p>
      </div>

      {/* Built Screens */}
      <div style={{ width: "100%", maxWidth: 700, marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: "#666", letterSpacing: 2, marginBottom: 12 }}>
          BUILT SCREENS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {screens.map((s) => {
            const latest = s.versions[s.versions.length - 1];
            return (
              <div
                key={s.path}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1.5px solid rgba(255,64,129,0.2)",
                  borderRadius: 16,
                  transition: "all 0.2s",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,64,129,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,64,129,0.4)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,64,129,0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Main row — clicks go to latest version */}
                <div
                  onClick={() => navigate(`${s.path}?v=${latest.v}`)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: "20px 24px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: 40, lineHeight: 1, flexShrink: 0 }}>{s.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: 1 }}>{s.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#FF4081", background: "rgba(255,64,129,0.15)", padding: "2px 8px", borderRadius: 4 }}>{latest.v}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#4CAF50", background: "rgba(76,175,80,0.15)", padding: "2px 8px", borderRadius: 4 }}>{s.status}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.5, marginBottom: 6 }}>{s.desc}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {s.tags.map((tag, i) => (
                        <span key={i} style={{ fontSize: 9, fontWeight: 700, color: "#666", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 4 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: 24, color: "#FF4081", flexShrink: 0 }}>{"\u2192"}</div>
                </div>

                {/* Version pills — only show if more than 1 version */}
                {s.versions.length > 1 && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0 24px 14px 84px",
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#555", letterSpacing: 1 }}>VERSIONS</span>
                    {s.versions.map((ver) => (
                      <button
                        key={ver.v}
                        onClick={(e) => { e.stopPropagation(); navigate(`${s.path}?v=${ver.v}`); }}
                        style={{
                          padding: "4px 12px",
                          borderRadius: 6,
                          border: "1px solid rgba(255,64,129,0.3)",
                          background: "rgba(255,64,129,0.08)",
                          color: "#FF80AB",
                          fontSize: 10,
                          fontWeight: 700,
                          cursor: "pointer",
                          letterSpacing: 0.5,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,64,129,0.2)"; e.currentTarget.style.color = "#FF4081"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,64,129,0.08)"; e.currentTarget.style.color = "#FF80AB"; }}
                      >
                        {ver.v} &mdash; {ver.desc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Planned Screens */}
      <div style={{ width: "100%", maxWidth: 700 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: "#666", letterSpacing: 2, marginBottom: 12 }}>
          PLANNED SCREENS
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {planned.map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid #222",
                borderRadius: 10,
                opacity: 0.5,
              }}
            >
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: 0.5 }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 40, fontSize: 10, color: "#333", letterSpacing: 1 }}>
        TOP SPOT GAMES &bull; GDD v3.1
      </div>
    </div>
  );
}
