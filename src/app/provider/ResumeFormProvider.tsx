"use client";

import { defaultExperienceValue } from "@/components/form/newForm/ResumeForm";
import { Experience, Skillset } from "@/type";
import { createContext, useContext, useState } from "react";

type ResumeFormContextType = {
  experience: Experience;
  skills: Skillset;
  setExperience: (newExperience: Experience) => void;
  // updateSkills: (skillCategory: SkillKind, newSkills: Skill) => void;
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
  const [skills, setSkills] = useState<Skillset>({
    language: [],
    FW: [],
    infra: [],
    other: [],
  });

  // const updateSkills = (skillCategory: SkillKind, newSkills: Skill) => {
  //   setSkills((prev) => ({
  //     ...prev,
  //     [skillCategory]: newSkills,
  //   }));
  // };

  return (
    <ResumeFormContext.Provider value={{ experience, skills, setExperience }}>
      {children}
    </ResumeFormContext.Provider>
  );
}

export const useResumeFormContext = () => useContext(ResumeFormContext);
