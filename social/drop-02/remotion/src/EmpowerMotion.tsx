import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

const MAG = "#c84b8b";

// 75 70 70 85 → 300
export const EmpowerMotion = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <Sequence durationInFrames={75}>
      <SceneBG src="women-portrait.jpg" scrim="grad" dur={75} />
      <Scene dur={75} align="bottom">
        <RainbowBar delay={6} width={300} />
        <Eyebrow color={C.cream} style={{ marginTop: 24 }}>Women's Empowerment Retreat</Eyebrow>
        <Display size={108}>Empower your<br />true <i style={{ color: MAG }}>self</i>.</Display>
      </Scene>
    </Sequence>

    <Sequence from={75} durationInFrames={70}>
      <SceneBG src="women-circle.jpg" scrim="solid" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={C.cream}>Six days</Eyebrow>
        <Kicker>A room of<br />women.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={145} durationInFrames={70}>
      <SceneBG src="fashion-5.jpg" scrim="solid" dur={70} />
      <Scene dur={70} align="bottom">
        <Eyebrow color={MAG}>Built first for models</Eyebrow>
        <Kicker>Seen for more<br />than a look.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={215} durationInFrames={85}>
      <InkBG />
      <Scene dur={85}>
        <RainbowBar delay={6} width={300} />
        <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
        <Display size={104}>Become who you<br />already <i style={{ color: MAG }}>are</i>.</Display>
        <Cap>Six days. For women, by design.</Cap>
        <Handle />
      </Scene>
    </Sequence>

    <PersistentChrome topL="Empower Your True Self" topR="Retreat" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
