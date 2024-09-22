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

const EditPropertyStep1 = ({ setValue, getValues, control, watch }) => {
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
      <h1 className="text-3xl font-semibold">Basic Details</h1>
      <div className="w-full divide-y">
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
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Type</p>
                <p className="text-sm text-gray-600">Select property type</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
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
                <p className="text-sm text-gray-600">Select property status</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
                <Select placeholder="Select" data={propertyStatus} {...field} />
              </div>
            </div>
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-sm text-gray-600">Add property name</p>
              </div>
              <div className="w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Price</p>
                <p className="text-sm text-gray-600">Add property price</p>
              </div>
              <div className="w-[400px]">
                <Input prefix="€" {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="size"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Size</p>
                <p className="text-sm text-gray-600">Add property size (in m2)</p>
              </div>
              <div className="w-[400px]">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="available"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Available</p>
                <p className="text-sm text-gray-600">
                  Is property automatically available
                </p>
              </div>
              <div className="w-[400px]">
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
              <div className="flex items-center justify-between py-8">
                <div>
                  <p className="font-semibold">Available Date</p>
                  <p className="text-sm text-gray-600">When is the property available</p>
                </div>
                <div className="w-[400px]">
                  <DatePicker {...field} />
                  {/* <Select placeholder="Select" data={propertyAvailable} {...field} /> */}
                </div>
              </div>
            )}
          />
        ) : null}

        <div className="flex w-full items-end gap-3">
          <div className="flex-grow">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between py-8">
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-sm text-gray-600">Select property location</p>
                  </div>
                  <div className="flex w-[400px] flex-col gap-3">
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
                <p className="text-sm text-gray-600">What floor is the property on</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <div className="py-4">
          <div className="flex items-center justify-between py-8">
            <div>
              <p className="font-semibold">Amenities</p>
              <p className="text-sm text-gray-600">Add property description</p>
            </div>
            <div className="flex w-[500px] flex-wrap gap-4">
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
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Description</p>
                <p className="text-sm text-gray-600">Add property description</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
                <Textarea {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="ownerName"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Owner name</p>
                <p className="text-sm text-gray-600">Add property owner name</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <Controller
          name="ownerPhone"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between py-8">
              <div>
                <p className="font-semibold">Owner phone</p>
                <p className="text-sm text-gray-600">Add property owner phone</p>
              </div>
              <div className="flex w-[400px] flex-col gap-3">
                <Input {...field} />
              </div>
            </div>
          )}
        />
        <div className="flex justify-end border-t pt-4">
          <Button type="submit">Finish</Button>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyStep1;
