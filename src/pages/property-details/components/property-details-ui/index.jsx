import { UserIcon } from "@heroicons/react/20/solid";

import Button from "common/components/button";

const PropertyDetailsUi = ({ data }) => {
  const basicInfo = {
    floor: data?.floor,
    bathrooms: data?.bathrooms,
    bedrooms: data?.bedrooms,
    type: data?.type,
    status: data?.status,
  };

  const amenities = data?.amenities
    ?.replace("{", "")
    .replace("}", "")
    .replaceAll('"', "")
    .split(",");

  return (
    <div>
      <div className="h-[500px] grid grid-cols-2 gap-5">
        <img
          src="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
          className="h-full rounded-lg mx-auto object-cover"
        />
        <img
          src="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
          className="h-full rounded-lg mx-auto object-cover"
        />
      </div>
      <div className="grid grid-cols-3 mt-6 gap-5 border-b mb-10 pb-10">
        <div className="col-span-2">
          <div className="border-b mb-10 pb-10">
            <h1 className="text-3xl font-semibold">{data?.title}</h1>
            <p className="mt-3 text-gray-600">{data?.description}</p>
          </div>
          <div className="border-b mb-10 pb-10">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div className="grid grid-cols-4 mt-4 gap-y-6">
              {Object.entries(basicInfo)?.map(([key, value]) => (
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">{key}</p>
                  <p className="text-lg font-semibold capitalize">{value || "/"}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <div className="grid grid-cols-6 mt-4 gap-5">
              {amenities?.map((item) => (
                <div className="">
                  <p className="text-xs text-gray-500 font-bold uppercase">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="border rounded-xl p-5 sticky top-5">
            <div className="border-b mb-5 pb-5">
              <p className="text-xs text-gray-500 font-bold uppercase">Price</p>
              <p className="text-blue-600 font-semibold text-3xl mt-3">
                ${new Intl.NumberFormat("en-US").format(data?.price || 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Owner details</p>
              <div className="flex mt-3 gap-4 items-center">
                <div className="w-[40px] h-[40px]">
                  <UserIcon />
                </div>
                <p className="font-medium text-lg">{data?.owner}</p>
              </div>
              <a href={`tel:${data?.owner_contact}`} className="mt-4 block">
                <Button>Call Owner</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsUi;
