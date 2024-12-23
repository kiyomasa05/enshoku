"use client";

import {
  FieldMetadata,
  FieldName,
  FormId,
  getFormProps,
  getInputProps,
  getTextareaProps,
  useField,
  useForm,
} from "@conform-to/react";
import { Experience, Resume } from "@/type";

type ResumeFormProps = {
  name: FieldName<Experience>;
  formId: FormId;
};

const ResumeForm = ({ name, formId }: ResumeFormProps) => {
  const [meta, form] = useField(name, { formId });
  const fields = meta.getFieldList()[0]?.getFieldset();

  // console.log(fields)
  console.log(form);

  // if (!fields) return null;

  return (
    <form {...getFormProps(form)}>
      <label
        htmlFor={fields.companyName.id}
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        会社名
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border"
        {...getInputProps(fields.companyName, { type: "text" })}
        key={fields.companyName.key}
      />
      <div id={fields.companyName.errorId}>
        {fields.companyName.errors}
      </div>
      <label
        htmlFor={fields.startPeriod.id}
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        在籍期間(開始)
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...getInputProps(fields.startPeriod, { type: "date" })}
        key={fields.startPeriod.key}
      />
      <div id={fields.startPeriod.errorId}>{fields.startPeriod.errors}</div>
      <label
        htmlFor={fields.endPeriod.id}
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        在籍期間(終了)
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...getInputProps(fields.endPeriod, { type: "date" })}
        key={fields.endPeriod.key}
      />
      <div id={fields.endPeriod.errorId}>{fields.endPeriod.errors}</div>
      <h3>職務内容</h3>

      {/* 他のフィールドも同様に */}
      
      {/* プロジェクトリストの処理 */}
      {fields.projectList.getFieldList().map((project, index) => {
        const projectFields = project.getFieldset();
        return (
          <div key={project.key}>
            {/* プロジェクトのフィールド */}
          </div>
        );
      })}
    </form>
  );
};

export default ResumeForm;
