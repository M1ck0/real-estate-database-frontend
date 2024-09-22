import { useState } from "react";

import { Link } from "react-router-dom";

import Input from "common/components/input";
import Badge from "common/components/badge";
import Table from "common/components/table";
import Button from "common/components/button";
import PageTitle from "common/components/page-title";

import useClients from "common/hooks/use-clients";

const header = [
  {
    name: "Name",
    accessor: "*",
    render: (data) => <Link to={`/clients/${data?.id}`}>{data?.name}</Link>,
  },
  {
    name: "Phone Number",
    accessor: "phone_number",
  },
  {
    name: "Type",
    accessor: "client_preferences",
    render: (data) => <Badge text={data?.type || "/"} />,
  },
  {
    name: "Status",
    accessor: "client_preferences",
    render: (data) => <Badge text={data?.status?.toUpperCase()} />,
  },
  { name: "Floor", accessor: "client_preferences", render: (data) => data?.floor || "/" },
  {
    name: "Bedrooms",
    accessor: "client_preferences",
    render: (data) => data?.bedrooms || "/",
  },
  {
    name: "Bathrooms",
    accessor: "client_preferences",
    render: (data) => data?.bathrooms || "/",
  },
  {
    name: "Location",
    accessor: "client_preferences",
    render: (data) => data?.location?.name || "/",
  },
  {
    name: "Min price",
    accessor: "client_preferences",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data?.min_price || 0,
      ) ?? "/",
  },
  {
    name: "Max price",
    accessor: "client_preferences",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data?.max_price || 0,
      ) ?? "/",
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
      <div className="mb-5 flex items-center justify-between">
        <PageTitle>Clients</PageTitle>
        <Link to="/clients/new">
          <Button>Create New Client</Button>
        </Link>
      </div>
      <div className="mb-5 w-[300px]">
        <Input label="Search" placeholder="Search..." onChange={setSearchText} />
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
