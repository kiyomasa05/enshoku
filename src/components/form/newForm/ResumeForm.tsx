"use client";

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { useActionState } from "react";
import { Experience, experienceSchema } from "@/type";
import { parseWithZod } from "@conform-to/zod";
import { useResumeFormContext } from "@/app/provider/resumeFormProvider";

// TODO:projectの期間の入力
export const defaultExperienceValue: Experience = {
  experience: [
    {
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
    },
  ],
};

const ResumeForm = () => {
  // const context = useResumeFormContext();
  // console.log("Full context:", context); // コンテキスト全体をログ出力

  const { setExperience } = useResumeFormContext();
  // action
  const createResume = async (prevState: unknown, formData: FormData) => {
    console.log("actionが呼び出されたよ");
    // FormDataの全エントリーを出力
    // console.log("\nRaw FormData entries:");
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    const submission = parseWithZod(formData, {
      schema: experienceSchema,
    });

    if (submission.status === "success") {
      // 期待する形式にデータを整形
      const formattedData: Experience = {
        experience: submission.value.experience.map((exp) => ({
          companyName: exp.companyName,
          startPeriod: exp.startPeriod,
          endPeriod: exp.endPeriod,
          companyOverview: exp.companyOverview,
          projectList: exp.projectList.map((proj) => ({
            projectOverview: proj.projectOverview,
            inChargeOverview: proj.inChargeOverview,
            doneContents: proj.doneContents,
            achievements: proj.achievements,
          })),
        })),
      };
      setExperience(formattedData);
    }

    return submission.reply();

    // redirect("/");
  };

  // フォームアクションが呼び出された時にstateを更新
  const [lastResult, action] = useActionState(createResume, undefined);
  // ガイド:https://ja.conform.guide/api/react/useForm
  const [form, fields] = useForm({
    lastResult, // 前回の送信結果を同期
    defaultValue: defaultExperienceValue,
    onValidate({ formData }) {
      // クライアントでバリデーション・ロジックを再利用する
      return parseWithZod(formData, { schema: experienceSchema });
    },
    // blurイベント発生時にフォームを検証する
    shouldValidate: "onBlur",
  });

  const experiences = fields.experience.getFieldList();

  // 綺麗さは一旦おいておいて、汚いコードでつくろう

  return (
    <form action={action} {...getFormProps(form)}>
      {/* 経験会社ごとに繰り返し */}
      {experiences.map((experience, eIndex) => {
        const experienceFields = experience.getFieldset();
        const projectListsFields = experienceFields.projectList.getFieldList();

        return (
          <div
            key={experience.key}
            className="border-2 border-sky-500 border-solid"
          >
            <div>
              <h3 className="font-bold text-xl">{eIndex + 1}つ目の会社</h3>
            </div>

            <label
              htmlFor={experienceFields.companyName.id}
              className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
            >
              会社名
            </label>
            <input
              className="rounded-md p-2 border-sky-400 border-solid border "
              {...getInputProps(experienceFields.companyName, { type: "text" })}
              key={experienceFields.companyName.key}
              /* memo:keyはgetInputPropsで直接渡すとエラーになる
                React keys must be passed directly to JSX without using spread:
                keyを別で渡すことで解決するhttps://qiita.com/masakinihirota/items/007e46d32da5a6b408b2
                公式のgithubでも同じ渡し方をしているhttps://github.com/edmundhung/conform/blob/main/examples/nextjs/app/form.tsx
              */
            />
            <div id={experienceFields.companyName.errorId}>
              {experienceFields.companyName.errors}
            </div>
            <label
              htmlFor={experienceFields.companyOverview.id}
              className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
            >
              会社概要
            </label>
            <input
              className="rounded-md p-2 border-sky-400 border-solid border "
              {...getInputProps(experienceFields.companyOverview, {
                type: "text",
              })}
              key={experienceFields.companyOverview.key}
            />
            <div id={experienceFields.companyOverview.errorId}>
              {experienceFields.companyOverview.errors}
            </div>
            <label
              htmlFor={experienceFields.startPeriod.id}
              className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
            >
              在籍期間(開始)
            </label>
            <input
              className="rounded-md p-2 border-sky-400 border-solid border "
              {...getInputProps(experienceFields.startPeriod, { type: "date" })}
              key={experienceFields.startPeriod.key}
            />
            <div id={experienceFields.startPeriod.errorId}>
              {experienceFields.startPeriod.errors}
            </div>
            <label
              htmlFor={experienceFields.endPeriod.id}
              className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
            >
              在籍期間(終了)
            </label>
            <input
              className="rounded-md p-2 border-sky-400 border-solid border "
              {...getInputProps(experienceFields.endPeriod, { type: "date" })}
              key={experienceFields.endPeriod.key}
            />
            <div id={experienceFields.endPeriod.errorId}>
              {experienceFields.endPeriod.errors}
            </div>
            {/* projectList */}
            {projectListsFields.map((project, index) => {
              const projectFields = project.getFieldset();
              const doneContents = projectFields.doneContents.getFieldList();

              return (
                <div
                  key={index}
                  className="border-2 border-sky-700 border-solid"
                >
                  <div>
                    <h3 className="text-green-500 font-bold text-xl">
                      {index + 1}つ目のプロジェクト
                    </h3>
                  </div>
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
                      name: experienceFields.projectList.name,
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
                name: experienceFields.projectList.name,
                defaultValue: {
                  projectOverview: "",
                  inChargeOverview: "",
                  doneContents: [""],
                  achievements: "",
                },
              })}
            >
              プロジェクト追加
            </button>

            <button
              className="bg-purple-300 p-3 cursor-pointer hover:bg-pink-200"
              {...form.remove.getButtonProps({
                name: fields.experience.name,
                index: eIndex,
              })}
            >
              会社を削除
            </button>
          </div>
        );
      })}
      <button
        className="bg-purple-300 p-3 cursor-pointer hover:bg-pink-200"
        {...form.insert.getButtonProps({
          name: fields.experience.name,
          defaultValue: {
            companyName: "",
            startPeriod: "",
            endPeriod: "",
            companyOverview: "",
            projectList: [
              {
                projectOverview: "",
                inChargeOverview: "",
                doneContents: [""],
                achievements: "",
              },
            ],
          },
        })}
      >
        経験会社を追加
      </button>
      <button className="bg-emerald-300 p-3" type="submit">
        登録して次へ
      </button>
    </form>
  );
};

export default ResumeForm;
