import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "pages/login";
import DashboardLayout from "./layout";

import "react-datepicker/dist/react-datepicker.css";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="*" element={<DashboardLayout />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
