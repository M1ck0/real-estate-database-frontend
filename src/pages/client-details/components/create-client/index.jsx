import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import CreateClientStep1 from "./form/create-client-step-1";

import useClientById from "common/hooks/use-client-by-id";

import { supabase } from "client";

const CreateClient = () => {
  const navigate = useNavigate();

  const { clientId } = useParams();

  const { control, reset, handleSubmit } = useForm();

  const { data: client } = useClientById(clientId);

  useEffect(() => {
    if (client) {
      reset({
        name: client?.client?.name,
        phone: client?.client?.phone_number,
        minPrice: client?.min_price || "0",
        maxPrice: client?.max_price,
        location: client?.location?.id,
        type: client?.type,
        status: client?.status,
        bedrooms: client?.bedrooms,
        bathrooms: client?.bathrooms,
        floor: client?.floor,
      });
    }
  }, [client]);

  const onSubmit = async (values) => {
    if (clientId) {
      await supabase
        .from("clients")
        .update({ name: values?.name, phone_number: values?.phone })
        .eq("id", clientId);

      const { data: preferences } = await supabase
        .from("client_preferences")
        .select("id")
        .eq("client", clientId)
        .single();

      if (preferences) {
        const { error } = await supabase
          .from("client_preferences")
          .update({
            bathrooms: values?.bathrooms || 0,
            bedrooms: values?.bedrooms || 0,
            floor: values?.floor,
            location: values?.location?.value,
            min_price: values?.minPrice,
            max_price: values?.maxPrice,
            status: values?.status?.value?.toLowerCase() || "rent",
            type: values?.type?.value?.toLowerCase() || "house",
          })
          .eq("client", clientId);

        if (!error) {
          navigate("/clients");
        }
      } else {
        const { error } = await supabase.from("client_preferences").insert([
          {
            client: clientId,
            bathrooms: values?.bathrooms || 0,
            bedrooms: values?.bedrooms || 0,
            floor: values?.floor,
            location: values?.location?.value,
            min_price: values?.minPrice,
            max_price: values?.maxPrice,
            status: values?.status?.value?.toLowerCase() || "rent",
            type: values?.type?.value?.toLowerCase() || "house",
          },
        ]);

        if (!error) {
          navigate("/clients");
        }
      }
    } else {
      const { data: client } = await supabase
        .from("clients")
        .insert([{ name: values?.name, phone_number: values?.phone }])
        .select()
        .single();

      const { error } = await supabase.from("client_preferences").insert([
        {
          client: client?.id,
          bathrooms: values?.bathrooms || 0,
          bedrooms: values?.bedrooms || 0,
          floor: values?.floor,
          location: values?.location?.value,
          min_price: values?.minPrice,
          max_price: values?.maxPrice,
          status: values?.status?.value?.toLowerCase() || "rent",
          type: values?.type?.value?.toLowerCase() || "house",
        },
      ]);

      if (!error) {
        navigate("/clients");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[800px] space-y-5">
        <CreateClientStep1 clientId={clientId} control={control} />
      </form>
    </div>
  );
};

export default CreateClient;
