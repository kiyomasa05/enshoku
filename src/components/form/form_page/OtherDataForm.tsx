"use client";

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActionState } from "react";
import { OtherData, otherDataSchema } from "@/type";
import { parseWithZod } from "@conform-to/zod";
import { useResumeFormContext } from "@/app/provider/ResumeFormProvider";
import { useRouter } from "next/navigation";
import TextInputForm from "../form_parts/TextInputForm";
import { SelfPromotionSample } from "../form_parts/Sample";

/**
 * 表形式、一個も入力しなくても進める
 *
 */
const OtherDataForm = () => {
  const router = useRouter();

  const { otherData, setOtherData } = useResumeFormContext();

  // action
  const createOtherData = async (prevState: unknown, formData: FormData) => {
    const submission = parseWithZod(formData, {
      schema: otherDataSchema,
    });

    if (submission.status === "success") {
      const formattedData: OtherData = {
        selfPromotion: submission.value.selfPromotion,
        qualification: submission.value.qualification,
        portfolios: submission.value.portfolios,
      };

      setOtherData(formattedData);
      router.push("/resume?step=4");
    }

    return submission.reply();
  };

  // フォームアクションが呼び出された時にstateを更新
  const [lastResult, action] = useActionState(createOtherData, undefined);

  const [form, fields] = useForm({
    lastResult, // 前回の送信結果を同期
    defaultValue: otherData, //編集時のstateを反映
    onValidate({ formData }) {
      // クライアントでバリデーション・ロジックを再利用する
      return parseWithZod(formData, { schema: otherDataSchema });
    },
    // blurイベント発生時にフォームを検証する
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const qualificationFields = fields.qualification.getFieldList();
  const portfolioFields = fields.portfolios.getFieldList();

  return (
    <>
      <div className="mx-auto w-full">
        <h1 className="text-2xl text-center">その他の入力</h1>
        <form action={action} {...getFormProps(form)} className="mt-8">
          <label
            htmlFor={fields.selfPromotion.id}
            className="rounded-md bg-sky-500 w-40 p-1 h-8 text-center block text-xl font-bold "
            key={fields.selfPromotion.id}
          >
            自己PR
          </label>
          <p className="text-gray-500 pl-5 pt-5">自己PRを入力してください。</p>

          <SelfPromotionSample />
          <textarea
            className="rounded-md p-1 border-sky-400 border-solid border w-full h-40 mb-10"
            {...getTextareaProps(fields.selfPromotion)}
            key={fields.selfPromotion.key}
          ></textarea>
          <p id={fields.selfPromotion.errorId} className="text-rose-500">
            {fields.selfPromotion.errors}
          </p>
          {/* 資格 */}
          <label
            htmlFor={fields.selfPromotion.id}
            className="rounded-md bg-sky-500 w-40 p-1 h-8 text-center block text-xl font-bold"
            key={fields.qualification.id}
          >
            資格
          </label>
          <div className="flex mb-2">
            <p className="text-gray-500 pl-5 pt-5">
              お持ちの資格があれば入力してください。
            </p>
            <Button
              className="bg-sky-700 p-1 h-7 text-xs cursor-pointer hover:bg-sky-500 ml-5 mt-5"
              {...form.insert.getButtonProps({
                name: fields.qualification.name,
                defaultValue: "",
              })}
            >
              資格を追加する
            </Button>
          </div>
          <ul className="pl-10">
            {qualificationFields.map((qualification, qIndex) => {
              return (
                <li key={qualification.key} className="list-square mb-2">
                  <input
                    className="rounded-md p-2 border-sky-400 border-solid border w-80"
                    {...getInputProps(qualification, {
                      type: "text",
                    })}
                    key={qualification.key}
                  />
                  <Button
                    className="bg-rose-400 p-1 ml-2 text-xs cursor-pointer h-7 hover:bg-rose-200"
                    {...form.remove.getButtonProps({
                      name: fields.qualification.name,
                      index: qIndex,
                    })}
                  >
                    削除
                  </Button>
                </li>
              );
            })}
          </ul>

          <label
            htmlFor={fields.portfolios.id}
            className="rounded-md bg-sky-500 w-60 p-1 h-8 text-center block text-xl font-bold mt-10"
            key={fields.portfolios.id}
          >
            ポートフォリオ
          </label>
          <p className="text-gray-500 pl-5">
            ポートフォリオがあれば入力してください。
          </p>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead className="w-80">タイトル</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>説明</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioFields.map((portfolios, pIndex) => {
                const portfolio = portfolios.getFieldset();
                return (
                  <TableRow key={portfolios.key}>
                    <TableCell className="font-medium text-gray-500 text-center">
                      <TextInputForm content={portfolio.title} />
                    </TableCell>
                    <TableCell className="font-medium text-gray-500 text-center">
                      <TextInputForm content={portfolio.url} />
                    </TableCell>
                    <TableCell className="font-medium text-gray-500 text-center">
                      <TextInputForm content={portfolio.explanation} />
                    </TableCell>
                    <TableCell className="font-medium text-gray-500 text-center">
                      <Button
                        className="bg-rose-400 p-1 ml-2 text-xs cursor-pointer h-7 hover:bg-rose-200"
                        {...form.remove.getButtonProps({
                          name: portfolios.name,
                          index: pIndex,
                        })}
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Button
            className="bg-sky-700 p-1 h-7 text-xs cursor-pointer hover:bg-sky-500"
            {...form.insert.getButtonProps({
              name: fields.portfolios.name,
              defaultValue: { title: "", url: "", explanation: "" },
            })}
          >
            ポートフォリオを追加
          </Button>
          <div className="m-3 flex justify-end">
            <Button className="bg-emerald-600 p-3" type="submit">
              登録して次へ
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OtherDataForm;
