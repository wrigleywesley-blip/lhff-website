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
export const Water = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="water-tap.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>The resource nobody thanks</Eyebrow>
          <Display size={168}><i style={{ color: C.sky }}>Water</i>.</Display>
          <Cap>Everything else on this list is negotiable.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · scarcity */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="dry-earth.jpg" scrim="solid" dur={92} from={1.18} to={1.04} />
        <MScene dur={92}>
          <Eyebrow color={C.orange}>South Africa</Eyebrow>
          <BigStat size={270}>
            <span style={{ fontSize: 150 }}>Top </span><Counter to={30} startFrame={8} endFrame={48} />
          </BigStat>
          <Cap>One of the 30 driest countries on earth. This is not a future problem. It is the operating condition.</Cap>
          <Source>SA Dept. of Water and Sanitation</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · Day Zero */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="cape-landscape.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.red}>Cape Town, 2018</Eyebrow>
          <Kicker>
            Months from<br />turning the taps <i style={{ color: C.red }}>off</i>.
          </Kicker>
          <Cap>Four million people counting down to a date. It never arrived, because behaviour changed in time. That is the whole lesson.</Cap>
          <Source>City of Cape Town</Source>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · what we do */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="rain-leaves.jpg" scrim="solid" dur={92} from={1.16} to={1.02} />
        <MScene dur={92}>
          <Eyebrow color={C.sky}>What we do</Eyebrow>
          <Kicker>
            Catch it before<br />it <i style={{ color: C.sky }}>leaves</i>.
          </Kicker>
          <Cap>Roofs are collection surfaces. Then mulch, shade and deep beds keep it in the ground once you have it.</Cap>
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
          <Display size={108}>
            Nobody notices<br />water until<br />there is <i style={{ color: C.sky }}>none</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Water" topR="Drop 04 · Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
