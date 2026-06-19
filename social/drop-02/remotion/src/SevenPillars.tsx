import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { Scene, Eyebrow, Display, Row, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// A70 B170 C90 → total 330
export const SevenPillars = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <Sequence durationInFrames={70}>
      <InkBG />
      <Scene dur={70}>
        <RainbowBar delay={6} width={320} />
        <Eyebrow style={{ marginTop: 30 }}>Taught in schools and retreats</Eyebrow>
        <Display size={122}>The seven<br /><i style={{ color: C.yellow }}>pillars</i>.</Display>
      </Scene>
    </Sequence>

    <Sequence from={70} durationInFrames={170}>
      <InkBG />
      <Scene dur={170}>
        <Eyebrow style={{ marginBottom: 18 }}>One colour each, across the rainbow</Eyebrow>
        <Row n="Purpose" l="know why you're here" color={C.red} delay={6} />
        <Row n="Wellness" l="take care of the room" color={C.orange} delay={16} />
        <Row n="Communication" l="most conflict is this" color={C.yellow} delay={26} />
        <Row n="Meditation" l="ten quiet minutes daily" color={C.green} delay={36} />
        <Row n="Discipline" l="the bridge to doing" color={C.sky} delay={46} />
        <Row n="Faith" l="trust what you can't see" color={C.blue} delay={56} />
        <Row n="Redemption" l="forgive yourself first" color={C.purple} delay={66} />
      </Scene>
    </Sequence>

    <Sequence from={240} durationInFrames={90}>
      <InkBG />
      <Scene dur={90}>
        <RainbowBar delay={6} width={320} />
        <Eyebrow style={{ marginTop: 30 }}>Taught in every retreat, lived after</Eyebrow>
        <Display size={120}>Seven pillars.<br />One <i style={{ color: C.yellow }}>life</i>.</Display>
        <Handle />
      </Scene>
    </Sequence>

    <PersistentChrome topL="The curriculum" topR="7 Pillars" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
