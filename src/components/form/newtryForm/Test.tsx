"use client";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

const schema = z.object({
  todos: z.array(
    z.object({
      title: z.string(),
      notes: z.string(),
    })
  ),
});

const Test = () => {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    defaultValue: {
      todos: [
        {
          title: "",
          notes: "",
        },
      ],
    },
  });
  // const tasks = fields.tasks.getFieldList();
  const todos = fields.todos.getFieldList();
  return (
    <form id={form.id}>
      <ul>
        {todos.map((todo) => {
          const todoFields = todo.getFieldset();

          return (
            <li key={todo.key}>
              <label>aaa</label>
              <input name={todoFields.title.name} />
              <div>{todoFields.title.errors}</div>
              <input name={todoFields.notes.name} />
              <div>{todoFields.notes.errors}</div>
              
            </li>
          );
        })}
      </ul>
    </form>
  );
};
export default Test;
