import SettingsAmenities from "./components/settings-amenities";
import SettingsLocations from "./components/settings-locations";

const Settings = () => {
  return (
    <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
      <SettingsLocations />
      <SettingsAmenities />
    </div>
  );
};

export default Settings;
