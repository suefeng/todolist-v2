import React, { useState } from "react";
import { useTodos, useTodosUpdate } from "infrastructure/api/todos";
import Accordion from "application/components/Accordion";
import { AddTodo } from "./AddTodo";
import { DeleteTodo } from "./DeleteTodo";
import { EditTodo } from "./EditTodo";
import { TodoList } from "domain/entities/TodoList";
import { TodoDescription } from "./TodoDescription";
import { Toast } from "application/components/Toast";
import { SortedTodos } from "domain/server/Todo/todo.aggregator";
import { AlertColor } from "@mui/material";

type TodoListTypes = {
  filter?: string;
  type?: string;
};

const TodoList = ({ filter = "", type = "" }: TodoListTypes) => {
  const {
    data: todos,
    isLoading: loading,
    isFetching: fetching,
    isRefetching: refetching,
    refetch,
  } = useTodos({ filter: filter, type: type });

  const mutation = useTodosUpdate();

  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<AlertColor>("success");
  const [showToast, setShowToast] = useState(false);

  const handleOnChange = (event: any, todo: TodoList) => {
    let todoStatus = todo.status;
    if (todoStatus === "completed") {
      todo.status = "not-started";
      event.target.value = "";
      todoStatus = "not-started";
      setToastMessage(`${todo.description} is back`);
      setShowToast(true);
      setToastSeverity("success");
    } else {
      todo.status = "completed";
      event.target.value = "completed";
      todoStatus = "completed";
      setToastMessage(`${todo.description} is done!`);
      setShowToast(true);
      setToastSeverity("success");
    }
    mutation.mutate({
      id: todo.id,
      status: todoStatus,
    });
  };

  const handleOnTodoSave = (action: "added" | "edited" | "removed") => {
    refetch().then((response) => {
      const latest = response?.data.pop();
      setToastMessage(`${latest.description} is now ${action}`);
      setShowToast(true);
      setToastSeverity(
        ["added", "edited"].includes(action) ? "success" : "warning"
      );
    });
  };

  return (
    <>
      <Toast
        message={toastMessage}
        open={showToast}
        setOpen={setShowToast}
        severity={toastSeverity}
      />
      <Accordion title="Add a task" className="mb-5">
        <AddTodo onTodoSave={() => handleOnTodoSave("added")} />
      </Accordion>
      <ul>
        {loading || fetching || refetching ? (
          "loading"
        ) : todos ? (
          SortedTodos(todos).map((todo: TodoList) => {
            const bgColor = todo.status === "completed" ? "" : "bg-sky-100";

            return (
              <li
                key={`todo-${todo.id}`}
                className={`flex gap-3 items-center px-2 ${bgColor} my-1 w-full rounded-md hover:bg-sky-200 cursor-pointer`}
              >
                <span className="rounded-full flex justify-center w-7 h-7 hover:bg-white cursor-pointer transition duration-300">
                  <input
                    id={todo.description}
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={(event) => handleOnChange(event, todo)}
                    checked={todo.status === "completed"}
                  />
                </span>
                <TodoDescription
                  status={todo.status}
                  description={todo.description}
                  expiration={todo.expiration}
                  categories={todo.categories}
                  repeatings={todo.repeatings}
                />
                <span
                  className={
                    todo.status === "completed" ? "hidden" : "flex gap-2 mr-1"
                  }
                >
                  <EditTodo
                    todoId={todo.id}
                    onTodoSave={() => handleOnTodoSave("edited")}
                  />
                  <DeleteTodo
                    todoId={todo.id}
                    onTodoSave={() => handleOnTodoSave("removed")}
                  />
                </span>
              </li>
            );
          })
        ) : (
          <p>There are currently no todos in this category</p>
        )}
      </ul>
    </>
  );
};

export default TodoList;
