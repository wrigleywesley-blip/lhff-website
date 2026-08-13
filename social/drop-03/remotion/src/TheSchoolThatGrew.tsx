import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Eyebrow, Display, Kicker, Cap, Source, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// Motion scene: text rises + fades in, then fades OUT just before the
// image crossfade begins, so type never double-exposes across a blend.
// The SceneBG stays at full opacity through the transition; only the
// pictures blend, which is what makes the cut read seamless.
const MScene = ({ children, align = "bottom", dur = 120, out = true }: any) => {
  const f = useCurrentFrame();
  const op = out
    ? interpolate(f, [6, 22, dur - 26, dur - 10], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(f, [6, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [6, 28], [46, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const bottom = align === "bottom";
  return (
    <AbsoluteFill
      style={{
        justifyContent: bottom ? "flex-end" : "center",
        padding: bottom ? "0 80px 170px" : "0 80px",
        opacity: op,
        transform: `translateY(${y}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Sequence durations: 108 + 92 + 92 + 92 + 120 = 504
// Transitions: 3 × 18 + 1 × 24 = 78 overlap → 504 − 78 = 426 frames ≈ 14.2s @ 30fps
export const TheSchoolThatGrew = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="school-build.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Education · Maputo</Eyebrow>
          <Display size={104}>
            It started with<br />one classroom<br />in <i style={{ color: C.yellow }}>Maputo</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the gap */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="school-aerial.jpg" scrim="grad" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.red}>The reality</Eyebrow>
          <Kicker>
            Fewer than half<br />finish primary<br />school.
          </Kicker>
          <Source>UNESCO UIS</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · what we built */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="school-classroom.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.cream}>What we built</Eyebrow>
          <Kicker>
            Fed, taught,<br />and <i style={{ color: C.green }}>seen</i>.
          </Kicker>
          <Cap style={{ marginTop: 8 }}>Uniforms, meals, teachers who stay.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · every child */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="edu-girl-reading.jpg" scrim="grad" dur={92} />
        <MScene dur={92}>
          <Kicker style={{ fontSize: 92 }}>
            Every child,<br />a whole <i style={{ color: C.yellow }}>world</i>.
          </Kicker>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 24 })}
      />

      {/* S5 · CTA */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <InkBG />
        <MScene align="center" dur={120} out={false}>
          <RainbowBar delay={4} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
          <Display size={104}>
            A classroom<br />can change<br />a <i style={{ color: C.green }}>country</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="The School" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
