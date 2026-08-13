import "./index.css";
import { Composition } from "remotion";
import { TheGarden } from "./TheGarden";
import { SeedToPlate } from "./SeedToPlate";
import { WhySustainability } from "./WhySustainability";
import { Water } from "./Water";
import { HouseThatRunsOnSun } from "./HouseThatRunsOnSun";
import { SevenSmallThings } from "./SevenSmallThings";
import { WhatWeThrowAway } from "./WhatWeThrowAway";
import { TheLandRemembers } from "./TheLandRemembers";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="TheGarden" component={TheGarden} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="SeedToPlate" component={SeedToPlate} durationInFrames={546} fps={30} width={1080} height={1920} />
      <Composition id="WhySustainability" component={WhySustainability} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="Water" component={Water} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="HouseThatRunsOnSun" component={HouseThatRunsOnSun} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="SevenSmallThings" component={SevenSmallThings} durationInFrames={562} fps={30} width={1080} height={1920} />
      <Composition id="WhatWeThrowAway" component={WhatWeThrowAway} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="TheLandRemembers" component={TheLandRemembers} durationInFrames={426} fps={30} width={1080} height={1920} />
    </>
  );
};
