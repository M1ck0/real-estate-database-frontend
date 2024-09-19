import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid";

import Badge from "common/components/badge";
import Table from "common/components/table";
import Checkbox from "common/components/checkbox";

import { supabase } from "client";

const header = [
  {
    name: "Name",
    accessor: "*",
    render: (data) => <Link to={`/properties/${data?.id}`}>{data?.title}</Link>,
  },
  { name: "Location", accessor: "location", render: (data) => data?.name || "/" },
  {
    name: "Type",
    accessor: "type",
    render: (data) => <span className="capitalize">{data}</span>,
  },
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

const matches = {
  price: true,
  bedrooms: true,
  bathrooms: true,
  floor: true,
  type: true,
  status: true,
  location: true,
};

const PossibleProperties = ({ data }) => {
  const [matchBy, setMatchBy] = useState(matches);
  const [properties, setProperties] = useState([]);

  const getData = async () => {
    const query = supabase.from("properties").select("*, location(name)");

    if (matchBy?.price === true) {
      query.gte("price", data?.min_price);
      query.lte("price", data?.max_price);
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

    if (matchBy?.status === true) {
      query.eq("status", data?.property_status);
    }

    if (matchBy?.location === true) {
      query.eq("location", data?.preferred_location?.id);
    }

    const { data: properties, error } = await query;

    if (!error) {
      setProperties(properties);
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

  console.log(properties);

  const items = {
    budget: data?.min_price
      ? `${new Intl.NumberFormat("en-US").format(data?.min_price || 0)} - 
              ${new Intl.NumberFormat("en-US").format(data?.max_price || 0)}`
      : "/",
    location: data?.preferred_location?.name || "/",
    type: data?.type || "/",
    floor: data?.floor || "/",
    status: data?.property_status || "/",
    bedrooms: data?.bedrooms || "/",
    bathrooms: data?.bathrooms || "/",
  };

  return (
    <div>
      <div className="flex gap-10">
        <div className="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
          <div className="flex flex-1 flex-col p-8">
            <UserIcon className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {data?.client?.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">Client</dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${data?.client?.phone_number}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <PhoneIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[500px] justify-between">
          {Object.entries(items).map(([key, value]) => (
            <div className="flex items-center w-full border-b py-2 justify-between">
              <p className="capitalize">{key}</p>
              <p className="capitalize">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4 mt-5">
        Possible properties ({properties?.length})
      </h2>
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
        <Table key={properties?.length} data={properties} header={header} />
      </div>
    </div>
  );
};

export default PossibleProperties;
