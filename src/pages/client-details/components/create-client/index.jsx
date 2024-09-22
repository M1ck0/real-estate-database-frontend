import { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import CreateClientStep1 from "./form/create-client-step-1";

import { supabase } from "client";

const CreateClient = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    const { data: client } = await supabase
      .from("clients")
      .insert([{ name: values?.name, phone_number: values?.phone }])
      .select()
      .single();

    const { data: preferences, error } = await supabase
      .from("client_preferences")
      .insert([
        {
          client: client?.id,
          bathrooms: values?.bathrooms,
          bedrooms: values?.bedrooms,
          floor: values?.floor,
          location: values?.location?.value,
          min_price: values?.minPrice,
          max_price: values?.maxPrice,
          status: values?.status?.value?.toLowerCase() || "rent",
          type: values?.type?.value?.toLowerCase() || "house",
        },
      ])
      .select()
      .single();

    if (!error) {
      navigate("/clients");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto h-[calc(100vh-100px)] max-w-[800px] space-y-5"
      >
        <CreateClientStep1 control={control} />
      </form>
    </div>
  );
};

export default CreateClient;
