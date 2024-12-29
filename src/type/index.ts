import { z } from "zod";

/* 例
[{1社目},{2社目},{3社目}]
N社目
{companyName:xxxx,
  startPeriod: xx;
  endPeriod: xx;
  companyOverview: xx; //会社概要
  projectList: ProjectList[]
}
*/

/**
 * 業務内容(ProjectList)
 */
export const projectListSchema = z.object({
  projectOverview: z.string({ required_error: "プロジェクト概要は必須です" }),
  inChargeOverview: z.string({ required_error: "担当工程概要は必須です" }),
  doneContents: z
    .array(z.string().min(1, "担当詳細は必須です"))
    .min(1, "少なくとも1つの担当詳細が必要です"), // 担当詳細
  achievements: z.string({ required_error: "実績は必須です" }),
});
// 職務経歴
export const resumeSchema = z.object({
  companyName: z.string({ required_error: "会社名は必須です。" }),
  startPeriod: z.string({ required_error: "開始期間は必須です" }),
  endPeriod: z.string({ required_error: "終了期間は必須です" }),
  companyOverview: z.string({ required_error: "会社概要は必須です" }),
  projectList: z
    .array(projectListSchema)
    .min(1, "少なくとも1つのプロジェクトが必要です"), // 職務内容
});

// 会社ごと
export const experienceSchema = z.object({
  experience: z.array(resumeSchema).min(1, "少なくとも1つの会社名が必要です"),
});
// export const experienceSchema = z.array(resumeSchema);

export type ProjectList = z.infer<typeof projectListSchema>;
export type Resume = z.infer<typeof resumeSchema>;
export type Experience = z.infer<typeof experienceSchema>;

export const skill = z.object({
  kinds: z.string(), // Rubyとか
  yearsOfExperience: z.string(),
  description: z.string(),
});

export const skillSet = z.object({
  language: z.array(skill),
  FW: z.array(skill),
  infra: z.array(skill),
  other: z.array(skill),
});

export const outputData = z.object({
  experience: experienceSchema,
  skill: skillSet,
});

export type OutputData = z.infer<typeof outputData>;

export type Skill = z.infer<typeof skill>;
export type Skillset = z.infer<typeof skillSet>;
