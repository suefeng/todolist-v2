import React, { useState } from 'react';
import { EditOutlined } from '@mui/icons-material';

import { Button } from 'application/components/Button';
import { Modal } from 'application/components/Modal';
import { EditTodoForm } from './EditTodoForm';

type EditTodoTypes = {
  todoId: number;
  onTodoSave: Function;
};

export const EditTodo = ({ todoId, onTodoSave }: EditTodoTypes) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        id="edit"
        classNames="text-xs"
        icon={<EditOutlined />}
        onClick={handleOnClick}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className="m-auto mt-5 max-w-xl bg-white p-5">
          <EditTodoForm
            todoId={todoId}
            onTodoSave={onTodoSave}
          />
        </div>
      </Modal>
    </>
  );
};
