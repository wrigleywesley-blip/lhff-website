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
export const WhySustainability = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="gardener-portrait.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Education · Sustainability · Spirituality</Eyebrow>
          <Display size={96}>
            Why a foundation<br />about people<br />teaches <i style={{ color: C.green }}>soil</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the honest version */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="dry-earth.jpg" scrim="solid" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.orange}>The honest version</Eyebrow>
          <Kicker>
            Rarely a shortage<br />of <i style={{ color: C.orange }}>effort</i>.
          </Kicker>
          <Cap>Usually a shortage of ground that gives back. People are working. The land has stopped answering.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the climate share */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="community-planting.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.sky}>Food systems</Eyebrow>
          <BigStat size={250}>
            <Counter to={33} startFrame={8} endFrame={50} /><span style={{ fontSize: 140 }}>%</span>
          </BigStat>
          <Cap>of global greenhouse gas emissions, roughly. The people who did least to cause it are the ones planting through it.</Cap>
          <Source>IPCC (2019)</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · aid vs garden */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="garden-beds.jpg" scrim="solid" dur={92} from={1.16} to={1.02} />
        <MScene dur={92}>
          <Eyebrow color={C.green}>What we choose</Eyebrow>
          <Kicker>
            Aid arrives.<br />A garden <i style={{ color: C.green }}>stays</i>.
          </Kicker>
          <Cap>A truck of food solves a Tuesday. Soil, a seed line and someone who knows how to use both solves the next decade.</Cap>
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
          <Eyebrow style={{ marginTop: 34 }}>Pillar two of three</Eyebrow>
          <Display size={98}>
            You cannot free<br />a person from<br />hungry <i style={{ color: C.green }}>ground</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Why Sustainability" topR="Drop 04 · Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
