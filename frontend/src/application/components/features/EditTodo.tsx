import React, { useState } from "react";
import { Button } from "application/components/Button";
import { EditOutlined } from "@mui/icons-material";
import { EditTodoForm } from "./EditTodoForm";
import { Modal } from "application/components/Modal";

export const EditTodo = ({
  todoId,
  onTodoSave,
}: {
  todoId: number;
  onTodoSave: Function;
}) => {
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
      <Modal open={open} onClose={handleClose}>
        <div className="max-w-md bg-white p-5 m-auto mt-5">
          <EditTodoForm todoId={todoId} onTodoSave={onTodoSave} />
        </div>
      </Modal>
    </>
  );
};
