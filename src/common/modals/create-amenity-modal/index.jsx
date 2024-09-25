import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

import Modal from "common/components/modal";
import Input from "common/components/input";
import Button from "common/components/button";

import { supabase } from "client";

const CreateAmenityModal = ({ onComplete = () => {} }) => {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, setValue } = useForm();

  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };

  const onSubmit = async (values) => {
    const { data, error } = await supabase
      .from("amenities")
      .insert([{ name: values?.name }]);

    if (!error) {
      setValue("name", "");
      setOpen(false);
      onComplete();
    }
  };

  return (
    <div>
      <Modal active={open} onClose={toggleModal} title="Dodaj novu pogodnost">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[400px] max-w-full space-y-5"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input label="Ime" placeholder="Naziv pogodnosti" {...field} />
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Modal>
      <Button onClick={toggleModal}>Dodaj pogodnost</Button>
    </div>
  );
};

export default CreateAmenityModal;
