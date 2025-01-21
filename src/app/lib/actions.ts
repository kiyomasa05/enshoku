"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { signinSchema } from "@/type";

// 最後の送信処理
export async function signin(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signinSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log(formData)

  redirect("/resume?step=1");
}
