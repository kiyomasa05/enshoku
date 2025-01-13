import {
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TableLayoutType,
  VerticalMergeType,
} from "docx";
import { Skillset } from "@/type";
import { translateSkillCate } from "./utils/translateSkillCate";

/**
 * skillからdocxのテーブルを作成し返す
 * @param skills
 * @returns
 */
export const createSkillDocx = (skills: Skillset): Table => {
  // スキルテーブルの作成
  const skillRows = [];

  // ヘッダー行
  skillRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph("")], // 空のヘッダセル
          width: { size: 2000, type: WidthType.DXA },
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: "スキル",
              style: "bold",
            }),
          ],
          width: { size: 2000, type: WidthType.DXA },
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: "経験年数",
              style: "bold",
            }),
          ],
          width: { size: 2000, type: WidthType.DXA },
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: "備考・説明",
              style: "bold",
            }),
          ],
          width: { size: 4000, type: WidthType.DXA },
        }),
      ],
    })
  );

  // スキルリストから行を生成
  Object.entries(skills).forEach(([category, skillList]) => {
    if (skillList.length > 0) {
      // 最初の行にカテゴリを追加
      skillList.forEach((skill, index) => {
        skillRows.push(
          new TableRow({
            children: [
              new TableCell({
                children:
                  index === 0
                    ? [new Paragraph(translateSkillCate(category))]
                    : [], // 最初の行だけカテゴリを表示
                verticalMerge:
                  index === 0
                    ? VerticalMergeType.RESTART
                    : VerticalMergeType.CONTINUE, // 縦方向に結合
                width: { size: 2000, type: WidthType.DXA },
              }),
              new TableCell({
                children: [new Paragraph(skill.kinds)],
                width: { size: 2000, type: WidthType.DXA },
              }),
              new TableCell({
                children: [new Paragraph(skill.yearsOfExperience)],
                width: { size: 2000, type: WidthType.DXA },
              }),
              new TableCell({
                children: [new Paragraph(skill.description || "")],
                width: { size: 4000, type: WidthType.DXA },
              }),
            ],
          })
        );
      });
    }
  });

  // テーブルを作成
  const skillTable = new Table({
    columnWidths: [2000, 2000, 2000, 4000], //ここは1日詰まった。これを指定しないと表のwidthが小さくなってしまう。ドキュメントにサンプルにしか書いてなかった
    rows: skillRows,
    width: {
      size: 10000,
      type: WidthType.DXA, // ページ幅いっぱいにする設定
    },
    layout: TableLayoutType.FIXED, // 自動調整を無効化
  });

  return skillTable;
};
