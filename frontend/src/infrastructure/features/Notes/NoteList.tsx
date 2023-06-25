import React, { useState } from 'react';
import { AlertColor } from '@mui/material';

import { Note } from 'domain/entities/Note';
import { API } from 'infrastructure/api';
import { Toast } from 'application/components/Toast';
import { EditNote } from './EditNote';

type NoteListTypes = {
  noteList: Note[];
};

export const NoteList = ({ noteList }: NoteListTypes) => {
  const [notes, setNotes] = useState(noteList);

  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<AlertColor>('success');
  const [showToast, setShowToast] = useState(false);

  const handleOnNoteSave = async (
    action: 'added' | 'edited' | 'removed',
    todoId?: number,
  ) => {
    let note = notes.find((note: Note) => note.todo_id === todoId);
    const response = await API.notes.fetchNotes();
    if (response.error || response.data === null) {
      console.log(response.error);
      return;
    }
    setNotes(response.data);
    if (action === 'added') {
      note = response?.data.pop();
    }
    if (action === 'edited') {
      note = response?.data.find((note: Note) => note.todo_id === todoId);
    }
    setToastMessage(`${note?.message} is now ${action}`);
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
      <ul>
        {notes ? (
          notes.map((note: Note) => {
            return (
              <li
                key={`note-${note.todo_id}`}
                className={`my-1 flex w-full cursor-pointer items-center gap-3 rounded-md px-2 hover:bg-sky-200`}
              >
                <span>{note.message}</span>
                <span>
                  <EditNote
                    onNoteSave={() => handleOnNoteSave('edited', note.todo_id)}
                    note={note}
                  />
                </span>
              </li>
            );
          })
        ) : (
          <p>There are currently no notes in this category</p>
        )}
      </ul>
    </>
  );
};
