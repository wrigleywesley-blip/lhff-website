import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Eyebrow, Display, Kicker, RainbowBar, Handle, PersistentChrome, InkBG, MScene } from "./ui";

// Time-stamp eyebrow used across the documentary scenes.
const Stamp = ({ children, color }: any) => (
  <Eyebrow color={color} style={{ fontSize: 30, marginBottom: 18 }}>{children}</Eyebrow>
);

// Sequence durations: 96 + 80 + 80 + 80 + 80 + 112 = 528
// Transitions: 4 × 18 + 1 × 24 = 96 overlap → 528 − 96 = 432 frames = 14.4s @ 30fps
// Zoom alternates each scene: odd scenes push in (1.06→1.18), even scenes pull out (1.18→1.04).
export const ADayInClass = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · 07:15 · cover */}
      <TransitionSeries.Sequence durationInFrames={96}>
        <SceneBG src="school-fountain-day.jpg" scrim="grad" dur={96} />
        <MScene dur={96}>
          <RainbowBar delay={8} width={300} />
          <Stamp color={C.yellow}>07:15 · Maputo</Stamp>
          <Display size={96}>
            A day at<br />the <i style={{ color: C.yellow }}>school</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · arrival */}
      <TransitionSeries.Sequence durationInFrames={80}>
        <SceneBG src="school-kids.jpg" scrim="grad" dur={80} from={1.18} to={1.04} />
        <MScene dur={80}>
          <Stamp>The gate opens</Stamp>
          <Kicker>
            Uniforms, laughter,<br />small feet.
          </Kicker>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · 09:00 · first lesson */}
      <TransitionSeries.Sequence durationInFrames={80}>
        <SceneBG src="edu-boy-writing.jpg" scrim="grad" dur={80} />
        <MScene dur={80}>
          <Stamp color={C.sky}>09:00 · First lesson</Stamp>
          <Kicker>
            Pencil onto<br />paper.
          </Kicker>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S4 · 11:30 · one on one */}
      <TransitionSeries.Sequence durationInFrames={80}>
        <SceneBG src="edu-mentor.jpg" scrim="grad" dur={80} from={1.18} to={1.04} />
        <MScene dur={80}>
          <Stamp color={C.green}>11:30 · One on one</Stamp>
          <Kicker>
            A question becomes<br />an answer.
          </Kicker>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S5 · 14:00 · the room */}
      <TransitionSeries.Sequence durationInFrames={80}>
        <SceneBG src="school-classroom.jpg" scrim="grad" dur={80} />
        <MScene dur={80}>
          <Stamp color={C.orange}>14:00 · The room</Stamp>
          <Kicker>
            Every future<br />in the building.
          </Kicker>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 24 })}
      />

      {/* S6 · CTA */}
      <TransitionSeries.Sequence durationInFrames={112}>
        <InkBG />
        <MScene align="center" dur={112} out={false}>
          <RainbowBar delay={4} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
          <Display size={100}>
            An ordinary<br /><i style={{ color: C.green }}>miracle</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="A Day In Class" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
