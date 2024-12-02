import React from "react";
import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { ResumeForm } from "./ResumeForm";

// 今の状態だと乳卯力を返せてない感じ？

type Props = {
  projectIndex: number;
  doneContentsIndex: number;
  register: UseFormRegister<ResumeForm>;
  onClickRemove: UseFieldArrayRemove;
  // control: Control<ResumeForm>;
};

const JobDetails = ({
  projectIndex,
  doneContentsIndex,
  // control,
  register,
  onClickRemove,
}: Props) => {
  return (
    <div>
      <label>担当詳細{doneContentsIndex + 1}</label>
      <input
        {...register(
          `projectList.${projectIndex}.doneContents.${doneContentsIndex}` as const
        )}
        style={{ marginRight: "25px" }}
      />
      <button type="button" onClick={() => onClickRemove(doneContentsIndex)}>
        担当詳細を削除
      </button>
    </div>
  );
};

export default JobDetails;
