const PageTitle = ({ children, subtitle }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{children}</h1>
      {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
