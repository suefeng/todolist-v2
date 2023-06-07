import React from 'react';

import {
  useCategoryJoinCreation,
  useCategoryJoinUpdate,
} from 'infrastructure/api/category_joins';
import {
  useFrequencyJoinCreation,
  useFrequencyJoinUpdate,
} from 'infrastructure/api/frequency_joins';
import { useTodoShow, useTodosUpdate } from 'infrastructure/api/todos';
import FormikForm from 'application/components/form/FormikForm';
import { FormFields } from './FormFields';

type EditTodoTypes = {
  todoId: number;
  onTodoSave: Function;
};

export const EditTodoForm = ({ onTodoSave, todoId }: EditTodoTypes) => {
  const { mutate: editTodo } = useTodosUpdate();
  const { mutate: editCategory } = useCategoryJoinUpdate();
  const { mutate: editFrequency } = useFrequencyJoinUpdate();
  const { mutate: createCategory } = useCategoryJoinCreation();
  const { mutate: createFrequency } = useFrequencyJoinCreation();

  const {
    data: todoShow,
    isLoading: todoShowLoading,
    isFetching: todoShowFetching,
  } = useTodoShow(todoId);

  type ValueTypes = {
    categories: string;
    days: string;
    frequencies: string;
    expiration?: string;
    description: string;
  };

  const todo =
    !todoShowLoading && !todoShowFetching && todoShow.data ? todoShow.data : [];

  const handleOnSubmit = (values: ValueTypes) => {
    editTodo({
      id: todoId,
      expiration: values.expiration,
      description: values.description,
    });
    if (todo.categories) {
      editCategory({
        todo_id: todoId,
        category_id: Number(values.categories),
      });
    } else if (values.categories) {
      createCategory({
        todo_id: todoId,
        category_id: Number(values.categories),
      });
    }
    if (todo.frequencies) {
      editFrequency({
        todo_id: todoId,
        frequency_id: Number(values.frequencies),
      });
    } else if (values.frequencies) {
      createFrequency({
        todo_id: todoId,
        frequency_id: Number(values.frequencies),
      });
    }
    setTimeout(() => {
      onTodoSave();
    }, 1000);
  };

  let description = '';
  let expiration = '';
  let categories = '';
  let days = '';
  let frequencies = '';

  if (todoShowLoading || todoShowFetching) {
  } else {
    description = todo.description || '';
    expiration = todo.expiration || '';
    categories = todo.categories?.length > 0 ? todo.categories[0].id : '';
    days = todo.days?.length > 0 ? todo.days[0].id : '';
    frequencies = todo.frequencies?.length > 0 ? todo.frequencies[0].id : '';
  }

  return todoShowLoading || todoShowFetching ? (
    <p>loading</p>
  ) : (
    <FormikForm
      initialValues={{
        description: description,
        expiration: expiration,
        categories: categories,
        days: days,
        frequencies: frequencies,
      }}
      handleOnSubmit={handleOnSubmit}
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
