import React, { useState } from 'react';
import { AlertColor } from '@mui/material';

import { Todo } from 'domain/entities/Todo';
import { API } from 'infrastructure/api';
import Accordion from 'application/components/Accordion';
import { Toast } from 'application/components/Toast';
import { AddTodo } from './AddTodo';
import { DeleteTodo } from './DeleteTodo';
import { EditTodo } from './EditTodo';
import { TodoDetails } from './TodoDetails';

type TodoListTypes = {
  todoList: Todo[];
};

export const TodoList = ({ todoList }: TodoListTypes) => {
  const [todos, setTodos] = useState<Todo[] | null>(todoList);

  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<AlertColor>('success');
  const [showToast, setShowToast] = useState(false);

  const handleOnChange = async (event: any, todo: Todo) => {
    let todoStatus = todo.status;
    if (todoStatus === 'completed') {
      event.target.value = '';
      todoStatus = 'not-started';
      setToastMessage(`${todo.description} is back`);
      setShowToast(true);
      setToastSeverity('success');
    } else {
      event.target.value = 'completed';
      todoStatus = 'completed';
      setToastMessage(`${todo.description} is done!`);
      setShowToast(true);
      setToastSeverity('success');
    }
    const response = await API.todos.updateTodoItem({
      id: todo.id,
      status: todoStatus,
    } as Todo);
    if (response.error || response.data === null) {
      console.log(response.error);
      return;
    } else {
      const response = await API.todos.fetchTodos();
      setTodos(response.data);
    }
  };

  const handleOnTodoSave = async (
    action: 'added' | 'edited' | 'removed',
    todoId?: number,
  ) => {
    let todo = todos.find((todo: Todo) => todo.id === todoId);
    const response = await API.todos.fetchTodos();
    if (response.error || response.data === null) {
      console.log(response.error);
      return;
    }
    setTodos(response.data);
    if (action === 'added') {
      todo = response?.data.pop();
    }
    if (action === 'edited') {
      todo = response?.data.find((todo: Todo) => todo.id === todoId);
    }
    setToastMessage(`${todo?.description} is now ${action}`);
    setShowToast(true);
    setToastSeverity(
      ['added', 'edited'].includes(action) ? 'success' : 'warning',
    );
  };

  return (
    <>
      <Toast
        message={toastMessage}
        open={showToast}
        setOpen={setShowToast}
        severity={toastSeverity}
      />
      <Accordion
        title="Add a task"
        className="mb-5"
      >
        <AddTodo onTodoSave={() => handleOnTodoSave('added')} />
      </Accordion>
      <ul>
        {todos ? (
          todos.map((todo: Todo) => {
            const bgColor = todo.status === 'completed' ? '' : 'bg-sky-100';

            return (
              <li
                key={`todo-${todo.id}`}
                className={`flex items-center gap-3 px-2 ${bgColor} my-1 w-full cursor-pointer rounded-md hover:bg-sky-200`}
              >
                <span className="flex h-7 w-7 cursor-pointer justify-center rounded-full transition duration-300 hover:bg-white">
                  <input
                    id={todo.description}
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={(event) => handleOnChange(event, todo)}
                    checked={todo.status === 'completed'}
                  />
                </span>
                <TodoDetails
                  status={todo.status}
                  description={todo.description}
                  expiration={todo.expiration}
                  categories={todo.categories}
                  frequency={todo.frequency}
                  days={todo.days}
                  note={todo.note}
                />
                <span
                  className={
                    todo.status === 'completed' ? 'hidden' : 'mr-1 flex gap-2'
                  }
                >
                  <EditTodo
                    onTodoSave={() => handleOnTodoSave('edited', todo.id)}
                    todo={todo}
                  />
                  <DeleteTodo
                    todoId={todo.id}
                    onTodoSave={() => handleOnTodoSave('removed', todo.id)}
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
