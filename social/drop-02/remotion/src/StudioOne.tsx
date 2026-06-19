import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Scene, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG } from "./ui";

// A90 B90 C90 D95 → total 365
export const StudioOne = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
      {/* A · title */}
      <Sequence durationInFrames={90}>
        <SceneBG src="fashion.jpg" scrim="grad" dur={90} />
        <Scene dur={90}>
          <Eyebrow color={C.orange}>Studio One · Creative</Eyebrow>
          <Display size={112}>
            Fashion as a<br />movement.<br />Not a <i style={{ color: C.red }}>market</i>.
          </Display>
        </Scene>
      </Sequence>

      {/* B · what it is */}
      <Sequence from={90} durationInFrames={90}>
        <SceneBG src="studio-01.jpg" scrim="solid" dur={90} />
        <Scene dur={90}>
          <Eyebrow color={C.orange}>Maputo · open to creatives</Eyebrow>
          <Kicker>A studio, handed<br />to the next<br /><i style={{ color: C.yellow }}>generation</i>.</Kicker>
          <Cap>Free studio time. Real mentors. Real client work. No gatekeeping.</Cap>
        </Scene>
      </Sequence>

      {/* C · why fashion */}
      <Sequence from={180} durationInFrames={90}>
        <SceneBG src="fashion-4.jpg" scrim="solid" dur={90} />
        <Scene dur={90}>
          <Eyebrow color={C.magenta}>Our standpoint</Eyebrow>
          <Kicker>We use fashion to<br />say what matters.</Kicker>
          <Cap>Young women's rights. Identity. Freedom. Seven colours, every culture, one circle.</Cap>
        </Scene>
      </Sequence>

      {/* D · CTA */}
      <Sequence from={270} durationInFrames={95}>
        <InkBG />
        <Scene dur={95}>
          <RainbowBar delay={6} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Studio One · open call</Eyebrow>
          <Display size={110}>
            Come and make<br /><i style={{ color: C.yellow }}>something</i>.
          </Display>
          <Cap>Applications are open to emerging creatives. Bring your portfolio, or just bring yourself.</Cap>
          <Handle>Apply · @lovehappinessfreedom</Handle>
        </Scene>
      </Sequence>

      <PersistentChrome topL="Studio One" topR="Creative" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
    </AbsoluteFill>
  );
};
