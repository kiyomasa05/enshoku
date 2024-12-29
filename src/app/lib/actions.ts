"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { experienceSchema, outputData, Resume, resumeSchema } from "@/type";
import { useContext } from "react";
import { ResumeFormContext } from "../provider/resumeFormProvider";

// 最後の送信処理
export async function createResume(prevState: unknown, formData: FormData) {
  console.log("actionが呼び出されたよ");
  // FormDataの全エントリーを出力
  console.log("\nRaw FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  const submission = parseWithZod(formData, {
    schema: experienceSchema,
  });


  console.log("\nParsed Data:");
  console.log(JSON.stringify(submission.value, null, 2));

  if (submission.status !== "success") {
    return submission.reply();
  }
  // フォームデータをResumeオブジェクトに変換
  // const newExperience: Resume = {
  //   companyName: formData.get("companyName") as string,
  //   startPeriod: formData.get("startPeriod") as string,
  //   endPeriod: formData.get("endPeriod") as string,
  //   companyOverview: formData.get("companyOverview") as string,
  //   projectList: [
  //     {
  //       doneContents: [
  //         formData.get("projectList[0].doneContents[0]") as string,
  //       ],
  //       achievements: formData.get("projectList[0].achievements") as string,
  //       projectOverview: formData.get(
  //         "projectList[0].projectOverview"
  //       ) as string,
  //       inChargeOverview: formData.get(
  //         "projectList[0].inChargeOverview"
  //       ) as string,
  //     },
  //   ],
  // };
  // // ResumeFormContextからaddExperienceを呼び出す
  const { addExperience } = useContext(ResumeFormContext);
  addExperience(submission.value);

  // redirect("/");
}
// 次は別のstateを用意して、formではめていく？context使わないといけないか？もしくはreducer

/**
actionが呼び出されたよ

Raw FormData entries:
$ACTION_REF_1: 
$ACTION_1:0: {"id":"60ca26f13bbea8578dc4006a09090a30e5cb9faf8a","bound":"$@1"}
$ACTION_1:1: ["$undefined"]
$ACTION_KEY: k2881321960
experience[0].companyName: あああ
experience[0].companyOverview: aaaa
experience[0].startPeriod: 2024-12-30
experience[0].endPeriod: 2024-12-30
experience[0].projectList[0].projectOverview: aa
experience[0].projectList[0].inChargeOverview: aa
experience[0].projectList[0].doneContents[0]: aa
experience[0].projectList[0].achievements: aa
experience[0].projectList[1].projectOverview: aaa
experience[0].projectList[1].inChargeOverview: aaa
experience[0].projectList[1].doneContents[0]: aaa
experience[0].projectList[1].achievements: aaaa
experience[1].companyName: bbbb
experience[1].companyOverview: bbbb
experience[1].startPeriod: 2025-01-05
experience[1].endPeriod: 2024-12-29
experience[1].projectList[0].projectOverview: bbbb
experience[1].projectList[0].inChargeOverview: bbbb
experience[1].projectList[0].doneContents[0]: bbbb
experience[1].projectList[0].achievements: bbbb

Parsed Data:
{
  "experience": [
    {
      "companyName": "あああ",
      "startPeriod": "2024-12-30",
      "endPeriod": "2024-12-30",
      "companyOverview": "aaaa",
      "projectList": [
        {
          "projectOverview": "aa",
          "inChargeOverview": "aa",
          "doneContents": [
            "aa"
          ],
          "achievements": "aa"
        },
        {
          "projectOverview": "aaa",
          "inChargeOverview": "aaa",
          "doneContents": [
            "aaa"
          ],
          "achievements": "aaaa"
        }
      ]
    },
    {
      "companyName": "bbbb",
      "startPeriod": "2025-01-05",
      "endPeriod": "2024-12-29",
      "companyOverview": "bbbb",
      "projectList": [
        {
          "projectOverview": "bbbb",
          "inChargeOverview": "bbbb",
          "doneContents": [
            "bbbb"
          ],
          "achievements": "bbbb"
        }
      ]
    }
  ]
}
 POST /resume 200 in 43ms
 */
