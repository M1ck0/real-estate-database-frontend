import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import CreatePropertyStep1 from "./form/create-property-step-1";

import { supabase } from "client";

const CreateProperty = () => {
  const navigate = useNavigate();

  const { control, watch, handleSubmit, setValue } = useForm();

  const onSubmit = async (values) => {
    const { data, error } = await supabase
      .from("properties")
      .insert([
        {
          title: values?.name,
          available: values?.available?.value === "true" ? true : false,
          price: values?.price,
          size: values?.size,
          bedrooms: values?.bedrooms,
          bathrooms: values?.bathrooms,
          location: values?.location?.value,
          available: values?.available?.value === "true",
          available_date: values?.availableDate,
          status: values?.status?.value,
          floor: values?.floor,
          type: values?.type?.value,
          description: values?.description,
          owner: values?.ownerName,
          owner_contact: values?.ownerPhone,
        },
      ])
      .select()
      .single();

    const amenities = values?.amenities?.map((item) => ({
      property: data?.id,
      amenity: item,
    }));

    const { error: amenitiesError } = await supabase
      .from("property_amenities")
      .insert(amenities);

    if (!amenitiesError) {
      navigate("/properties");
    }
  };

  useEffect(() => {
    setValue("available", "true");
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[800px] space-y-5">
        <CreatePropertyStep1 watch={watch} control={control} setValue={setValue} />
      </form>
    </div>
  );
};

export default CreateProperty;
