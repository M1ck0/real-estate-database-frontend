import { useState } from "react";

import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

import Input from "common/components/input";
import Badge from "common/components/badge";
import Table from "common/components/table";
import Button from "common/components/button";
import PageTitle from "common/components/page-title";

import useClients from "common/hooks/use-clients";

const header = [
  {
    name: "Ime",
    accessor: "*",
    render: (data) => <Link to={`/clients/${data?.id}`}>{data?.name}</Link>,
  },
  {
    name: "Broj telefona",
    accessor: "phone_number",
  },
  {
    name: "Tip nekretnine",
    accessor: "client_preferences",
    render: (data) => <Badge text={data?.type || "/"} />,
  },
  {
    name: "Status",
    accessor: "client_preferences",
    render: (data) => <Badge text={data?.status?.toUpperCase()} />,
  },
  { name: "Sprat", accessor: "client_preferences", render: (data) => data?.floor || "/" },
  {
    name: "Sobe",
    accessor: "client_preferences",
    render: (data) => data?.bedrooms || "/",
  },
  {
    name: "Kupatila",
    accessor: "client_preferences",
    render: (data) => data?.bathrooms || "/",
  },
  {
    name: "Lokacija",
    accessor: "client_preferences",
    render: (data) => data?.location?.name || "/",
  },
  {
    name: "Minimalna cijena",
    accessor: "client_preferences",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data?.min_price || 0,
      ) ?? "/",
  },
  {
    name: "Maksimalna cijena",
    accessor: "client_preferences",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data?.max_price || 0,
      ) ?? "/",
  },
  {
    name: "Akcije",
    accessor: "*",
    render: (data) => (
      <Link to={`/clients/edit/${data?.id}`} className="text-blue-500">
        <PencilSquareIcon className="size-6" />
      </Link>
    ),
  },
];

const Clients = () => {
  const [searchText, setSearchText] = useState("");

  const { data: clients } = useClients();

  const filtered = clients?.filter((item) =>
    JSON.stringify(item)?.toLowerCase()?.includes(searchText?.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
        <PageTitle>Klijenti</PageTitle>
        <Link to="/clients/new">
          <Button>Kreiraj novog klijenta</Button>
        </Link>
      </div>
      <div className="mb-5 w-[300px]">
        <Input
          label="Pretraga"
          placeholder="Tekst pretrage..."
          onChange={setSearchText}
        />
      </div>

      <Table
        key={filtered?.length}
        data={filtered}
        header={header}
        totalElements={filtered?.length}
      />
    </div>
  );
};

export default Clients;
