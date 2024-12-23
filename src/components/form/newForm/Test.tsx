"use client";

import { FormId, getFormProps, useFormMetadata } from "@conform-to/react";

type ExampleComponentProps = {
  formId:string;
};

/*
useFormMetadataは登録したinputデータを使う方だと思う
*/
const Test = ({ formId }: ExampleComponentProps) => {

  const form = useFormMetadata(formId);

  console.log(form)

  return (
    <form {...getFormProps(form)}>
      {/* <label
        htmlFor={fields.companyName.id}
        className="rounded-full bg-sky-500 w-40 p-3 inline-block text-center"
      >
        会社名
      </label>
      <input
        className="rounded-md p-2 border-sky-400 border-solid border "
        {...getInputProps(fields.companyName, { type: "text" })}
        key={fields.companyName.key}
      /> */}
    </form>
  );
};

export default Test;
