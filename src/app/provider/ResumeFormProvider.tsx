"use client";

import { Resume, Skill } from "@/type";
import { createContext, useContext, useState } from "react";

export const ResumeFormContext = createContext({});

export default function ResumeFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 会社ごとの職務履歴が配列で入る
  const [experience, setExperience] = useState<Resume[]>([]);
  // スキルセット
  const [skills, setSkills] = useState({
    language: [],
    FW: [],
    infra: [],
    other: [],
  });
  const addExperience = (newExperience: Resume) => {
    setExperience((prev: Resume[]) => [...prev, newExperience]);
  };
  
  type SkillKind = keyof Skill;

  const updateSkills = (skillCategory: SkillKind, newSkills: Skill) => {
    setSkills((prev) => ({
      ...prev,
      [skillCategory]: newSkills,
    }));
  };

  return (
    <ResumeFormContext.Provider
      value={{ experience, skills, addExperience, updateSkills }}
    >
      {children}
    </ResumeFormContext.Provider>
  );
}

export const useFormContext = () => useContext(ResumeFormContext);
