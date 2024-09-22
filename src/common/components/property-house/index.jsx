const PropertyHouse = ({ data }) => {
  return (
    <div className="flex w-[700px]">
      <div className="h-[600px] w-[400px] flex-shrink-0 bg-gray-200"></div>
      <div>
        <div className="mb-3 flex w-[300px] items-center justify-between border-b pb-3">
          <p className="text-2xl font-semibold">{data?.title}</p>
          <div className="rounded-full bg-green-200 px-4 py-0.5">
            <p className="text-black-600 text-lg font-semibold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EUR",
              }).format(data?.price || 0)}
            </p>
          </div>
        </div>
        <div>
          <p>Summary</p>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyHouse;
