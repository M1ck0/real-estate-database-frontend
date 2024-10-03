import { Controller } from "react-hook-form";

import Input from "common/components/input";
import Select from "common/components/select";
import Button from "common/components/button";
import RadioGroup from "common/components/radio";

import useLocations from "common/hooks/use-locations";

import {
  building,
  propertyBathrooms,
  propertyBedrooms,
  propertyStatus,
  propertyType,
} from "common/constants";

import { sortByName } from "common/utils";

const CreateClientStep1 = ({ clientId, control }) => {
  const { data: locations } = useLocations();

  return (
    <div className="mx-auto flex-col justify-center gap-10 lg:w-full">
      <h1 className="text-3xl font-semibold">Detalji klijenta</h1>
      <div className="divide-y lg:w-full">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Ime</p>
                <p className="text-sm text-gray-600">Ime klijenta</p>
              </div>
              <div className="lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Telefon</p>
                <p className="text-sm text-gray-600">Telefonski broj klijenta</p>
              </div>
              <div className="lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="minPrice"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Cijena od</p>
                <p className="text-sm text-gray-600">Minimalna cijena</p>
              </div>
              <div className="lg:w-[400px]">
                <Input prefix="€" {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="maxPrice"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Cijena do</p>
                <p className="text-sm text-gray-600">Maksimalna cijena</p>
              </div>
              <div className="lg:w-[400px]">
                <Input prefix="€" {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Lokacija</p>
                <p className="text-sm text-gray-600">Željena lokacija</p>
              </div>
              <div className="lg:w-[400px]">
                <Select placeholder="Select" data={sortByName(locations)} {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Tip</p>
                <p className="text-sm text-gray-600">Tip nekretnine</p>
              </div>
              <div className="lg:w-[400px]">
                <Select placeholder="Select" data={propertyType} {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Status</p>
                <p className="text-sm text-gray-600">Status nekretnine</p>
              </div>
              <div className="lg:w-[400px]">
                <Select placeholder="Select" data={propertyStatus} {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="building"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Gradnja</p>
                <p className="text-sm text-gray-600">Izaberi gradnju</p>
              </div>
              <div className="lg:w-[400px]">
                <Select placeholder="Select" data={building} {...field} />
              </div>
            </div>
          )}
        />

        <Controller
          name="bedrooms"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Sobe</p>
                <p className="text-sm text-gray-600">Željeni broj soba</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="bathrooms"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Kupatilo</p>
                <p className="text-sm text-gray-600">Željeni broj kupatila</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="floor"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Sprat</p>
                <p className="text-sm text-gray-600">Željeni sprat</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />

        <div className="flex justify-end border-t pt-4">
          <Button type="submit">
            {clientId ? "Izmijeni klijenta" : "Kreiraj klijenta"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateClientStep1;
