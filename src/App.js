import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AllowanceForm from "./Page/Form";
import Status from "./Page/Status";
import AllowanceTable from "./Page/Table";
import UnauthenticatedUser from "./Page/Unauthentic";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import UserLayout from "./Layout/UserLayout";

const AuthenticatedRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<AllowanceForm />} />
          <Route path="form" element={<AllowanceForm />} />
          <Route path="form/:id" element={<AllowanceForm />} />
          <Route path="table" element={<AllowanceTable />} />
          <Route path="status/:id" element={<Status />} />
          <Route path="erroruser" element={<UnauthenticatedUser />} />
        </Route>
      </Routes>
    </Router>
  );
};

const UnauthenticatedRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UnauthenticatedUser />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <AuthenticatedRoutes />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <AuthenticatedRoutes />
      </UnauthenticatedTemplate>
    </>
  );
}
