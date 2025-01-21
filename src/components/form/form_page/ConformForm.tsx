"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useResumeFormContext } from "@/app/provider/ResumeFormProvider";
import { useRouter } from "next/navigation";
import { downloadWord } from "@/app/lib/downloadWord";
import { calculatePeriod, formatDate } from "@/app/lib/utils/formatDate";
import { translateSkillCate } from "@/app/lib/utils/translateSkillCate";
import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";

const ConformForm = () => {
  const { experience, skills, otherData } = useResumeFormContext();
  const router = useRouter();

  return (
    <>
      <div className="mx-auto w-full max-w-6xl overflow-x-auto">
        <ProgressBar progress={"100"} progressbar={"w-3/3"} />
        <h1 className="text-2xl text-center mt-10">
          この内容で出力します。ご確認ください
        </h1>
        <div className="relative mt-10">
          <h2 className="text-center text-xl mb-3 border-b border-gray-400 border-solid pb-4">
            職務経歴
          </h2>
          <Button
            className="bg-sky-600 p-3 text-right absolute top-0 right-0"
            onClick={() => {
              router.push("/resume?step=1");
            }}
          >
            編集する
          </Button>
        </div>
        {experience.experience.map((company, index) => {
          return (
            <div
              key={index}
              className="border border-gray-400 rounded-md border-solid mb-3 p-3"
            >
              <div>
                <h3>会社名 {company.companyName}</h3>
                <p>会社概要 {company.companyOverview}</p>
                <p>
                  在籍期間 {formatDate(company.startPeriod)} 〜
                  {formatDate(company.endPeriod)}
                  {`(${calculatePeriod(
                    company.startPeriod,
                    company.endPeriod
                  )})`}
                </p>
              </div>
              <h3 className="m-3">プロジェクト</h3>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-400 border-solid">
                    <TableHead className="">No.</TableHead>
                    <TableHead>期間</TableHead>
                    <TableHead>業務内容</TableHead>
                    <TableHead>環境</TableHead>
                    <TableHead>規模</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {company.projectList.map((project, projectIndex) => {
                    return (
                      <TableRow key={projectIndex}>
                        <TableCell>{projectIndex + 1}</TableCell>
                        <TableCell>
                          <p>{formatDate(project.pjStartPeriod)}</p>
                          <p>〜{formatDate(project.pjEndPeriod)}</p>
                          {`(${calculatePeriod(
                            project.pjStartPeriod,
                            project.pjEndPeriod
                          )})`}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="mb-1">
                              <h4>[プロジェクト概要] </h4>
                              <p className="pl-3">{project.projectOverview}</p>
                            </div>
                            <div className="mb-1">
                              <p>[担当工程] </p>
                              <p className="pl-3">{project.inChargeProcess}</p>
                            </div>
                            <div className="mb-1">
                              <p>[担当詳細]</p>
                              <ul>
                                {project.doneContents.map(
                                  (content, contentIndex) => (
                                    <li className="pl-3" key={contentIndex}>
                                      {content}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p>[実績・工夫点]</p>
                              <ul>
                                {project.achievements.map(
                                  (achievement, achievementIndex) => (
                                    <li className="pl-3" key={achievementIndex}>
                                      {achievement}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div>
                            {project.environment.map((env, envIndex) => (
                              <div
                                key={envIndex}
                                className="environment-section"
                              >
                                <p>{`[${env.category}]`}</p>
                                <ul>
                                  {env.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="pl-3">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div>
                            <p>[要員]</p>
                            <p className="pl-2">
                              {project.scale.participantsNumber}{" "}
                            </p>
                            <p>[役割]</p>
                            <p className="pl-2">{project.scale.role}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* koko */}
                </TableBody>
              </Table>
            </div>
          );
        })}
        <div className="mt-5">
          <div className="relative">
            <h2 className="text-center text-xl mb-3 border-b border-gray-400 border-solid pb-4">
              テクニカルスキル
            </h2>
            <Button
              className="bg-sky-600 p-3 text-right absolute top-0 right-0"
              onClick={() => {
                router.push("/resume?step=2");
              }}
            >
              編集する
            </Button>
          </div>

          <Table className="w-5/6 mx-auto">
            <TableHeader>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead className="min-w-20"></TableHead>
                <TableHead>スキル</TableHead>
                <TableHead>経験年数</TableHead>
                <TableHead>備考、説明</TableHead>
                {/* <TableHead></TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills &&
                Object.entries(skills).map(([category, skillList]) => {
                  if (skillList.length > 0) {
                    return skillList.map((skill, index) => (
                      <TableRow key={`${category}-${index}`}>
                        <TableHead key={category}>{category}</TableHead>
                        <TableCell key={`${category}-${index}-kinds`}>
                          {skill.kinds}
                        </TableCell>
                        <TableCell key={`${category}-${index}-years`}>
                          {skill.yearsOfExperience}
                        </TableCell>
                        <TableCell key={`${category}-${index}-description`}>
                          {skill.description}
                        </TableCell>
                      </TableRow>
                    ));
                  } else {
                    return (
                      <TableRow key={category}>
                        <TableCell colSpan={3} className="text-center">
                          {translateSkillCate(category)} のデータはありません
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-5">
          <div className="relative">
            <h2 className="text-center text-xl mb-3 border-b border-gray-400 border-solid pb-4">
              その他
            </h2>
            <Button
              className="bg-sky-600 p-3 text-right absolute top-0 right-0"
              onClick={() => {
                router.push("/resume?step=3");
              }}
            >
              編集する
            </Button>
          </div>
          <Table className="w-5/6 mx-auto">
            <TableHeader>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead className="min-w-10"></TableHead>
                <TableHead>内容</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead>自己PR</TableHead>
                <TableCell>{otherData.selfPromotion}</TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead>資格</TableHead>
                <TableCell>
                  {otherData.qualification ? (
                    <ul>
                      {otherData.qualification.map((shikaku) => {
                        return (
                          <li key={shikaku} className="list-square">
                            {shikaku}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>資格の登録はありません。</p>
                  )}
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead>ポートフォリオ</TableHead>
                <TableCell>
                  {otherData.portfolios ? (
                    <Table>
                      <TableBody>
                        {/* sabTable */}
                        {otherData.portfolios.map((portfolio, pIndex) => {
                          return (
                            <React.Fragment key={pIndex}>
                              <TableRow>
                                <TableHead rowSpan={3}>
                                  No.{pIndex + 1}
                                </TableHead>
                                <TableCell>タイトル</TableCell>
                                <TableCell>{portfolio.title}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>url</TableCell>
                                <TableCell>{portfolio.url}</TableCell>
                              </TableRow>
                              <TableRow className="border-b border-gray-400 border-solid">
                                <TableCell>説明</TableCell>
                                <TableCell>{portfolio.explanation}</TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <p>ポートフォリオの登録はありません。</p>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="text-red-600 text-center mt-10">
          google ドキュメントやPagesでは少しデザインが崩れる可能性があります。
          <br />
          その場合はお手数ですがご自身で修正いただけますようお願いしたします。
        </p>
        <div className="flex justify-center m-10 ">
          <Button
            className=" p-8 text-2xl cursor-pointer hover:bg-rose-800"
            onClick={() => downloadWord(skills, experience, otherData)}
          >
            この内容でWordをダウンロードする
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConformForm;
