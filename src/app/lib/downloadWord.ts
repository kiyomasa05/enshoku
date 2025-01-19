import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  SectionType,
  AlignmentType,
} from "docx";
import { Experience, OtherData, Skillset } from "@/type";
import { createSkillDocx } from "./createSkillDocx";
import { createExperienceDocx } from "./createExperienceDocx";
import { createOtherDataDocx } from "./createOtherDataDocx";

export const downloadWord = async (
  skills: Skillset,
  experience: Experience,
  otherData: OtherData
) => {
  if (!skills || !experience || !otherData) {
    alert("データがありません。");
    return;
  }
  const skillTable = createSkillDocx(skills);
  const experienceContents = createExperienceDocx(experience);
  const otherDataContents = createOtherDataDocx(otherData);

  // 現在月日
  const formattedDate = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  // ドキュメントを作成
  const doc = new Document({
    title: "職務経歴書",
    styles: {
      default: {
        document: {
          run: {
            size: "11pt",
            font: "MS Gothic",
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
          },
        },
      },
      paragraphStyles: [],
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
            heading: "Heading2",
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph(""),
          // 名前と日付を入れる
          new Paragraph({
            text: formattedDate,
            alignment: AlignmentType.RIGHT,
          }),
          ...experienceContents,
          new Paragraph({
            children: [new TextRun("テクニカルスキル")],
            heading: "Heading3", // タイトル
          }),
          new Paragraph(""),
          skillTable, // スキル
          new Paragraph(""),

          ...otherDataContents,
        ],
      },
    ],
  });

  // Used to export the file into a .docx file
  Packer.toBlob(doc).then((blob) => {
    // saveAs from FileSaver will download the file
    saveAs(blob, `${formattedDate}_職務経歴書.docx`);
  });
};
