import {
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TableLayoutType,
  TextRun,
} from "docx";
import { Experience, ProjectList } from "@/type";
import { calculatePeriod, formatDate } from "./utils/formatDate";

type DocxContent = Paragraph | Table;

/**
 * 職務経歴書用のテーブル行を作成
 */
const createExperienceTableRow = (project: ProjectList) => {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph(formatDate(project.pjStartPeriod)),
          new Paragraph({
            children: [
              new TextRun("〜"),
              new TextRun(formatDate(project.pjEndPeriod)),
            ],
          }),
          new Paragraph(
            ` ( ${calculatePeriod(
              project.pjStartPeriod,
              project.pjEndPeriod
            )} )`
          ),
        ],
        width: { size: 1500, type: WidthType.DXA },
      }),
      new TableCell({
        children: [
          new Paragraph("[プロジェクト概要]"),
          new Paragraph(project.projectOverview),
          new Paragraph({ text: "[担当工程]", spacing: { before: 50 } }),
          new Paragraph({
            text: `  ${project.inChargeProcess}`,
            spacing: { before: 0, after: 0, line: 200, lineRule: "exact" }, // exactだとぴったりになる docxだとこの設定で良さそう
          }),
          new Paragraph({ text: "[担当詳細]", spacing: { before: 50 } }),
          ...project.doneContents.map(
            (content) =>
              new Paragraph({
                text: `  ${content}`,
                spacing: { before: 0, after: 0, line: 200, lineRule: "exact" },
              })
          ),
          new Paragraph({ text: "[実績・工夫点]", spacing: { before: 50 } }),
          ...project.achievements.map(
            (achievement) =>
              new Paragraph({
                text: `  ${achievement}`,
                spacing: { before: 0, after: 0, line: 200, lineRule: "exact" },
              })
          ),
        ],
        width: { size: 5000, type: WidthType.DXA },
      }),
      // 環境
      new TableCell({
        children: [
          ...project.environment
            .map((env) => [
              new Paragraph({
                text: `[${env.category}]`,
                spacing: { before: 50, line: 200 },
              }),
              ...env.items.map(
                (item) =>
                  new Paragraph({
                    text: `  ${item}`,
                    spacing: { line: 200 },
                  })
              ),
            ])
            .flat(), // 環境データをフラットに展開
        ],
        width: { size: 2500, type: WidthType.DXA },
      }),
      new TableCell({
        children: [
          new Paragraph("[要員]"),
          new Paragraph(project.scale.participantsNumber.toString()),
          new Paragraph("[役割]"),
          new Paragraph(project.scale.role),
        ],
        width: { size: 1000, type: WidthType.DXA },
      }),
    ],
  });
};

/**
 * experienceからdocxのコンテンツを作成
 */
export const createExperienceDocx = (experience: Experience): DocxContent[] => {
  const contents: DocxContent[] = [];

  // 職務要約
  contents.push(
    new Paragraph({
      children: [new TextRun({ text: "◼︎職務要約", bold: true })],
    })
  );

  contents.push(
    new Paragraph({
      text: experience.summary,
      spacing: { after: 100 },
    })
  );

  experience.experience.forEach((company) => {
    // 会社情報
    contents.push(
      new Paragraph({
        children: [new TextRun({ text: "会社名", bold: true })],
      }),
      new Paragraph({
        children: [new TextRun({ text: company.companyName, bold: true })],
      }),

      new Paragraph({
        children: [new TextRun({ text: "会社概要", bold: true })],
      }),
      new Paragraph(company.companyOverview)
    );

    // プロジェクト情報のテーブル作成
    const tableRows = [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "期間", bold: true })],
              }),
            ],
            width: { size: 1500, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "業務内容", bold: true })],
              }),
            ],
            width: { size: 5000, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "環境", bold: true })],
              }),
            ],
            width: { size: 2500, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "規模", bold: true })],
              }),
            ],
            width: { size: 1000, type: WidthType.DXA },
          }),
        ],
      }),
      ...company.projectList.map((project) =>
        createExperienceTableRow(project)
      ),
    ];

    contents.push(
      new Table({
        columnWidths: [1500, 5000, 2500, 1000],
        rows: tableRows,
        width: { size: 10000, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
      })
    );
  });
  return contents;
};
