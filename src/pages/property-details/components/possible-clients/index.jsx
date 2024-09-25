import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Badge from "common/components/badge";
import Table from "common/components/table";
import Button from "common/components/button";
import Checkbox from "common/components/checkbox";

import { supabase } from "client";

const matches = {
  cijena: true,
  tip: false,
  status: true,
  sprat: false,
  sobe: false,
  kupatila: false,
  lokacija: false,
};

const header = [
  {
    name: "Ime",
    accessor: "*",
    render: (data) => (
      <Link to={`/clients/${data?.client?.id}`}>{data?.client?.name}</Link>
    ),
  },
  {
    name: "Tip",
    accessor: "type",
    render: (data) => <Badge text={data || "/"} />,
  },
  {
    name: "Status",
    accessor: "status",
    render: (data) => <Badge text={data?.toUpperCase()} />,
  },

  { name: "Sprat", accessor: "floor", render: (data) => data ?? "/" },
  { name: "Sobe", accessor: "bedrooms", render: (data) => data || "/" },
  { name: "Kuptaila", accessor: "bathrooms", render: (data) => data || "/" },
  {
    name: "Minimalna cijena",
    accessor: "min_price",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data || 0,
      ),
  },
  {
    name: "Maksimalna cijena",
    accessor: "max_price",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data || 0,
      ),
  },
  {
    name: "Lokacija",
    accessor: "location",
    render: (data) => data?.name || "/",
  },
  { name: "Broj", accessor: "client", render: (data) => data?.phone_number },
  { name: "Akcije", accessor: "*", render: (data) => <Actions data={data} /> },
];

const Actions = ({ data }) => {
  return (
    <div>
      <a href={`tel:${data?.client?.phoneNumber}`}>
        <Button>Pozovi klijenta</Button>
      </a>
    </div>
  );
};

const PossibleClients = ({ data }) => {
  const [clients, setClients] = useState([]);
  const [matchBy, setMatchBy] = useState(matches);

  const getData = async () => {
    const query = supabase.from("client_preferences").select("*, client(*), location(*)");

    if (matchBy?.cijena === true) {
      query.lte("min_price", data?.price); // Clients with min_price <= propertyPrice
      query.gte("max_price", data?.price);
    }

    if (matchBy?.tip === true) {
      query.eq("type", data?.type);
    }

    if (matchBy?.status === true) {
      query.eq("status", data?.status);
    }

    if (matchBy?.lokacija === true) {
      query.eq("location", data?.location?.id);
    }

    if (matchBy?.sobe === true) {
      query.lte("bedrooms", 100);
    }

    if (matchBy?.kupatila === true) {
      query.lte("bathrooms", 100);
    }

    if (matchBy?.sprat === true) {
      query.eq("floor", data?.floor);
    }

    if (matchBy?.tip === true) {
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
      <h2 className="mb-4 text-xl font-semibold">Mogući kupci ({clients?.length})</h2>
      <div className="mb-4 grid grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-7">
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
