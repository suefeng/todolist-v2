import React from "react";

type ButtonType = {
  disabled?: boolean;
  icon?: React.ReactNode;
  id: string;
  type?: "button" | "submit" | "reset";
  children: string;
  classNames?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  children,
  classNames,
  disabled,
  icon,
  id,
  type,
  onClick,
  ...props
}: ButtonType) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${classNames}`}
      disabled={disabled}
      id={id}
      type={type}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};
