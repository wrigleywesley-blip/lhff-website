import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// 75 70 70 85 → 300
export const NavidMotion = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <Sequence durationInFrames={75}>
      <SceneBG src="navid-orb.jpg" scrim="grad" dur={75} from={1.0} to={1.1} />
      <Scene dur={75} align="bottom">
        <RainbowBar delay={6} width={300} />
        <Eyebrow color={C.cream} style={{ marginTop: 24 }}>Technology · the AI companion</Eyebrow>
        <Display size={120}>Meet <i style={{ color: C.yellow }}>NAVID</i>.</Display>
      </Scene>
    </Sequence>

    <Sequence from={75} durationInFrames={70}>
      <SceneBG src="navid-wave.jpg" scrim="solid" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.sky}>The voice</Eyebrow>
        <Kicker>The voice of the<br />Foundation.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={145} durationInFrames={70}>
      <SceneBG src="navid-orb.jpg" scrim="solid" dur={70} from={1.08} to={1.18} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.cream}>What he is</Eyebrow>
        <Kicker>A guide,<br />not a <i style={{ color: C.sky }}>guru</i>.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={215} durationInFrames={85}>
      <InkBG />
      <Scene dur={85}>
        <RainbowBar delay={6} width={300} />
        <Eyebrow style={{ marginTop: 34 }}>Inside the Foundation app</Eyebrow>
        <Display size={114}>Always awake.<br />Always <i style={{ color: C.yellow }}>kind</i>.</Display>
        <Cap>A companion for the work between retreats.</Cap>
        <Handle />
      </Scene>
    </Sequence>

    <PersistentChrome topL="NAVID" topR="AI companion" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
