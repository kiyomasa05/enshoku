"use client";

// import NewResumeForm from "@/components/form/newForm/NewResumeForm";
import ResumeForm from "@/components/form/newForm/ResumeForm";
import { outputData, OutputData } from "@/type";
import { FormProvider, useForm } from "@conform-to/react";
import { useActionState, useEffect, useState } from "react";
import { createResume } from "../lib/actions";
import { parseWithZod } from "@conform-to/zod";
import { useRouter, useSearchParams } from "next/navigation";
// import ResumeFormProvider from "@/app/provider/ResumeFormProvider";
import Test from "@/components/form/newForm/Test";
import ResumeFormProvider from "../provider/resumeFormProvider";
import SkillSetForm from "@/components/form/newForm/SkillSetForm";
import ConformForm from "@/components/form/newForm/ConformForm";

/**
 * 設計
 * このpageはexperienceとskillの入力を管理する
 * stepというクエリパラメータでexperienceとskillのページを分ける
 */

// 経歴書作成ペー��
// stepのクエリパラメータで入力を細かく制御
export default function Resume() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(1);

  // stepの更新をuseEffect内に移動
  useEffect(() => {
    const newStep = Number(searchParams.get("step")) || 1;
    if (step !== newStep) {
      setStep(newStep);
    }
  }, [searchParams, step]);

  // 直接URLでページ遷移させないための挙動を描く予定
  useEffect(() => {
    const pushStep = (num: number) => router.push(`resume?step=${step + num}`);
    const goNext = () => pushStep(1);
    const backPrevious = () => pushStep(-1);

    if (step === 1) {
    } else if (step === 2) {
    } else if (step === 3) {
    }
  }, [step, router]);

  // // const ContentTSX = step == 1 ? <ResumeForm /> : <SkillSetForm />;
  // const ContentTSX = (() => {
  //   switch (step) {
  //     case 1:
  //       return <ResumeForm />;
  //     case 2:
  //       return <SkillSetForm />;
  //     case 3:
  //       return <ConformForm />;
  //     default:
  //       throw new Error("URLが正しくありません。");
  //   }
  // })();

  return (
    <>
      <ResumeFormProvider>
        {step === 1 && <ResumeForm />}
        {step === 2 && <SkillSetForm />}
        {step === 3 && <ConformForm />}
      </ResumeFormProvider>
    </>
  );
}
