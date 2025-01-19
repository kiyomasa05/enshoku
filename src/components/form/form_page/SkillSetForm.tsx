"use client";

import { getFormProps, useForm } from "@conform-to/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActionState, useEffect, useState } from "react";
import { skillSet, Skillset } from "@/type";
import { parseWithZod } from "@conform-to/zod";
import { useResumeFormContext } from "@/app/provider/ResumeFormProvider";
import { useRouter } from "next/navigation";
import TextInputForm from "../form_parts/TextInputForm";
import { useNavigationGuard } from "next-navigation-guard";

type Params = {
  // step: number;
  onNext: () => void;
  // validateStep: (beforeStep: number, currentStep: number) => true | void;
};

const SkillSetForm = ({ onNext }: Params) => {
  const { setSkills, skills } = useResumeFormContext();
  const [isNaviGuard, setIsNaviGuard] = useState(true);

  // action
  const createSkills = async (prevState: unknown, formData: FormData) => {
    const submission = parseWithZod(formData, {
      schema: skillSet,
    });

    if (submission.status === "success") {
      const formattedData: Skillset = {
        language: submission.value.language.map((lang: any) => ({
          kinds: lang.kinds,
          yearsOfExperience: lang.yearsOfExperience,
          description: lang.description,
        })),
        FW: submission.value.FW.map((fw: any) => ({
          kinds: fw.kinds,
          yearsOfExperience: fw.yearsOfExperience,
          description: fw.description,
        })),
        infra: submission.value.infra.map((inf: any) => ({
          kinds: inf.kinds,
          yearsOfExperience: inf.yearsOfExperience,
          description: inf.description,
        })),
        other: submission.value.other.map((oth: any) => ({
          kinds: oth.kinds,
          yearsOfExperience: oth.yearsOfExperience,
          description: oth.description,
        })),
      };

      setSkills(formattedData);
      setIsNaviGuard(false);
      onNext();
      // router.push("/resume?step=3");
    }

    return submission.reply();
  };

  // フォームアクションが呼び出された時にstateを更新
  const [lastResult, action] = useActionState(createSkills, undefined);

  // useEffect(() => {
  //   if (lastResult && lastResult.status === "success") {
  //     router.push("/resume?step=3");
  //   }
  // }, [lastResult, router]);

  const [form, fields] = useForm({
    lastResult, // 前回の送信結果を同期
    defaultValue: skills, //編集時のstateを反映
    onValidate({ formData }) {
      // クライアントでバリデーション・ロジックを再利用する
      return parseWithZod(formData, { schema: skillSet });
    },
    // blurイベント発生時にフォームを検証する
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useNavigationGuard({
    enabled: isNaviGuard,
    confirm: () =>
      window.confirm("編集中のものは保存されませんが、よろしいですか？"),
  });

  const languages = fields.language.getFieldList();
  const FWs = fields.FW.getFieldList();
  const infras = fields.infra.getFieldList();
  const others = fields.other.getFieldList();

  return (
    <>
      <div className="mx-auto w-full">
        <h1 className="text-2xl text-center">テクニカルスキル</h1>
        <form action={action} {...getFormProps(form)} className="mt-8">
          {/* 言語 */}
          <h2>言語を入力してください</h2>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="w-80">言語</TableHead>
                <TableHead>経験年数</TableHead>
                <TableHead>備考、説明</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-gray-500 text-center">
                  入力例
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>Java</p>
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>学習期間:4ヶ月 実務:1年半</p>
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>基本的な記述は可能</p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              {languages.map((language, lIndex) => {
                const languageFields = language.getFieldset();
                return (
                  <TableRow key={language.key}>
                    <TableCell className="font-medium text-center">
                      {lIndex + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={languageFields.kinds} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm
                        content={languageFields.yearsOfExperience}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={languageFields.description} />
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-red-500 p-3 cursor-pointer hover:bg-pink-200"
                        {...form.remove.getButtonProps({
                          name: fields.language.name,
                          index: lIndex,
                        })}
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <Button
                    className="bg-sky-600 p-3 cursor-pointer hover:bg-sky-900"
                    {...form.insert.getButtonProps({
                      name: fields.language.name,
                      defaultValue: {
                        kinds: "",
                        yearsOfExperience: "",
                        description: "",
                      },
                    })}
                  >
                    言語を追加する
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* FW */}
          <h2 className="mt-16">
            利用したことのあるフレームワークを入力してください
          </h2>

          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="w-80">フレームワーク</TableHead>
                <TableHead>経験年数</TableHead>
                <TableHead>備考、説明</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-gray-500 text-center">
                  入力例
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>Ruby on Rails</p>
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>1年</p>
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>調べながらであれば読み書き可能</p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              {FWs.map((FW, fIndex) => {
                const FWFields = FW.getFieldset();
                return (
                  <TableRow key={FW.key}>
                    <TableCell className="font-medium text-center">
                      {fIndex + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={FWFields.kinds} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={FWFields.yearsOfExperience} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={FWFields.description} />
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-red-500 p-3 cursor-pointer hover:bg-pink-200"
                        {...form.remove.getButtonProps({
                          name: fields.FW.name,
                          index: fIndex,
                        })}
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <Button
                    className="bg-sky-600 p-3 cursor-pointer hover:bg-sky-900"
                    {...form.insert.getButtonProps({
                      name: fields.FW.name,
                      defaultValue: {
                        kinds: "",
                        yearsOfExperience: "",
                        description: "",
                      },
                    })}
                  >
                    フレームワークを追加する
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* インフラ */}
          <h2 className="mt-16">インフラ系のスキルを入力してください</h2>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="w-80">インフラ系スキル</TableHead>
                <TableHead>経験年数</TableHead>
                <TableHead>備考、説明</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-gray-500 text-center">
                  入力例
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>AWS</p>
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>1年</p>
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>EC2,ECS,S3等使用頻度の高いものは理解</p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              {infras.map((infra, iIndex) => {
                const infraFields = infra.getFieldset();

                return (
                  <TableRow key={infra.key}>
                    <TableCell className="font-medium text-center">
                      {iIndex + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={infraFields.kinds} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={infraFields.yearsOfExperience} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={infraFields.description} />
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-red-500 p-3 cursor-pointer hover:bg-pink-200"
                        {...form.remove.getButtonProps({
                          name: fields.infra.name,
                          index: iIndex,
                        })}
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <Button
                    className="bg-sky-600 p-3 cursor-pointer hover:bg-sky-900"
                    {...form.insert.getButtonProps({
                      name: fields.infra.name,
                      defaultValue: {
                        kinds: "",
                        yearsOfExperience: "",
                        description: "",
                      },
                    })}
                  >
                    インフラ系スキルを追加する
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* その他 */}
          <h2 className="mt-16">その他入力したいスキルを入力してください</h2>

          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="w-80">その他スキル</TableHead>
                <TableHead>経験年数</TableHead>
                <TableHead>備考、説明</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-gray-500 text-center">
                  入力例
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>Git</p>
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>1年</p>
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  <p>基本的な操作は可能</p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              {others.map((other, oIndex) => {
                const otherFields = other.getFieldset();
                return (
                  <TableRow key={other.key}>
                    <TableCell className="font-medium text-center">
                      {oIndex + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={otherFields.kinds} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={otherFields.yearsOfExperience} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <TextInputForm content={otherFields.description} />
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-red-500 p-3 cursor-pointer hover:bg-pink-200"
                        {...form.remove.getButtonProps({
                          name: fields.other.name,
                          index: oIndex,
                        })}
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <Button
                    className="bg-sky-600 p-3 cursor-pointer hover:bg-sky-900"
                    {...form.insert.getButtonProps({
                      name: fields.other.name,
                      defaultValue: {
                        kinds: "",
                        yearsOfExperience: "",
                        description: "",
                      },
                    })}
                  >
                    その他スキルを追加する
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="m-3 flex justify-end">
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
      </div>
    </>
  );
};

export default SkillSetForm;
