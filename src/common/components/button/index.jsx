import { ArrowPathIcon } from "@heroicons/react/16/solid";

import { classNames } from "common/utils";

const variantClasses = {
  primary:
    "bg-teal-700 text-white hover:bg-teal-800 focus-visible:outline-teal-700 disabled:bg-slate-200 disabled:text-slate-400 shadow-sm",
  secondary:
    "bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus-visible:outline-slate-400 disabled:opacity-50 shadow-sm",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600 disabled:bg-slate-200 disabled:text-slate-400 shadow-sm",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-400 disabled:opacity-50",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

const Button = ({ children, loading, color, size = "md", variant, ...props }) => {
  const resolvedVariant =
    variant ||
    (color === "red" ? "danger" : color === "secondary" ? "secondary" : "primary");

  return (
    <button
      type="button"
      className={classNames(
        sizeClasses[size],
        variantClasses[resolvedVariant],
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
      )}
      {...props}
    >
      {loading ? <ArrowPathIcon className="size-4 animate-spin" /> : children}
    </button>
  );
};

export default Button;
