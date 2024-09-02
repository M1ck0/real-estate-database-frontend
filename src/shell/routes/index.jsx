import React from "react";

import Dashboard from "pages/dashboard";

const router = [
  {
    name: "Dashboard",
    path: "/",
    component: () => <Dashboard />,
  },
];

export default router;
