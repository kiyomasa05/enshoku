"use client";

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { useActionState } from "react";
import { Resume, resumeSchema } from "@/type";
import { parseWithZod } from "@conform-to/zod";
import { createResume } from "@/app/lib/actions";
// import { useFormContext } from "@/app/provider/resumeFormProvider";

const defaultValue: Resume = {
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

// 今のままだと会社数が追加できてない

const ResumeForm = () => {

  // フォームアクションが呼び出された時にstateを更新
  const [lastResult, action] = useActionState(createResume, undefined);
  // ガイド:https://ja.conform.guide/api/react/useForm
  const [form, fields] = useForm({
    // 前回の送信結果を同期
    lastResult,
    defaultValue: defaultValue,

    // クライアントでバリデーション・ロジックを再利用する
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resumeSchema });
    },

    // blurイベント発生時にフォームを検証する
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const formProjects = fields.projectList.getFieldList();

  // console.log(projects);
  // 綺麗さは一旦おいておいて、汚いコードでつくろう

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    // <form onSubmit={handleSubmit(onSubmit)}>
    <form action={action} {...getFormProps(form)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label
        htmlFor={fields.companyName.id}
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        会社名
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...getInputProps(fields.companyName, { type: "text" })}
        key={fields.companyName.key}
        /* memo:keyはgetInputPropsで直接渡すとエラーになる
          React keys must be passed directly to JSX without using spread:
          keyを別で渡すことで解決するhttps://qiita.com/masakinihirota/items/007e46d32da5a6b408b2
          公式のgithubでも同じ渡し方をしているhttps://github.com/edmundhung/conform/blob/main/examples/nextjs/app/form.tsx
         */
      />
      <div id={fields.companyName.errorId}>{fields.companyName.errors}</div>
      <label
        htmlFor={fields.companyOverview.id}
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        会社概要
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...getInputProps(fields.companyOverview, { type: "text" })}
        key={fields.companyOverview.key}
      />
      <div id={fields.companyOverview.errorId}>
        {fields.companyOverview.errors}
      </div>
      <label
        htmlFor={fields.startPeriod.id}
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        在籍期間(開始)
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...getInputProps(fields.startPeriod, { type: "date" })}
        key={fields.startPeriod.key}
      />
      <div id={fields.startPeriod.errorId}>{fields.startPeriod.errors}</div>
      <label
        htmlFor={fields.endPeriod.id}
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        在籍期間(終了)
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...getInputProps(fields.endPeriod, { type: "date" })}
        key={fields.endPeriod.key}
      />
      <div id={fields.endPeriod.errorId}>{fields.endPeriod.errors}</div>
      <h3>職務内容</h3>

      {formProjects.map((project, index) => {
        const projectFields = project.getFieldset();
        const doneContents = projectFields.doneContents.getFieldList();

        return (
          <div key={index}>
            <div>
              <label
                htmlFor={projectFields.projectOverview.id}
                className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
              >
                プロジェクト概要
              </label>
              <input
                {...getInputProps(projectFields.projectOverview, {
                  type: "text",
                })}
                key={projectFields.projectOverview.key}
              />
              <div id={projectFields.projectOverview.errorId}>
                {projectFields.projectOverview.errors}
              </div>
            </div>
            <div>
              <label
                htmlFor={projectFields.inChargeOverview.id}
                className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
              >
                担当工程概要
              </label>
              <input
                {...getInputProps(projectFields.inChargeOverview, {
                  type: "text",
                })}
                key={projectFields.inChargeOverview.key}
              />
              <div id={projectFields.inChargeOverview.errorId}>
                {projectFields.inChargeOverview.errors}
              </div>
            </div>

            {doneContents.map((content, contentIndex) => {
              return (
                <div key={content.key}>
                  <label
                    htmlFor={content.id}
                    className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
                  >
                    担当詳細
                  </label>
                  <input
                    {...getInputProps(content, {
                      type: "text",
                    })}
                    key={content.key}
                  />
                  <div id={content.errorId}>{content.errors}</div>
                  <button
                    className="bg-purple-300 p-3 cursor-pointer hover:bg-pink-200"
                    {...form.remove.getButtonProps({
                      name: projectFields.doneContents.name, // content.nameではエラーになる。配列そのものを指定しないといけない
                      index: contentIndex,
                    })}
                  >
                    担当詳細を削除
                  </button>
                </div>
              );
            })}
            <button
              // memo type='button’とか意味わからないプロップスを渡してると、getButtonPropsはうまく機能しない
              className="bg-purple-300 p-3 cursor-pointer hover:bg-pink-200"
              {...form.insert.getButtonProps({
                name: projectFields.doneContents.name,
                defaultValue: "",
              })}
            >
              担当詳細を追加
            </button>

            <div>
              <label htmlFor={projectFields.achievements.id}>実績</label>
              <textarea
                className="rounded-md p-2 border-sky-400 border-solid border"
                {...getTextareaProps(projectFields.achievements)}
                key={projectFields.achievements.key}
              />
            </div>
            <button
              // 参考：https://zenn.dev/coji/articles/remix-conform-nested-array
              {...form.remove.getButtonProps({
                name: fields.projectList.name,
                index: index,
              })}
            >
              プロジェクトを削除
            </button>
          </div>
        );
      })}
      <button
        className="bg-purple-300 p-3 cursor-pointer hover:bg-pink-200"
        // 参考：https://zenn.dev/coji/articles/remix-conform-nested-array
        {...form.insert.getButtonProps({
          name: fields.projectList.name,
          defaultValue: {
            ...defaultValue.projectList[0],
          },
        })}
      >
        プロジェクト追加
      </button>

      <button className="bg-emerald-300 p-3" onClick={() => console.log("aa")}>
        登録して次へ
      </button>
    </form>
  );
};

export default ResumeForm;
