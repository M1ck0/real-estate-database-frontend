import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import EditPropertyStep1 from "./form/edit-property-step-1";

import usePropertyById from "common/hooks/use-property-by-id";

import { supabase } from "client";

const EditProperty = () => {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .update({
        title: values?.name || property?.name,
        available:
          values?.available?.value === "true" || values?.available === "true"
            ? true
            : false,
        available_date: values?.availableDate || property?.available_date,
        price: values?.price || property?.price,
        bedrooms: values?.bedrooms || property?.bedrooms,
        bathrooms: values?.bathrooms || property?.bathrooms,
        location: values?.location?.value || property?.location?.id,
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

      if (!values?.images) {
        if (!error) {
          navigate("/properties");
          return;
        }
      }

      const files = values?.images; // Access the file input

      // Extract the file extension (e.g., .jpg, .png) from the original file name

      const uploads = Array.from(files).map(async (file) => {
        const timestamp = new Date().getTime();

        const fileExtension = file.name.split(".").pop();

        // Create a new file name by appending the timestamp to the original file name (without extension)
        const newFileName = `${file.name.split(".")[0]}_${timestamp}.${fileExtension}`;

        const { data, error } = await supabase.storage
          .from("images") // Specify your bucket name
          .upload(newFileName, file); // Path in the bucket

        if (error) {
          console.error("Error uploading file:", error);
          navigate("/properties");
          return null;
        }
        return data; // You can return the uploaded file metadata
      });

      const imageResults = await Promise.all(uploads);

      const newImages = imageResults?.map((item) => item?.fullPath);

      const { error: imagesError } = await supabase.from("property_images").upsert(
        [
          {
            property: property?.id,
            links: [...newImages, ...(property?.images || [])],
          },
        ],
        { onConflict: "property" },
      );

      if (!imagesError) {
        navigate("/properties");
        return;
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
        <EditPropertyStep1
          loading={loading}
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
