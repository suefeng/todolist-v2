export const setFieldErrors = ({
  errors,
  formikHelpers,
}: {
  errors: object;
  formikHelpers: object;
}) =>
  Object.keys(errors).forEach((key) =>
    formikHelpers.setFieldError(key, errors[key][0])
  );
