import { useEffect, useState } from "react";

import { Controller } from "react-hook-form";

import Input from "common/components/input";
import Select from "common/components/select";
import Button from "common/components/button";
import Checkbox from "common/components/checkbox";
import Textarea from "common/components/textarea";
import FileUpload from "common/components/file-upload";
import DatePicker from "common/components/date-picker";

import CreateLocationModal from "common/modals/create-location-modal";

import useAmenities from "common/hooks/use-amenities";
import useLocations from "common/hooks/use-locations";

import { propertyAvailable, propertyType, propertyStatus } from "common/constants";

const EditPropertyStep1 = ({ loading, setValue, getValues, control, watch }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { data: locations, getData: getLocations } = useLocations();
  const { data: amenities } = useAmenities();

  const available = watch("available");
  const status = watch("status");

  const onCheckboxChange = (item, value) => {
    if (value !== true) {
      const currentAmenities = selectedAmenities?.filter(
        (amenity) => item?.id !== amenity,
      );

      setSelectedAmenities(currentAmenities);
    } else {
      setSelectedAmenities((prevState) => [...prevState, item?.id]);
    }
  };

  useEffect(() => {
    setSelectedAmenities(getValues("amenities"));
  }, []);

  useEffect(() => {
    setValue("amenities", selectedAmenities);
  }, [selectedAmenities]);

  return (
    <div className="mx-auto w-full flex-col justify-center gap-10">
      <h1 className="text-3xl font-semibold">Osnovni detalji</h1>
      <div className="divide-y lg:w-full">
        <div className="py-8">
          <FileUpload
            onChange={(e) => {
              setValue("images", e.target.files); // Set the file input value
            }}
          />
        </div>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Tip</p>
                <p className="text-sm text-gray-600">Izaberi tip nekretnine</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
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
                <p className="text-sm text-gray-600">Izaberi status nekretnine</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
                <Select placeholder="Select" data={propertyStatus} {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Ime</p>
                <p className="text-sm text-gray-600">Ime nekretnine</p>
              </div>
              <div className="lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Cijena</p>
                <p className="text-sm text-gray-600">Cijena nekretnine</p>
              </div>
              <div className="lg:w-[400px]">
                <Input prefix="€" {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="size"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Veličina</p>
                <p className="text-sm text-gray-600">Veličina nekretnine (u m2)</p>
              </div>
              <div className="lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="available"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Dostupno</p>
                <p className="text-sm text-gray-600">
                  Da li je nekretnina odmah dostupna
                </p>
              </div>
              <div className="lg:w-[400px]">
                <Select placeholder="Select" data={propertyAvailable} {...field} />
              </div>
            </div>
          )}
        />
        {(available?.value === "false" || available === "false") &&
        (status?.value === "rent" || status === "rent") ? (
          <Controller
            name="availableDate"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                <div>
                  <p className="font-semibold">Dostupno od</p>
                  <p className="text-sm text-gray-600">
                    Izaberi datum od kad je nekretnina dostupna
                  </p>
                </div>
                <div className="lg:w-[400px]">
                  <DatePicker {...field} />
                </div>
              </div>
            )}
          />
        ) : null}
        <div className="flex items-end gap-3 lg:w-full">
          <div className="flex-grow">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                  <div>
                    <p className="font-semibold">Lokacija</p>
                    <p className="text-sm text-gray-600">Izaberi lokaciju nekretnine</p>
                  </div>
                  <div className="flex flex-col gap-3 lg:w-[400px]">
                    <Select
                      placeholder="Select"
                      data={locations}
                      defaultValue="yes"
                      {...field}
                    />
                    <div className="ml-auto">
                      <CreateLocationModal onComplete={getLocations} />
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <Controller
          name="bedrooms"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Sobe</p>
                <p className="text-sm text-gray-600">Broj soba</p>
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
                <p className="font-semibold">Kupatila</p>
                <p className="text-sm text-gray-600">Broj kupatila</p>
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
                <p className="text-sm text-gray-600">Na kojem se spratu nalazi</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <div className="py-4">
          <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <div>
              <p className="font-semibold">Pogodnosti</p>
              <p className="text-sm text-gray-600">Izaberi dostupne pogodnosti</p>
            </div>
            <div className="flex flex-wrap gap-4 lg:w-[500px]">
              {amenities?.map((item) => (
                <Checkbox
                  label={item?.name}
                  value={getValues("amenities")?.includes(item?.id)}
                  onChange={(value) => onCheckboxChange(item, value)}
                />
              ))}
            </div>
          </div>
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Opis</p>
                <p className="text-sm text-gray-600">Opis nekretnine</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
                <Textarea {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="ownerName"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Ime vlasnika</p>
                <p className="text-sm text-gray-600">Dodaj ime vlasnika</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="ownerPhone"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <div>
                <p className="font-semibold">Telefonski broj vlasnika</p>
                <p className="text-sm text-gray-600">Dodaj broj vlasnika</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <div className="flex justify-end border-t pt-4">
          <Button type="submit" disabled={disabled} loading={loading}>
            Sačuvaj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyStep1;
