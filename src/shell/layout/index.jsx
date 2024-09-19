import React from "react";

import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar";

import routes from "shell/routes";

import "./layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar routes={routes}>
        <Routes>
          {routes?.map((route) => {
            return (
              <>
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                  exact
                />
                {route?.routes?.map((subRoute) => (
                  <Route
                    key={subRoute.path}
                    path={subRoute.path}
                    element={<subRoute.component />}
                    exact
                  />
                ))}
              </>
            );
          })}
        </Routes>
      </Sidebar>
    </div>
  );
};

export default Layout;
