import { ArrowPathIcon } from "@heroicons/react/16/solid";

import { classNames } from "common/utils";

const Button = ({ children, loading, color, size, ...props }) => {
  if (color === "red") {
    return (
      <button
        type="button"
        className={classNames(
          size === "sm" ? "px-2 py-1" : "px-5 py-2",
          "rounded-md bg-red-600 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:bg-gray-200",
        )}
        {...props}
      >
        {loading ? <ArrowPathIcon className="size-4 animate-spin" /> : children}
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className={classNames(
          size === "sm" ? "px-2 py-1" : "px-5 py-2",
          "rounded-md bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200",
        )}
        {...props}
      >
        {loading ? <ArrowPathIcon className="size-4 animate-spin" /> : children}
      </button>
    );
  }
};

export default Button;
