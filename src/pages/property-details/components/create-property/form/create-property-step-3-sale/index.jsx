import { Controller } from "react-hook-form";

import Input from "common/components/input";
import Select from "common/components/select";
import Button from "common/components/button";

import { propertyBathrooms, propertyBedrooms } from "common/constants";

const CreatePropertyStep3Sale = ({ nextStep, control }) => {
  return (
    <div className="h-full gap-10 w-[400px] mx-auto flex items-center justify-center flex-col">
      <h1 className="text-3xl font-semibold">Basic Details</h1>
      <div className="w-full space-y-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input label="Name" placeholder="Property name..." {...field} />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => <Input label="Price" placeholder="150000" {...field} />}
        />
        <Controller
          name="size"
          control={control}
          render={({ field }) => <Input label="Size - m2" placeholder="86" {...field} />}
        />

        <div className="grid grid-cols-2 gap-5">
          <Controller
            name="bedrooms"
            control={control}
            render={({ field }) => (
              <Select
                label="Bedrooms"
                placeholder="Select"
                data={propertyBedrooms}
                {...field}
              />
            )}
          />
          <Controller
            name="bathrooms"
            control={control}
            render={({ field }) => (
              <Select
                label="Bathrooms"
                placeholder="Select"
                data={propertyBathrooms}
                {...field}
              />
            )}
          />
        </div>
        <Button type="button" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CreatePropertyStep3Sale;
