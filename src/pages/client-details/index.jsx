import useClientById from "common/hooks/use-client-by-id";
import { useParams } from "react-router";
import PossibleProperties from "./components/possible-properties";

const ClientDetails = () => {
  const { clientId } = useParams();

  const { data } = useClientById(clientId);

  return (
    <div>
      <PossibleProperties data={data} />
    </div>
  );
};

export default ClientDetails;
