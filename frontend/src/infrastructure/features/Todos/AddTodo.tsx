import React from 'react';

import { Note } from 'domain/entities/Note';
import { Todo } from 'domain/entities/Todo';
import { TodoForm } from 'domain/server/Todo/todo';
import { API } from 'infrastructure/api';
import FormikForm from 'application/components/form/FormikForm';
import { FormFields } from './FormFields';

type AddTodoTypes = {
  onTodoSave: Function;
};

export const AddTodo = ({ onTodoSave }: AddTodoTypes) => {
  const handleOnSubmit = async (values: Todo) => {
    const response = await API.todos.createTodoItem(values);
    if (response.error) {
      console.log(response.error);
      return;
    }
    if (response.data) {
      const todoId = Number(response.data.id);
      if (values.categories) {
        await API.categoryJoins.createCategoryJoin({
          category_id: Number(values.categories),
          todo_id: todoId,
        });
      }
      if (values.frequencies) {
        await API.frequencyJoins.createFrequencyJoin({
          frequency_id: Number(values.frequencies),
          todo_id: todoId,
        });
      }
      // if (values.days) {
      //   await API.dayJoins.createdayJoins({
      //     day_id: Number(values.days),
      //     todo_id: todoId,
      //   });
      // }
      if (values.note) {
        const noteValue = {
          todo_id: todoId,
          message: String(values.note),
        } as Note;
        await API.notes.createNoteItem(noteValue);
      }
    }
    setTimeout(() => {
      onTodoSave();
    }, 3000);
  };
  return (
    <FormikForm
      initialValues={{
        description: '',
        expiration: '',
        categories: '',
        frequency: '',
        days: '',
        note: '',
      }}
      handleOnSubmit={handleOnSubmit}
      buttonText="Add todo"
      schema={TodoForm}
    >
      {(errors?: object, touched?: object) => (
        <FormFields
          errors={errors}
          touched={touched}
        />
      )}
    </FormikForm>
  );
};
