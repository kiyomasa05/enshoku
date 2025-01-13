import { FieldMetadata, getInputProps } from "@conform-to/react";
import React from "react";

type TextInputFormProps = {
  content: FieldMetadata;
};

const TextInputForm = ({ content }: TextInputFormProps) => {
  return (
    <div className="relative">
      <input
        className="rounded-md p-2 border-sky-400 border-solid border w-full"
        {...getInputProps(content, {
          type: "text",
        })}
        key={content.key}
      />
      {content.errors && (
        <div
          id={content.errorId}
          className="absolute right-0 top-0 transform -translate-y-full
            bg-red-500 text-white text-sm px-2 py-1 rounded
            before:content-[''] before:absolute before:right-4 before:-bottom-1
            before:w-2 before:h-2 before:bg-red-500 before:transform before:rotate-45"
        >
          {content.errors}
        </div>
      )}
    </div>
  );
};

export default TextInputForm;
