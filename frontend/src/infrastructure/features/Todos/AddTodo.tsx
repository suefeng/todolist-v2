import { useCategories } from 'infrastructure/api/categories';
import { useCategoryJoinCreation } from 'infrastructure/api/category_joins';
import { useFrequencies } from 'infrastructure/api/frequencies';
import { useFrequencyJoinCreation } from 'infrastructure/api/frequency_joins';
import { useTodosCreate } from 'infrastructure/api/todos';
import FormikForm from 'application/components/form/FormikForm';
import { FormFields } from './FormFields';

export const AddTodo = ({ onTodoSave }: { onTodoSave: Function }) => {
  const { mutateAsync: createTodo } = useTodosCreate();
  const { mutateAsync: createCategory } = useCategoryJoinCreation();
  const { mutateAsync: createFrequency } = useFrequencyJoinCreation();
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

  type ValueTypes = {
    category?: string;
    frequency?: string;
    expiration?: string;
    description: string;
  };

  const handleOnSubmit = async (values: ValueTypes) => {
    const todo = await createTodo({
      description: values.description,
      expiration: values.expiration,
    });
    if (values.category) {
      await createCategory({
        category_id: Number(values.category),
        todo_id: todo.id,
      });
    }
    if (values.frequency) {
      await createFrequency({
        frequency_id: Number(values.frequency),
        todo_id: todo.id,
      });
    }
    setTimeout(() => {
      onTodoSave();
    }, 3000);
  };

  const categoriesList =
    !loadingCategories && !fetchingCategories && categories
      ? categories.data
      : [];
  const frequenciesList =
    !loadingFrequencies && !fetchingFrequencies && frequencies
      ? frequencies.data
      : [];

  return (
    <FormikForm
      initialValues={{
        description: '',
        expiration: '',
        category: '',
        frequency: '',
      }}
      handleOnSubmit={handleOnSubmit}
      buttonText="Add todo"
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
