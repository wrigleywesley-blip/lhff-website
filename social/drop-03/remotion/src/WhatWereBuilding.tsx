import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Eyebrow, Display, Kicker, Row, RainbowBar, Handle, PersistentChrome, InkBG, MScene } from "./ui";

// Sequence durations: 96 + 80 + 80 + 80 + 80 + 112 = 528
// Transitions: 4 x 18 + 1 x 24 = 96 overlap. 528 - 96 = 432 frames = 14.4s @ 30fps
export const WhatWereBuilding = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={96}>
        <InkBG />
        <MScene align="center" dur={96}>
          <RainbowBar delay={6} width={360} />
          <Eyebrow style={{ marginTop: 30 }}>The vision</Eyebrow>
          <Display size={110}>
            What we're<br /><i style={{ color: C.yellow }}>building</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the flywheel */}
      <TransitionSeries.Sequence durationInFrames={80}>
        <SceneBG src="edu-graduation.jpg" scrim="solid" dur={80} />
        <MScene dur={80}>
          <Eyebrow color={C.cream}>The flywheel</Eyebrow>
          <Kicker>
            Educate. Empower.<br /><i style={{ color: C.green }}>Transform</i>.
          </Kicker>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the movement */}
      <TransitionSeries.Sequence durationInFrames={80}>
        <SceneBG src="school-kids.jpg" scrim="grad" dur={80} from={1.18} to={1.04} />
        <MScene dur={80}>
          <Eyebrow color={C.cream}>The movement</Eyebrow>
          <Kicker>
            One classroom<br />becomes a<br />movement.
          </Kicker>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · pillars */}
      <TransitionSeries.Sequence durationInFrames={80}>
        <SceneBG src="hero-mural.jpg" scrim="solid" dur={80} />
        <MScene dur={80}>
          <Eyebrow color={C.cream}>What holds it up</Eyebrow>
          <Row n="Ed" color={C.green} l="Education, the mind set free" delay={6} />
          <Row n="Su" color={C.sky} l="Sustainability, a future worth inheriting" delay={16} />
          <Row n="Sp" color={C.purple} l="Spirituality, a life with meaning" delay={26} />
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S5 · join */}
      <TransitionSeries.Sequence durationInFrames={80}>
        <SceneBG src="edu-girl-reading.jpg" scrim="grad" dur={80} />
        <MScene dur={80}>
          <Kicker style={{ fontSize: 92 }}>
            You can be<br />part of <i style={{ color: C.yellow }}>this</i>.
          </Kicker>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 24 })}
      />

      {/* S6 · CTA */}
      <TransitionSeries.Sequence durationInFrames={112}>
        <InkBG />
        <MScene align="center" dur={112} out={false}>
          <RainbowBar delay={4} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
          <Display size={96}>
            Love. Happiness.<br /><i style={{ color: C.yellow }}>Freedom</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="What We're Building" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
