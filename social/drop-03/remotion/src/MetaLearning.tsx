import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Eyebrow, Display, Kicker, Cap, Row, RainbowBar, Handle, PersistentChrome, InkBG, MScene } from "./ui";

// Sequence durations: 108 + 92 + 92 + 92 + 120 = 504
// Transitions: 3 × 18 + 1 × 24 = 78 overlap → 504 − 78 = 426 frames ≈ 14.2s @ 30fps
export const MetaLearning = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="edu-boy-writing.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>MetaLearning</Eyebrow>
          <Display size={96}>
            We don't teach<br />facts. We teach<br /><i style={{ color: C.green }}>how to learn</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the old way */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="school-classroom.jpg" scrim="grad" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.red}>The old way</Eyebrow>
          <Kicker>
            Memorise.<br />Forget.<br />Repeat.
          </Kicker>
          <Cap>Rote learning fills a child for a test and empties them by morning.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the method */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="edu-mentor.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.cream}>The method</Eyebrow>
          <Row n="Ask" color={C.yellow} l="start from the child's own question" delay={8} />
          <Row n="Connect" color={C.green} l="tie the new to what they already know" delay={20} />
          <Row n="Apply" color={C.sky} l="use it the same day, in the real world" delay={32} />
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · the result */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="edu-girl-reading.jpg" scrim="grad" dur={92} />
        <MScene dur={92}>
          <Kicker style={{ fontSize: 92 }}>
            Curiosity that<br />outlives the <i style={{ color: C.yellow }}>lesson</i>.
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
            Give a child<br />a way to <i style={{ color: C.green }}>think</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="MetaLearning" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
