import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG, MScene } from "./ui";

// Sequence durations: 108 + 92 + 92 + 92 + 120 = 504
// Transitions: 3 × 18 + 1 × 24 = 78 overlap → 504 − 78 = 426 frames ≈ 14.2s @ 30fps
export const SkillsOpenDoors = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="fashion.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Skills &amp; Livelihoods</Eyebrow>
          <Display size={92}>
            School opens<br />the mind. Skills<br />open <i style={{ color: C.yellow }}>doors</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · both matter */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="fashion-2.jpg" scrim="grad" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.cream}>Both matter</Eyebrow>
          <Kicker>
            A lesson becomes<br />a living.
          </Kicker>
          <Cap style={{ marginTop: 8 }}>Sewing, design, craft, and enterprise.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · Studio One (same image as S1, opposite zoom so the reuse reads as a new move) */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="fashion.jpg" scrim="solid" dur={92} from={1.2} to={1.05} />
        <MScene dur={92}>
          <Eyebrow color={C.cream}>Studio One</Eyebrow>
          <Kicker>
            Fashion as a tool<br />for <i style={{ color: C.green }}>change</i>.
          </Kicker>
          <Cap style={{ marginTop: 8 }}>Not commerce. Independence.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · outcome */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="women-portrait.jpg" scrim="grad" dur={92} />
        <MScene dur={92}>
          <Kicker style={{ fontSize: 90 }}>
            A skill is a living.<br />A living is <i style={{ color: C.yellow }}>freedom</i>.
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
          <Display size={100}>
            Dignity is<br />made by <i style={{ color: C.yellow }}>hand</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Skills Open Doors" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
