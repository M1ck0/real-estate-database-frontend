const Badge = ({ text }) => {
  if (text?.toLowerCase() === "yes") {
    return (
      <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
        {text}
      </span>
    );
  } else if (text?.toLowerCase() === "no") {
    return (
      <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
        {text}
      </span>
    );
  } else if (text?.toLowerCase() === "sale") {
    return (
      <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
        {text}
      </span>
    );
  } else if (text?.toLowerCase() === "rent") {
    return (
      <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
        {text}
      </span>
    );
  }
};

export default Badge;
