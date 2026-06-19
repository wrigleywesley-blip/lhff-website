import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { C, COLORS } from "./theme";
import { PLAYFAIR, OPENSANS, MONO } from "./fonts";

export const SceneBG = ({ src, scrim = "grad", dur = 120, from = 1.06, to = 1.18 }: any) => {
  const f = useCurrentFrame();
  const scale = interpolate(f, [0, dur], [from, to], { extrapolateRight: "clamp" });
  const g =
    scrim === "solid"
      ? "linear-gradient(180deg, rgba(8,9,14,.82) 0%, rgba(8,9,14,.5) 42%, rgba(8,9,14,.93) 100%)"
      : "linear-gradient(180deg, rgba(8,9,14,.55) 0%, rgba(8,9,14,.2) 38%, rgba(8,9,14,.9) 100%)";
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: g }} />
    </AbsoluteFill>
  );
};

export const Scene = ({ children, dur, align = "center" }: any) => {
  const f = useCurrentFrame();
  const op = interpolate(f, [0, 14, dur - 16, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [0, 18], [44, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const bottom = align === "bottom";
  return (
    <AbsoluteFill style={{ justifyContent: bottom ? "flex-end" : "center", padding: bottom ? "0 80px 150px" : "0 80px", opacity: op, transform: `translateY(${y}px)` }}>
      {children}
    </AbsoluteFill>
  );
};

export const Eyebrow = ({ children, color = "rgba(250,247,242,.88)", style }: any) => (
  <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 30, ...style }}>
    {children}
  </div>
);

export const Display = ({ children, size = 120, color = C.cream, style }: any) => (
  <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontWeight: 400, fontSize: size, lineHeight: 1.0, letterSpacing: "-0.014em", color, ...style }}>
    {children}
  </div>
);

export const Kicker = ({ children, color = C.cream, style }: any) => (
  <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontWeight: 400, fontSize: 76, lineHeight: 1.04, letterSpacing: "-0.012em", color, marginBottom: 40, ...style }}>
    {children}
  </div>
);

export const BigStat = ({ children, color = C.cream, size = 300 }: any) => (
  <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontWeight: 500, fontSize: size, lineHeight: 0.82, letterSpacing: "-0.04em", color }}>
    {children}
  </div>
);

export const Cap = ({ children, style }: any) => (
  <div style={{ fontFamily: OPENSANS, fontSize: 36, lineHeight: 1.45, color: "rgba(250,247,242,.94)", maxWidth: 860, marginTop: 26, ...style }}>
    {children}
  </div>
);

export const Source = ({ children }: any) => (
  <div style={{ fontFamily: MONO, fontSize: 18, letterSpacing: "0.08em", color: "rgba(250,247,242,.55)", marginTop: 18 }}>Source: {children}</div>
);

export const Counter = ({ to, from = 0, startFrame = 6, endFrame = 52, thousands = false, suffix = "", color }: any) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [startFrame, endFrame], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const n = Math.round(v);
  const txt = thousands ? n.toLocaleString("en-US") : String(n);
  return <span style={{ color }}>{txt}{suffix}</span>;
};

export const Row = ({ n, l, color = C.cream, delay = 0 }: any) => {
  const f = useCurrentFrame();
  const op = interpolate(f, [delay, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [delay, delay + 16], [26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 24, borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: 22, marginTop: 26, opacity: op, transform: `translateY(${y}px)` }}>
      <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontWeight: 500, fontSize: 84, lineHeight: 0.9, letterSpacing: "-0.03em", color, minWidth: "4.6ch" }}>{n}</div>
      <div style={{ fontFamily: OPENSANS, fontSize: 30, color: "rgba(250,247,242,.9)" }}>{l}</div>
    </div>
  );
};

export const RainbowBar = ({ delay = 0, width = 280 }: any) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ display: "flex", width, height: 7, borderRadius: 1, overflow: "hidden", transform: `scaleX(${s})`, transformOrigin: "left center" }}>
      {COLORS.map((c, i) => (
        <div key={i} style={{ flex: 1, background: c }} />
      ))}
    </div>
  );
};

export const Handle = ({ children = "@lovehappinessfreedom" }: any) => (
  <div style={{ display: "inline-block", marginTop: 42, padding: "24px 40px", borderRadius: 999, background: C.cream, color: C.ink, fontFamily: MONO, fontSize: 24, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
    {children}
  </div>
);

export const PersistentChrome = ({ topL, topR, botL, botR }: any) => {
  const f = useCurrentFrame();
  const op = interpolate(f, [4, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const base: any = { position: "absolute", left: 64, right: 64, display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.6)", opacity: op };
  return (
    <>
      <div style={{ ...base, top: 60 }}><span>{topL}</span><span>{topR}</span></div>
      <div style={{ ...base, bottom: 60 }}><span>{botL}</span><span>{botR}</span></div>
    </>
  );
};

export const InkBG = () => (
  <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 0%, #1d1230 0%, #11121b 55%, #0b0c12 100%)" }} />
);
