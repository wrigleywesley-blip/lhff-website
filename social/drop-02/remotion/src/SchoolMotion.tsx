import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

const Stamp = ({ children, color }: any) => (
  <Eyebrow color={color} style={{ fontSize: 30, marginBottom: 18 }}>{children}</Eyebrow>
);

// 75 65 70 70 85 → 365
export const SchoolMotion = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <Sequence durationInFrames={75}>
      <SceneBG src="school-kids.jpg" scrim="grad" dur={75} />
      <Scene dur={75} align="bottom">
        <RainbowBar delay={6} width={300} />
        <Eyebrow color={C.cream} style={{ marginTop: 24 }}>Education · Maputo</Eyebrow>
        <Display size={106}>We rebuilt a<br />whole <i style={{ color: C.yellow }}>school</i>.</Display>
      </Scene>
    </Sequence>

    <Sequence from={75} durationInFrames={65}>
      <SceneBG src="env-school-kids.jpg" scrim="solid" dur={65} />
      <Scene dur={65} align="bottom">
        <Eyebrow color={C.cream}>Completed 2024</Eyebrow>
        <Kicker>From the<br />ground up.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={140} durationInFrames={70}>
      <SceneBG src="school-seedlings.jpg" scrim="solid" dur={70} />
      <Scene dur={70} align="bottom">
        <Stamp color={C.green}>Organic Seeds in class</Stamp>
        <Kicker>Lessons you<br />can eat.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={210} durationInFrames={70}>
      <SceneBG src="school-teacher.jpg" scrim="solid" dur={70} />
      <Scene dur={70} align="bottom">
        <Stamp color={C.sky}>Triangle Empowerment</Stamp>
        <Kicker>Student. Teacher.<br />Parent.</Kicker>
      </Scene>
    </Sequence>

    <Sequence from={280} durationInFrames={85}>
      <InkBG />
      <Scene dur={85}>
        <RainbowBar delay={6} width={300} />
        <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
        <Display size={110}>Education is the<br />longest <i style={{ color: C.green }}>game</i>.</Display>
        <Cap>The 7 Pillars, taught where it counts.</Cap>
        <Handle />
      </Scene>
    </Sequence>

    <PersistentChrome topL="The School" topR="Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
