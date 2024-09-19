import { useParams } from "react-router";

import usePropertyById from "common/hooks/use-property-by-id";

import CreatePorperty from "./components/create-property";
import PossibleClients from "./components/possible-clients";
import PropertyDetailsUi from "./components/property-details-ui";

const PropertyDetails = ({ newProperty }) => {
  const { propertyId } = useParams();

  const { data } = usePropertyById(propertyId);

  return (
    <div>
      {newProperty ? (
        <CreatePorperty data={data} newProperty={newProperty} />
      ) : (
        <>
          <PropertyDetailsUi data={data} />
          <PossibleClients data={data} />
        </>
      )}
    </div>
  );
};

export default PropertyDetails;
