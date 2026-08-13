import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import {
  MScene,
  SceneBG,
  Eyebrow,
  Display,
  Kicker,
  Cap,
  RainbowBar,
  Handle,
  PersistentChrome,
  InkBG,
} from "./ui";

// 108 + 92 + 92 + 92 + 120 = 504 · transitions 3x18 + 1x24 = 78 · total 426 (14.2s)
export const HouseThatRunsOnSun = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="villa-dusk.jpg" scrim="solid" dur={108} />
        <MScene dur={108}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>The retreat villa, Cape Town</Eyebrow>
          <Display size={110}>
            The house<br />that runs<br />on <i style={{ color: C.yellow }}>sun</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · the roof */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="solar-roof.jpg" scrim="solid" dur={92} from={1.16} to={1.03} />
        <MScene dur={92}>
          <Eyebrow color={C.yellow}>The roof</Eyebrow>
          <Kicker>
            Either a cost<br />or a <i style={{ color: C.yellow }}>supply</i>.
          </Kicker>
          <Cap>Panels above, tanks below, batteries between. In a country of scheduled blackouts, that is not a luxury.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · the garden */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="villa-garden.jpg" scrim="solid" dur={92} />
        <MScene dur={92}>
          <Eyebrow color={C.green}>The garden</Eyebrow>
          <Kicker>
            The kitchen<br />shops <i style={{ color: C.green }}>outside</i>.
          </Kicker>
          <Cap>Guests eat what grew on the terrace they walked past that morning. Nothing arrives in a refrigerated truck.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · the engine */}
      <TransitionSeries.Sequence durationInFrames={92}>
        <SceneBG src="garden-beds.jpg" scrim="solid" dur={92} from={1.16} to={1.02} />
        <MScene dur={92}>
          <Eyebrow color={C.sky}>The engine</Eyebrow>
          <Kicker>
            A retreat here pays<br />for a classroom in <i style={{ color: C.sky }}>Maputo</i>.
          </Kicker>
          <Cap>The villa is not a perk. It is the machine that funds the school, so the work does not live or die on one donor's mood.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 24 })}
      />

      {/* S5 · CTA */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <InkBG />
        <MScene align="center" dur={120} out={false}>
          <RainbowBar delay={4} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Cape Town, Western Cape</Eyebrow>
          <Display size={106}>
            Come and stay.<br />The stay is<br />the <i style={{ color: C.yellow }}>funding</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="Runs on Sun" topR="Drop 04 · Sustainability" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
