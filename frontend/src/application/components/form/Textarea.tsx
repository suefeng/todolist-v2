import TextareaAutosize from '@mui/base/TextareaAutosize';

type TextAreaTypes = {
  labelText: string;
  id: string;
  name: string;
  touched?: object;
  errors?: object;
};

const Textarea = ({
  labelText,
  id,
  name,
  touched,
  errors,
  ...props
}: TextAreaTypes) => {
  const hasErrors = touched && touched[name] && errors && errors[name];

  return (
    <label htmlFor={id}>
      {labelText ? <span className="label-text">{labelText}</span> : null}
      <div>
        <TextareaAutosize
          className="ring-late-700/10 w-full overflow-hidden rounded-md bg-white px-3 py-3 shadow-xl shadow-black/5 ring-1"
          id={id}
          name={name}
          {...props}
        />
      </div>
      {hasErrors && <span className="text-red-500">{errors[name]}</span>}
    </label>
  );
};

Textarea.displayName = 'TextArea';

export default Textarea;
