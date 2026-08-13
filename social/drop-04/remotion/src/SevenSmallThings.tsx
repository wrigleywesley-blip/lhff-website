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
  RainbowBar,
  Handle,
  PersistentChrome,
  InkBG,
} from "./ui";

// 100 + 7x64 + 120 = 668 · transitions 7x12 + 1x22 = 106 · total 562 (18.7s)
export const SevenSmallThings = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* cover */}
      <TransitionSeries.Sequence durationInFrames={100}>
        <SceneBG src="kids-seedlings.jpg" scrim="solid" dur={100} />
        <MScene dur={100}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Seven colours, seven habits</Eyebrow>
          <Display size={116}>
            Seven small<br /><i style={{ color: C.green }}>things</i>.
          </Display>
          <Cap>None of them require money.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />

      {/* 01 */}
      <TransitionSeries.Sequence durationInFrames={64}>
        <SceneBG src="seed-bank.jpg" scrim="solid" dur={64} />
        <MScene dur={64}>
          <Eyebrow color={C.red}>01</Eyebrow>
          <Display size={108}>Save one <i style={{ color: C.red }}>seed</i>.</Display>
          <Cap>From the best tomato you eat this month.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />

      {/* 02 */}
      <TransitionSeries.Sequence durationInFrames={64}>
        <SceneBG src="compost.jpg" scrim="solid" dur={64} from={1.16} to={1.03} />
        <MScene dur={64}>
          <Eyebrow color={C.orange}>02</Eyebrow>
          <Display size={98}>Stop binning<br />your <i style={{ color: C.orange }}>peels</i>.</Display>
          <Cap>A bucket with a lid is a composting system.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />

      {/* 03 */}
      <TransitionSeries.Sequence durationInFrames={64}>
        <SceneBG src="water-tank.jpg" scrim="solid" dur={64} />
        <MScene dur={64}>
          <Eyebrow color={C.yellow}>03</Eyebrow>
          <Display size={108}>Catch the <i style={{ color: C.yellow }}>rain</i>.</Display>
          <Cap>One drum under one downpipe.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />

      {/* 04 */}
      <TransitionSeries.Sequence durationInFrames={64}>
        <SceneBG src="tomatoes-vine.jpg" scrim="solid" dur={64} from={1.14} to={1.02} />
        <MScene dur={64}>
          <Eyebrow color={C.green}>04</Eyebrow>
          <Display size={98}>Grow one thing<br />you <i style={{ color: C.green }}>eat</i>.</Display>
          <Cap>Not a herb that dies on a windowsill.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />

      {/* 05 */}
      <TransitionSeries.Sequence durationInFrames={64}>
        <SceneBG src="reuse-workshop.jpg" scrim="solid" dur={64} />
        <MScene dur={64}>
          <Eyebrow color={C.sky}>05</Eyebrow>
          <Display size={94}>Fix it before you<br /><i style={{ color: C.sky }}>replace</i> it.</Display>
          <Cap>Repair was ordinary until we stopped doing it.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />

      {/* 06 */}
      <TransitionSeries.Sequence durationInFrames={64}>
        <SceneBG src="plastic-shore.jpg" scrim="solid" dur={64} from={1.16} to={1.03} />
        <MScene dur={64}>
          <Eyebrow color={C.blue}>06</Eyebrow>
          <Display size={108}>Refuse the <i style={{ color: C.blue }}>bag</i>.</Display>
          <Cap>Recycling is damage control. Refusing is prevention.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />

      {/* 07 */}
      <TransitionSeries.Sequence durationInFrames={64}>
        <SceneBG src="tree-planting.jpg" scrim="solid" dur={64} />
        <MScene dur={64}>
          <Eyebrow color={C.purple}>07</Eyebrow>
          <Display size={94}>Plant a tree you<br />will not sit <i style={{ color: C.purple }}>under</i>.</Display>
          <Cap>The oldest test of whether a person understood any of this.</Cap>
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
          <Eyebrow style={{ marginTop: 34 }}>Seven colours. Seven habits. One week.</Eyebrow>
          <Display size={116}>
            Pick one.<br />Start <i style={{ color: C.green }}>today</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Seven Small Things" topR="Drop 04 · Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
