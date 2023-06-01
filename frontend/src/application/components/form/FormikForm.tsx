import { Form, Formik } from 'formik';

import { Button } from 'application/components/Button';

type FormikFormTypes = {
  children: any;
  handleOnSubmit?: any;
  initialValues: object;
  validate?: ((values: object) => void | object | Promise<object>) & object;
  buttonText: string;
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

const genericOnSubmit = (values: any) => alert(JSON.stringify(values, null, 2));

const FormikForm = ({
  children,
  handleOnSubmit = genericOnSubmit,
  initialValues,
  buttonText,
}: FormikFormTypes) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleOnSubmit}
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
