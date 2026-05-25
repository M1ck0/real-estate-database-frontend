import { useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { classNames } from "common/utils";

const Select = ({ data, label, placeholder, value, onChange = () => {} }) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (value && (!selected || value !== selected.value)) {
      const defaultItem = data?.find((item) =>
        [
          item?.id?.toString()?.toLowerCase(),
          item?.value?.toString()?.toLowerCase(),
          item?.name?.toString()?.toLowerCase(),
        ].includes(value?.toString()?.toLowerCase()),
      );

      if (defaultItem) {
        onSelect(defaultItem);
      }
    }
  }, [value, data, selected]);

  const onSelect = (item) => {
    setSelected({ name: item?.name, value: item?.value || item?.id });
    onChange({ name: item?.name, value: item?.value || item?.id });
  };

  return (
    <div>
      <Listbox value={selected} onChange={onSelect}>
        {label ? (
          <Label className="mb-1.5 block text-sm font-medium text-slate-700">
            {label}
          </Label>
        ) : null}

        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-10 text-left text-sm text-slate-900 transition-shadow duration-150 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20">
            <span
              className={classNames(
                selected?.name ? "" : "text-slate-400",
                "block truncate",
              )}
            >
              {selected?.name || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-4 w-4 text-slate-400" />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {data?.map((item) => (
              <ListboxOption
                key={item.id}
                value={item}
                className="group relative cursor-pointer select-none rounded-md py-2 pl-3 pr-9 text-slate-900 data-[focus]:bg-teal-50 data-[focus]:text-teal-900"
              >
                <span className="block truncate text-sm font-normal group-data-[selected]:font-medium">
                  {item.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-teal-600 [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-4 w-4" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
