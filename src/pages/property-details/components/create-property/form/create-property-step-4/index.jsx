import { Controller } from "react-hook-form";

import Input from "common/components/input";
import Button from "common/components/button";
import Textarea from "common/components/textarea";

const CreatePropertyStep4 = ({ control }) => {
  return (
    <div className="h-full gap-10 w-[400px] mx-auto flex items-center justify-center flex-col">
      <h1 className="text-3xl font-semibold">Aditional Details</h1>
      <div className="w-full space-y-4">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea label="Description" placeholder="Lorem ipsum..." {...field} />
          )}
        />
        <Controller
          name="ownerName"
          control={control}
          render={({ field }) => (
            <Input label="Owner name" placeholder="John Doe" {...field} />
          )}
        />
        <Controller
          name="ownerPhone"
          control={control}
          render={({ field }) => (
            <Input label="Owner phone" placeholder="Owner phone" {...field} />
          )}
        />
        <Button type="submit">Finish</Button>
      </div>
    </div>
  );
};

export default CreatePropertyStep4;
