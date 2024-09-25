import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

import Modal from "common/components/modal";
import Input from "common/components/input";
import Button from "common/components/button";

import { supabase } from "client";

const CreateLocationModal = ({ onComplete = () => {} }) => {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, setValue } = useForm();

  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };

  const onSubmit = async (values) => {
    const { data, error } = await supabase
      .from("locations")
      .insert([{ name: values?.name }]);

    if (!error) {
      setValue("name", "");
      setOpen(false);
      onComplete();
    }
  };

  return (
    <div>
      <Modal active={open} onClose={toggleModal} title="Dodaj novu lokaciju">
        <div className="w-[400px] max-w-full space-y-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input label="Naziv" placeholder="Naziv lokacije" {...field} />
            )}
          />
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </div>
      </Modal>
      <Button onClick={toggleModal}>Dodaj lokaciju</Button>
    </div>
  );
};

export default CreateLocationModal;
