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
    if (value !== undefined && !selected) {
      const defaultItem = data?.find((item) => {
        if (
          item?.id?.toString() === value?.toString() ||
          item?.value?.toString() === value?.toString() ||
          item?.name?.toString() === value?.toString()
        ) {
          return item;
        }
      });

      onSelect(defaultItem);
    }
  }, [value, selected]);

  const onSelect = (item) => {
    setSelected(item);
    onChange(item);
  };

  return (
    <div>
      <Listbox value={selected} onChange={onSelect}>
        {label ? (
          <Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Label>
        ) : null}

        <div className="relative mt-1">
          <ListboxButton className="relative w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer">
            <span
              className={classNames(selected?.name ? "" : "opacity-40", "block truncate")}
            >
              {selected?.name || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {data?.map((item) => (
              <ListboxOption
                key={item.id}
                value={item}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {item.name}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
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
