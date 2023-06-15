import React from 'react';

import { TodoForm } from 'domain/server/Todo/todo';
import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';
import FormikForm from 'application/components/form/FormikForm';
import { FormFields } from './FormFields';

type AddTodoTypes = {
  onTodoSave: Function;
};

export const AddTodo = ({ onTodoSave }: AddTodoTypes) => {
  type ValueTypes = {
    categories?: string;
    frequencies?: string;
    expiration?: string;
    description: string;
    note?: string;
    days?: string;
  };

  const Schema = TodoForm;

  const handleOnSubmit = (values: ValueTypes) => {
    ({ store, API }: AppRegistry) =>
      async () => {
        const todo = await API.todos.createTodoItem(
          values.description,
          values.expiration,
        );
        if (values.categories) {
          // await API.categories.createCategory({
          //   category_id: Number(values.categories),
          //   todo_id: todo.id,
          // });
        }
        if (values.frequencies) {
          // await API.frequencies.createFrequency({
          //   frequency_id: Number(values.frequencies),
          //   todo_id: todo.id,
          // });
        }
        if (values.days) {
          // await createDay({
          //   day_id: Number(values.days),
          //   todo_id: todo.id,
          // });
        }
        // On Error
        if (todo.error) {
          // eslint-disable-next-line no-console
          console.log(todo.error);
          return;
        }
        setTimeout(() => {
          onTodoSave();
        }, 3000);
      };
  };

  return (
    <FormikForm
      initialValues={{
        description: '',
        expiration: '',
        categories: '',
        frequencies: '',
        days: '',
        note: '',
      }}
      handleOnSubmit={handleOnSubmit}
      buttonText="Add todo"
      Schema={Schema}
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
