import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/layout/Layout";

const NotLoggedInRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const LoggedInRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="contracts" element={<div>Contracts</div>} />
        <Route path="logs" element={<div>Logs</div>} />
        <Route path="invoices" element={<div>Invoices</div>} />
        <Route path="companies" element={<div>Companies</div>} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        {localStorage.getItem("token") ? (
          <LoggedInRoutes />
        ) : (
          <NotLoggedInRoutes />
        )}
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
