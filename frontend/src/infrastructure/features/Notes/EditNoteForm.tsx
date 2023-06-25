import React from 'react';
import { Field } from 'formik';

import { Note } from 'domain/entities/Note';
import { NoteForm } from 'domain/server/Note/note';
import { API } from 'infrastructure/api';
import FormikForm from 'application/components/form/FormikForm';
import Textarea from 'application/components/form/Textarea';

type EditTodoTypes = {
  note: Note;
  onNoteSave: Function;
};

export const EditNoteForm = ({ note, onNoteSave }: EditTodoTypes) => {
  const noteItem = note;

  const handleOnSubmit = async (values: Note) => {
    if (!!values) {
      await API.notes.updateNoteItem(values);
    }

    setTimeout(() => {
      onNoteSave();
    }, 1000);
  };

  return (
    <FormikForm
      initialValues={{
        todo_id: noteItem.todo_id,
        message: noteItem.message,
      }}
      handleOnSubmit={handleOnSubmit}
      schema={NoteForm}
      buttonText="Edit note"
    >
      {(errors?: object, touched?: object) => (
        <div className="my-3">
          <label htmlFor="message">Note:</label>
          <Field
            id="message"
            name="message"
            touched={touched}
            errors={errors}
            as={Textarea}
          />
        </div>
      )}
    </FormikForm>
  );
};
