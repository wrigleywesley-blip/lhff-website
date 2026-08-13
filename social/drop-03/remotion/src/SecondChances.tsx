import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG, MScene } from "./ui";

// Sequence durations: 120 + 108 + 108 + 128 = 464
// Transitions: 2 × 18 + 1 × 24 = 60 overlap → 464 − 60 = 404 frames ≈ 13.5s @ 30fps
export const SecondChances = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneBG src="women-portrait.jpg" scrim="solid" dur={120} />
        <MScene dur={120}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Redemption</Eyebrow>
          <Display size={100}>
            No one is<br />their <i style={{ color: C.red }}>worst day</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · a road back */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="school-fountain-night.jpg" scrim="grad" dur={108} from={1.18} to={1.04} />
        <MScene dur={108}>
          <Eyebrow color={C.cream}>A road back</Eyebrow>
          <Kicker>
            A classroom can<br />still open.
          </Kicker>
          <Cap style={{ marginTop: 8 }}>For the ones who dropped out, were pushed out, or never got a first chance.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · begin again — photo has garbled AI text on the certificate,
          so all type stays in the darkened lower third (MScene default bottom align) */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="edu-graduation.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <Kicker>
            A second<br /><i style={{ color: C.green }}>beginning</i>.
          </Kicker>
          <Cap style={{ marginTop: 8 }}>Skills, literacy, and a community that believes the story is not over.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 24 })}
      />

      {/* S4 · CTA */}
      <TransitionSeries.Sequence durationInFrames={128}>
        <InkBG />
        <MScene align="center" dur={128} out={false}>
          <RainbowBar delay={4} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
          <Display size={100}>
            Everyone deserves<br />a <i style={{ color: C.yellow }}>next chapter</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Second Chances" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
