import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, BigStat, Cap, Source, Counter, Row, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// Scene lengths (frames @30fps): A90 B95 C100 D95 → total 380
export const Seeds = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
      {/* A · title */}
      <Sequence durationInFrames={90}>
        <SceneBG src="seeds-seedling.jpg" scrim="grad" dur={90} />
        <Scene dur={90}>
          <Eyebrow color={C.green}>Sustainability · Organic Seeds</Eyebrow>
          <Display size={116}>
            A seed is a<br />small act of<br /><i style={{ color: C.green }}>defiance</i>.
          </Display>
        </Scene>
      </Sequence>

      {/* B · 267,000 ha lost */}
      <Sequence from={90} durationInFrames={95}>
        <SceneBG src="moz-savanna.jpg" scrim="solid" dur={95} />
        <Scene dur={95}>
          <Eyebrow color={C.red}>Mozambique · every year</Eyebrow>
          <BigStat color={C.red} size={170}>
            <Counter to={267000} startFrame={8} endFrame={60} thousands />
            <span style={{ fontSize: 92, color: C.cream }}> ha</span>
          </BigStat>
          <Cap>of forest lost annually. Around 1,000 football fields a day. Forest loss drives most of the country's emissions.</Cap>
          <Source>National Forest Inventory (2018)</Source>
        </Scene>
      </Sequence>

      {/* C · why organic seeds */}
      <Sequence from={185} durationInFrames={100}>
        <SceneBG src="seeds-seedling.jpg" scrim="solid" dur={100} from={1.1} to={1.22} />
        <Scene dur={100}>
          <Eyebrow color={C.green}>Why organic seeds</Eyebrow>
          <Kicker>Better soil.<br />Better food.</Kicker>
          <Row n="0" color={C.green} l="synthetic chemicals, pesticides or GMOs" delay={18} />
          <Row n="10–25%" color={C.yellow} l="higher yields, year on year" delay={30} />
          <Row n="∞" color={C.sky} l="saved and replanted, season after season" delay={42} />
        </Scene>
      </Sequence>

      {/* D · CTA */}
      <Sequence from={285} durationInFrames={95}>
        <InkBG />
        <Scene dur={95}>
          <RainbowBar delay={6} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
          <Display size={120}>
            We teach this<br />in <i style={{ color: C.green }}>schools</i>.
          </Display>
          <Cap>The Organic Seeds initiative brings sustainable farming into classrooms across Mozambique.</Cap>
          <Handle />
        </Scene>
      </Sequence>

      <PersistentChrome topL="Organic Seeds" topR="Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
    </AbsoluteFill>
  );
};
