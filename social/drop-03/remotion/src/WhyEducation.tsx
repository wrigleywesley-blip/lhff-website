import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import {
  MScene,
  SceneBG,
  Eyebrow,
  Display,
  Kicker,
  Cap,
  Source,
  BigStat,
  Counter,
  Row,
  RainbowBar,
  Handle,
  PersistentChrome,
  InkBG,
} from "./ui";

// Sequence durations: 108 + 92 + 92 + 92 + 120 = 504
// Transitions: 3 x 18 + 1 x 24 = 78 overlap. 504 - 78 = 426 frames (14.2s @ 30fps)
export const WhyEducation = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="school-kids.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>The case for a classroom</Eyebrow>
          <Display size={100}>
            Why we bet<br />everything on<br /><i style={{ color: C.yellow }}>education</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the scale */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="school-fountain-night.jpg" scrim="solid" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.cream}>Right now</Eyebrow>
          <BigStat size={270}>
            <Counter to={250} startFrame={8} endFrame={50} /><span style={{ fontSize: 130 }}>M</span>
          </BigStat>
          <Cap>children and youth are out of school worldwide.</Cap>
          <Source>UNESCO (2024)</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the gut punch */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="edu-boy-writing.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.red}>Sub-Saharan Africa</Eyebrow>
          <BigStat size={190} color={C.red}>9 in 10</BigStat>
          <Cap>ten-year-olds cannot read and understand a simple sentence.</Cap>
          <Source>World Bank, Learning Poverty (2022)</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · but it works */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <InkBG />
        <MScene dur={92}>
          <Eyebrow color={C.green}>But education works</Eyebrow>
          <Kicker>
            The highest<br />return there <i style={{ color: C.green }}>is</i>.
          </Kicker>
          <Row n="+10%" color={C.green} l="in lifetime earnings for every extra year of school" delay={10} />
          <Row n="50%" color={C.yellow} l="more likely a child survives past five if their mother can read" delay={22} />
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
            This is where<br />we <i style={{ color: C.green }}>start</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Why Education" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
