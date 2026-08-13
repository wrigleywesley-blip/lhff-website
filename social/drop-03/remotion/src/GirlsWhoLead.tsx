import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import {
  SceneBG,
  Eyebrow,
  Display,
  Kicker,
  BigStat,
  Cap,
  Source,
  Counter,
  RainbowBar,
  Handle,
  PersistentChrome,
  InkBG,
  MScene,
} from "./ui";

// Sequence durations: 108 + 92 + 92 + 92 + 120 = 504
// Transitions: 3 × 18 + 1 × 24 = 78 overlap → 504 − 78 = 426 frames ≈ 14.2s @ 30fps
export const GirlsWhoLead = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="edu-girl-reading.jpg" scrim="grad" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Girls &amp; Empowerment</Eyebrow>
          <Display size={96}>
            Educate a<br /><i style={{ color: C.yellow }}>girl</i>, and you<br />change a nation.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the ripple */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="women-portrait.jpg" scrim="solid" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.cream}>The ripple</Eyebrow>
          <BigStat size={270} color={C.green}>
            <Counter to={50} startFrame={8} endFrame={46} suffix="%" />
          </BigStat>
          <Cap>more likely a child survives past age five when their mother can read.</Cap>
          <Source>UNESCO</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the barrier */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="school-kids.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.red}>Still, in 2026</Eyebrow>
          <Kicker>
            The last<br />to be let <i style={{ color: C.red }}>in</i>.
          </Kicker>
          <Source>UNESCO UIS</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · the turn */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="women-circle.jpg" scrim="grad" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.cream}>What we do</Eyebrow>
          <Kicker>
            She is not<br />alone.
          </Kicker>
          <Cap>Mentorship, safe classrooms, and women who lead the way.</Cap>
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
          <Display size={92}>
            She was never<br />the problem.<br />She's the <i style={{ color: C.green }}>answer</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Girls Who Lead" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
