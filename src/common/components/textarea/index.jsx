import { useEffect, useState } from "react";

const Textarea = ({
  label,
  value,
  onChange = () => {},
  debounceDelay = 300,
  ...props
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);

  const onInputChange = (e) => {
    setText(e.target.value);

    onChange(e.target.value);
  };

  return (
    <div>
      {label ? (
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      ) : null}
      <div className="mt-1">
        <textarea
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...props}
          value={text}
          onChange={onInputChange}
          rows={5}
        />
      </div>
    </div>
  );
};

export default Textarea;
