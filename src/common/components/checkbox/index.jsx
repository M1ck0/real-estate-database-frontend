import { useEffect, useState } from "react";

import { CheckIcon } from "@heroicons/react/16/solid";
import { Checkbox as C, Field, Label } from "@headlessui/react";

const Checkbox = ({ label, value, onChange = () => {} }) => {
  const [enabled, setEnabled] = useState(value);

  const onCheckboxChange = (data) => {
    setEnabled(data);
    onChange(data);
  };

  useEffect(() => {
    setEnabled(value);
  }, [value]);

  return (
    <Field className="flex items-center gap-2">
      <C
        checked={enabled}
        onChange={onCheckboxChange}
        className="group justify-center size-5 border cursor-pointer rounded-md flex items-center bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
      >
        <CheckIcon className="hidden size-4 fill-white group-data-[checked]:block" />
      </C>
      {label ? <Label className="capitalize cursor-pointer">{label}</Label> : null}
    </Field>
  );
};

export default Checkbox;
