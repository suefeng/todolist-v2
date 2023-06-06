import React from 'react';

import { useCategories } from 'infrastructure/api/categories';
import {
  useCategoryJoinCreation,
  useCategoryJoinUpdate,
} from 'infrastructure/api/category_joins';
import { useFrequencies } from 'infrastructure/api/frequencies';
import {
  useFrequencyJoinCreation,
  useFrequencyJoinUpdate,
} from 'infrastructure/api/frequency_joins';
import { useTodoShow, useTodosUpdate } from 'infrastructure/api/todos';
import FormikForm from 'application/components/form/FormikForm';
import { FormFields } from './FormFields';

export const EditTodoForm = ({
  todoId,
  onTodoSave,
}: {
  todoId: number;
  onTodoSave: Function;
}) => {
  const { mutate: editTodo } = useTodosUpdate();
  const { mutate: editCategory } = useCategoryJoinUpdate();
  const { mutate: editFrequency } = useFrequencyJoinUpdate();
  const { mutate: createCategory } = useCategoryJoinCreation();
  const { mutate: createFrequency } = useFrequencyJoinCreation();
  const {
    data: categories,
    isLoading: loadingCategories,
    isFetching: fetchingCategories,
  } = useCategories();
  const {
    data: frequencies,
    isLoading: loadingFrequencies,
    isFetching: fetchingFrequencies,
  } = useFrequencies();
  const {
    data: todoShow,
    isLoading: todoShowLoading,
    isFetching: todoShowFetching,
  } = useTodoShow(todoId);

  type ValueTypes = {
    category: string;
    frequency: string;
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
        category_id: Number(values.category),
      });
    } else if (values.category) {
      createCategory({
        todo_id: todoId,
        category_id: Number(values.category),
      });
    }
    if (todo.frequencies) {
      editFrequency({
        todo_id: todoId,
        frequency_id: Number(values.frequency),
      });
    } else if (values.frequency) {
      createFrequency({
        todo_id: todoId,
        frequency_id: Number(values.frequency),
      });
    }
    setTimeout(() => {
      onTodoSave();
    }, 1000);
  };

  let description = '';
  let expiration = '';
  let category = '';
  let frequency = '';

  if (todoShowLoading || todoShowFetching) {
  } else {
    description = todo.description || '';
    expiration = todo.expiration || '';
    category = todo.categories?.length > 0 ? todo.categories[0].id : '';
    frequency = todo.frequencies?.length > 0 ? todo.frequencies[0].id : '';
  }

  const categoriesList =
    !loadingCategories && !fetchingCategories && categories
      ? categories.data
      : [];
  const frequenciesList =
    !loadingFrequencies && !fetchingFrequencies && frequencies
      ? frequencies.data
      : [];

  return todoShowLoading || todoShowFetching ? (
    <p>loading</p>
  ) : (
    <FormikForm
      initialValues={{
        description: description,
        expiration: expiration,
        category: category,
        frequency: frequency,
      }}
      handleOnSubmit={handleOnSubmit}
      buttonText="Edit todo"
    >
      {(errors?: object, touched?: object) => (
        <FormFields
          errors={errors}
          touched={touched}
          categories={categoriesList}
          frequencies={frequenciesList}
        />
      )}
    </FormikForm>
  );
};
