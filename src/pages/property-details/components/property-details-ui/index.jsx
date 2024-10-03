import { UserIcon } from "@heroicons/react/20/solid";
import useEmblaCarousel from "embla-carousel-react";

import Button from "common/components/button";
import { FILE_PATH, IMAGE_PATH, building } from "common/constants";

const PropertyDetailsUi = ({ data }) => {
  const [emblaRef] = useEmblaCarousel();

  const basicInfo = {
    sprat: data?.floor,
    kupatila: data?.bathrooms,
    sobe: data?.bedrooms,
    tip: data?.type,
    status: data?.status,
    lokacija: data?.location?.name,
    gradnja: building?.find((item) => item?.value === data?.building)?.name,
  };

  const amenities = data?.property_amenities;

  return (
    <div>
      {data?.images?.length ? (
        <div className="h-[500px] gap-5">
          <div className="embla h-full" ref={emblaRef}>
            <div className="embla__container h-full">
              {data?.images?.map((item) => (
                <div className="embla__slide">
                  <img
                    src={`${IMAGE_PATH}/${item}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className="mb-10 mt-6 grid grid-cols-1 border-b pb-10 lg:grid-cols-3 lg:gap-5">
        <div className="col-span-1 lg:col-span-2">
          <div className="mb-10 border-b pb-10">
            <h1 className="text-3xl font-semibold">{data?.title}</h1>
            <p className="mt-3 text-gray-600">{data?.description}</p>
          </div>
          <div className="mb-10 border-b pb-10">
            <h2 className="text-xl font-semibold">Osnovne informacije</h2>
            <div className="mt-4 grid grid-cols-2 gap-y-6 lg:grid-cols-4">
              {Object.entries(basicInfo)?.map(([key, value]) => (
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">{key}</p>
                  <p className="text-lg font-semibold capitalize">{value || "/"}</p>
                </div>
              ))}
            </div>
          </div>
          {amenities?.length ? (
            <div className="">
              <h2 className="text-xl font-semibold">Pogodnosti</h2>
              <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
                {amenities?.map((item) => (
                  <div className="">
                    <p className="text-xs font-bold uppercase text-gray-500">
                      {item?.amenity?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="rounded-xl border p-5">
            <div className="mb-5 border-b pb-5">
              <p className="text-xs font-bold uppercase text-gray-500">Cijena</p>
              <p className="mt-3 text-3xl font-semibold text-blue-600">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "EUR",
                }).format(data?.price || 0)}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-gray-500">
                Detalji vlasnika
              </p>
              <div className="mt-3 flex items-center gap-4">
                <div className="h-[40px] w-[40px]">
                  <UserIcon />
                </div>
                <p className="text-lg font-medium">{data?.owner}</p>
              </div>
              <a href={`tel:${data?.owner_contact}`} className="mt-4 block">
                <Button>Pozovi vlasnika</Button>
              </a>
            </div>
          </div>
          {data?.contract ? (
            <div className="mt-5 rounded-xl border p-5">
              <p className="mb-3 text-xs font-bold uppercase text-gray-500">Ugovor</p>
              <a href={`${FILE_PATH}/${data?.contract}`} download target="_blank">
                {data?.contract?.replace("files/", "")}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsUi;
