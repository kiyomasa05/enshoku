"use client";

import { resumeSchema } from "@/type";
// import { Resume } from "@/type";
// import { useState } from "react";
// import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
// import { z } from "zod";
// import { resumeSchema, Resume } from "@/type";

const NewResumeForm = () => {
  // const [data, setData] = useState<Resume | null>(defaultValues);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resumeSchema });
    },
    defaultValue: {
      companyName: "",
      startPeriod: "",
      endPeriod: "",
      companyOverview: "",
      projectList: [
        {
          doneContents: [""],
          achievements: "",
          projectOverview: "",
          inChargeOverview: "",
        },
      ],
    },
  });

  // projectListの情報を取得
  const projectList = fields.projectList.getFieldList();

  return (
    <>
      <form id={form.id}>
        <ul>
          <li>
            <label htmlFor={fields.companyName.id}></label>
            <input {...getInputProps(fields.companyName, { type: "text" })} />
          </li>
        </ul>
        <ul>
          {projectList.map((project) => (
            <>
              <li key={project.key}>
                {/* <label htmlFor={}>プロジェクト概要</label> */}
                {/* 名前を `tasks[0]` 、 `tasks[1]` などに設定します。 */}
                {/* <input name={project.projectOverview.name} /> */}
                <div>{project.errors}</div>
              </li>
              <li key={project.key}>
                <label>プロジェクト名</label>
                {/* 名前を `tasks[0]` 、 `tasks[1]` などに設定します。 */}
                {/* <input name={project.} /> */}
                <div>{project.errors}</div>
              </li>
            </>
          ))}
        </ul>
      </form>
    </>
  );
};

export default NewResumeForm;
