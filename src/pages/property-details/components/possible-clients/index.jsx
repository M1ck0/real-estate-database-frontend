import { useEffect, useState } from "react";

import Checkbox from "common/components/checkbox";

import Table from "common/components/table";
import Button from "common/components/button";

import { supabase } from "client";
import { Link } from "react-router-dom";

const matches = { price: true, bedrooms: true, bathrooms: true, floor: true, type: true };

const header = [
  // { name: "id", accessor: "client", render: (data) => data?.id },
  {
    name: "Name",
    accessor: "*",
    render: (data) => (
      <Link to={`/clients/${data?.client?.id}`}>{data?.client?.name}</Link>
    ),
  },
  { name: "Number", accessor: "client", render: (data) => data?.phone_number },
  { name: "Actions", accessor: "*", render: (data) => <Actions data={data} /> },
];

const Actions = ({ data }) => {
  return (
    <div>
      <a href={`tel:${data?.client?.phoneNumber}`}>
        <Button>Call Client</Button>
      </a>
    </div>
  );
};

const PossibleClients = ({ data }) => {
  const [clients, setClients] = useState([]);
  const [matchBy, setMatchBy] = useState(matches);

  const getData = async () => {
    const query = supabase.from("client_preferences").select("*, client(*)");

    if (matchBy?.price === true) {
      query.gte("min_price", data?.price);
      query.lte("max_price", data?.price);
    }

    if (matchBy?.bedrooms === true) {
      query.gte("bedrooms", data?.bedrooms);
    }

    if (matchBy?.bathrooms === true) {
      query.gte("bathrooms", data?.bathrooms);
    }

    if (matchBy?.type === true) {
      query.eq("type", data?.type);
    }

    const { data: properties, error } = await query;

    if (!error) {
      setClients(properties);
    }
  };

  const onFilterChange = (value, name) => {
    // const newObject = { ...matchBy, [name]: value };
    //
    // console.log(newObject);

    setMatchBy((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (data) {
      getData();
    }
  }, [JSON.stringify(matchBy), data]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Possible buyers ({clients?.length})</h2>
      <div className="mb-4 grid grid-cols-7 gap-5">
        {Object.entries(matchBy)?.map(([key, value]) => (
          <Checkbox
            label={key}
            value={value}
            onChange={(data) => onFilterChange(data, key)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5">
        <Table key={clients?.length} data={clients} header={header} />
      </div>
    </div>
  );
};

export default PossibleClients;
