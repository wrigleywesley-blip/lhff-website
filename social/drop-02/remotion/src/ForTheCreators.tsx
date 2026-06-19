import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

const Stamp = ({ children, color }: any) => (
  <Eyebrow color={color} style={{ fontSize: 30, marginBottom: 18 }}>{children}</Eyebrow>
);

// 75 65 65 65 85 → total 355
export const ForTheCreators = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <Sequence durationInFrames={75}>
      <SceneBG src="fashion-5.jpg" scrim="grad" dur={75} />
      <Scene dur={75} align="bottom">
        <RainbowBar delay={6} width={300} />
        <Eyebrow color={C.cream} style={{ marginTop: 24 }}>Studio One · Open Call</Eyebrow>
        <Display size={116}>For the ones<br />who <i style={{ color: C.red }}>make</i>.</Display>
      </Scene>
    </Sequence>

    <Sequence from={75} durationInFrames={65}>
      <SceneBG src="cr-photographer.jpg" scrim="grad" dur={65} />
      <Scene dur={65} align="bottom">
        <Stamp color={C.sky}>Photographers</Stamp>
        <Kicker>Bring your eye.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={140} durationInFrames={65}>
      <SceneBG src="cr-designer.jpg" scrim="grad" dur={65} />
      <Scene dur={65} align="bottom">
        <Stamp color={C.orange}>Designers &amp; makers</Stamp>
        <Kicker>Bring your hands.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={205} durationInFrames={65}>
      <SceneBG src="cr-filmmaker.jpg" scrim="grad" dur={65} />
      <Scene dur={65} align="bottom">
        <Stamp color={C.green}>Filmmakers &amp; models</Stamp>
        <Kicker>Bring your voice.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={270} durationInFrames={85}>
      <InkBG />
      <Scene dur={85}>
        <RainbowBar delay={6} width={300} />
        <Eyebrow style={{ marginTop: 34 }}>No fees. No gatekeeping.</Eyebrow>
        <Display size={116}>The studio<br />is <i style={{ color: C.yellow }}>yours</i>.</Display>
        <Cap>Applications open to young photographers, designers, models and filmmakers.</Cap>
        <Handle>Apply · @lovehappinessfreedom</Handle>
      </Scene>
    </Sequence>

    <PersistentChrome topL="Studio One" topR="For the Creators" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
