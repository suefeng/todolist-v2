import { Field } from "formik";
import FormikForm from "application/components/form/FormikForm";
import Input from "application/components/form/Input";
import Textarea from "application/components/form/Textarea";
import Select from "application/components/form/Select";
import { useTodosCreate } from "infrastructure/api/todos";
import { useCategories } from "infrastructure/api/categories";
import { useFrequencies } from "infrastructure/api/frequencies";
import { useCategoryJoinCreation } from "infrastructure/api/category_joins";
import { useFrequencyJoinCreation } from "infrastructure/api/frequency_joins";
import { Category } from "domain/entities/Category";
import { Frequency } from "domain/entities/Frequency";
import { formatDate } from "domain/services/date.services";

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
    category: string;
    frequency: string;
    expiration?: string;
    description?: string;
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

  return (
    <FormikForm
      initialValues={{
        description: "",
        expiration: "",
        category: "",
        frequency: "",
      }}
      handleOnSubmit={handleOnSubmit}
      buttonText="Add todo"
    >
      {(errors?: object, touched?: object) => (
        <>
          <div>
            <Field
              id="description"
              name="description"
              touched={touched}
              errors={errors}
              as={Textarea}
            />
          </div>
          <div className="flex flex-row gap-3">
            <div className="my-3 flex-1">
              <Field
                id="expiration"
                name="expiration"
                touched={touched}
                errors={errors}
                as={Input}
                type="date"
              />
            </div>
            {loadingCategories && fetchingCategories ? (
              "loading"
            ) : (
              <div className="flex-1 my-3">
                <Field
                  touched={touched}
                  errors={errors}
                  as={Select}
                  id="category"
                  name="category"
                >
                  <option className="bg-white hover:bg-sky-400" value="">
                    select
                  </option>
                  {categories.length > 0
                    ? categories.map((option: Category) => (
                        <option
                          className="bg-white hover:bg-sky-400"
                          key={option.id}
                          value={option.id}
                        >
                          {option.name}
                        </option>
                      ))
                    : "loading"}
                </Field>
              </div>
            )}
            {loadingFrequencies && fetchingFrequencies ? (
              "loading"
            ) : (
              <div className="flex-1 my-3">
                <Field
                  touched={touched}
                  errors={errors}
                  as={Select}
                  id="frequency"
                  name="frequency"
                >
                  <option className="bg-white hover:bg-sky-400" value="">
                    select
                  </option>
                  {frequencies.length > 0
                    ? frequencies.map((option: Frequency) => (
                        <option
                          className="bg-white hover:bg-sky-400"
                          key={option.id}
                          value={option.id}
                        >
                          {option.name}
                        </option>
                      ))
                    : "loading"}
                </Field>
              </div>
            )}
          </div>
        </>
      )}
    </FormikForm>
  );
};
