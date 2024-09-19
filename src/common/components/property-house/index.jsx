const PropertyHouse = ({ data }) => {
  console.log(data);
  return (
    <div className="flex w-[700px]">
      <div className="h-[600px] w-[400px] bg-gray-200 flex-shrink-0"></div>
      <div>
        <div className="flex items-center w-[300px] justify-between border-b mb-3 pb-3">
          <p className="text-2xl font-semibold">{data?.title}</p>
          <div className="bg-green-200 rounded-full py-0.5 px-4">
            <p className="text-black-600 font-semibold text-lg">
              {new Intl.NumberFormat("en-US").format(data?.price || 0)}
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
