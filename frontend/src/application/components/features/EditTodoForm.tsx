import React from "react";
import { Field } from "formik";
import FormikForm from "application/components/form/FormikForm";
import Input from "application/components/form/Input";
import Textarea from "application/components/form/Textarea";
import Select from "application/components/form/Select";
import { useTodoShow, useTodosUpdate } from "infrastructure/api/todos";
import { useCategories } from "infrastructure/api/categories";
import { useFrequencies } from "infrastructure/api/frequencies";
import {
  useCategoryJoinUpdate,
  useCategoryJoinCreation,
} from "infrastructure/api/category_joins";
import {
  useFrequencyJoinUpdate,
  useFrequencyJoinCreation,
} from "infrastructure/api/frequency_joins";
import { Category } from "domain/entities/Category";
import { useRouter } from "next/router";
import { URLS } from "infrastructure/router/routes";

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
  const router = useRouter();

  type ValueTypes = {
    category: string;
    frequency: string;
    expiration?: string;
    description?: string;
  };

  const handleOnSubmit = (values: ValueTypes) => {
    editTodo({
      id: todoId,
      expiration: values.expiration,
      description: values.description,
    });
    if (todoShow.categories[0]) {
      editCategory({
        todo_id: todoId,
        category_id: Number(values.category),
      });
    } else {
      createCategory({
        todo_id: todoId,
        category_id: Number(values.category),
      });
    }
    if (todoShow.frequencies[0]) {
      editFrequency({
        todo_id: todoId,
        frequency_id: Number(values.frequency),
      });
    } else {
      createFrequency({
        todo_id: todoId,
        frequency_id: Number(values.frequency),
      });
    }
    setTimeout(() => {
      onTodoSave();
    }, 1000);
  };

  let description = "";
  let expiration = "";
  let category = "";
  let frequency = "";
  if (todoShowLoading || todoShowFetching) {
  } else {
    description = todoShow.description || "";
    expiration = todoShow.expiration || "";
    category = todoShow.categories.length > 0 ? todoShow.categories[0].id : "";
    frequency =
      todoShow.frequencies.length > 0 ? todoShow.frequencies[0].id : "";
  }

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
                    ? frequencies.map((option: Category) => (
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
