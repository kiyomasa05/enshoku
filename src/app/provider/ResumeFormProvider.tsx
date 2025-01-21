"use client";

import { Experience, OtherData, Skillset } from "@/type";
import { createContext, useContext, useState } from "react";

type ResumeFormContextType = {
  experience: Experience;
  skills: Skillset;
  otherData: OtherData;
  setExperience: (newExperience: Experience) => void;
  setSkills: (newSkillSet: Skillset) => void;
  setOtherData: (otherData: OtherData) => void;
};

// const LOCAL_STORAGE_KEYS = {
//   EXPERIENCE: "resume_experience",
//   SKILLS: "resume_skills",
//   OTHER_DATA: "resume_otherData",
// };

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
  summary: "",
  experience: [
    {
      companyName: "",
      startPeriod: "",
      endPeriod: "",
      companyOverview: "",
      projectList: [
        {
          projectOverview: "",
          pjStartPeriod: "",
          pjEndPeriod: "",
          inChargeProcess: "",
          doneContents: [""],
          achievements: [""],
          environment: [
            {
              category: "",
              items: ["", ""],
            },
          ],
          scale: { participantsNumber: 0, role: "" },
        },
      ],
    },
  ],
};

export const defaultOtherData: OtherData = {
  selfPromotion: "",
  qualification: [""],
  portfolios: [{ title: "", url: "", explanation: "" }],
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

  // その他
  const [otherData, setOtherData] = useState<OtherData>(defaultOtherData);

  // リロード時も入力データが消えないようにはまた後日
  // // データの初期化時にlocalStorageから読み取る
  // const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  //   if (typeof window === "undefined") return defaultValue; // SSR対策
  //   const stored = localStorage.getItem(key);
  //   return stored ? (JSON.parse(stored) as T) : defaultValue;
  // };

  // const [experience, setExperience] = useState<Experience>(() =>
  //   loadFromLocalStorage(LOCAL_STORAGE_KEYS.EXPERIENCE, defaultExperienceValue)
  // );

  // const [skills, setSkills] = useState<Skillset>(() =>
  //   loadFromLocalStorage(LOCAL_STORAGE_KEYS.SKILLS, defaultSkillSet)
  // );

  // const [otherData, setOtherData] = useState<OtherData>(() =>
  //   loadFromLocalStorage(LOCAL_STORAGE_KEYS.OTHER_DATA, defaultOtherData)
  // );

  // // 状態が変更されたらlocalStorageに保存する
  // useEffect(() => {
  //   localStorage.setItem(
  //     LOCAL_STORAGE_KEYS.EXPERIENCE,
  //     JSON.stringify(experience)
  //   );
  // }, [experience]);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  // }, [skills]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     LOCAL_STORAGE_KEYS.OTHER_DATA,
  //     JSON.stringify(otherData)
  //   );
  // }, [otherData]);

  return (
    <ResumeFormContext.Provider
      value={{
        experience,
        skills,
        otherData,
        setExperience,
        setSkills,
        setOtherData,
      }}
    >
      {children}
    </ResumeFormContext.Provider>
  );
}

export const useResumeFormContext = () => useContext(ResumeFormContext);
