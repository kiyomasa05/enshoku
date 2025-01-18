import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ResumeFormSample = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg text-sky-800 font-bold">
          入力例を表示
        </AccordionTrigger>
        <AccordionContent>
          <div className="text-gray-500 mb-3">
            <h2 className="font-bold">職務要約</h2>
            <p>
              新卒でxxxxxxxxxへ入社。3年代理店営業を行い、電子契約のシステム開発を会社役員に進言し、5年ほどシステム開発の上流工程を経験。
            </p>
            <p>
              直近１年でフルスタックエンジニアとして、Ｗｅｂアプリ開発（フロント・バックエンド）、インフラ運用等業務を経験
            </p>
          </div>
          <Table className="text-gray-500 border-solid border border-gray-400">
            <TableHeader>
              <TableRow className="border-b border-gray-400 border-solid">
                <TableHead className="border-solid border-r border-gray-400 w-8">
                  No.
                </TableHead>
                <TableHead className="border-solid border-r border-gray-400 w-48">
                  期間
                </TableHead>
                <TableHead className="border-solid border-r border-gray-400">
                  業務内容
                </TableHead>
                <TableHead className="border-solid border-r border-gray-400">
                  環境
                </TableHead>
                <TableHead>規模</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-solid border-r border-gray-400">
                  0
                </TableCell>
                <TableCell className="border-solid border-r border-gray-400">
                  <div>
                    <p>2024年4月</p>
                    <p>~2024年12月</p>
                    <p>(8ヶ月)</p>
                  </div>
                </TableCell>
                <TableCell className="border-solid border-r border-gray-400">
                  <div>
                    <p>[プロジェクト概要]</p>
                    <p className="pl-3">
                      自社サービスxxxxxxのシステム改修、運用
                    </p>
                    <p>[担当工程]</p>
                    <p className="pl-3">設計、実装、ITa</p>
                    <p>[担当詳細]</p>
                    <ul className="pl-6 list-square">
                      <li>テスト仕様書の作成</li>
                      <li>ログイン画面実装</li>
                    </ul>
                    <p>[実績・工夫点など]</p>
                    <ul className="pl-6 list-square">
                      <li>
                        システム概要などをPPTにまとめ、疑問点をメンバーに確認し、早期キャッチアップを目指した
                      </li>
                      <li>SQLを学習し、できるだけ自分でのエラー解決に勤めた</li>
                    </ul>
                  </div>
                </TableCell>
                <TableCell className="border-solid border-r border-gray-400">
                  <div className="relative">
                    {/* カテゴリ */}
                    <p className="relative inline-block">
                      <span className="absolute -top-10 left-16 bg-red-500 text-white text-xs py-2 px-4 rounded-lg shadow-md w-40">
                        「インフラ」「言語」などのカテゴリはご自由に入力してください
                        <span className="absolute top-full left-20 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></span>
                      </span>
                      インフラ
                    </p>
                    <ul className="pl-6 list-square">
                      <li>AWS</li>
                      <li>Docker</li>
                    </ul>
                    <p>言語</p>
                    <ul className="pl-6 list-square">
                      <li>TypeScript</li>
                      <li>Ruby</li>
                    </ul>
                    <p>フレームワーク</p>
                    <ul className="pl-6 list-square">
                      <li>Vue.js(compositionAPI)</li>
                      <li>Ruby on Rails(v7)</li>
                    </ul>
                  </div>
                </TableCell>
                <TableCell>
                  <p>[要員]</p>
                  <p>2名</p>
                  <p>[役割]</p>
                  <p>エンジニア</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const SelfPromotionSample = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg text-sky-800 font-bold">
            入力例を表示
          </AccordionTrigger>
          <AccordionContent className="text-gray-500">
            <h2>自己PR</h2>
            <p>
              【伝える力、要約力】
              相手の立場になって考え、図解や解説などで理解しやすく伝えるのが得意です。伝えたいことを絞って要約して伝えることも得意で、上流工程や会議などで円滑にコミュニケーションをとって進めることができます。
            </p>
            <p>
              【調べる力】
              エンジニアとしての経験は未熟ですが、調べて実装や手順の作成などが可能です。
              知識がない領域でも全体感をとらえてから、知りたい部分の調査をするよう意識し、業務を行ってきました。
              未経験ながら１年業務ができたのは、周りのおかげと調べる力があるためと考えてます。
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
