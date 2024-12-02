import React from "react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { ResumeForm } from "./ResumeForm";
import JobDetails from "./JobDetails";

// あとエラーメッセージ　と　謎の型エラー　直さないとビルドできなそう

type Props = {
  register: UseFormRegister<ResumeForm>;
  projectIndex: number;
  control: Control<ResumeForm>;
  removeProject: UseFieldArrayRemove;
  errors: FieldErrors<ResumeForm>;
};

/**
 * project情報を管理
 */
const ProjectItem = ({
  projectIndex,
  control,
  register,
  removeProject,
  errors,
}: Props) => {
  const {
    fields: doneContentsFields,
    remove: removeDoneContents,
    append: appendDoneContents,
  } = useFieldArray({
    control,
    // @ts-expect-error 型が正しく推測されないため無視
    name: `projectList.${projectIndex}.doneContents` as "projectList.0.doneContents", // 現時点直らない
    // 参考:https://zenn.dev/blackmax/articles/d2a497d0b6f3fb
  });

  const addDoneContents = () => {
    // @ts-expect-error 型が正しく推測されないため無視
    appendDoneContents("");
  };
  return (
    <div className="border-2 border-solid border-sky-500 p-5">
      <div>
        <label>プロジェクト概要</label>
        <input
          {...register(`projectList.${projectIndex}.projectOverview` as const)}
        />
        <p>{errors.projectList?.[projectIndex]?.projectOverview?.message}</p>
      </div>

      <div>
        <label>担当工程概要</label>
        <input
          {...register(`projectList.${projectIndex}.inChargeOverview` as const)}
        />
        <p>{errors.projectList?.[projectIndex]?.inChargeOverview?.message}</p>
        <p>
          {/* {errors.projectDescription?.[projectIndex]?.inChargeOverview?.message} */}
        </p>
      </div>
      <h4>担当詳細</h4>
      <div className="border-2 border-solid border-sky-500 p-5">
        {doneContentsFields.map((doneContentField, index) => (
          <JobDetails
            key={doneContentField.id}
            projectIndex={projectIndex}
            doneContentsIndex={index}
            // control={control}
            register={register}
            onClickRemove={removeDoneContents}
          />
        ))}
        <button
          type="button"
          className="bg-indigo-300 p-3 font-medium"
          onClick={() => addDoneContents()} //なぜか型エラー
          //型 'string' の引数を型 '{ doneContents?: string[] | undefined; achievements?: string | undefined; projectOverview: string; inChargeOverview: string; } | { doneContents?: string[] | undefined; achievements?: string | undefined; projectOverview: string; inChargeOverview: string; }[]' のパラメーターに割り当てることはできません。
        >
          {"担当詳細追加"}
        </button>
        <div>
          <label
            htmlFor=""
            className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
          >
            実績、工夫点など
          </label>
          <textarea
            className="rounded-md p-2 border-sky-400 border-solid border "
            {...register(`projectList.${projectIndex}.achievements` as const)}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeProject()}
        className="bg-red-300 p-3"
      >
        職務内容を削除
      </button>
    </div>
  );
};
export default ProjectItem;
