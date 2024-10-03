import { useEffect, useState } from "react";

import { Field, Label, Switch as S } from "@headlessui/react";

const Switch = ({ value, label, onChange = () => {} }) => {
  const [enabled, setEnabled] = useState(false);

  const onSwitch = (data) => {
    setEnabled(data);
    onChange(data);
  };

  useEffect(() => {
    setEnabled(value);
  }, [value]);

  return (
    <Field className="flex items-center justify-between">
      <span className="flex flex-grow flex-col">
        <Label as="span" passive className="text-sm font-medium leading-6 text-gray-900">
          {label}
        </Label>
      </span>
      <S
        checked={enabled}
        onChange={onSwitch}
        className="group relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-4"
        />
      </S>
    </Field>
  );
};

export default Switch;
