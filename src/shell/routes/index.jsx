import React from "react";

import Clients from "pages/clients";
import Properties from "pages/properties";
import ClientDetails from "pages/client-details";
import PropertyDetails from "pages/property-details";

const router = [
  {
    name: "Properties",
    path: "/properties/*",
    link: "/properties",
    component: () => <Properties />,
    routes: [
      {
        name: "Property Details",
        path: "/properties/:propertyId",
        component: () => <PropertyDetails />,
      },
      {
        name: "New Property",
        path: "/properties/new",
        component: () => <PropertyDetails newProperty={true} />,
      },
    ],
  },
  {
    name: "Clients",
    path: "/clients/*",
    link: "/clients",
    component: () => <Clients />,
    routes: [
      {
        name: "Client Details",
        path: "/clients/:clientId",
        component: () => <ClientDetails />,
      },
    ],
  },
];

export default router;
