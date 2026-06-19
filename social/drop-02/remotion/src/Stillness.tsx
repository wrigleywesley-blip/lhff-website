import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// 75 70 70 70 85 → total 370
export const Stillness = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <Sequence durationInFrames={75}>
      <SceneBG src="wb-meditation.jpg" scrim="grad" dur={75} />
      <Scene dur={75} align="bottom">
        <RainbowBar delay={6} width={300} />
        <Eyebrow color={C.cream} style={{ marginTop: 24 }}>Spirituality · Well-being</Eyebrow>
        <Display size={118}>Stillness is<br />a <i style={{ color: C.yellow }}>skill</i>.</Display>
      </Scene>
    </Sequence>

    <Sequence from={75} durationInFrames={70}>
      <SceneBG src="villa-pool-ocean.jpg" scrim="grad" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.cream}>Cape Town · six days</Eyebrow>
        <Kicker>Six days.<br />No noise.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={145} durationInFrames={70}>
      <SceneBG src="wb-walk.jpg" scrim="grad" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.cream}>The practice</Eyebrow>
        <Kicker>Slow mornings.<br />Long walks.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={215} durationInFrames={70}>
      <SceneBG src="wb-fire.jpg" scrim="solid" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.orange}>The fire circle</Eyebrow>
        <Kicker>And a fire to<br />sit <i style={{ color: C.orange }}>around</i>.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={285} durationInFrames={85}>
      <InkBG />
      <Scene dur={85}>
        <RainbowBar delay={6} width={300} />
        <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
        <Display size={108}>Come back to<br /><i style={{ color: C.yellow }}>yourself</i>.</Display>
        <Cap>Six-day retreats for individuals and teams.</Cap>
        <Handle />
      </Scene>
    </Sequence>

    <PersistentChrome topL="The Retreat" topR="Stillness" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
