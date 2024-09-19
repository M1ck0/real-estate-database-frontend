import $landIcon from "icons/land.svg";
import $houseIcon from "icons/house.svg";
import $apartmentIcon from "icons/apartment.svg";

const status = [
  { name: "Sale", value: "sale", icon: $houseIcon },
  { name: "Rent", value: "rent", icon: $apartmentIcon },
];

const CreatePropertyStep2 = ({ setValue, nextStep }) => {
  return (
    <div className="h-full gap-10 w-full flex items-center justify-center flex-col">
      <h1 className="text-3xl font-semibold">Property Status</h1>
      <div className="flex items-center justify-center gap-10">
        {status?.map((item) => (
          <div
            className="w-[300px] h-[220px] duration-200 hover:bg-gray-100 cursor-pointer flex-col gap-4 border rounded-4xl rounded-xl flex items-center justify-center"
            onClick={() => {
              setValue("status", item?.value);
              nextStep();
            }}
          >
            {/* <img src={item?.icon} className="w-10" /> */}
            <p className="text-xl font-semibold">{item?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePropertyStep2;
