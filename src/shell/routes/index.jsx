import React from "react";

import { UsersIcon, HomeIcon, CogIcon } from "@heroicons/react/20/solid";

import Clients from "pages/clients";
import Settings from "pages/settings";
import Properties from "pages/properties";
import EditProperty from "pages/property-details/components/edit-property";
import CreateClient from "pages/client-details/components/create-client";
import ClientDetails from "pages/client-details";
import CreateProperty from "pages/property-details/components/create-property";
import PropertyDetails from "pages/property-details";

const router = [
  {
    name: "Nekretnine",
    path: "/properties/*",
    link: "/properties",
    component: () => <Properties />,
    icon: (props) => <HomeIcon {...props} />,
    subroutes: true,
    routes: [
      {
        name: "Property Details",
        path: "/properties/:propertyId",
        component: () => <PropertyDetails />,
      },
      {
        name: "New Property",
        path: "/properties/new",
        component: () => <EditProperty />,
      },
      {
        name: "New Property",
        path: "/properties/edit/:propertyId",
        component: () => <EditProperty />,
      },
      {
        name: "Prodaja",
        path: "/properties/sale/*",
        link: "/properties/sale",
        component: () => <Properties sale />,
        sidebar: true,
      },
      {
        name: "Izdavanje",
        path: "/properties/rent/*",
        link: "/properties/rent",
        component: () => <Properties rent />,
        sidebar: true,
      },
    ],
  },
  {
    name: "Klijenti",
    path: "/clients/*",
    link: "/clients",
    component: () => <Clients />,
    icon: (props) => <UsersIcon {...props} />,
    subroutes: true,
    routes: [
      {
        name: "Client Details",
        path: "/clients/:clientId",
        component: () => <ClientDetails />,
      },
      {
        name: "New Client",
        path: "/clients/new",
        component: () => <CreateClient />,
      },
      {
        name: "Edit Client",
        path: "/clients/edit/:clientId",
        component: () => <CreateClient />,
      },
      {
        name: "Prodaja",
        path: "/clients/sale/*",
        link: "/clients/sale",
        component: () => <Clients sale />,
        sidebar: true,
      },
      {
        name: "Izdavanje",
        path: "/clients/rent/*",
        link: "/clients/rent",
        component: () => <Clients rent />,
        sidebar: true,
      },
    ],
  },
  {
    name: "Opcije",
    path: "/settings/*",
    link: "/settings",
    component: () => <Settings />,
    icon: (props) => <CogIcon {...props} />,
  },
];

export default router;
