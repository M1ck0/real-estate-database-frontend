import { Link } from "react-router-dom";

import Badge from "common/components/badge";
import Table from "common/components/table";
import Button from "common/components/button";
import PageTitle from "common/components/page-title";

import useProperties from "common/hooks/use-properties";

const header = [
  {
    name: "Name",
    accessor: "*",
    render: (data) => <Link to={`/properties/${data?.id}`}>{data?.title}</Link>,
  },
  { name: "Location", accessor: "locations", render: (data) => data?.name },
  { name: "Type", accessor: "type" },
  {
    name: "Available",
    accessor: "available",
    render: (data) => <Badge text={data ? "Yes" : "No"} />,
  },
  {
    name: "Status",
    accessor: "status",
    render: (data) => <Badge text={data?.toUpperCase()} />,
  },
  { name: "Bathrooms", accessor: "bathrooms" },
  { name: "Bedrooms", accessor: "bedrooms" },
  {
    name: "Price",
    accessor: "price",
    render: (data) => new Intl.NumberFormat("en-US").format(data || 0),
  },
];

const Properties = () => {
  const { data: properties } = useProperties();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <PageTitle>Properties</PageTitle>
        <Link to="/properties/new">
          <Button>Create New Property</Button>
        </Link>
      </div>
      <Table
        key={properties?.length}
        data={properties}
        header={header}
        totalElements={properties?.length}
      />
    </div>
  );
};

export default Properties;
