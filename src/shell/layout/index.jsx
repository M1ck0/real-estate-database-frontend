import React from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/header";

import routes from "shell/routes";

import "./layout.css";
import Sidebar from "shell/layout/components/sidebar";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Sidebar>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
                exact
              />
            );
          })}
        </Routes>
      </Sidebar>
    </div>
  );
};

export default Layout;
