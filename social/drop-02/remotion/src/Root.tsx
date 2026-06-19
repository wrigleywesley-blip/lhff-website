import "./index.css";
import { Composition } from "remotion";
import { Mozambique } from "./Mozambique";
import { Seeds } from "./Seeds";
import { Ocean } from "./Ocean";
import { StudioOne } from "./StudioOne";
import { StudioLookbook } from "./StudioLookbook";
import { DayAtStudioOne } from "./DayAtStudioOne";
import { SevenPillars } from "./SevenPillars";
import { Stillness } from "./Stillness";
import { ForTheCreators } from "./ForTheCreators";
import { NavidMotion } from "./NavidMotion";
import { SchoolMotion } from "./SchoolMotion";
import { EmpowerMotion } from "./EmpowerMotion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="MozambiqueWonders" component={Mozambique} durationInFrames={470} fps={30} width={1080} height={1920} />
      <Composition id="OceanConservation" component={Ocean} durationInFrames={380} fps={30} width={1080} height={1920} />
      <Composition id="StudioOne" component={StudioOne} durationInFrames={365} fps={30} width={1080} height={1920} />
      <Composition id="SeedsOfChange" component={Seeds} durationInFrames={380} fps={30} width={1080} height={1920} />
      <Composition id="StudioLookbook" component={StudioLookbook} durationInFrames={360} fps={30} width={1080} height={1920} />
      <Composition id="DayAtStudioOne" component={DayAtStudioOne} durationInFrames={410} fps={30} width={1080} height={1920} />
      <Composition id="SevenPillars" component={SevenPillars} durationInFrames={330} fps={30} width={1080} height={1920} />
      <Composition id="Stillness" component={Stillness} durationInFrames={370} fps={30} width={1080} height={1920} />
      <Composition id="ForTheCreators" component={ForTheCreators} durationInFrames={355} fps={30} width={1080} height={1920} />
      <Composition id="NavidMotion" component={NavidMotion} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="SchoolMotion" component={SchoolMotion} durationInFrames={365} fps={30} width={1080} height={1920} />
      <Composition id="EmpowerMotion" component={EmpowerMotion} durationInFrames={300} fps={30} width={1080} height={1920} />
    </>
  );
};
