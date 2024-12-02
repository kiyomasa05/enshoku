"use client";

// import { Resume } from "@/type";
import { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProjectItem from "./ProjectItem";

// type JobDescription = {
//   projectOverview: string; // プロジェクト概要
//   inChargeOverview: string; //担当工程概要
//   responsibilityDetails: string[]; // 担当詳細
//   achievements: string[]; //実績
// };
const schema = yup
  .object({
    companyName: yup.string().required("会社名は必須です"),
    startPeriod: yup.string().required("開始期間は必須です"),
    endPeriod: yup.string().required("終了期間は必須です"),
    companyOverview: yup.string().required("会社概要は必須です"),
    projectList: yup
      .array(
        yup.object({
          projectOverview: yup.string().required("プロジェクト概要は必須です"),
          inChargeOverview: yup.string().required("担当工程概要は必須です"),
          doneContents: yup
            .array(yup.string().required())
            .required()
            .min(1, "少なくとも1つの担当詳細が必要です。"),
          achievements: yup.string().required(),
        })
      )
      .required("少なくとも1つのプロジェクトが必要です。")
      .min(1, "少なくとも1つの職務内容が必要です"),
  })
  .required();

export type ResumeForm = yup.InferType<typeof schema>;
// import ErrorMessage from "../ui/ErrorMessage";

const defaultValues = {
  companyName: "",
  startPeriod: "",
  endPeriod: "",
  companyOverview: "",
  projectList: [
    {
      doneContents: [""],
      achievements: "",
      projectOverview: "",
      inChargeOverview: "",
    },
  ],
};

const ResumeForm = () => {
  const [data, setData] = useState<ResumeForm | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResumeForm>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projectList",
  });

  const onSubmit: SubmitHandler<ResumeForm> = (out) => {
    console.log("送信しました");
    setData({ ...out });
    console.log(data);
  };

  // console.log(watch("companyName")); // watch input value by passing the name of it
  // 綺麗さは一旦おいておいて、汚いコードでつくろう

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label
        htmlFor="companyName"
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        会社名
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...register("companyName", { required: true })}
      />
      {/* <ErrorMessage message="必須です" /> */}
      <p>{errors.companyName?.message}</p>

      <label
        htmlFor="companyOverview"
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        会社概要
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...register("companyOverview", { required: true })}
      />
      {errors.companyOverview?.type === "required" && (
        <p role="alert">{errors.companyOverview?.message}</p>
      )}
      <label
        htmlFor="startPeriod"
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        在籍期間
      </label>
      <input
        type="date"
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...register("startPeriod", { required: true })}
      />
      {errors.startPeriod?.type === "required" && (
        <p role="alert">{errors.startPeriod?.message}</p>
      )}
      <input
        type="date"
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...register("endPeriod", { required: true })}
      />
      {errors.endPeriod?.type === "required" && (
        <p role="alert">{errors.endPeriod?.message}</p>
      )}

      {/* 職務経歴を追加したい */}
      <h3>職務内容</h3>
      {/* 5個までにするか、崩れちゃいそうだし */}
      {/* プロジェクトは動的なフィールドなので、コンポーネント化 */}
      {projectFields.map((projectField, index) => (
        <ProjectItem
          key={projectField.id}
          register={register}
          projectIndex={index}
          control={control}
          removeProject={() => removeProject(index)}
          errors={errors}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          appendProject({
            projectOverview: "",
            inChargeOverview: "",
            doneContents: [""],
            achievements: "",
          })
        }
        className="bg-slate-400 p-3 font-medium"
      >
        職務(Project)内容を追加
      </button>

      <button className="bg-emerald-300 p-3" type="submit">
        送信
      </button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </form>
  );
};

export default ResumeForm;
