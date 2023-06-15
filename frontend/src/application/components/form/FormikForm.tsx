import { Form, Formik } from 'formik';
import { Schema } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Button } from 'application/components/Button';

type FormikFormTypes = {
  children: any;
  handleOnSubmit: any;
  initialValues: object;
  buttonText: string;
  Schema: Schema;
};

type formikTypes = {
  handleSubmit: any;
  isSubmitting: boolean;
  errors?: object;
  touched?: object;
  setFieldValue?: object;
  handleBlur?: any;
  setFieldTouched?: object;
};

const FormikForm = ({
  children,
  handleOnSubmit,
  initialValues,
  buttonText,
  Schema,
}: FormikFormTypes) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleOnSubmit}
    validationSchema={toFormikValidationSchema(Schema)}
  >
    {({
      handleSubmit,
      isSubmitting,
      errors,
      touched,
      setFieldValue,
      handleBlur,
      setFieldTouched,
    }: formikTypes) => {
      return (
        <Form onSubmit={handleSubmit}>
          <>
            {children(
              errors,
              touched,
              setFieldValue,
              handleBlur,
              setFieldTouched,
            )}
            <div className="mt-3">
              <Button
                id="submit"
                type="submit"
                disabled={isSubmitting}
              >
                {buttonText}
              </Button>
            </div>
          </>
        </Form>
      );
    }}
  </Formik>
);

export default FormikForm;
