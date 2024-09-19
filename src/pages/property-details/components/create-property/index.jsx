import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import CreatePropertyStep1 from "./form/create-property-step-1";
import CreatePropertyStep2 from "./form/create-property-step-2";
import CreatePropertyStep4 from "./form/create-property-step-4";
import CreatePropertyStep3Sale from "./form/create-property-step-3-sale";

import { supabase } from "client";

const CreatePorperty = ({ newProperty, data }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const { control, watch, handleSubmit, setValue } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
    if (newProperty) {
      const { data, error } = await supabase
        .from("properties")
        .insert([
          {
            title: values?.name,
            available: values?.available?.value === "true" ? true : false,
            price: values?.price,
            bedrooms: values?.bedrooms?.value,
            bathrooms: values?.bathrooms?.value,
            status: values?.status,
            type: values?.type,
            description: values?.description,
            owner: values?.ownerName,
            owner_contact: values?.ownerPhone,
          },
        ])
        .select();
    } else {
      const { data, error } = await supabase
        .from("properties")
        .upsert([
          {
            id: propertyId,
            title: values?.name,
            available:
              values?.available?.value === "true" || values?.available === true
                ? true
                : false,
            price: values?.price,
            bedrooms: values?.bedrooms?.value || values?.bedrooms,
            bathrooms: values?.bathrooms?.value || values?.bathrooms,
            status: values?.status?.value || values?.status,
            type: values?.type?.value || values?.type,
            description: values?.description,
          },
        ])
        .select();
    }
  };

  const onNextStep = () => {
    setCurrentStep((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (data?.id && !newProperty) {
      setValue("name", data?.title);
      setValue("available", data?.available);
      setValue("price", data?.price);
      setValue("bedrooms", data?.bedrooms);
      setValue("bathrooms", data?.bathrooms);
      setValue("status", data?.status);
      setValue("type", data?.type);
      setValue("description", data?.description);
    } else {
      if (newProperty) {
        setValue("available", "true");
      }
    }
  }, [data]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 w-full h-[calc(100vh-100px)]"
      >
        {currentStep === 0 ? (
          <CreatePropertyStep1 setValue={setValue} nextStep={onNextStep} />
        ) : null}
        {currentStep === 1 ? (
          <CreatePropertyStep2 setValue={setValue} nextStep={onNextStep} />
        ) : null}
        {currentStep === 2 ? (
          <CreatePropertyStep3Sale
            control={control}
            setValue={setValue}
            nextStep={onNextStep}
          />
        ) : null}
        {currentStep === 3 ? (
          <CreatePropertyStep4
            control={control}
            setValue={setValue}
            nextStep={onNextStep}
          />
        ) : null}
      </form>
    </div>
  );
};

export default CreatePorperty;
