"use client";

import { Experience, Skillset } from "@/type";
import { createContext, useContext, useState } from "react";

type ResumeFormContextType = {
  experience: Experience;
  skills: Skillset;
  setExperience: (newExperience: Experience) => void;
  setSkills: (newSkillSet: Skillset) => void;
};

export const defaultSkillSet: Skillset = {
  language: [
    {
      kinds: "",
      yearsOfExperience: "",
      description: "",
    },
  ],
  FW: [
    {
      kinds: "",
      yearsOfExperience: "",
      description: "",
    },
  ],
  infra: [
    {
      kinds: "",
      yearsOfExperience: "",
      description: "",
    },
  ],
  other: [
    {
      kinds: "",
      yearsOfExperience: "",
      description: "",
    },
  ],
};

export const defaultExperienceValue: Experience = {
  experience: [
    {
      companyName: "",
      startPeriod: "",
      endPeriod: "",
      companyOverview: "",
      projectList: [
        {
          doneContents: [""],
          pjStartPeriod: "",
          pjEndPeriod: "",
          achievements: "",
          projectOverview: "",
          inChargeOverview: "",
        },
      ],
    },
  ],
};

export const ResumeFormContext = createContext<ResumeFormContextType>(
  {} as ResumeFormContextType
);

export default function ResumeFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 会社ごとの職務履歴が配列で入る
  const [experience, setExperience] = useState<Experience>(
    defaultExperienceValue
  );

  // スキルセット
  const [skills, setSkills] = useState<Skillset>(defaultSkillSet);

  return (
    <ResumeFormContext.Provider
      value={{ experience, skills, setExperience, setSkills }}
    >
      {children}
    </ResumeFormContext.Provider>
  );
}

export const useResumeFormContext = () => useContext(ResumeFormContext);
