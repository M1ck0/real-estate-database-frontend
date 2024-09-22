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
    name: "Name",
    accessor: "*",
    render: (data) => <Link to={`/properties/${data?.id}`}>{data?.title}</Link>,
  },
  { name: "Location", accessor: "locations", render: (data) => data?.name },
  { name: "Type", accessor: "type" },
  {
    name: "Status",
    accessor: "status",
    render: (data) => <Badge text={data?.toUpperCase()} />,
  },
  {
    name: "Available",
    accessor: "available",
    render: (data) => <Badge text={data ? "Yes" : "No"} />,
  },
  {
    name: "Available Date",
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

  { name: "Bathrooms", accessor: "bathrooms" },
  { name: "Bedrooms", accessor: "bedrooms" },
  {
    name: "Price",
    accessor: "price",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data || 0,
      ),
  },
  {
    name: "Actions",
    accessor: "*",
    render: (data) => (
      <Link to={`/properties/edit/${data?.id}`} className="text-blue-500">
        <PencilSquareIcon className="size-6" />
      </Link>
    ),
  },
];

const Properties = () => {
  const [searchText, setSearchText] = useState("");

  const { data: properties } = useProperties();

  const filtered = properties?.filter((item) =>
    JSON.stringify(item)?.toLowerCase()?.includes(searchText?.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <PageTitle>Properties</PageTitle>
        <Link to="/properties/new">
          <Button>Create New Property</Button>
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

export default Properties;
