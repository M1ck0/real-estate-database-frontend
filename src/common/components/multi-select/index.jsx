import { useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { classNames } from "common/utils";

const MultiSelect = ({ data = [], label, placeholder, value, onChange = () => {} }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!data?.length) return;

    if (!value?.length) {
      setSelected([]);
      return;
    }

    const ids = value.map((v) => {
      if (typeof v === "object") return (v?.value || v?.id)?.toString();
      return v?.toString();
    });

    const matched = data.filter((item) =>
      ids.includes((item?.value || item?.id)?.toString()),
    );

    setSelected(matched);
  }, [JSON.stringify(value), data?.length]);

  const onSelect = (items) => {
    setSelected(items);
    onChange(items.map((item) => ({ name: item.name, value: item.value || item.id })));
  };

  const removeItem = (e, item) => {
    e.stopPropagation();
    const next = selected.filter(
      (s) => (s.value || s.id)?.toString() !== (item.value || item.id)?.toString(),
    );
    setSelected(next);
    onChange(next.map((i) => ({ name: i.name, value: i.value || i.id })));
  };

  return (
    <div>
      <Listbox value={selected} onChange={onSelect} multiple>
        {label ? (
          <Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Label>
        ) : null}

        <div className="relative mt-1">
          <ListboxButton className="relative min-h-[36px] w-full cursor-pointer rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-10 text-left text-sm text-slate-900 transition-shadow duration-150 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20">
            <span className="flex flex-wrap gap-1">
              {selected.length === 0 ? (
                <span className="opacity-40">{placeholder}</span>
              ) : (
                selected.map((item) => (
                  <span
                    key={item.value || item.id}
                    className="inline-flex items-center gap-1 rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"
                  >
                    {item.name}
                    <button
                      type="button"
                      onClick={(e) => removeItem(e, item)}
                      className="hover:text-indigo-900"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
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

export default MultiSelect;
