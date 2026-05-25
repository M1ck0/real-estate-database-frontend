import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router";

import CreateClientStep1 from "./form/create-client-step-1";

import useClientById from "common/hooks/use-client-by-id";

import { userState } from "state/atom/user";

import { supabase } from "client";

const CreateClient = () => {
  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userState);

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
        locations:
          client?.client_preference_locations?.map((cpl) => cpl?.locations?.id) || [],
        type: client?.type,
        status: client?.status,
        building: client?.building,
        bedrooms: client?.bedrooms,
        bathrooms: client?.bathrooms,
        floor: client?.floor,
      });
    }
  }, [client]);

  const saveLocations = async (prefId, locations) => {
    await supabase
      .from("client_preference_locations")
      .delete()
      .eq("client_preference_id", prefId);

    if (locations?.length) {
      await supabase.from("client_preference_locations").insert(
        locations.map((loc) => ({
          client_preference_id: prefId,
          location_id: loc?.value,
        })),
      );
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const prefFields = {
      bathrooms: values?.bathrooms || 0,
      bedrooms: values?.bedrooms || 0,
      floor: values?.floor,
      building: values?.building?.value,
      min_price: values?.minPrice,
      max_price: values?.maxPrice,
      status: values?.status?.value?.toLowerCase() || "rent",
      type: values?.type?.value?.toLowerCase() || "house",
    };

    if (clientId) {
      await supabase
        .from("clients")
        .update({ name: values?.name, phone_number: values?.phone, agent: user?.id })
        .eq("id", clientId);

      const { data: preferences } = await supabase
        .from("client_preferences")
        .select("id")
        .eq("client", clientId)
        .single();

      if (preferences) {
        const { error } = await supabase
          .from("client_preferences")
          .update(prefFields)
          .eq("client", clientId);

        if (!error) {
          await saveLocations(preferences?.id, values?.locations);
          navigate("/clients");
        }
      } else {
        const { data: newPref, error } = await supabase
          .from("client_preferences")
          .insert([{ client: clientId, ...prefFields }])
          .select()
          .single();

        if (!error) {
          await saveLocations(newPref?.id, values?.locations);
          navigate("/clients");
        }
      }
    } else {
      const { data: client } = await supabase
        .from("clients")
        .insert([{ name: values?.name, phone_number: values?.phone, agent: user?.id }])
        .select()
        .single();

      const { data: newPref, error } = await supabase
        .from("client_preferences")
        .insert([{ client: client?.id, ...prefFields }])
        .select()
        .single();

      if (!error) {
        await saveLocations(newPref?.id, values?.locations);
        navigate("/clients");
      }
    }
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[800px] space-y-5">
        <CreateClientStep1 loading={loading} clientId={clientId} control={control} />
      </form>
    </div>
  );
};

export default CreateClient;
