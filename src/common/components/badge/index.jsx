const colorMap = {
  yes: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  no: "bg-red-50 text-red-600 ring-1 ring-red-200",
  sale: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  rent: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  house: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  apartment: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",
  land: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};

const Badge = ({ text }) => {
  if (!text) return <span className="text-slate-400">—</span>;

  const key = text?.toLowerCase();
  const colorClass = colorMap[key] || "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colorClass}`}
    >
      {text}
    </span>
  );
};

export default Badge;
