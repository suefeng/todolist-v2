import React from 'react';

import { useCategoryJoinCreation } from 'infrastructure/api/category_joins';
import { useFrequencyJoinCreation } from 'infrastructure/api/frequency_joins';
import { useTodosCreate } from 'infrastructure/api/todos';
import FormikForm from 'application/components/form/FormikForm';
import { FormFields } from './FormFields';

type AddTodoTypes = {
  onTodoSave: Function;
};

export const AddTodo = ({ onTodoSave }: AddTodoTypes) => {
  const { mutateAsync: createTodo } = useTodosCreate();
  const { mutateAsync: createCategory } = useCategoryJoinCreation();
  const { mutateAsync: createFrequency } = useFrequencyJoinCreation();

  type ValueTypes = {
    categories?: string;
    frequencies?: string;
    expiration?: string;
    description: string;
  };

  const handleOnSubmit = async (values: ValueTypes) => {
    const todo = await createTodo({
      description: values.description,
      expiration: values.expiration,
    });
    if (values.categories) {
      await createCategory({
        category_id: Number(values.categories),
        todo_id: todo.id,
      });
    }
    if (values.frequencies) {
      await createFrequency({
        frequency_id: Number(values.frequencies),
        todo_id: todo.id,
      });
    }
    // if (values.days) {
    //   await createDay({
    //     day_id: Number(values.days),
    //     todo_id: todo.id,
    //   });
    // }
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
        frequencies: '',
        days: '',
      }}
      handleOnSubmit={handleOnSubmit}
      buttonText="Add todo"
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
