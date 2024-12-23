"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { outputData, Resume, resumeSchema } from "@/type";
import { useContext } from "react";
import { ResumeFormContext } from "../provider/resumeFormProvider";

// 最後の送信処理
export async function createResume(prevState: unknown, formData: FormData) {
  console.log("actionが呼び出されたよ");
  console.log("prevState", prevState);
  console.log("formdata", formData);
  const submission = parseWithZod(formData, {
    schema: resumeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  // フォームデータをResumeオブジェクトに変換
  const newExperience: Resume = {
    companyName: formData.get("companyName") as string,
    startPeriod: formData.get("startPeriod") as string,
    endPeriod: formData.get("endPeriod") as string,
    companyOverview: formData.get("companyOverview") as string,
    projectList: [
      {
        doneContents: [
          formData.get("projectList[0].doneContents[0]") as string,
        ],
        achievements: formData.get("projectList[0].achievements") as string,
        projectOverview: formData.get(
          "projectList[0].projectOverview"
        ) as string,
        inChargeOverview: formData.get(
          "projectList[0].inChargeOverview"
        ) as string,
      },
    ],
  };
  // ResumeFormContextからaddExperienceを呼び出す
  const { addExperience } = useContext(ResumeFormContext);
  addExperience(newExperience);

  // redirect("/");
}
// 次は別のstateを用意して、formではめていく？context使わないといけないか？もしくはreducer

/**
 * actionが呼び出されたよ
prevState undefined
formdata FormData {
  [Symbol(state)]: [
    { name: '$ACTION_REF_1', value: '' },
    {
      name: '$ACTION_1:0',
      value: '{"id":"60ca26f13bbea8578dc4006a09090a30e5cb9faf8a","bound":"$@1"}'
    },
    { name: '$ACTION_1:1', value: '["$undefined"]' },
    { name: '$ACTION_KEY', value: 'k1862803912' },
    { name: 'companyName', value: 'a' },
    { name: 'companyOverview', value: 'a' },
    { name: 'startPeriod', value: '2024-12-03' },
    { name: 'endPeriod', value: '2024-12-04' },
    { name: 'projectList[0].projectOverview', value: 'a' },
    { name: 'projectList[0].inChargeOverview', value: 'a' },
    { name: 'projectList[0].doneContents[0]', value: 'a' },
    { name: 'projectList[0].achievements', value: 'a' }
  ]
}
FormData {
  [Symbol(state)]: [
    { name: '$ACTION_REF_1', value: '' },
    {
      name: '$ACTION_1:0',
      value: '{"id":"60ca26f13bbea8578dc4006a09090a30e5cb9faf8a","bound":"$@1"}'
    },
    { name: '$ACTION_1:1', value: '["$undefined"]' },
    { name: '$ACTION_KEY', value: 'k1862803912' },
    { name: 'companyName', value: 'a' },
    { name: 'companyOverview', value: 'a' },
    { name: 'startPeriod', value: '2024-12-03' },
    { name: 'endPeriod', value: '2024-12-04' },
    { name: 'projectList[0].projectOverview', value: 'a' },
    { name: 'projectList[0].inChargeOverview', value: 'a' },
    { name: 'projectList[0].doneContents[0]', value: 'a' },
    { name: 'projectList[0].achievements', value: 'a' }
  ]
}
 */
