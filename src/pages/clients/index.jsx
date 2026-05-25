import { useState } from "react";

import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

import Input from "common/components/input";
import Badge from "common/components/badge";
import Table from "common/components/table";
import Button from "common/components/button";
import Switch from "common/components/switch";
import PageTitle from "common/components/page-title";

import useClients from "common/hooks/use-clients";

import { supabase } from "client";

const header = [
  {
    name: "Ime",
    accessor: "*",
    render: (data) => (
      <Link
        to={`/clients/${data?.id}`}
        className="font-medium text-teal-700 hover:underline"
      >
        {data?.name}
      </Link>
    ),
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
    render: (data) =>
      data?.client_preference_locations
        ?.map((cpl) => cpl?.locations?.name)
        .filter(Boolean)
        .join(", ") ||
      data?.location?.name ||
      "—",
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
    name: "Agent",
    accessor: "agent",
    render: (data) => data?.name || "/",
  },
  {
    name: "Aktivan",
    accessor: "*",
    render: (data) => <Active data={data} />,
  },

  {
    name: "Akcije",
    accessor: "*",
    render: (data) => (
      <Link
        to={`/clients/edit/${data?.id}`}
        className="inline-flex items-center justify-center rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        <PencilSquareIcon className="size-4" />
      </Link>
    ),
  },
];

const Active = ({ data }) => {
  const onSwitch = async () => {
    const { data: d, error } = await supabase
      .from("client_preferences")
      .update({ active: !data?.client_preferences?.active })
      .eq("client", data?.id);
  };

  return (
    <div>
      <Switch value={data?.client_preferences?.active} onChange={onSwitch} />
    </div>
  );
};

const Clients = ({ rent, sale }) => {
  const [searchText, setSearchText] = useState("");

  const { data: clients } = useClients();

  const filtered = clients
    ?.filter((item) =>
      JSON.stringify(item)?.toLowerCase()?.includes(searchText?.toLowerCase()),
    )
    ?.filter((item) =>
      sale
        ? item?.client_preferences?.status === "sale"
        : rent
          ? item?.client_preferences?.status === "rent"
          : item,
    );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle subtitle={`${filtered?.length ?? 0} klijenata`}>Klijenti</PageTitle>
        <Link to="/clients/new">
          <Button>Kreiraj novog klijenta</Button>
        </Link>
      </div>
      <div className="mb-5 max-w-xs">
        <Input placeholder="Pretraga klijenata..." onChange={setSearchText} />
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
