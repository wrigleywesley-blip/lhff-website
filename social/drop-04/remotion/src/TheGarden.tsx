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
  RainbowBar,
  Handle,
  PersistentChrome,
  InkBG,
} from "./ui";

// 108 + 92 + 92 + 92 + 120 = 504 · transitions 3x18 + 1x24 = 78 · total 426 (14.2s)
export const TheGarden = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="garden-beds.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Maputo, Mozambique</Eyebrow>
          <Display size={104}>
            The garden<br />that feeds<br />the <i style={{ color: C.green }}>school</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · dead ground */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="soil-hands.jpg" scrim="solid" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.orange}>Where it started</Eyebrow>
          <Kicker>
            A strip of<br /><i style={{ color: C.orange }}>dead ground</i>.
          </Kicker>
          <Cap>Compacted, sun-baked, walked over daily. Nobody planted there because nobody believed it would grow.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the work */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="garden-watering.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.sky}>The work</Eyebrow>
          <Kicker>
            Soil is made,<br />not <i style={{ color: C.sky }}>found</i>.
          </Kicker>
          <Cap>Scraps, leaf litter, ash, patience. The children did the turning. They learned the boring part is the part that works.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · the point */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="shared-meal.jpg" scrim="solid" dur={92} from={1.16} to={1.02} />
        <MScene dur={92}>
          <Eyebrow color={C.yellow}>Twelve metres, bed to pot</Eyebrow>
          <Kicker>
            A fed child<br />can <i style={{ color: C.yellow }}>learn</i>.
          </Kicker>
          <Cap>Every education programme on earth is built on top of a meal. We stopped treating that as somebody else's department.</Cap>
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
          <Display size={110}>
            Feed the soil.<br />Feed the <i style={{ color: C.green }}>child</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="The Garden" topR="Drop 04 · Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
