import React from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { API } from 'infrastructure/api';
import { Button } from 'application/components/Button';

export const DeleteTodo = ({
  todoId,
  onTodoSave,
}: {
  todoId: number;
  onTodoSave: Function;
}) => {
  const handleOnSubmit = async () => {
    const response = await API.todos.deleteTodoItem(todoId);
    if (response.error) {
      console.log(response.error);
      return;
    }
    setTimeout(() => {
      onTodoSave();
    }, 1000);
  };

  return (
    <>
      <Button
        classNames="text-xs pl-1 bg-red-500"
        id="delete"
        onClick={handleOnSubmit}
        icon={<DeleteIcon />}
      >
        Delete
      </Button>
    </>
  );
};
