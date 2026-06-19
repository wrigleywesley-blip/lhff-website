import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, RainbowBar, Handle, PersistentChrome } from "./ui";

const Stamp = ({ children, color }: any) => (
  <Eyebrow color={color} style={{ fontSize: 30, marginBottom: 18 }}>{children}</Eyebrow>
);

// 70 65 65 65 65 80 → total 410
export const DayAtStudioOne = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <Sequence durationInFrames={70}>
      <SceneBG src="studio-01.jpg" scrim="grad" dur={70} />
      <Scene dur={70} align="bottom">
        <RainbowBar delay={6} width={300} />
        <Stamp color={C.yellow}>09:00 · doors open</Stamp>
        <Display size={104}>A day at<br />Studio <i style={{ color: C.yellow }}>One</i>.</Display>
      </Scene>
    </Sequence>

    <Sequence from={70} durationInFrames={65}>
      <SceneBG src="studio-06.jpg" scrim="grad" dur={65} />
      <Scene dur={65} align="bottom">
        <Stamp color={C.orange}>11:00</Stamp>
        <Kicker>The brief becomes<br />a shoot.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={135} durationInFrames={65}>
      <SceneBG src="studio-07.jpg" scrim="grad" dur={65} />
      <Scene dur={65} align="bottom">
        <Stamp color={C.red}>13:00</Stamp>
        <Kicker>On set.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={200} durationInFrames={65}>
      <SceneBG src="studio-03.jpg" scrim="grad" dur={65} />
      <Scene dur={65} align="bottom">
        <Stamp color={C.green}>15:00</Stamp>
        <Kicker>Selects &amp;<br />review.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={265} durationInFrames={65}>
      <SceneBG src="studio-04.jpg" scrim="grad" dur={65} />
      <Scene dur={65} align="bottom">
        <Stamp color={C.sky}>18:00</Stamp>
        <Kicker>The room<br />fills up.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={330} durationInFrames={80}>
      <SceneBG src="hero-mural.jpg" scrim="solid" dur={80} />
      <Scene dur={80}>
        <RainbowBar delay={6} width={300} />
        <Eyebrow style={{ marginTop: 34 }}>For emerging creatives, free</Eyebrow>
        <Display size={120}>The door<br />stays <i style={{ color: C.yellow }}>open</i>.</Display>
        <Handle>Apply · @lovehappinessfreedom</Handle>
      </Scene>
    </Sequence>

    <PersistentChrome topL="Studio One" topR="A Day" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
