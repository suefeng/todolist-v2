import React from 'react';
import { Field } from 'formik';

import { Category } from 'domain/entities/Category';
import { Day } from 'domain/entities/Day';
import { Frequency } from 'domain/entities/Frequency';
import { useTLStore } from 'infrastructure/store/useTLStore';
import Input from 'application/components/form/Input';
import Select from 'application/components/form/Select';
import Textarea from 'application/components/form/Textarea';

type FormFieldTypes = {
  errors?: object;
  touched?: object;
};

export const FormFields = ({ errors, touched }: FormFieldTypes) => {
  const categories = useTLStore((state) => state.categories.list);
  const frequencies = useTLStore((state) => state.frequencies.list);
  const days = useTLStore((state) => state.days.list);

  const categoriesList = categories ? categories : [];
  const frequenciesList = frequencies ? frequencies : [];
  const daysList = days ? days : [];

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
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="my-3">
            <Field
              id="expiration"
              name="expiration"
              touched={touched}
              errors={errors}
              as={Input}
              type="date"
            />
          </div>
          <div className="my-3">
            <Field
              touched={touched}
              errors={errors}
              as={Select}
              id="categories"
              name="categories"
            >
              <option
                className="bg-white hover:bg-sky-400"
                value=""
              >
                select
              </option>
              {categoriesList.map((option: Category) => (
                <option
                  className="bg-white hover:bg-sky-400"
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </option>
              ))}
            </Field>
          </div>
        </div>
        <div className="flex-1">
          <div className="my-3">
            <Field
              touched={touched}
              errors={errors}
              as={Select}
              id="frequencies"
              name="frequencies"
            >
              <option
                className="bg-white hover:bg-sky-400"
                value=""
              >
                select
              </option>
              {frequenciesList.map((option: Frequency) => (
                <option
                  className="bg-white hover:bg-sky-400"
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </option>
              ))}
            </Field>
          </div>
          <div className="my-3">
            <Field
              touched={touched}
              errors={errors}
              as={Select}
              id="days"
              name="days"
            >
              <option
                className="bg-white hover:bg-sky-400"
                value=""
              >
                select
              </option>
              {daysList.map((option: Day) => (
                <option
                  className="bg-white hover:bg-sky-400"
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </option>
              ))}
            </Field>
          </div>
        </div>
      </div>
    </>
  );
};
