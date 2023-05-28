import { Field } from "formik";
import FormikForm from "application/components/form/FormikForm";
import Input from "application/components/form/Input";
import Textarea from "application/components/form/Textarea";
import Select from "application/components/form/Select";
import { useTodosCreate } from "infrastructure/api/todos";
import { useCategories } from "infrastructure/api/categories";
import { useRepeatings } from "infrastructure/api/repeatings";
import { useCategoryJoinCreation } from "infrastructure/api/category_joins";
import { useRepeatingJoinCreation } from "infrastructure/api/repeating_joins";
import { Category } from "domain/entities/Category";
import { Repeating } from "domain/entities/Repeating";
import { formatDate } from "domain/services/date.services";

export const AddTodo = ({ onTodoSave }: { onTodoSave: Function }) => {
  const { mutateAsync: createTodo } = useTodosCreate();
  const { mutateAsync: createCategory } = useCategoryJoinCreation();
  const { mutateAsync: createRepeating } = useRepeatingJoinCreation();
  const {
    data: categories,
    isLoading: loadingCategories,
    isFetching: fetchingCategories,
  } = useCategories();
  const {
    data: repeatings,
    isLoading: loadingRepeatings,
    isFetching: fetchingRepeatings,
  } = useRepeatings();

  type ValueTypes = {
    category: string;
    repeating: string;
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
    if (values.repeating) {
      await createRepeating({
        repeating_id: Number(values.repeating),
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
        repeating: "",
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
            {loadingRepeatings && fetchingRepeatings ? (
              "loading"
            ) : (
              <div className="flex-1 my-3">
                <Field
                  touched={touched}
                  errors={errors}
                  as={Select}
                  id="repeating"
                  name="repeating"
                >
                  <option className="bg-white hover:bg-sky-400" value="">
                    select
                  </option>
                  {repeatings.length > 0
                    ? repeatings.map((option: Repeating) => (
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
