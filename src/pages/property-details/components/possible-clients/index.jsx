import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Badge from "common/components/badge";
import Table from "common/components/table";
import Button from "common/components/button";
import Checkbox from "common/components/checkbox";

import { supabase } from "client";

const matches = {
  price: true,
  type: false,
  status: true,
  floor: false,
  bedrooms: false,
  bathrooms: false,
  location: false,
  type: false,
};

const header = [
  {
    name: "Name",
    accessor: "*",
    render: (data) => (
      <Link to={`/clients/${data?.client?.id}`}>{data?.client?.name}</Link>
    ),
  },
  {
    name: "Type",
    accessor: "type",
    render: (data) => <Badge text={data || "/"} />,
  },
  {
    name: "Status",
    accessor: "status",
    render: (data) => <Badge text={data?.toUpperCase()} />,
  },

  { name: "Floor", accessor: "floor", render: (data) => data ?? "/" },
  { name: "Bedrooms", accessor: "bedrooms", render: (data) => data || "/" },
  { name: "Bathrooms", accessor: "bathrooms", render: (data) => data || "/" },
  {
    name: "Min price",
    accessor: "min_price",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data || 0,
      ),
  },
  {
    name: "Max price",
    accessor: "max_price",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data || 0,
      ),
  },
  {
    name: "Location",
    accessor: "location",
    render: (data) => data?.name || "/",
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
    const query = supabase.from("client_preferences").select("*, client(*), location(*)");

    if (matchBy?.price === true) {
      query.lte("min_price", data?.price); // Clients with min_price <= propertyPrice
      query.gte("max_price", data?.price);
    }

    if (matchBy?.type === true) {
      query.eq("type", data?.type);
    }

    if (matchBy?.status === true) {
      query.eq("status", data?.status);
    }

    if (matchBy?.location === true) {
      query.eq("location", data?.location?.id);
    }

    if (matchBy?.bedrooms === true) {
      query.lte("bedrooms", 100);
    }

    if (matchBy?.bathrooms === true) {
      query.lte("bathrooms", 100);
    }

    if (matchBy?.floor === true) {
      query.eq("floor", data?.floor);
    }

    if (matchBy?.type === true) {
      query.eq("type", data?.type);
    }

    const { data: possibleClients, error } = await query;

    if (!error) {
      setClients(possibleClients);
    }
  };

  const onFilterChange = (value, name) => {
    setMatchBy((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (data) {
      getData();
    }
  }, [JSON.stringify(matchBy), data]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Possible buyers ({clients?.length})</h2>
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
