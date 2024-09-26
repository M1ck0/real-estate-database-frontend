import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";

import CreatePropertyStep1 from "./form/create-property-step-1";

import { userState } from "state/atom/user";

import { supabase } from "client";

const CreateProperty = () => {
  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userState);

  const navigate = useNavigate();

  const { control, watch, handleSubmit, setValue } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);
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
          agent: user?.id,
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

    await supabase.from("property_amenities").insert(amenities);

    if (!values?.images) {
      navigate("/properties");
      return;
    }

    const files = values?.images; // Access the file input

    // Extract the file extension (e.g., .jpg, .png) from the original file name

    const uploads = Array.from(files).map(async (file) => {
      const timestamp = new Date().getTime();

      const fileExtension = file.name.split(".").pop();

      // Create a new file name by appending the timestamp to the original file name (without extension)
      const newFileName = `${file.name.split(".")[0]}_${timestamp}_${data?.id}.${fileExtension}`;

      const { data, error } = await supabase.storage
        .from("images") // Specify your bucket name
        .upload(newFileName, file); // Path in the bucket

      if (error) {
        navigate("/properties");
        return null;
      }
      return data; // You can return the uploaded file metadata
    });

    const imageResults = await Promise.all(uploads);

    const newImages = imageResults?.map((item) => item?.fullPath);

    const { data: imagesData, error: imagesError } = await supabase
      .from("property_images")
      .upsert(
        [
          {
            property: data?.id,
            links: [...newImages, ...(data?.images || [])],
          },
        ],
        { onConflict: "property" },
      )
      .select();

    if (!imagesError) {
      navigate("/properties");
      return;
    }
  };

  useEffect(() => {
    setValue("available", "true");
  }, []);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[800px] space-y-5">
        <CreatePropertyStep1
          loading={loading}
          watch={watch}
          control={control}
          setValue={setValue}
        />
      </form>
    </div>
  );
};

export default CreateProperty;
