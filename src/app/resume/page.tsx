"use client";

import ResumeForm from "@/components/form/form_page/ResumeForm";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResumeFormProvider from "../provider/ResumeFormProvider";
import SkillSetForm from "@/components/form/form_page/SkillSetForm";
import ConformForm from "@/components/form/form_page/ConformForm";
import OtherDataForm from "@/components/form/form_page/OtherDataForm";

/**
 * 設計
 * このpageはexperienceとskillの入力を管理する
 * stepというクエリパラメータでexperienceとskillのページを分ける
 */

// stepのクエリパラメータで入力を細かく制御
export default function Resume() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const newStep = Number(searchParams.get("step")) || 1;

    // stepが1, 2, 3, 4以外の場合、強制的にstep=1に戻す
    if (![1, 2, 3, 4].includes(newStep)) {
      router.push("/resume?step=1");
    } else if (step !== newStep) {
      setStep(newStep);
    }
  }, [searchParams, step, router]);

  // 各フォームに遷移する際にstepを次に進める
  const handleNextStep = () => {
    // 次のstepへ進む処理
    if (step === 1) {
      setStep(2);
      router.push("/resume?step=2");
    } else if (step === 2) {
      setStep(3);
      router.push("/resume?step=3");
    } else if (step === 3) {
      setStep(4);
      router.push("/resume?step=4");
    }
  };
  const validateStep = (beforeStep: number, currentStep: number) =>
    currentStep - 1 === beforeStep ? true : router.push("/resume?step=1");

  return (
    <>
      <ResumeFormProvider>
        {step === 1 && <ResumeForm onNext={handleNextStep} />}
        {step === 2 && <SkillSetForm onNext={handleNextStep} />}
        {step === 3 && <OtherDataForm onNext={handleNextStep} />}

        {step === 4 && <ConformForm />}
      </ResumeFormProvider>
    </>
  );
}
