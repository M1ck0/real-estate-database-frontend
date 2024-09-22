const Card = ({ title, children }) => {
  return (
    <div className="h-full w-full rounded-lg border bg-white px-4">
      {title ? (
        <div className="border-b py-3">
          <p className="text-base font-normal">{title}</p>
        </div>
      ) : null}
      <div className="py-3">{children}</div>
    </div>
  );
};

export default Card;
