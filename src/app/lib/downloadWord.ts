import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  SectionType,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { Experience, Skillset } from "@/type";
import { createSkillDocx } from "./createSkillDocx";

export const downloadWord = async (
  skills: Skillset,
  experience: Experience
) => {
  if (!skills) {
    alert("スキルデータがありません。");
    return;
  }
  const skillTable = createSkillDocx(skills);

  // ドキュメントを作成
  const doc = new Document({
    title: "職務経歴書",
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            font: "MS Gothic",
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 上余白 (1/20 インチ単位)
              right: 720, // 右余白
              bottom: 720, // 下余白
              left: 720, // 左余白
            },
          },
          type: SectionType.NEXT_PAGE,
        },
        children: [
          new Paragraph({
            children: [new TextRun("職務経歴書")],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun("テクニカルスキル")],
            heading: "Heading2", // タイトル
          }),
          skillTable, // スキル
          new Paragraph(""),
          new Paragraph(""),
          new Paragraph({
            children: [new TextRun("職務経歴")],
            heading: "Heading2", // タイトル
          }),
        ],
      },
    ],
  });

  // Used to export the file into a .docx file
  Packer.toBlob(doc).then((blob) => {
    // saveAs from FileSaver will download the file
    saveAs(blob, "example.docx");
  });
};
