import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, BigStat, Cap, Source, Counter, Row, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// Scene lengths (frames @30fps): A90 B90 C95 D100 E95  → total 470
export const Mozambique = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
      {/* A · title */}
      <Sequence durationInFrames={90}>
        <SceneBG src="moz-elephants.jpg" scrim="solid" dur={90} />
        <Scene dur={90}>
          <Eyebrow color={C.cream}>Wild Mozambique · Conservation</Eyebrow>
          <Display size={118}>
            A wilderness<br />that refused to<br /><i style={{ color: C.yellow }}>disappear</i>.
          </Display>
        </Scene>
      </Sequence>

      {/* B · 96% lost */}
      <Sequence from={90} durationInFrames={90}>
        <SceneBG src="moz-savanna.jpg" scrim="solid" dur={90} />
        <Scene dur={90}>
          <Eyebrow color={C.red}>1977 – 1992 · civil war</Eyebrow>
          <BigStat color={C.red} size={300}>
            <Counter to={96} startFrame={8} endFrame={52} suffix="%" />
          </BigStat>
          <Cap>of Gorongosa's large-wildlife biomass was lost during Mozambique's civil war.</Cap>
          <Source>Stalmans et al., PLOS One (2019)</Source>
        </Scene>
      </Sequence>

      {/* C · 110,000+ back */}
      <Sequence from={180} durationInFrames={95}>
        <SceneBG src="moz-elephants.jpg" scrim="grad" dur={95} from={1.12} to={1.24} />
        <Scene dur={95}>
          <Eyebrow color={C.green}>Restored since 2008</Eyebrow>
          <BigStat color={C.cream} size={172}>
            <Counter to={110000} startFrame={8} endFrame={62} thousands />
            <span style={{ color: C.green }}>+</span>
          </BigStat>
          <Cap>large animals roam Gorongosa again, back from near-zero after the war.</Cap>
          <Source>Gorongosa Aerial Wildlife Count (2022)</Source>
        </Scene>
      </Sequence>

      {/* D · species rebound rows */}
      <Sequence from={275} durationInFrames={100}>
        <SceneBG src="moz-lion.jpg" scrim="solid" dur={100} />
        <Scene dur={100}>
          <Eyebrow>Species by species</Eyebrow>
          <Kicker>Life came back.</Kicker>
          <Row n="6→150+" color={C.orange} l="Lions, from near-extinction to thriving" delay={18} />
          <Row n="55,000+" color={C.yellow} l="Waterbuck, the single greatest rebound" delay={30} />
          <Row n="1st" color={C.sky} l="Successful wild-dog return in Mozambique" delay={42} />
        </Scene>
      </Sequence>

      {/* E · CTA */}
      <Sequence from={375} durationInFrames={95}>
        <InkBG />
        <Scene dur={95}>
          <RainbowBar delay={6} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
          <Display size={104}>
            Recovery is<br /><i style={{ color: C.green }}>possible</i>.
          </Display>
          <Cap>A quarter of Mozambique is now under protection. The wild is worth defending.</Cap>
          <Handle />
        </Scene>
      </Sequence>

      <PersistentChrome topL="Wild Mozambique" topR="Awareness" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
    </AbsoluteFill>
  );
};
