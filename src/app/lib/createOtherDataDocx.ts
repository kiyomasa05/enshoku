import {
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TableLayoutType,
  TextRun,
  VerticalMergeType,
} from "docx";
import { OtherData } from "@/type";

type DocxContent = Paragraph | Table;

type portfolio = {
  title: string;
  url: string;
  explanation: string;
};

/**
 * experienceからdocxのコンテンツを作成
 */
export const createOtherDataDocx = (otherData: OtherData): DocxContent[] => {
  const contents: DocxContent[] = [];

  // 自己PR
  contents.push(
    new Paragraph({
      children: [new TextRun({ text: "◼︎自己PR", bold: true })],
    }),
    new Paragraph({
      text: otherData.selfPromotion,
      spacing: { after: 100 },
    })
  );

  // 取得資格
  if (otherData.qualification) {
    contents.push(
      new Paragraph({
        children: [new TextRun({ text: "◼︎取得資格", bold: true })],
      })
    );
    otherData.qualification.map((value) => {
      contents.push(
        new Paragraph({
          text: value,
          indent: { start: 1 },
        })
      );
    });
  }

  // portfolios
  if (otherData.portfolios) {
    contents.push(
      new Paragraph({
        children: [new TextRun({ text: "◼︎ポートフォリオ", bold: true })],
      })
    );

    const tableRows: TableRow[] = [];

    otherData.portfolios.forEach((portfolio, index) => {
      // No.x行（タイトル行）
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`No.${index + 1}`)], // 各行で No.x を設定
              width: { size: 1500, type: WidthType.DXA },
            }),
            new TableCell({
              children: [new Paragraph("タイトル")],
              width: { size: 1500, type: WidthType.DXA },
            }),
            new TableCell({
              children: [new Paragraph(portfolio.title)],
              width: { size: 7000, type: WidthType.DXA },
            }),
          ],
        })
      );

      // URL行
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [], // この行ではNoセルは空
              width: { size: 1500, type: WidthType.DXA },
            }),
            new TableCell({
              children: [new Paragraph("URL")],
              width: { size: 1500, type: WidthType.DXA },
            }),
            new TableCell({
              children: [new Paragraph(portfolio.url)],
              width: { size: 7000, type: WidthType.DXA },
            }),
          ],
        })
      );

      // 説明行
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [], // この行ではNoセルは空
              width: { size: 1500, type: WidthType.DXA },
            }),
            new TableCell({
              children: [new Paragraph("説明")],
              width: { size: 1500, type: WidthType.DXA },
            }),
            new TableCell({
              children: [new Paragraph(portfolio.explanation)],
              width: { size: 7000, type: WidthType.DXA },
            }),
          ],
        })
      );
    });

    contents.push(
      new Table({
        columnWidths: [1500, 1500, 7000],
        rows: tableRows,
        width: { size: 10000, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
      })
    );
  }

  return contents;
};
