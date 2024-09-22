import { useParams } from "react-router";

import usePropertyById from "common/hooks/use-property-by-id";

import PossibleClients from "./components/possible-clients";
import PropertyDetailsUi from "./components/property-details-ui";

const PropertyDetails = () => {
  const { propertyId } = useParams();

  const { data } = usePropertyById(propertyId);

  return (
    <div>
      <PropertyDetailsUi data={data} />
      <PossibleClients data={data} />
    </div>
  );
};

export default PropertyDetails;
