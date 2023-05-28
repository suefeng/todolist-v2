import { CreateTodoList } from "domain/entities/TodoList";
import React from "react";
import Link from "next/link";
import { URLS } from "infrastructure/router/routes";
import { formatDate } from "domain/services/date.services";

export const TodoDescription = ({
  description,
  expiration,
  categories,
  repeatings,
  status,
}: CreateTodoList) => {
  const TodoLink = ({
    filterOption,
    typeOption,
  }: {
    filterOption: string;
    typeOption: string;
  }) => {
    const bgColor = () => {
      switch (typeOption) {
        case "category":
          return "bg-pink-300";
        case "expiration":
          if (Number(new Date(filterOption)) < Date.now()) {
            return "bg-white text-red-500";
          } else {
            return "bg-white";
          }
        case "repeating":
          return "bg-green-200";
      }
    };
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const expirationText = (expiration: string) =>
      `due on ${formatDate(expiration, dateOptions)}`;
    const optionText =
      typeOption === "expiration" ? expirationText(filterOption) : filterOption;

    return (
      <Link
        className={`${bgColor()} rounded-md inline-block px-2 py-0.5 text-xs`}
        href={URLS.todoFilter(filterOption, typeOption)}
      >
        {optionText}
      </Link>
    );
  };

  const statusStyle =
    status === "completed"
      ? "line-through text-gray-400"
      : "font-bold text-gray-700";

  return (
    <label
      htmlFor={description}
      className={`${
        status === "completed" && "hidden" ? "" : "py-3"
      } block w-full cursor-pointer`}
    >
      <span>
        <span className={`text-lg block ${statusStyle}`}>{description}</span>
        <span
          className={`flex gap-2 ${status === "completed" ? "hidden" : "mt-2"}`}
        >
          {categories &&
            categories.map((category: { name: string }) => (
              <TodoLink
                key={category.name}
                filterOption={category.name}
                typeOption="category"
              />
            ))}
          {expiration && (
            <TodoLink filterOption={expiration} typeOption="expiration" />
          )}
          {repeatings &&
            repeatings.map((repeat: { name: string }) => (
              <TodoLink
                key={repeat.name}
                filterOption={repeat.name}
                typeOption="repeating"
              />
            ))}
        </span>
      </span>
    </label>
  );
};
