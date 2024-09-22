import { classNames } from "common/utils";
import { useEffect, useState } from "react";

const Input = ({ label, value, prefix, onChange = () => {}, ...props }) => {
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
      <div className="relative mt-1">
        {prefix ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-sm text-gray-500">{prefix}</span>
          </div>
        ) : null}
        <input
          className={classNames(
            prefix ? "pl-7" : "",
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          )}
          {...props}
          value={text}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default Input;
