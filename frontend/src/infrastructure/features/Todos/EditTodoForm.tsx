import React from 'react';

import { Todo } from 'domain/entities/Todo';
import { TodoForm } from 'domain/server/Todo/todo';
import { API } from 'infrastructure/api';
import FormikForm from 'application/components/form/FormikForm';
import { FormFields } from './FormFields';

type EditTodoTypes = {
  todo: Todo;
  onTodoSave: Function;
};

export const EditTodoForm = ({ onTodoSave, todo }: EditTodoTypes) => {
  const handleOnSubmit = async (values: Todo) => {
    const todoResponse = await API.todos.updateTodoItem(values);
    if (todoResponse.error) {
      console.log(todoResponse.error);
      return;
    }
    if (todoResponse.data) {
      if (todoResponse.data?.categories && !!values.categories) {
        await API.categoryJoins.updateCategoryJoin({
          todo_id: Number(values.id),
          category_id: Number(values.categories),
        });
      } else if (!!values.categories) {
        await API.categoryJoins.createCategoryJoin({
          todo_id: Number(values.id),
          category_id: Number(values.categories),
        });
      }
      if (todoResponse.data?.frequency && !!values.frequency) {
        await API.frequencyJoins.updateFrequencyJoin({
          todo_id: Number(values.id),
          frequency_id: Number(values.frequency),
        });
      } else if (!!values.frequency) {
        await API.frequencyJoins.createFrequencyJoin({
          todo_id: Number(values.id),
          frequency_id: Number(values.frequency),
        });
      }
      if (todoResponse.data?.note && !!values.note) {
        await API.notes.updateNoteItem({
          todo_id: Number(values.id),
          message: String(values.note),
        });
      } else if (!!values.note) {
        await API.notes.createNoteItem({
          todo_id: Number(values.id),
          message: String(values.note),
        });
      }
      if (todoResponse.data?.days && !!values.days) {
        await API.dayJoins.updateDayJoin({
          todo_id: Number(values.id),
          day_id: Number(values.days),
        });
      } else if (!!values.days) {
        await API.dayJoins.createDayJoin({
          todo_id: Number(values.id),
          day_id: Number(values.days),
        });
      }
    }
    setTimeout(() => {
      onTodoSave();
    }, 1000);
  };

  const description = todo.description || '';
  const expiration = todo.expiration || '';
  const categories = !!todo.categories?.length
    ? `${todo.categories[0].id}`
    : '';
  const days = !!todo.days?.length ? `${todo.days[0].id}` : '';
  const frequency = todo.frequency?.id || '';
  const note = todo?.note?.message || '';

  return (
    <FormikForm
      initialValues={{
        id: todo.id,
        description: description,
        expiration: expiration,
        categories: categories,
        days: days,
        frequency: frequency,
        note: note,
      }}
      handleOnSubmit={handleOnSubmit}
      schema={TodoForm}
      buttonText="Edit todo"
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
