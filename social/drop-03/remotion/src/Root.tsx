import "./index.css";
import { Composition } from "remotion";
import { TheSchoolThatGrew } from "./TheSchoolThatGrew";
import { WhyEducation } from "./WhyEducation";
import { MetaLearning } from "./MetaLearning";
import { GirlsWhoLead } from "./GirlsWhoLead";
import { SecondChances } from "./SecondChances";
import { ADayInClass } from "./ADayInClass";
import { TheTeacher } from "./TheTeacher";
import { SkillsOpenDoors } from "./SkillsOpenDoors";
import { WhatWereBuilding } from "./WhatWereBuilding";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="TheSchoolThatGrew" component={TheSchoolThatGrew} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="WhyEducation" component={WhyEducation} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="MetaLearning" component={MetaLearning} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="GirlsWhoLead" component={GirlsWhoLead} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="SecondChances" component={SecondChances} durationInFrames={404} fps={30} width={1080} height={1920} />
      <Composition id="ADayInClass" component={ADayInClass} durationInFrames={432} fps={30} width={1080} height={1920} />
      <Composition id="TheTeacher" component={TheTeacher} durationInFrames={404} fps={30} width={1080} height={1920} />
      <Composition id="SkillsOpenDoors" component={SkillsOpenDoors} durationInFrames={426} fps={30} width={1080} height={1920} />
      <Composition id="WhatWereBuilding" component={WhatWereBuilding} durationInFrames={432} fps={30} width={1080} height={1920} />
    </>
  );
};
