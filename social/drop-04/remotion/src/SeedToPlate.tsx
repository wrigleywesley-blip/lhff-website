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
  Cap,
  Source,
  RainbowBar,
  Handle,
  PersistentChrome,
  InkBG,
} from "./ui";

// 100 + 6x72 + 120 = 652 · transitions 6x14 + 1x22 = 106 · total 546 (18.2s)
export const SeedToPlate = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* cover */}
      <TransitionSeries.Sequence durationInFrames={100}>
        <SceneBG src="seed-bank.jpg" scrim="solid" dur={100} />
        <MScene dur={100}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Seven steps, one circle</Eyebrow>
          <Display size={124}>
            Seed to<br /><i style={{ color: C.yellow }}>plate</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />

      {/* 01 seed */}
      <TransitionSeries.Sequence durationInFrames={72}>
        <SceneBG src="seedling-hands.jpg" scrim="solid" dur={72} />
        <MScene dur={72}>
          <Eyebrow color={C.red}>Step 01</Eyebrow>
          <Display size={116}><i style={{ color: C.red }}>Seed</i>.</Display>
          <Cap>Saved from last season, not bought this one.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />

      {/* 02 soil */}
      <TransitionSeries.Sequence durationInFrames={72}>
        <SceneBG src="soil-hands.jpg" scrim="solid" dur={72} from={1.16} to={1.03} />
        <MScene dur={72}>
          <Eyebrow color={C.orange}>Step 02</Eyebrow>
          <Display size={116}><i style={{ color: C.orange }}>Soil</i>.</Display>
          <Cap>You are not growing plants. You are growing the ground.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />

      {/* 03 time */}
      <TransitionSeries.Sequence durationInFrames={72}>
        <SceneBG src="tomatoes-vine.jpg" scrim="solid" dur={72} />
        <MScene dur={72}>
          <Eyebrow color={C.yellow}>Step 03</Eyebrow>
          <Display size={116}><i style={{ color: C.yellow }}>Time</i>.</Display>
          <Cap>A tomato takes what it takes. Gardening cannot be argued with.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />

      {/* 04 harvest */}
      <TransitionSeries.Sequence durationInFrames={72}>
        <SceneBG src="harvest-basket.jpg" scrim="solid" dur={72} from={1.14} to={1.02} />
        <MScene dur={72}>
          <Eyebrow color={C.green}>Step 04</Eyebrow>
          <Display size={116}><i style={{ color: C.green }}>Harvest</i>.</Display>
          <Cap>Take what you need. Leave the best plant standing for next year.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />

      {/* 05 table */}
      <TransitionSeries.Sequence durationInFrames={72}>
        <SceneBG src="shared-meal.jpg" scrim="solid" dur={72} />
        <MScene dur={72}>
          <Eyebrow color={C.sky}>Step 05</Eyebrow>
          <Display size={116}><i style={{ color: C.sky }}>Table</i>.</Display>
          <Cap>Eaten together. A season of invisible work becomes something a child can taste.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />

      {/* 06 return */}
      <TransitionSeries.Sequence durationInFrames={72}>
        <SceneBG src="compost.jpg" scrim="solid" dur={72} from={1.16} to={1.03} />
        <MScene dur={72}>
          <Eyebrow color={C.purple}>Step 06</Eyebrow>
          <Display size={110}><i style={{ color: C.purple }}>Return</i>.</Display>
          <Cap>About a third of all food grown for people is lost or wasted. In a closed circle there is nothing to waste.</Cap>
          <Source>FAO</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 22 })}
      />

      {/* CTA */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <InkBG />
        <MScene align="center" dur={120} out={false}>
          <RainbowBar delay={4} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Step 07 is step 01</Eyebrow>
          <Display size={116}>
            A circle,<br />not a <i style={{ color: C.yellow }}>line</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Seed to Plate" topR="Drop 04 · Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
