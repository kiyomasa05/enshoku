"use client";

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { useActionState, useEffect, useState } from "react";
import { Experience, experienceSchema } from "@/type";
import { parseWithZod } from "@conform-to/zod";
import { useResumeFormContext } from "@/app/provider/ResumeFormProvider";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResumeFormSample } from "../form_parts/Sample";
import { Button } from "@/components/ui/button";
import { useNavigationGuard } from "next-navigation-guard";
import ProgressBar from "@/components/ui/ProgressBar";

type Params = {
  // step: number;
  onNext: () => void;
  // validateStep: (beforeStep: number, currentStep: number) => true | void;
};
const ResumeForm = ({ onNext }: Params) => {
  const [isNaviGuard, setIsNaviGuard] = useState(true);

  const { setExperience, experience } = useResumeFormContext();
  // action
  const createResume = async (prevState: unknown, formData: FormData) => {
    setIsNaviGuard(false);
    const submission = parseWithZod(formData, {
      schema: experienceSchema,
    });

    if (submission.status === "success") {
      // 期待する形式にデータを整形
      const formattedData: Experience = {
        summary: submission.value.summary,
        experience: submission.value.experience.map((exp) => ({
          companyName: exp.companyName,
          startPeriod: exp.startPeriod,
          endPeriod: exp.endPeriod,
          companyOverview: exp.companyOverview,
          projectList: exp.projectList.map((proj) => ({
            projectOverview: proj.projectOverview,
            pjStartPeriod: proj.pjStartPeriod,
            pjEndPeriod: proj.pjEndPeriod,
            inChargeProcess: proj.inChargeProcess,
            doneContents: proj.doneContents,
            achievements: proj.achievements,
            environment: proj.environment,
            scale: proj.scale,
          })),
        })),
      };
      setExperience(formattedData);
      onNext();
    }
    if (submission.status === "error") {
      setIsNaviGuard(true);
    }

    return submission.reply();
  };

  // フォームアクションが呼び出された時にstateを更新
  const [lastResult, action] = useActionState(createResume, undefined);
  // ガイド:https://ja.conform.guide/api/react/useForm
  const [form, fields] = useForm({
    lastResult, // 前回の送信結果を同期
    defaultValue: experience,
    onValidate({ formData }) {
      // クライアントでバリデーション・ロジックを再利用する
      return parseWithZod(formData, { schema: experienceSchema });
    },
    // blurイベント発生時にフォームを検証する
    shouldValidate: "onBlur",
  });
  useNavigationGuard({
    enabled: isNaviGuard,
    confirm: () =>
      window.confirm("編集中のものは保存されませんが、よろしいですか？"),
  });

  const experiences = fields.experience.getFieldList();

  return (
    <>
      <ProgressBar progress={"0"} progressbar={"w-0"} />

      <h2 className="text-center text-2xl mt-16">職務経歴</h2>
      <p className="mt-4 text-lg">職務経歴を入力してください</p>
      <ResumeFormSample />
      <form action={action} {...getFormProps(form)}>
        <label
          htmlFor={fields.summary.id}
          className="rounded-md bg-sky-500 w-40 p-1 h-8 text-center block"
        >
          職務要約
        </label>
        <textarea
          className="rounded-md p-1 border-sky-400 border-solid border w-full h-24"
          {...getTextareaProps(fields.summary)}
          key={fields.summary.key}
        ></textarea>
        {/* 経験会社ごとに繰り返し */}
        {experiences.map((experience, eIndex) => {
          const experienceFields = experience.getFieldset();
          const projectListsFields =
            experienceFields.projectList.getFieldList();

          return (
            <div
              key={experience.key}
              className="border border-gray-400 rounded-md border-solid mb-3 p-3"
            >
              <div className="flex justify-evenly mt-3 relative">
                <div>
                  <div className="flex">
                    <label
                      htmlFor={experienceFields.companyName.id}
                      className="rounded-md bg-sky-500 w-40 p-1 h-8 text-center block"
                    >
                      会社名
                    </label>
                    <div>
                      <input
                        className="rounded-md p-1 border-sky-400 border-solid border w-80"
                        {...getInputProps(experienceFields.companyName, {
                          type: "text",
                        })}
                        key={experienceFields.companyName.key}
                        /* memo:keyはgetInputPropsで直接渡すとエラーになる
                        React keys must be passed directly to JSX without using spread:
                        keyを別で渡すことで解決するhttps://qiita.com/masakinihirota/items/007e46d32da5a6b408b2
                        公式のgithubでも同じ渡し方をしているhttps://github.com/edmundhung/conform/blob/main/examples/nextjs/app/form.tsx
                      */
                      />
                      <p
                        id={experienceFields.companyName.errorId}
                        className="text-rose-500"
                      >
                        {experienceFields.companyName.errors}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <label
                      htmlFor={experienceFields.companyOverview.id}
                      className="rounded-md bg-sky-500 w-40 p-1 h-8 text-center block"
                    >
                      会社概要
                    </label>
                    <div>
                      <textarea
                        className="rounded-md p-1 border-sky-400 border-solid border w-80"
                        {...getTextareaProps(experienceFields.companyOverview)}
                        key={experienceFields.companyOverview.key}
                      />
                      <p
                        id={experienceFields.companyOverview.errorId}
                        className="text-rose-500"
                      >
                        {experienceFields.companyOverview.errors}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={experienceFields.startPeriod.id}
                    className="rounded-md bg-sky-500 w-80 p-1 mb-1 h-8 text-center block"
                  >
                    在籍期間
                  </label>
                  <input
                    className="rounded-md p-2 border-sky-400 border-solid border "
                    {...getInputProps(experienceFields.startPeriod, {
                      type: "month",
                    })}
                    key={experienceFields.startPeriod.key}
                  />
                  <span className="mx-2">〜</span>
                  <input
                    className="rounded-md p-2 border-sky-400 border-solid border "
                    {...getInputProps(experienceFields.endPeriod, {
                      type: "month",
                    })}
                    key={experienceFields.endPeriod.key}
                  />
                  <p
                    id={experienceFields.startPeriod.errorId}
                    className="text-rose-500"
                  >
                    {experienceFields.startPeriod.errors}
                  </p>

                  <p
                    id={experienceFields.endPeriod.errorId}
                    className="text-rose-500"
                  >
                    {experienceFields.endPeriod.errors}
                  </p>
                </div>
                <Button
                  className="bg-rose-600 p-3 cursor-pointer [writing-mode:vertical-rl] h-24 hover:bg-pink-400 absolute right-3 top-0"
                  {...form.remove.getButtonProps({
                    name: fields.experience.name,
                    index: eIndex,
                  })}
                >
                  会社を削除
                </Button>
              </div>

              <div>
                {/* projectList */}
                <Table
                  key={eIndex}
                  className="border border-gray-400 border-solid"
                >
                  <TableHeader>
                    <TableRow className="border-b border-gray-400 border-solid">
                      <TableHead>No.</TableHead>
                      <TableHead>期間</TableHead>
                      <TableHead>業務内容</TableHead>
                      <TableHead>環境</TableHead>
                      <TableHead>規模</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectListsFields.map((project, index) => {
                      const projectFields = project.getFieldset();
                      const doneContents =
                        projectFields.doneContents.getFieldList();
                      const achievementsContents =
                        projectFields.achievements.getFieldList();

                      const environmentContents =
                        projectFields.environment.getFieldList();

                      const scaleField = projectFields.scale.getFieldset();

                      return (
                        <TableRow
                          key={index}
                          className="border-b border-gray-400 border-solid"
                        >
                          <TableCell className="w-8 text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="w-48 text-center">
                            <div>
                              <div>
                                <label
                                  htmlFor={projectFields.pjStartPeriod.id}
                                  className="rounded-md p-2 bg-sky-500 text-center"
                                >
                                  プロジェクト参加開始月
                                </label>

                                <input
                                  {...getInputProps(
                                    projectFields.pjStartPeriod,
                                    {
                                      type: "month",
                                    }
                                  )}
                                  key={projectFields.pjStartPeriod.key}
                                  className="rounded-md p-2 border-sky-400 border-solid border  my-2"
                                />

                                <div
                                  id={projectFields.pjStartPeriod.errorId}
                                  className="text-rose-500"
                                >
                                  {projectFields.pjStartPeriod.errors}
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor={projectFields.pjEndPeriod.id}
                                  className="rounded-md p-2 bg-sky-500 text-center"
                                >
                                  プロジェクト参加終了月
                                </label>
                                <input
                                  {...getInputProps(projectFields.pjEndPeriod, {
                                    type: "month",
                                  })}
                                  key={projectFields.pjEndPeriod.key}
                                  className="rounded-md p-2 border-sky-400 border-solid border  my-2"
                                />
                                <div
                                  id={projectFields.pjEndPeriod.errorId}
                                  className="text-rose-500"
                                >
                                  {projectFields.pjEndPeriod.errors}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              {/* プロジェクト概要 */}
                              <label
                                htmlFor={projectFields.projectOverview.id}
                                className="rounded-md bg-sky-500 w-40 p-1 text-center block"
                              >
                                プロジェクト概要
                              </label>
                              <textarea
                                {...getTextareaProps(
                                  projectFields.projectOverview
                                )}
                                className="border-sky-400 border-solid border block rounded-md w-80 p-1 resize-none mb-1"
                                key={projectFields.projectOverview.key}
                              />
                              <p
                                id={projectFields.projectOverview.errorId}
                                className="text-rose-500"
                              >
                                {projectFields.projectOverview.errors}
                              </p>
                              <label
                                htmlFor={projectFields.inChargeProcess.id}
                                className="rounded-md bg-sky-500 w-40 p-1 text-center block"
                              >
                                担当工程
                              </label>
                              <input
                                {...getInputProps(
                                  projectFields.inChargeProcess,
                                  {
                                    type: "text",
                                  }
                                )}
                                key={projectFields.inChargeProcess.key}
                                className="border-sky-400 border-solid border block rounded-md w-80 p-1  mb-1"
                              />
                              <p
                                id={projectFields.inChargeProcess.errorId}
                                className="text-rose-500"
                              >
                                {projectFields.inChargeProcess.errors}
                              </p>
                              {/* 担当詳細 */}
                              <div>
                                <div className="flex">
                                  <label className="rounded-md bg-sky-500 w-40 block p-1 text-center mr-3">
                                    担当詳細
                                  </label>
                                  <Button
                                    // memo type='button’とか意味わからないプロップスを渡してると、getButtonPropsはうまく機能しない
                                    className="bg-sky-700 p-1 h-7 text-xs cursor-pointer hover:bg-sky-500"
                                    {...form.insert.getButtonProps({
                                      name: projectFields.doneContents.name,
                                      defaultValue: "",
                                    })}
                                  >
                                    担当詳細を追加
                                  </Button>
                                </div>

                                {doneContents.map((content, contentIndex) => {
                                  return (
                                    <div key={content.key} className="flex">
                                      <div>
                                        <input
                                          {...getInputProps(content, {
                                            type: "text",
                                          })}
                                          key={content.key}
                                          className="border-sky-400 border-solid border block rounded-md w-80 p-1 mb-1"
                                        />
                                        <p
                                          id={content.errorId}
                                          className="text-rose-500"
                                        >
                                          {content.errors}
                                        </p>
                                      </div>
                                      <Button
                                        className="bg-rose-400 p-1 ml-2 text-xs cursor-pointer h-7 hover:bg-rose-200"
                                        {...form.remove.getButtonProps({
                                          name: projectFields.doneContents.name,
                                          index: contentIndex,
                                        })}
                                      >
                                        担当詳細を削除
                                      </Button>
                                    </div>
                                  );
                                })}
                              </div>
                              {/* 実績・工夫点 */}
                              <div>
                                <div className="flex">
                                  <label className="rounded-md bg-sky-500 w-40 block p-1 text-center mr-3">
                                    実績・工夫点
                                  </label>
                                  <Button
                                    className="bg-sky-700 p-1 h-7 text-xs cursor-pointer hover:bg-sky-500"
                                    {...form.insert.getButtonProps({
                                      name: projectFields.achievements.name,
                                      defaultValue: "",
                                    })}
                                  >
                                    実績・工夫点を追加
                                  </Button>
                                </div>

                                {achievementsContents.map(
                                  (achievement, achievementI) => {
                                    return (
                                      <div
                                        key={achievement.key}
                                        className="flex"
                                      >
                                        <div>
                                          <textarea
                                            {...getTextareaProps(achievement)}
                                            key={achievement.key}
                                            className="border-sky-400 border-solid border block rounded-md w-80 p-1 mb-1 text-xs"
                                          />
                                          <p
                                            id={achievement.errorId}
                                            className="text-rose-500"
                                          >
                                            {achievement.errors}
                                          </p>
                                        </div>
                                        <Button
                                          className="bg-rose-400 p-1 ml-2 text-xs cursor-pointer h-7 hover:bg-rose-200"
                                          {...form.remove.getButtonProps({
                                            name: projectFields.achievements
                                              .name,
                                            index: achievementI,
                                          })}
                                        >
                                          担当詳細を削除
                                        </Button>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>
                                {environmentContents.map(
                                  (categories, cateI) => {
                                    //カテゴリ1つ1つがオブジェクト
                                    const categoryField =
                                      categories.getFieldset();
                                    const category = categoryField.category;

                                    const itemField =
                                      categoryField.items.getFieldList();

                                    return (
                                      <div
                                        key={category.id}
                                        className=" p-2 mb-1"
                                      >
                                        {/* カテゴリの入力 */}
                                        <div className="flex">
                                          <div>
                                            <input
                                              {...getInputProps(category, {
                                                type: "text",
                                              })}
                                              key={category.key}
                                              className="border-sky-400 border-solid border block rounded-md w-40 p-1 mb-1"
                                            />
                                            <p
                                              id={category.errorId}
                                              className="text-rose-500"
                                            >
                                              {category.errors}
                                            </p>
                                          </div>
                                          <Button
                                            className="bg-rose-400 p-1 ml-2 text-xs cursor-pointer h-7 hover:bg-rose-200"
                                            {...form.remove.getButtonProps({
                                              name: projectFields.environment
                                                .name,
                                              index: cateI,
                                            })}
                                          >
                                            カテゴリーを削除
                                          </Button>
                                        </div>
                                        {/* アイテム一覧 */}
                                        <ul key={category.id}>
                                          {itemField.map((item, itemI) => {
                                            return (
                                              <li
                                                key={item.id}
                                                className="pl-3 list-square flex"
                                              >
                                                <div>
                                                  <input
                                                    {...getInputProps(item, {
                                                      type: "text",
                                                    })}
                                                    key={item.key}
                                                    className="border-sky-400 border-solid border block rounded-md w-40 p-1 mb-1"
                                                  />
                                                  <p
                                                    id={item.errorId}
                                                    className="text-rose-500"
                                                  >
                                                    {item.errors}
                                                  </p>
                                                </div>
                                                <Button
                                                  className="bg-rose-400 p-1 ml-2 text-xs cursor-pointer h-7 hover:bg-rose-200"
                                                  {...form.remove.getButtonProps(
                                                    {
                                                      name: categoryField.items
                                                        .name,
                                                      index: itemI,
                                                    }
                                                  )}
                                                  key={item.id}
                                                >
                                                  削除
                                                </Button>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                        {/* アイテム追加ボタン */}
                                        <Button
                                          className="bg-sky-700 p-1 h-7 text-xs cursor-pointer w-24 ml-2 hover:bg-sky-500"
                                          {...form.insert.getButtonProps({
                                            name: categoryField.items.name,
                                            defaultValue: "", // 空のアイテムを追加
                                          })}
                                        >
                                          アイテムを追加
                                        </Button>
                                      </div>
                                    );
                                  }
                                )}
                                <Button
                                  className="bg-sky-700 p-1 h-7 text-xs cursor-pointer w-60 ml-2 hover:bg-sky-500"
                                  {...form.insert.getButtonProps({
                                    name: projectFields.environment.name,
                                    defaultValue: {
                                      category: "",
                                      items: [""],
                                    },
                                  })}
                                >
                                  カテゴリを追加
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <label
                                htmlFor={scaleField.participantsNumber.id}
                                className="rounded-md bg-sky-500 w-40 p-1 text-center block"
                              >
                                要員
                              </label>
                              <input
                                {...getInputProps(
                                  scaleField.participantsNumber,
                                  {
                                    type: "number",
                                  }
                                )}
                                key={scaleField.participantsNumber.key}
                                className="border-sky-400 border-solid border rounded-md w-40 p-1 mb-1"
                              />
                              <span>人</span>
                              <p
                                id={scaleField.participantsNumber.errorId}
                                className="text-rose-500"
                              >
                                {scaleField.participantsNumber.errors}
                              </p>
                              <label
                                htmlFor={scaleField.role.id}
                                className="rounded-md bg-sky-500 w-40 p-1 text-center block"
                              >
                                役割
                              </label>
                              <input
                                {...getInputProps(scaleField.role, {
                                  type: "text",
                                })}
                                key={scaleField.role.key}
                                className="border-sky-400 border-solid border rounded-md w-40 p-1 mb-1"
                              />

                              <p
                                id={scaleField.role.errorId}
                                className="text-rose-500"
                              >
                                {scaleField.role.errors}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              // 参考：https://zenn.dev/coji/articles/remix-conform-nested-array
                              {...form.remove.getButtonProps({
                                name: experienceFields.projectList.name,
                                index: index,
                              })}
                              className="bg-rose-700 p-1 ml-2 text-md cursor-pointer h-60 hover:bg-rose-200 [writing-mode:vertical-rl]"
                            >
                              プロジェクトを削除
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="p-2 flex justify-center">
                <Button
                  className="bg-sky-700 p-3 cursor-pointer  hover:bg-sky-500"
                  // 参考：https://zenn.dev/coji/articles/remix-conform-nested-array
                  {...form.insert.getButtonProps({
                    name: experienceFields.projectList.name,
                    defaultValue: {
                      projectOverview: "",
                      pjStartPeriod: "",
                      pjEndPeriod: "",
                      inChargeProcess: "",
                      doneContents: [""],
                      achievements: [""],
                      environment: [
                        {
                          category: "",
                          items: ["", ""],
                        },
                      ],
                      scale: { participantsNumber: 0, role: "" },
                    },
                  })}
                >
                  プロジェクト追加
                </Button>
              </div>
            </div>
          );
        })}
        <p className="text-red-500">{fields.experience.errors}</p>
        <div className="mt-5 flex justify-center">
          <Button
            className="bg-sky-800 p-5 cursor-pointer hover:bg-sky-600"
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
                    pjStartPeriod: "",
                    pjEndPeriod: "",
                    inChargeProcess: "",
                    doneContents: [""],
                    achievements: [""],
                    environment: [
                      {
                        category: "",
                        items: ["", ""],
                      },
                    ],
                    scale: { participantsNumber: 0, role: "" },
                  },
                ],
              },
            })}
          >
            経験会社を追加
          </Button>
        </div>
        <div className="mt-5 flex justify-end">
          <Button
            className="bg-emerald-600 p-3"
            type="submit"
            onClick={() => {
              setIsNaviGuard(false); //強制的にnaviガードを外す
            }}
          >
            登録して次へ
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResumeForm;
