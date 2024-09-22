import { Controller } from "react-hook-form";

import Input from "common/components/input";
import Select from "common/components/select";
import Button from "common/components/button";
import RadioGroup from "common/components/radio";

import useLocations from "common/hooks/use-locations";

import {
  propertyBathrooms,
  propertyBedrooms,
  propertyStatus,
  propertyType,
} from "common/constants";

import { sortByName } from "common/utils";

const CreateClientStep1 = ({ control }) => {
  const { data: locations } = useLocations();

  return (
    <div className="mx-auto w-full flex-col justify-center gap-10">
      <h1 className="text-3xl font-semibold">Client Details</h1>
      <div className="w-full divide-y">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-sm text-gray-600">Client name</p>
              </div>
              <div className="w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm text-gray-600">Client phone number</p>
              </div>
              <div className="w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="minPrice"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Min Price</p>
                <p className="text-sm text-gray-600">Client min price</p>
              </div>
              <div className="w-[400px]">
                <Input prefix="€" {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="maxPrice"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Max Price</p>
                <p className="text-sm text-gray-600">Client max price</p>
              </div>
              <div className="w-[400px]">
                <Input prefix="€" {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm text-gray-600">Preferred location</p>
              </div>
              <div className="w-[400px]">
                <Select placeholder="Select" data={sortByName(locations)} {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Type</p>
                <p className="text-sm text-gray-600">Property type</p>
              </div>
              <div className="w-[400px]">
                <Select placeholder="Select" data={propertyType} {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Status</p>
                <p className="text-sm text-gray-600">Property status</p>
              </div>
              <div className="w-[400px]">
                <Select placeholder="Select" data={propertyStatus} {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="bedrooms"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Bedrooms</p>
                <p className="text-sm text-gray-600">Select number of bedrooms</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="bathrooms"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Bathrooms</p>
                <p className="text-sm text-gray-600">Select number of bathrooms</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="floor"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Floor</p>
                <p className="text-sm text-gray-600">Preferred floor</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
                <Input {...field} />
              </div>
            </div>
          )}
        />

        <div className="flex justify-end border-t pt-4">
          <Button type="submit">Create Client</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateClientStep1;
