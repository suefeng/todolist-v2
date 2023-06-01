import React from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { useTodosDestroy } from 'infrastructure/api/todos';
import { Button } from 'application/components/Button';

export const DeleteTodo = ({
  todoId,
  onTodoSave,
}: {
  todoId: number;
  onTodoSave: Function;
}) => {
  const { mutate: deleteTodo } = useTodosDestroy();

  const handleOnSubmit = (event: any) => {
    deleteTodo({ id: todoId });
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
