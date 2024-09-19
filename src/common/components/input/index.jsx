import { useEffect, useState } from "react";

const Input = ({ label, value, onChange = () => {}, debounceDelay = 300, ...props }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(text);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, debounceDelay]);

  const onInputChange = (e) => {
    setText(e.target.value);

    if (e.target.value === "") {
      onChange("");
    }
  };

  return (
    <div>
      {label ? (
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      ) : null}
      <div className="mt-1">
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...props}
          value={text}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default Input;
