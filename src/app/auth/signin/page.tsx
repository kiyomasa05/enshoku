"use client";
import { parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { signin } from "@/app/lib/actions";
import { signinSchema } from "@/type";

// 新規登録ページ
export default function Signin() {
  const [lastResult, action] = useFormState(signin, undefined);
  const [form, fields] = useForm({
    lastResult,

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinSchema });
    },
  });
  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          新規登録
        </h2>

        <form method="post" {...getFormProps(form)} action={action}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor={fields.username.id}
              >
                Username
              </label>
              <input
                {...getInputProps(fields.username, { type: "text" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              <p id={fields.username.errorId} className="text-red-500">
                {fields.username.errors}
              </p>
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor={fields.email.id}
              >
                Email Address
              </label>
              <input
                {...getInputProps(fields.email, { type: "email" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              <p id={fields.email.errorId} className="text-red-500">
                {fields.email.errors}
              </p>
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor={fields.password.id}
              >
                Password
              </label>
              <input
                {...getInputProps(fields.password, { type: "password" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              <p id={fields.password.errorId} className="text-red-500">
                {fields.password.errors}
              </p>
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
                {...getInputProps(fields.passwordConfirmation, {
                  type: "password",
                })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              <p
                id={fields.passwordConfirmation.errorId}
                className="text-red-500"
              >
                {fields.passwordConfirmation.errors}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              登録する
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
