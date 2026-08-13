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
export const TheLandRemembers = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="cape-landscape.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>On restoration, Western Cape</Eyebrow>
          <Display size={120}>
            The land<br /><i style={{ color: C.green }}>remembers</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the Cape number */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="fynbos-macro.jpg" scrim="solid" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.green}>The Cape Floral Kingdom</Eyebrow>
          <BigStat size={260}>
            <Counter to={9000} thousands startFrame={8} endFrame={54} />
          </BigStat>
          <Cap>plant species, roughly seven in ten found nowhere else on earth. We did not choose an ordinary place to build in.</Cap>
          <Source>SANBI</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the principle */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="restored-hillside.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.yellow}>The principle</Eyebrow>
          <Kicker>
            Plant what belongs,<br />not what <i style={{ color: C.yellow }}>impresses</i>.
          </Kicker>
          <Cap>Indigenous planting needs less water and holds the slope in a storm. A lawn is a decision to fight the climate you live in.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · a crowd, not a hero */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="community-planting.jpg" scrim="solid" dur={92} from={1.16} to={1.02} />
        <MScene dur={92}>
          <Eyebrow color={C.sky}>Planting days</Eyebrow>
          <Kicker>
            Restoration is a<br /><i style={{ color: C.sky }}>crowd</i>, not a hero.
          </Kicker>
          <Cap>One person with a spade is a nice photograph. Forty people on a slope for one Saturday changes a hillside.</Cap>
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
          <Eyebrow style={{ marginTop: 34 }}>Planting for people we will never meet</Eyebrow>
          <Display size={106}>
            Give the ground<br />a reason to<br />come <i style={{ color: C.green }}>back</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="The Land Remembers" topR="Drop 04 · Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
