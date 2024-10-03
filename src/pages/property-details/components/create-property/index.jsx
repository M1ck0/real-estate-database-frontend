import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import imageCompression from "browser-image-compression";
import { useRecoilValue } from "recoil";

import CreatePropertyStep1 from "./form/create-property-step-1";

import { userState } from "state/atom/user";

import { supabase } from "client";

const CreateProperty = () => {
  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userState);

  const navigate = useNavigate();

  const { control, watch, handleSubmit, setValue, getValues } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    const { data: property, error } = await supabase
      .from("properties")
      .insert([
        {
          title: values?.name,
          available: values?.available?.value === "true" ? true : false,
          price: values?.price,
          size: values?.size,
          bedrooms: values?.bedrooms || 0,
          bathrooms: values?.bathrooms || 0,
          location: values?.location?.value,
          agent: user?.id,
          available_date: values?.availableDate,
          status: values?.status?.value,
          floor: values?.floor || 0,
          type: values?.type?.value,
          description: values?.description,
          owner: values?.ownerName,
          owner_contact: values?.ownerPhone,
        },
      ])
      .select()
      .single();

    const amenities = values?.amenities?.map((item) => ({
      property: property?.id,
      amenity: item,
    }));

    await supabase.from("property_amenities").insert(amenities);

    if (!values?.images) {
      // navigate("/properties");
      return;
    }

    const files = values?.images; // Access the file input

    // Image compression options
    const options = {
      maxSizeMB: 1, // Maximum file size (in MB)
      maxWidthOrHeight: 1920, // Max width or height (px)
      useWebWorker: true, // Use web worker for async compression
    };

    // Compress and upload images
    const uploads = Array.from(files).map(async (file) => {
      try {
        const compressedFile = await imageCompression(file, options); // Compress the image

        const timestamp = new Date().getTime();
        const fileExtension = file.name.split(".").pop();

        // Create a new file name by appending timestamp
        const newFileName = `${file.name.split(".")[0]}_${timestamp}_${property?.id}.${fileExtension}`;

        // Upload the compressed image to Supabase
        const { data, error } = await supabase.storage
          .from("images") // Specify your bucket name
          .upload(newFileName, compressedFile); // Path in the bucket

        if (error) {
          console.error("Upload error:", error.message);
          navigate("/properties");
          return null;
        }

        return data; // Return the uploaded file metadata
      } catch (error) {
        console.error("Compression error:", error.message);
        return null;
      }
    });

    const imageResults = await Promise.all(uploads);

    const newImages = imageResults?.map((item) => item?.path); // Adjusted to use 'path'

    // Upsert the new images into the 'property_images' table
    const { data: imagesData, error: imagesError } = await supabase
      .from("property_images")
      .upsert(
        [
          {
            property: property?.id,
            links: [...newImages, ...(property?.images || [])],
          },
        ],
        { onConflict: "property" },
      );

    const contract = values?.contract; // Access the file input

    // Compress and upload images
    const contractUpload = Array.from(contract).map(async (file) => {
      try {
        const timestamp = new Date().getTime();
        const fileExtension = file.name.split(".").pop();

        // Create a new file name by appending timestamp
        const newFileName = `${file.name.split(".")[0]}_${timestamp}_${property?.id}.${fileExtension}`;

        // Upload the compressed image to Supabase
        const { data, error } = await supabase.storage
          .from("files") // Specify your bucket name
          .upload(newFileName, file); // Path in the bucket

        if (error) {
          console.error("Upload error:", error.message);
          // navigate("/properties");
          return null;
        }

        return data; // Return the uploaded file metadata
      } catch (error) {
        console.error("Compression error:", error.message);
        return null;
      }
    });

    const contractResults = await Promise.all(contractUpload);

    await supabase
      .from("properties")
      .update({
        contract: contractResults[0],
      })
      .eq("id", property?.id)
      .select()
      .single();

    navigate("/properties");
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
          getValues={getValues}
        />
      </form>
    </div>
  );
};

export default CreateProperty;
