import React from 'react';
import { Field } from 'formik';

import { Category } from 'domain/entities/Category';
import { Frequency } from 'domain/entities/Frequency';
import Input from 'application/components/form/Input';
import Select from 'application/components/form/Select';
import Textarea from 'application/components/form/Textarea';

type FormFieldTypes = {
  errors?: object;
  touched?: object;
  categories: Category[] | [];
  frequencies: Frequency[] | [];
};

export const FormFields = ({
  errors,
  touched,
  categories,
  frequencies,
}: FormFieldTypes) => {
  return (
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
        <div className="my-3 flex-1">
          <Field
            touched={touched}
            errors={errors}
            as={Select}
            id="category"
            name="category"
          >
            <option
              className="bg-white hover:bg-sky-400"
              value=""
            >
              select
            </option>
            {categories?.length > 0
              ? categories?.map((option: Category) => (
                  <option
                    className="bg-white hover:bg-sky-400"
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </option>
                ))
              : 'loading'}
          </Field>
        </div>
        <div className="my-3 flex-1">
          <Field
            touched={touched}
            errors={errors}
            as={Select}
            id="frequency"
            name="frequency"
          >
            <option
              className="bg-white hover:bg-sky-400"
              value=""
            >
              select
            </option>
            {frequencies?.length > 0
              ? frequencies?.map((option: Category) => (
                  <option
                    className="bg-white hover:bg-sky-400"
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </option>
                ))
              : 'loading'}
          </Field>
        </div>
      </div>
    </>
  );
};
