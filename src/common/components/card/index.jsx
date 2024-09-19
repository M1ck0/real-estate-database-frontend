const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg border w-full h-full px-4">
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
