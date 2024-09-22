import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import EditPropertyStep1 from "./form/edit-property-step-1";

import usePropertyById from "common/hooks/use-property-by-id";

import { supabase } from "client";
import dayjs from "dayjs";

const EditProperty = () => {
  const navigate = useNavigate();

  const { propertyId } = useParams();

  const { control, reset, watch, handleSubmit, setValue, getValues } = useForm();

  const { data: property } = usePropertyById(propertyId);

  useEffect(() => {
    if (property?.id) {
      const amenities = property?.property_amenities?.map((item) => item?.amenity?.id);

      reset({
        name: property?.title,
        price: property?.price,
        size: property?.size,
        type: property?.type,
        status: property?.status,
        available: property?.available?.toString(),
        location: property?.location?.id,
        availableDate: property?.available_date,
        bedrooms: property?.bedrooms,
        bathrooms: property?.bathrooms,
        floor: property?.floor,
        amenities: amenities,
        description: property?.description,
        ownerName: property?.owner,
        ownerPhone: property?.owner_contact,
      });
    }
  }, [property]);

  const onSubmit = async (values) => {
    const { data, error } = await supabase
      .from("properties")
      .update({
        title: values?.name || property?.name,
        available: values?.available?.value === "true" ? true : false,
        available_date: values?.availableDate || property?.available_date,
        price: values?.price || property?.price,
        bedrooms: values?.bedrooms || property?.bedrooms,
        bathrooms: values?.bathrooms || property?.bathrooms,
        location: values?.location?.value || property?.location?.id,
        available: values?.available?.value === "true",
        status: values?.status?.value || property?.status,
        floor: values?.floor || property?.floor,
        type: values?.type?.value || property?.type,
        description: values?.description || property?.description,
        owner: values?.ownerName || property?.owner,
        owner_contact: values?.ownerPhone || property?.owner_contact,
      })
      .eq("id", property?.id)
      .select()
      .single();

    if (data?.id) {
      const amenities = values?.amenities?.map((item) => ({
        property: property?.id,
        amenity: item,
      }));

      await supabase.from("property_amenities").delete().eq("property", property?.id);

      await supabase.from("property_amenities").upsert(amenities);

      if (!values?.images) return;

      const files = values?.images; // Access the file input

      const uploads = Array.from(files).map(async (file) => {
        const { data, error } = await supabase.storage
          .from("images") // Specify your bucket name
          .upload(`${file.name}+${dayjs().valueOf()}`, file); // Path in the bucket

        if (error) {
          console.error("Error uploading file:", error);
          return null;
        }
        return data; // You can return the uploaded file metadata
      });

      const imageResults = await Promise.all(uploads);

      await supabase
        .from("property_images")
        .insert([
          { property: property?.id, links: imageResults?.map((item) => item?.fullPath) },
        ]);

      if (!error) {
        navigate("/properties");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto h-[calc(100vh-100px)] max-w-[800px] space-y-5"
      >
        <EditPropertyStep1
          watch={watch}
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
      </form>
    </div>
  );
};

export default EditProperty;
