import { useState, useEffect, useRef } from "react";

const PHASES = [
  {
    id: 1, label: "Ignite", month: "Mo. 1–3", emoji: "⚡",
    color: "#F5A623", colorDim: "#F5A62322", colorBorder: "#F5A62340",
    tagline: "Bridge ME → Tech credibility",
    tip: "Your Mech degree is rare. Only ~3% of APM applicants are engineers.",
    steps: [
      { title: "Google PM Certificate", where: "Coursera", tag: "Must Do", detail: "Complete all 6 courses. Do it in 6 weeks (not 6 months). Recruiters recognize this certificate specifically — it signals genuine intent before your resume does." },
      { title: "Learn Python Basics", where: "freeCodeCamp", tag: "Must Do", detail: "Write simple scripts and data manipulation with pandas. ME applicants who can code jump to the top of the pile." },
      { title: "SQL Fundamentals", where: "Mode Analytics / SQLZoo", tag: "Must Do", detail: "Master SELECT, JOINs, GROUP BY, subqueries. PMs pull data every single day — this is non-negotiable for Google interviews." },
      { title: "Read 3 Core PM Books", where: "Self-study", tag: "Important", detail: "'Decode & Conquer' (Lewis Lin) · 'Swipe to Unlock' (Neel Mehta) · 'Inspired' (Marty Cagan). Interview staples that show up in every round." },
      { title: "Audit Google Products Daily", where: "Habit", tag: "Important", detail: "Use Search, Maps, Gmail, YouTube as a PM. Ask: What's broken? Who's the user? What's the metric? Write 3 observations/week in a journal." },
    ],
  },
  {
    id: 2, label: "Build", month: "Mo. 3–6", emoji: "🧠",
    color: "#5B8DEF", colorDim: "#5B8DEF22", colorBorder: "#5B8DEF40",
    tagline: "Create a real product portfolio",
    tip: "Two strong case studies beat a perfect GPA every time.",
    steps: [
      { title: "Build 2–3 Case Studies", where: "Figma + Notion", tag: "Must Do", detail: "Pick real problems: 'Redesign Google Maps for visually impaired users.' Write user stories, wireframes, and success metrics. This IS your portfolio." },
      { title: "Practice PM Questions Daily", where: "Exponent.com", tag: "Must Do", detail: "30 mins/day. Product design, estimation, strategy — out loud. Record yourself. Watch the playback. Painful but it works." },
      { title: "Frame Your ME Superpowers", where: "Narrative work", tag: "Must Do", detail: "'I understand manufacturing constraints, safety systems, and cross-disciplinary tradeoffs — most CS grads don't.' Practice this until effortless." },
      { title: "Network with 10 Google APMs", where: "LinkedIn outreach", tag: "Important", detail: "Message current/former APMs: 'I'm an ME transitioning to PM — would love 15 mins.' 60% respond. Ask what they look for." },
      { title: "Write Weekly on LinkedIn", where: "Personal brand", tag: "Bonus", detail: "Post weekly product teardowns of apps you use. 500 words. Google scouts LinkedIn — this signals genuine passion resumes can't show." },
    ],
  },
  {
    id: 3, label: "Launch", month: "Mo. 6–12", emoji: "🚀",
    color: "#4ECBA9", colorDim: "#4ECBA922", colorBorder: "#4ECBA940",
    tagline: "Apply strategically & get experience",
    tip: "Apply to 3–5 APM programs simultaneously. Each interview sharpens the next.",
    steps: [
      { title: "Apply: Google APM Program", where: "Opens Oct · Closes late Oct", tag: "Must Do", detail: "Submit in the FIRST WEEK. Don't wait. Resume + cover letter. Lead with your technical background and 1 product case study you're proud of." },
      { title: "Get PM-Adjacent Job (Bengaluru)", where: "Startups", tag: "Must Do", detail: "Even 6 months as a Product Analyst at a startup counts massively. Target: Flipkart, Swiggy, Zepto, Meesho, Razorpay, CRED." },
      { title: "Apply: Meta RPM Program", where: "Meta equivalent of APM", tag: "Important", detail: "Rotates across Facebook, Instagram, WhatsApp. More analytical interview style. Apply in the same window as Google." },
      { title: "Apply: Microsoft PM Program", where: "Strong India presence", tag: "Important", detail: "Microsoft hires PMs into Hyderabad + Bengaluru. Great fallback path if Google APM doesn't work out in round 1." },
      { title: "Showcase Your AI Skills", where: "2025–26 differentiator", tag: "Bonus", detail: "Demonstrate using Claude/ChatGPT to run user research or prototype features. Mention it in interviews — it's a genuine edge most candidates miss." },
    ],
  },
  {
    id: 4, label: "Conquer", month: "Mo. 12+", emoji: "🎯",
    color: "#EF6B8D", colorDim: "#EF6B8D22", colorBorder: "#EF6B8D40",
    tagline: "Convert your application into an offer",
    tip: "Google values user empathy above all. Every answer should come back to the user.",
    steps: [
      { title: "Written Assessment", where: "Round 1 filter", tag: "Must Do", detail: "60-min product essay. Framework: USER SEGMENT → PAIN POINT → SOLUTION → METRIC. Practice 10 of these before the real one." },
      { title: "Product Design Round", where: "\"Design X for Y\"", tag: "Must Do", detail: "'Design a vending machine for blind users.' Never jump to features. Always: who is the user → what's their pain → now here's what I'd build." },
      { title: "Strategy Round", where: "Think like a CEO", tag: "Must Do", detail: "'Should Google enter travel booking?' Cover: market size, Google moat, user need, risks, and the ONE metric that proves success." },
      { title: "Technical Round", where: "Leverage your ME degree", tag: "Must Do", detail: "Not coding — system tradeoffs. 'How would you build X at scale?' Your engineering background makes this your strongest round. Own it." },
      { title: "Googliness Round", where: "Behavioral STAR stories", tag: "Must Do", detail: "Prepare for: leading without authority, handling ambiguity, cross-team conflict, user-driven decisions. Google wants humble + hungry." },
    ],
  },
];

const TAG_COLORS = {
  "Must Do": { bg: "#F5A62318", text: "#F5A623", border: "#F5A62330" },
  "Important": { bg: "#5B8DEF18", text: "#5B8DEF", border: "#5B8DEF30" },
  "Bonus": { bg: "#4ECBA918", text: "#4ECBA9", border: "#4ECBA930" },
};

const RESOURCES = [
  { icon: "📘", name: "Exponent", desc: "PM interview practice", url: "https://tryexponent.com" },
  { icon: "🎓", name: "Coursera", desc: "Google PM Certificate", url: "https://coursera.org" },
  { icon: "📰", name: "Lenny's Newsletter", desc: "Best PM newsletter", url: "https://lennysnewsletter.com" },
  { icon: "🎨", name: "Figma", desc: "Wireframing tool", url: "https://figma.com" },
  { icon: "🗂️", name: "Notion", desc: "Case study builder", url: "https://notion.so" },
  { icon: "💼", name: "LinkedIn", desc: "APM networking", url: "https://linkedin.com" },
  { icon: "📚", name: "Product Alliance", desc: "APM program guide", url: "https://productalliance.com" },
  { icon: "🔎", name: "Google Careers", desc: "Official APM listing", url: "https://careers.google.com" },
];

export default function App() {
  const [screen, setScreen] = useState("home"); // home | phase | step | timeline | resources
  const [activePhase, setActivePhase] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState({});
  const [tab, setTab] = useState("roadmap"); // roadmap | timeline | resources

  const toggle = (k) => setChecked(p => ({ ...p, [k]: !p[k] }));
  const totalSteps = PHASES.reduce((a, p) => a + p.steps.length, 0);
  const doneCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((doneCount / totalSteps) * 100);
  const phaseProgress = (p) => {
    const done = p.steps.filter((_, i) => checked[`${p.id}-${i}`]).length;
    return Math.round((done / p.steps.length) * 100);
  };

  const phase = PHASES[activePhase];
  const step = phase.steps[activeStep];

  return (
    <div style={{
      width: "100%", maxWidth: "390px", margin: "0 auto",
      height: "780px", background: "#080B12",
      borderRadius: "40px", overflow: "hidden",
      display: "flex", flexDirection: "column",
      fontFamily: "'Georgia', serif",
      boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      border: "1px solid #1C2030",
      position: "relative",
    }}>

      {/* Status bar */}
      <div style={{
        height: "44px", background: "#080B12",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", flexShrink: 0,
      }}>
        <span style={{ color: "#CCC", fontSize: "13px", fontFamily: "monospace", fontWeight: "600" }}>9:41</span>
        <div style={{ width: "120px", height: "30px", background: "#080B12", borderRadius: "15px", border: "1px solid #1C2030", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "10px", height: "10px", background: "#1C2030", borderRadius: "50%" }} />
        </div>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <div style={{ width: "16px", height: "10px", border: "1.5px solid #CCC", borderRadius: "2px", display: "flex", alignItems: "center" }}>
            <div style={{ width: "70%", height: "5px", background: "#4ECBA9", borderRadius: "1px", margin: "0 1px" }} />
          </div>
        </div>
      </div>

      {/* Screen content */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}>

        {/* ═══════════ ROADMAP TAB ═══════════ */}
        {tab === "roadmap" && screen === "home" && (
          <div style={{ padding: "8px 20px 20px" }}>
            {/* Header */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", color: "#5B8DEF", letterSpacing: "3px", marginBottom: "6px", fontFamily: "monospace" }}>YOUR PATH</div>
              <div style={{ fontSize: "26px", fontWeight: "700", lineHeight: 1.2, color: "#F0EDE4" }}>Google PM<br/>Roadmap</div>
              <div style={{ fontSize: "12px", color: "#555", marginTop: "6px", fontFamily: "monospace" }}>Mechanical Engineer → APM</div>
            </div>

            {/* Progress card */}
            <div style={{
              background: "linear-gradient(135deg, #0E1220, #111827)",
              border: "1px solid #1C2030",
              borderRadius: "20px",
              padding: "18px",
              marginBottom: "20px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "#F0EDE4" }}>{progress}%</div>
                  <div style={{ fontSize: "11px", color: "#555", fontFamily: "monospace" }}>{doneCount} of {totalSteps} steps done</div>
                </div>
                <svg width="60" height="60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#1C2030" strokeWidth="5"/>
                  <circle cx="30" cy="30" r="24" fill="none"
                    stroke="#F5A623" strokeWidth="5"
                    strokeDasharray={`${2*Math.PI*24}`}
                    strokeDashoffset={`${2*Math.PI*24*(1-progress/100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                  />
                </svg>
              </div>

              {/* Mini phase bars */}
              {PHASES.map(p => {
                const pct = phaseProgress(p);
                return (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span style={{ width: "14px", fontSize: "13px" }}>{p.emoji}</span>
                    <div style={{ flex: 1, height: "4px", background: "#1C2030", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: p.color, borderRadius: "2px", transition: "width 0.5s" }} />
                    </div>
                    <span style={{ fontSize: "10px", color: "#444", fontFamily: "monospace", width: "26px" }}>{pct}%</span>
                  </div>
                );
              })}
            </div>

            {/* Phase cards */}
            <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", marginBottom: "12px", fontFamily: "monospace" }}>PHASES</div>
            {PHASES.map((p, i) => {
              const pct = phaseProgress(p);
              const done = p.steps.filter((_, si) => checked[`${p.id}-${si}`]).length;
              return (
                <div key={p.id}
                  onClick={() => { setActivePhase(i); setScreen("phase"); }}
                  style={{
                    background: "#0D1018",
                    border: `1px solid ${activePhase === i ? p.colorBorder : "#1C2030"}`,
                    borderRadius: "16px",
                    padding: "16px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div style={{
                        width: "42px", height: "42px",
                        background: p.colorDim,
                        border: `1px solid ${p.colorBorder}`,
                        borderRadius: "12px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "20px",
                      }}>{p.emoji}</div>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#F0EDE4" }}>{p.label}</div>
                        <div style={{ fontSize: "11px", color: p.color, fontFamily: "monospace", marginTop: "1px" }}>{p.month}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: p.color }}>{done}/{p.steps.length}</div>
                      <div style={{ fontSize: "10px", color: "#444", fontFamily: "monospace" }}>steps</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "10px", marginBottom: "8px" }}>{p.tagline}</div>
                  <div style={{ height: "3px", background: "#1C2030", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: p.color, borderRadius: "2px", transition: "width 0.5s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════ PHASE DETAIL SCREEN ═══════════ */}
        {tab === "roadmap" && screen === "phase" && (
          <div>
            {/* Phase hero */}
            <div style={{
              background: `linear-gradient(180deg, ${phase.colorDim} 0%, #080B12 100%)`,
              padding: "16px 20px 20px",
              borderBottom: `1px solid ${phase.colorBorder}`,
            }}>
              <button onClick={() => setScreen("home")} style={{
                background: "none", border: "none", color: "#666", fontSize: "13px",
                cursor: "pointer", padding: "0 0 12px", fontFamily: "monospace",
              }}>← Back</button>
              <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "14px" }}>
                <div style={{
                  width: "52px", height: "52px",
                  background: phase.colorDim,
                  border: `2px solid ${phase.color}`,
                  borderRadius: "14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px",
                }}>{phase.emoji}</div>
                <div>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: "#F0EDE4" }}>{phase.label}</div>
                  <div style={{ fontSize: "12px", color: phase.color, fontFamily: "monospace" }}>{phase.month}</div>
                </div>
              </div>
              <div style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "10px" }}>{phase.tagline}</div>
              <div style={{
                background: "#07090F",
                border: `1px solid ${phase.colorBorder}`,
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "12px", color: "#AAA", fontFamily: "monospace", lineHeight: 1.6,
              }}>💡 {phase.tip}</div>
            </div>

            {/* Steps list */}
            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", marginBottom: "12px", fontFamily: "monospace" }}>
                {phase.steps.filter((_, i) => checked[`${phase.id}-${i}`]).length}/{phase.steps.length} COMPLETE
              </div>
              {phase.steps.map((s, i) => {
                const key = `${phase.id}-${i}`;
                const done = checked[key];
                const tc = TAG_COLORS[s.tag];
                return (
                  <div key={i}
                    style={{
                      background: done ? "#090C12" : "#0D1018",
                      border: `1px solid ${done ? "#141820" : "#1C2030"}`,
                      borderRadius: "14px",
                      padding: "14px",
                      marginBottom: "8px",
                      opacity: done ? 0.55 : 1,
                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                    onClick={() => { setActiveStep(i); setScreen("step"); }}
                  >
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div
                        onClick={(e) => { e.stopPropagation(); toggle(key); }}
                        style={{
                          width: "22px", height: "22px", flexShrink: 0,
                          borderRadius: "6px",
                          border: `2px solid ${done ? "#2A3040" : phase.color}`,
                          background: done ? "#1A2030" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "12px", color: phase.color,
                          marginTop: "1px",
                          transition: "all 0.2s",
                        }}
                      >{done ? "✓" : ""}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                          <div style={{
                            fontSize: "14px", fontWeight: "600", color: done ? "#444" : "#F0EDE4",
                            textDecoration: done ? "line-through" : "none",
                          }}>{s.title}</div>
                          <span style={{
                            fontSize: "9px", flexShrink: 0,
                            background: tc.bg, color: tc.text,
                            border: `1px solid ${tc.border}`,
                            padding: "2px 7px", borderRadius: "4px",
                            fontFamily: "monospace", letterSpacing: "0.5px",
                          }}>{s.tag}</span>
                        </div>
                        <div style={{ fontSize: "11px", color: "#555", fontFamily: "monospace", marginTop: "3px" }}>{s.where}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Phase nav */}
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                <button
                  onClick={() => { setActivePhase(p => Math.max(0, p-1)); }}
                  disabled={activePhase === 0}
                  style={{
                    flex: 1, padding: "13px",
                    background: activePhase === 0 ? "#090C12" : "#0D1018",
                    border: "1px solid #1C2030",
                    borderRadius: "12px",
                    color: activePhase === 0 ? "#222" : "#888",
                    fontSize: "13px", cursor: activePhase === 0 ? "not-allowed" : "pointer",
                    fontFamily: "monospace",
                  }}>← Prev</button>
                <button
                  onClick={() => { setActivePhase(p => Math.min(PHASES.length-1, p+1)); }}
                  disabled={activePhase === PHASES.length - 1}
                  style={{
                    flex: 1, padding: "13px",
                    background: activePhase === PHASES.length-1 ? "#090C12" : phase.color,
                    border: `1px solid ${activePhase === PHASES.length-1 ? "#1C2030" : phase.color}`,
                    borderRadius: "12px",
                    color: activePhase === PHASES.length-1 ? "#222" : "#07080D",
                    fontSize: "13px", fontWeight: "700",
                    cursor: activePhase === PHASES.length-1 ? "not-allowed" : "pointer",
                    fontFamily: "monospace",
                  }}>Next →</button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ STEP DETAIL SCREEN ═══════════ */}
        {tab === "roadmap" && screen === "step" && (
          <div style={{ padding: "16px 20px" }}>
            <button onClick={() => setScreen("phase")} style={{
              background: "none", border: "none", color: "#666", fontSize: "13px",
              cursor: "pointer", padding: "0 0 16px", fontFamily: "monospace",
            }}>← {phase.label}</button>

            <div style={{
              background: phase.colorDim,
              border: `1px solid ${phase.colorBorder}`,
              borderRadius: "18px",
              padding: "20px",
              marginBottom: "20px",
            }}>
              <div style={{ fontSize: "11px", color: phase.color, letterSpacing: "2px", fontFamily: "monospace", marginBottom: "8px" }}>STEP {activeStep + 1} OF {phase.steps.length}</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#F0EDE4", lineHeight: 1.3, marginBottom: "8px" }}>{step.title}</div>
              <div style={{ fontSize: "12px", color: "#777", fontFamily: "monospace" }}>{step.where}</div>
            </div>

            <div style={{
              background: "#0D1018",
              border: "1px solid #1C2030",
              borderRadius: "16px",
              padding: "18px",
              marginBottom: "16px",
            }}>
              <div style={{ fontSize: "11px", color: "#555", letterSpacing: "2px", fontFamily: "monospace", marginBottom: "10px" }}>WHAT TO DO</div>
              <div style={{ fontSize: "14px", color: "#CCC", lineHeight: 1.8 }}>{step.detail}</div>
            </div>

            <div style={{
              background: "#0D1018",
              border: "1px solid #1C2030",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "20px",
            }}>
              {(() => {
                const key = `${phase.id}-${activeStep}`;
                const done = checked[key];
                return (
                  <button
                    onClick={() => toggle(key)}
                    style={{
                      width: "100%", padding: "13px",
                      background: done ? "#1A2030" : phase.color,
                      border: `1px solid ${done ? "#2A3040" : phase.color}`,
                      borderRadius: "12px",
                      color: done ? "#888" : "#07080D",
                      fontSize: "14px", fontWeight: "700",
                      cursor: "pointer", fontFamily: "monospace",
                      transition: "all 0.2s",
                    }}
                  >{done ? "✓ Marked Complete" : "Mark as Complete"}</button>
                );
              })()}
            </div>

            {/* Step nav */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setActiveStep(p => Math.max(0, p-1))} disabled={activeStep === 0}
                style={{
                  flex: 1, padding: "13px",
                  background: activeStep === 0 ? "#090C12" : "#0D1018",
                  border: "1px solid #1C2030",
                  borderRadius: "12px",
                  color: activeStep === 0 ? "#222" : "#888",
                  fontSize: "13px", fontFamily: "monospace",
                  cursor: activeStep === 0 ? "not-allowed" : "pointer",
                }}>← Prev</button>
              <button onClick={() => setActiveStep(p => Math.min(phase.steps.length-1, p+1))} disabled={activeStep === phase.steps.length - 1}
                style={{
                  flex: 1, padding: "13px",
                  background: activeStep === phase.steps.length-1 ? "#090C12" : "#0D1018",
                  border: "1px solid #1C2030",
                  borderRadius: "12px",
                  color: activeStep === phase.steps.length-1 ? "#222" : "#888",
                  fontSize: "13px", fontFamily: "monospace",
                  cursor: activeStep === phase.steps.length-1 ? "not-allowed" : "pointer",
                }}>Next →</button>
            </div>
          </div>
        )}

        {/* ═══════════ TIMELINE TAB ═══════════ */}
        {tab === "timeline" && (
          <div style={{ padding: "16px 20px 20px" }}>
            <div style={{ fontSize: "11px", color: "#5B8DEF", letterSpacing: "3px", marginBottom: "6px", fontFamily: "monospace" }}>OVERVIEW</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#F0EDE4", marginBottom: "20px" }}>12-Month Journey</div>

            {PHASES.map((p, pi) => (
              <div key={p.id} style={{ display: "flex", gap: "14px", marginBottom: "4px" }}>
                {/* Spine */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "36px", flexShrink: 0 }}>
                  <div style={{
                    width: "36px", height: "36px",
                    background: p.colorDim,
                    border: `2px solid ${p.color}`,
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", flexShrink: 0,
                  }}>{p.emoji}</div>
                  {pi < PHASES.length - 1 && (
                    <div style={{ width: "2px", flex: 1, minHeight: "16px", background: `linear-gradient(180deg, ${p.color}60, ${PHASES[pi+1].color}60)`, margin: "4px 0" }} />
                  )}
                </div>

                {/* Content */}
                <div style={{
                  flex: 1, background: "#0D1018",
                  border: `1px solid ${p.colorBorder}`,
                  borderRadius: "14px", padding: "12px 14px",
                  marginBottom: pi < PHASES.length-1 ? "8px" : 0,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#F0EDE4" }}>{p.label}</div>
                      <div style={{ fontSize: "10px", color: p.color, fontFamily: "monospace" }}>{p.month}</div>
                    </div>
                    <div style={{
                      fontSize: "11px", color: p.color,
                      background: p.colorDim, border: `1px solid ${p.colorBorder}`,
                      padding: "3px 8px", borderRadius: "6px", fontFamily: "monospace",
                      alignSelf: "flex-start",
                    }}>{phaseProgress(p)}%</div>
                  </div>

                  {p.steps.map((s, si) => {
                    const key = `${p.id}-${si}`;
                    const done = checked[key];
                    return (
                      <div key={si} onClick={() => toggle(key)} style={{
                        display: "flex", gap: "8px", alignItems: "center",
                        padding: "5px 0",
                        borderBottom: si < p.steps.length-1 ? "1px solid #111620" : "none",
                        cursor: "pointer",
                        opacity: done ? 0.4 : 1,
                        transition: "opacity 0.2s",
                      }}>
                        <div style={{
                          width: "14px", height: "14px", flexShrink: 0,
                          borderRadius: "3px",
                          border: `1.5px solid ${done ? "#2A3040" : p.color + "80"}`,
                          background: done ? "#1A2030" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "9px", color: p.color,
                        }}>{done ? "✓" : ""}</div>
                        <span style={{
                          fontSize: "12px",
                          color: done ? "#333" : "#999",
                          textDecoration: done ? "line-through" : "none",
                        }}>{s.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════ RESOURCES TAB ═══════════ */}
        {tab === "resources" && (
          <div style={{ padding: "16px 20px 20px" }}>
            <div style={{ fontSize: "11px", color: "#EF6B8D", letterSpacing: "3px", marginBottom: "6px", fontFamily: "monospace" }}>TOOLKIT</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#F0EDE4", marginBottom: "20px" }}>Resources</div>

            {/* Salary benchmark */}
            <div style={{
              background: "#0D1018",
              border: "1px solid #1C2030",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "16px",
            }}>
              <div style={{ fontSize: "10px", color: "#F5A623", letterSpacing: "2px", fontFamily: "monospace", marginBottom: "14px" }}>SALARY IN INDIA</div>
              {[
                { role: "Google APM", range: "₹25–35 LPA", pct: 88, color: "#F5A623" },
                { role: "Meta RPM", range: "₹22–32 LPA", pct: 78, color: "#5B8DEF" },
                { role: "Microsoft PM", range: "₹18–28 LPA", pct: 65, color: "#4ECBA9" },
                { role: "Product Analyst", range: "₹8–15 LPA", pct: 32, color: "#EF6B8D" },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px", color: "#888" }}>{s.role}</span>
                    <span style={{ fontSize: "12px", color: s.color, fontFamily: "monospace", fontWeight: "600" }}>{s.range}</span>
                  </div>
                  <div style={{ height: "4px", background: "#141820", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: "2px" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* ME tips */}
            <div style={{
              background: "#0D1018",
              border: "1px solid #1C2030",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "16px",
            }}>
              <div style={{ fontSize: "10px", color: "#4ECBA9", letterSpacing: "2px", fontFamily: "monospace", marginBottom: "12px" }}>ME GRAD ADVANTAGES</div>
              {[
                "Your ME degree is rare — only ~3% of APM applicants are non-CS engineers",
                "Frame every ME project as: user → problem → solution → impact",
                "Google Hyderabad & Bengaluru both hire PMs — apply to both offices",
                "1 Google employee referral = 3× higher interview chance",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "#4ECBA9", fontSize: "12px", flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: "12px", color: "#777", lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Resource links */}
            <div style={{ fontSize: "10px", color: "#444", letterSpacing: "2px", fontFamily: "monospace", marginBottom: "12px" }}>LINKS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {RESOURCES.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{
                  background: "#0D1018",
                  border: "1px solid #1C2030",
                  borderRadius: "14px",
                  padding: "14px 12px",
                  textDecoration: "none",
                  display: "block",
                  transition: "border-color 0.15s",
                }}>
                  <div style={{ fontSize: "20px", marginBottom: "6px" }}>{r.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#F0EDE4", marginBottom: "2px" }}>{r.name}</div>
                  <div style={{ fontSize: "10px", color: "#555", fontFamily: "monospace" }}>{r.desc}</div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ═══════════ BOTTOM NAV ═══════════ */}
      <div style={{
        height: "72px",
        background: "#07090E",
        borderTop: "1px solid #141820",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 10px",
        flexShrink: 0,
      }}>
        {[
          { id: "roadmap", icon: "⚡", label: "Roadmap" },
          { id: "timeline", icon: "📅", label: "Timeline" },
          { id: "resources", icon: "🔗", label: "Resources" },
        ].map(item => {
          const active = tab === item.id;
          return (
            <button key={item.id}
              onClick={() => { setTab(item.id); setScreen("home"); }}
              style={{
                flex: 1,
                background: "none", border: "none",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                cursor: "pointer", padding: "8px 0",
              }}>
              <span style={{ fontSize: "20px", opacity: active ? 1 : 0.35 }}>{item.icon}</span>
              <span style={{
                fontSize: "10px", fontFamily: "monospace",
                color: active ? "#F5A623" : "#444",
                letterSpacing: "0.5px",
              }}>{item.label}</span>
              {active && (
                <div style={{ width: "20px", height: "2px", background: "#F5A623", borderRadius: "1px" }} />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
