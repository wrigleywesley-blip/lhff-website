import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, BigStat, Cap, Source, Row, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// A90 B95 C100 D95 → total 380
export const Ocean = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
      {/* A · title */}
      <Sequence durationInFrames={90}>
        <SceneBG src="env-wildlife.jpg" scrim="grad" dur={90} />
        <Scene dur={90}>
          <Eyebrow color={C.sky}>Marine conservation · Mozambique</Eyebrow>
          <Display size={118}>
            The ocean is<br />still full of<br /><i style={{ color: C.sky }}>wonders</i>.
          </Display>
        </Scene>
      </Sequence>

      {/* B · dugongs */}
      <Sequence from={90} durationInFrames={95}>
        <SceneBG src="ocean-dugong.jpg" scrim="solid" dur={95} />
        <Scene dur={95}>
          <Eyebrow color={C.sky}>Bazaruto Archipelago</Eyebrow>
          <BigStat color={C.cream} size={196}>250&#8211;350</BigStat>
          <Cap>dugongs survive here: the Western Indian Ocean's last viable population.</Cap>
          <Source>Marine Mammal PA Task Force; Trotzuk et al. (2021)</Source>
        </Scene>
      </Sequence>

      {/* C · abundance */}
      <Sequence from={185} durationInFrames={100}>
        <SceneBG src="ocean-turtle.jpg" scrim="solid" dur={100} from={1.1} to={1.22} />
        <Scene dur={100}>
          <Eyebrow>A small sea, impossibly rich</Eyebrow>
          <Kicker>What these<br />waters hold.</Kicker>
          <Row n="2,000+" color={C.sky} l="fish species in Bazaruto's waters" delay={18} />
          <Row n="5" color={C.green} l="species of sea turtle nest and feed here" delay={30} />
          <Row n="300k ha" color={C.blue} l="of mangroves, Africa's largest forest" delay={42} />
        </Scene>
      </Sequence>

      {/* D · CTA */}
      <Sequence from={285} durationInFrames={95}>
        <InkBG />
        <Scene dur={95}>
          <RainbowBar delay={6} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
          <Display size={104}>
            Protect the water.<br />Life comes <i style={{ color: C.sky }}>back</i>.
          </Display>
          <Cap>In 2021, the largest dugong herd since the 1960s was recorded off Mozambique. Protection works.</Cap>
          <Handle />
        </Scene>
      </Sequence>

      <PersistentChrome topL="Marine conservation" topR="The Ocean" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
    </AbsoluteFill>
  );
};
