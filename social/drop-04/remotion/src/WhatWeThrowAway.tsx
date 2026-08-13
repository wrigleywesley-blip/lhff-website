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
  RainbowBar,
  Handle,
  PersistentChrome,
  InkBG,
} from "./ui";

// 108 + 92 + 92 + 92 + 120 = 504 · transitions 3x18 + 1x24 = 78 · total 426 (14.2s)
export const WhatWeThrowAway = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="plastic-shore.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>On waste</Eyebrow>
          <Display size={116}>
            What we<br />throw <i style={{ color: C.orange }}>away</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the premise */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <InkBG />
        <MScene align="center" dur={92}>
          <Eyebrow color={C.orange}>The premise</Eyebrow>
          <Display size={112}>
            There is no<br />such place<br />as <i style={{ color: C.orange }}>away</i>.
          </Display>
          <Cap>Everything you have discarded is somewhere right now. Usually somewhere poorer than where you left it.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the food number */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="compost.jpg" scrim="solid" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.yellow}>Food</Eyebrow>
          <BigStat size={270}>
            <Counter to={33} startFrame={8} endFrame={50} /><span style={{ fontSize: 150 }}>%</span>
          </BigStat>
          <Cap>of all food produced for people is lost or wasted. The waste is not the food. It is every season that went into it.</Cap>
          <Source>FAO</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · cloth */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="reuse-workshop.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.purple}>Studio One</Eyebrow>
          <Kicker>
            The <i style={{ color: C.purple }}>offcut</i><br />is the material.
          </Kicker>
          <Cap>Fashion is the loudest waste industry on earth. A studio that treats scraps as stock is being honest about what it holds.</Cap>
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
          <Eyebrow style={{ marginTop: 34 }}>Waste is a design decision</Eyebrow>
          <Display size={112}>
            Nothing is<br />waste until<br />you <i style={{ color: C.orange }}>stop</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="What We Throw Away" topR="Drop 04 · Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
