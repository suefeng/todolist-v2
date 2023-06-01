type SelectTypes = {
  labelText: string;
  id: string;
  name: string;
  touched: object;
  errors: object;
  children: React.ReactNode;
};

const Select = ({
  labelText,
  id,
  name,
  touched,
  errors,
  children,
  ...props
}: SelectTypes) => {
  const hasErrors = touched && touched[name] && errors && errors[name];

  return (
    <label htmlFor={id}>
      {labelText ? <span className="label-text">{labelText}</span> : null}
      <div>
        <select
          className="ring-late-700/10 w-full overflow-hidden rounded-md bg-white px-3 py-3.5 shadow-xl shadow-black/5 ring-1"
          id={id}
          name={name}
          {...props}
        >
          {children}
        </select>
      </div>
      {hasErrors && <span className="text-red-500">{errors[name]}</span>}
    </label>
  );
};

Select.displayName = 'Select';

export default Select;
