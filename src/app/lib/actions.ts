"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { resumeSchema } from "@/type";

export async function createResume(prevState: unknown, formData: FormData) {
  console.log("actionが呼び出されたよ")
  console.log("prevState", prevState);
  console.log("formdata", formData);
  const submission = parseWithZod(formData, {
    schema: resumeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log(formData);

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
