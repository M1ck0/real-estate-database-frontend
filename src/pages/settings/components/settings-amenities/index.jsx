import { PencilSquareIcon } from "@heroicons/react/16/solid";

import Table from "common/components/table";

import CreateAmenityModal from "common/modals/create-amenity-modal";

import useAmenities from "common/hooks/use-amenities";

const header = [
  { name: "ID", accessor: "id" },
  { name: "Name", accessor: "name" },
];

const SettingsAmenities = () => {
  const { data, getData } = useAmenities();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>
        <CreateAmenityModal onComplete={getData} />
      </div>
      <div>
        <Table key={data?.length} data={data} header={header} />
      </div>
    </div>
  );
};

export default SettingsAmenities;
