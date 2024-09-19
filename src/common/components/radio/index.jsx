import { Field, Label, Radio, RadioGroup as RG } from "@headlessui/react";
import { classNames } from "common/utils";
import { useEffect, useState } from "react";

// const plans = ["Startup", "Business", "Enterprise"];

const RadioGroup = ({ horizontal, label, data = [], onChange = () => {} }) => {
  let [selected, setSelected] = useState(data[0]);

  const onSelect = (item) => {
    onChange(item);
    setSelected(item);
  };

  return (
    <div>
      {label ? (
        <p className="block text-sm font-medium leading-6 text-gray-900">{label}</p>
      ) : null}
      <RG
        value={selected}
        onChange={onSelect}
        aria-label="Server size"
        className={classNames(
          horizontal ? "flex justify-between" : "space-y-3",
          "w-full mt-2",
        )}
      >
        {data?.map((item) => (
          <Field key={item} className="flex items-center gap-2">
            <Radio
              value={item}
              className="group flex size-5 cursor-pointer items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-600"
            >
              <span className="invisible size-1.5 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label
              className={classNames(
                item === selected ? "text-black" : "text-black/60",
                "font-medium capitalize text-sm cursor-pointer",
              )}
            >
              {item}
            </Label>
          </Field>
        ))}
      </RG>
    </div>
  );
};

export default RadioGroup;
