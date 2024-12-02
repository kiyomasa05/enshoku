import React from "react";

type Props = {
  message?: string;
};
const ErrorMessage = ({ message }: Props) => {
  return <span className="text-red-600">{message}</span>;
};

export default ErrorMessage;
