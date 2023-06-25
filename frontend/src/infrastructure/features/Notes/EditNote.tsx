import React, { useState } from 'react';
import { EditOutlined } from '@mui/icons-material';

import { Note } from 'domain/entities/Note';
import { Button } from 'application/components/Button';
import { Modal } from 'application/components/Modal';
import { EditNoteForm } from './EditNoteForm';

type EditTodoTypes = {
  onNoteSave: Function;
  note: Note;
};

export const EditNote = ({ onNoteSave, note }: EditTodoTypes) => {
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
          <EditNoteForm
            note={note}
            onNoteSave={onNoteSave}
          />
        </div>
      </Modal>
    </>
  );
};
