import { useState, forwardRef, useEffect } from "react";

import DP from "react-datepicker";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));

const DatePicker = ({ value, onChange = () => {} }) => {
  const [startDate, setStartDate] = useState(new Date());

  const onDateChange = (value) => {
    onChange(value);
    setStartDate(value);
  };

  useEffect(() => {
    if (value) {
      setStartDate(value);
    }
  }, [value]);

  return (
    <DP
      selected={startDate}
      onChange={onDateChange}
      dateFormat="dd MMMM YYYY"
      customInput={<CustomInput />}
    />
  );
};

export default DatePicker;
