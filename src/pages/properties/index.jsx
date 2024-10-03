import { useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

import Badge from "common/components/badge";
import Table from "common/components/table";
import Input from "common/components/input";
import Button from "common/components/button";
import PageTitle from "common/components/page-title";

import useProperties from "common/hooks/use-properties";

dayjs.extend(relativeTime);

const header = [
  {
    name: "Ime",
    accessor: "*",
    render: (data) => <Link to={`/properties/${data?.id}`}>{data?.title}</Link>,
  },
  { name: "Lokacija", accessor: "locations", render: (data) => data?.name },
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
  {
    name: "Dostupno",
    accessor: "available",
    render: (data) => <Badge text={data ? "Yes" : "No"} />,
  },
  {
    name: "Dostupno od",
    accessor: "available_date",
    render: (data) => {
      return data ? (
        <div className="flex flex-col gap-1">
          <p>{dayjs(data)?.format("DD MMMM YYYY")}</p>
          <span className="text-xs font-medium text-gray-500">{dayjs().to(data)}</span>
        </div>
      ) : (
        "/"
      );
    },
  },

  { name: "Kupatila", accessor: "bathrooms" },
  { name: "Sobe", accessor: "bedrooms" },
  { name: "Sprat", accessor: "floor", render: (data) => data },
  {
    name: "Cijena",
    accessor: "price",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data || 0,
      ),
  },
  {
    name: "Dodato",
    accessor: "created_at",
    render: (data) => dayjs(data).format("DD MMM YYYY"),
  },

  {
    name: "Akcije",
    accessor: "*",
    render: (data) => (
      <Link to={`/properties/edit/${data?.id}`} className="text-blue-500">
        <PencilSquareIcon className="size-6" />
      </Link>
    ),
  },
];

const Properties = ({ rent, sale }) => {
  const [searchText, setSearchText] = useState("");

  const { data: properties } = useProperties();

  const filtered = properties
    ?.filter((item) =>
      JSON.stringify(item)?.toLowerCase()?.includes(searchText?.toLowerCase()),
    )
    ?.filter((item) =>
      sale ? item?.status === "sale" : rent ? item?.status === "rent" : item,
    );

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
        <PageTitle>Nekretnine</PageTitle>
        <Link to="/properties/new">
          <Button>Kreiraj novu nekretninu</Button>
        </Link>
      </div>
      <div className="mb-5 w-[300px]">
        <Input label="Pretraga" placeholder="Text..." onChange={setSearchText} />
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

export default Properties;
