import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import Badge from "common/components/badge";
import Table from "common/components/table";
import Checkbox from "common/components/checkbox";

import { supabase } from "client";
import { building } from "common/constants";

const header = [
  {
    name: "Ime",
    accessor: "*",
    render: (data) => (
      <Link
        to={`/properties/${data?.id}`}
        className="font-medium text-teal-700 hover:text-teal-900 hover:underline"
      >
        {data?.title}
      </Link>
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
  { name: "Sprat", accessor: "floor", render: (data) => data ?? "—" },
  { name: "Sobe", accessor: "bedrooms" },
  { name: "Kupatila", accessor: "bathrooms" },
  {
    name: "Cijena",
    accessor: "price",
    render: (data) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        data || 0,
      ),
  },
  { name: "Lokacija", accessor: "location", render: (data) => data?.name || "—" },
];

const matches = {
  cijena: true,
  tip: false,
  status: true,
  sprat: false,
  sobe: false,
  kupatila: false,
  lokacija: false,
  gradnja: false,
};

const labelMap = {
  cijena: "Cijena",
  tip: "Tip",
  status: "Status",
  sprat: "Sprat",
  sobe: "Sobe",
  kupatila: "Kupatila",
  lokacija: "Lokacija",
  gradnja: "Gradnja",
};

const PossibleProperties = ({ data }) => {
  const [matchBy, setMatchBy] = useState(matches);
  const [properties, setProperties] = useState([]);

  const getData = async () => {
    const query = supabase.from("properties").select("*, location(name)");
    query.eq("available", true);

    if (matchBy?.cijena) {
      query.gte("price", data?.min_price);
      query.lte("price", data?.max_price);
    }
    if (matchBy?.sobe) query.eq("bedrooms", data?.bedrooms);
    if (matchBy?.kupatila) query.eq("bathrooms", data?.bathrooms || 0);
    if (matchBy?.tip) query.eq("type", data?.type);
    if (matchBy?.status) query.eq("status", data?.status);
    if (matchBy?.gradnja) query.eq("building", data?.building);
    if (matchBy?.lokacija) {
      const locationIds = data?.client_preference_locations
        ?.map((cpl) => cpl?.locations?.id)
        .filter(Boolean);
      if (locationIds?.length) query.in("location", locationIds);
    }

    const { data: props, error } = await query;
    if (!error) setProperties(props);
  };

  const onFilterChange = (value, name) => {
    setMatchBy((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (data) getData();
  }, [JSON.stringify(matchBy), data]);

  const fmt = (v) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(v || 0);

  const infoRows = [
    {
      label: "Budget",
      value:
        data?.min_price >= 0 ? `${fmt(data?.min_price)} – ${fmt(data?.max_price)}` : "—",
    },
    {
      label: "Lokacija",
      value:
        data?.client_preference_locations
          ?.map((cpl) => cpl?.locations?.name)
          .filter(Boolean)
          .join(", ") || "—",
    },
    { label: "Tip", value: data?.type || "—" },
    { label: "Status", value: data?.status || "—" },
    { label: "Sprat", value: data?.floor ?? "—" },
    { label: "Sobe", value: data?.bedrooms ?? "—" },
    { label: "Kupatila", value: data?.bathrooms ?? "—" },
    {
      label: "Gradnja",
      value: building?.find((item) => item?.value === data?.building)?.name || "—",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Client card + preferences */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Avatar card */}
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:w-48 lg:flex-shrink-0">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
            <UserCircleIcon className="h-12 w-12 text-teal-600" />
          </div>
          <h3 className="mt-4 text-center text-base font-semibold text-slate-900">
            {data?.client?.name || "—"}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">Klijent</p>
          {data?.client?.phone_number && (
            <a
              href={`tel:${data?.client?.phone_number}`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <PhoneIcon className="h-4 w-4 text-slate-400" />
              Pozovi
            </a>
          )}
        </div>

        {/* Preferences list */}
        <div className="flex-1 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-3">
            <h4 className="text-sm font-semibold text-slate-700">Preferencije</h4>
          </div>
          <div className="divide-y divide-slate-100">
            {infoRows.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-5 py-2.5">
                <span className="text-sm text-slate-500">{label}</span>
                <span className="text-sm font-medium capitalize text-slate-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter section */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Moguće nekretnine
            <span className="ml-2 rounded-full bg-teal-50 px-2.5 py-0.5 text-sm font-medium text-teal-700">
              {properties?.length}
            </span>
          </h2>
        </div>
        <div className="mb-4 flex flex-wrap gap-3">
          {Object.entries(matchBy)?.map(([key, value]) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition-colors hover:bg-slate-50"
            >
              <Checkbox value={value} onChange={(v) => onFilterChange(v, key)} />
              <span className="font-medium text-slate-700">{labelMap[key]}</span>
            </label>
          ))}
        </div>
        <Table key={properties?.length} data={properties} header={header} />
      </div>
    </div>
  );
};

export default PossibleProperties;
