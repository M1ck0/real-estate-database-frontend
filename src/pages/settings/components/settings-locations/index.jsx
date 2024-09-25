import { PencilSquareIcon } from "@heroicons/react/16/solid";

import CreateLocationModal from "common/modals/create-location-modal";

import useLocations from "common/hooks/use-locations";
import Table from "common/components/table";

const header = [
  { name: "ID", accessor: "id" },
  { name: "Ime", accessor: "name" },
];

const SettingsLocations = () => {
  const { data, getData } = useLocations();

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
        <h2 className="text-2xl font-bold text-gray-900">Lokacije</h2>
        <CreateLocationModal onComplete={getData} />
      </div>
      <div>
        <Table key={data?.length} header={header} data={data} />
      </div>
    </div>
  );
};

export default SettingsLocations;
