import React from "react";

import Header from "../header/Header";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from "../../containers/Index";
import CreateUpdateDefinition from "../../components/forms/CreateUpdateDefinition";

function MainSwitch({ resourceName, resourceFields }) {
  return (
    <Router>
      <Route path="/" component={Header} />

      <Route
        exact
        path="/"
        render={(props) => {
          return (
            <Index
              {...props}
              resourceName={resourceName}
              resourceFields={resourceFields}
            />
          );
        }}
      />

      <Route
        path="/api/definitions/createDefinition"
        render={(props) => {
          return (
            <CreateUpdateDefinition
              {...props}
              resourceName={resourceName}
              resourceFields={resourceFields}
              create={true}
            />
          );
        }}
      />

      <Route
        path="/api/definitions/updateDefinition/:id"
        render={(props) => {
          return (
            <CreateUpdateDefinition
              {...props}
              resourceName={resourceName}
              resourceFields={resourceFields}
              create={false}
            />
          );
        }}
      />
    </Router>
  );
}

export default MainSwitch;
