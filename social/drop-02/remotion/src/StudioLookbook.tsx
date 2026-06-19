import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// 70 70 70 70 80 → total 360
export const StudioLookbook = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <Sequence durationInFrames={70}>
      <SceneBG src="fashion-2.jpg" scrim="grad" dur={70} />
      <Scene dur={70} align="bottom">
        <RainbowBar delay={6} width={300} />
        <Eyebrow color={C.cream} style={{ marginTop: 26 }}>Studio One · Editorial</Eyebrow>
        <Display size={120}>The <i style={{ color: C.yellow }}>Lookbook</i>.</Display>
      </Scene>
    </Sequence>

    <Sequence from={70} durationInFrames={70}>
      <SceneBG src="fashion.jpg" scrim="grad" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.cream}>Look 01</Eyebrow>
        <Kicker>We wear<br />our stories.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={140} durationInFrames={70}>
      <SceneBG src="fashion-6.jpg" scrim="grad" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.orange}>Look 02</Eyebrow>
        <Kicker>Made by hand.<br />Worn with <i style={{ color: C.orange }}>intent</i>.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={210} durationInFrames={70}>
      <SceneBG src="fashion-5.jpg" scrim="grad" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.yellow}>Look 03</Eyebrow>
        <Kicker>Colour is a<br /><i style={{ color: C.yellow }}>language</i>.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={280} durationInFrames={80}>
      <InkBG />
      <Scene dur={80}>
        <RainbowBar delay={6} width={300} />
        <Eyebrow style={{ marginTop: 34 }}>Where young creatives make the work</Eyebrow>
        <Display size={112}>The studio<br />is <i style={{ color: C.yellow }}>yours</i>.</Display>
        <Cap>Free studio time. Real mentors. Real client work. No gatekeeping.</Cap>
        <Handle>Apply · @lovehappinessfreedom</Handle>
      </Scene>
    </Sequence>

    <PersistentChrome topL="Studio One" topR="Lookbook" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
