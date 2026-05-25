import { classNames } from "common/utils";
import { useEffect, useState } from "react";

const Input = ({ label, value, prefix, onChange = () => {}, ...props }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (value !== undefined) {
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
        <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      ) : null}
      <div className="relative">
        {prefix ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-sm text-slate-400">{prefix}</span>
          </div>
        ) : null}
        <input
          className={classNames(
            prefix ? "pl-7" : "pl-3",
            "block w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 text-sm text-slate-900 transition-shadow duration-150 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20",
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
