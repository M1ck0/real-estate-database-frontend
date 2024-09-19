import { Link } from "react-router-dom";

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
];

const Clients = () => {
  const { data: clients } = useClients();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <PageTitle>Clients</PageTitle>
        <Link to="/clients/new">
          <Button>Create New Client</Button>
        </Link>
      </div>
      <Table
        key={clients?.length}
        data={clients}
        header={header}
        totalElements={clients?.length}
      />
    </div>
  );
};

export default Clients;
