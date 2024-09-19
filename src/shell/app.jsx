import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "pages/login";
import DashboardLayout from "./layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
