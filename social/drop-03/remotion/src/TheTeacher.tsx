import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import { OPENSANS } from "./fonts";
import { SceneBG, Eyebrow, Display, Kicker, Cap, RainbowBar, Handle, PersistentChrome, InkBG, MScene } from "./ui";

// Sequence durations: 120 + 108 + 108 + 128 = 464
// Transitions: 2 x 18 + 1 x 24 = 60 overlap -> 464 - 60 = 404 frames (13.5s @ 30fps)
export const TheTeacher = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0c12", fontFamily: OPENSANS }}>
    <TransitionSeries>
      {/* S1 · cover */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <SceneBG src="edu-mentor.jpg" scrim="solid" dur={120} />
        <MScene dur={120}>
          <RainbowBar delay={8} width={300} />
          <Eyebrow color={C.cream} style={{ marginTop: 26 }}>The multiplier</Eyebrow>
          <Display size={92}>
            The best technology<br />in a school is<br />a <i style={{ color: C.green }}>teacher</i>.
          </Display>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S2 · do the math */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="school-teacher.jpg" scrim="solid" dur={108} from={1.18} to={1.04} />
        <MScene dur={108}>
          <Eyebrow color={C.cream}>Do the math</Eyebrow>
          <Kicker>
            One teacher.<br />Thirty <i style={{ color: C.yellow }}>futures</i>.
          </Kicker>
          <Cap style={{ marginTop: 8 }}>A great teacher can lift a whole class by a full year of learning.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      {/* S3 · what we do */}
      <TransitionSeries.Sequence durationInFrames={108}>
        <SceneBG src="school-classroom.jpg" scrim="grad" dur={108} />
        <MScene dur={108}>
          <Eyebrow color={C.cream}>What we do</Eyebrow>
          <Kicker>
            We back the front<br />of the room.
          </Kicker>
          <Cap style={{ marginTop: 8 }}>Recruited, trained, paid, and supported.</Cap>
        </MScene>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: 24 })}
      />

      {/* S4 · CTA */}
      <TransitionSeries.Sequence durationInFrames={128}>
        <InkBG />
        <MScene align="center" dur={128} out={false}>
          <RainbowBar delay={4} width={300} />
          <Eyebrow style={{ marginTop: 34 }}>Grow. Sustain. Transform.</Eyebrow>
          <Display size={96}>
            Back a teacher.<br />Change a <i style={{ color: C.yellow }}>generation</i>.
          </Display>
          <Handle />
        </MScene>
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <PersistentChrome topL="The Teacher" topR="Drop 03 · Education" botL="Love · Happiness · Freedom" botR="@lovehappinessfreedom" />
  </AbsoluteFill>
);
