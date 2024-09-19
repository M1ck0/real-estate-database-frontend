import $landIcon from "icons/land.svg";
import $houseIcon from "icons/house.svg";
import $apartmentIcon from "icons/apartment.svg";

const types = [
  { name: "House", value: "house", icon: $houseIcon },
  { name: "Apartment", value: "house", icon: $apartmentIcon },
  { name: "Land", value: "land", icon: $landIcon },
];

const CreatePropertyStep1 = ({ setValue, nextStep }) => {
  return (
    <div className="h-full gap-10 w-full flex items-center justify-center flex-col">
      <h1 className="text-3xl font-semibold">Property Type</h1>
      <div className="flex items-center justify-center gap-10">
        {types?.map((item) => (
          <div
            className="w-[300px] h-[220px] duration-200 hover:bg-gray-100 cursor-pointer flex-col gap-4 border rounded-4xl rounded-xl flex items-center justify-center"
            onClick={() => {
              setValue("type", item?.value);
              nextStep();
            }}
          >
            <img src={item?.icon} className="w-10" />
            <p className="text-lg">{item?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePropertyStep1;
