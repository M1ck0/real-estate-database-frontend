import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router";

import EditPropertyStep1 from "./form/edit-property-step-1";

import usePropertyById from "common/hooks/use-property-by-id";

import { userState } from "state/atom/user";

import { supabase } from "client";

const EditProperty = () => {
  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userState);

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
        building: property?.building,
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
    if (propertyId) {
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
          building: values?.building?.value || property?.building,
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
        // const amenities = Array.from(new Set(values?.amenities))?.map((item) => ({
        //   property: property?.id,
        //   amenity: item,
        // }));
        //
        // await supabase
        //   .from("property_amenities")
        //   .delete()
        //   .eq("property", property?.id)
        //   .select();
        // //
        //
        // await supabase.from("property_amenities").upsert(amenities);

        const files = values?.images; // Access the file input

        // Extract the file extension (e.g., .jpg, .png) from the original file name

        const uploads = Array.from(files || []).map(async (file) => {
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

        const contract = values?.contract; // Access the file input

        // Compress and upload images
        const contractUpload = Array.from(contract || []).map(async (file) => {
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
          .eq("id", propertyId)
          .select()
          .single();

        if (!imagesError) {
          navigate("/properties");
          return;
        }
      }
    } else {
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
            building: values?.building?.value,
            floor: values?.floor || 0,
            type: values?.type?.value,
            description: values?.description,
            owner: values?.ownerName,
            owner_contact: values?.ownerPhone,
          },
        ])
        .select()
        .single();

      // const amenities = values?.amenities?.map((item) => ({
      //   property: property?.id,
      //   amenity: item,
      // }));
      //
      // await supabase.from("property_amenities").insert(amenities);

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
    }

    setLoading(false);
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
