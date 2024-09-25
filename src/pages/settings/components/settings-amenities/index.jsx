import { PencilSquareIcon } from "@heroicons/react/16/solid";

import Table from "common/components/table";

import CreateAmenityModal from "common/modals/create-amenity-modal";

import useAmenities from "common/hooks/use-amenities";

const header = [
  { name: "ID", accessor: "id" },
  { name: "Ime", accessor: "name" },
];

const SettingsAmenities = () => {
  const { data, getData } = useAmenities();

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
        <h2 className="text-2xl font-bold text-gray-900">Pogodnosti</h2>
        <CreateAmenityModal onComplete={getData} />
      </div>
      <div>
        <Table key={data?.length} data={data} header={header} />
      </div>
    </div>
  );
};

export default SettingsAmenities;
