import React from "react";

import { Redirect, Link } from "react-router-dom";
import InputField from "./InputField";

import { Form, Button } from "reactstrap";

function ResourceForm({
  term,
  setTerm,
  definition,
  setDefinition,
  redirect,
  setRedirect,
  params,
  resourceName,
  resourceFields,
  create,
}) {
  const [backHome, setBackHome] = React.useState(false);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  function onSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("resource-form");

    const bodyObj = {};

    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      if (!input.hasAttribute("data-form-group")) {
        bodyObj[input.name] = input.value;
        return;
      }

      if (input.name in bodyObj) {
        const formGroup = bodyObj[input.name];
        formGroup.push(input.value);
        bodyObj[input.name] = formGroup;
      } else {
        const newFormGroup = [input.value];
        bodyObj[input.name] = newFormGroup;
      }
    });

    let url;

    if (!create) {
      url = `${REACT_APP_API_URL}/api/definitions/${params.id}`;
    } else {
      url = `${REACT_APP_API_URL}/api/definitions/`;
    }

    if (!create) {
      console.log("SENDING WITH PUT!");
    } else {
      console.log("SENDING WITH CREATE");
    }

    fetch(url, {
      method: create ? "POST" : "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    });

    setRedirect(true);
  }

  return (
    <>
      <Form id="resource-form" onSubmit={onSubmit}>
        <InputField
          name="term"
          stateValue={term}
          setStateFunc={setTerm}
          inputType="text"
        />
        <InputField
          name="definition"
          stateValue={definition}
          setStateFunc={setDefinition}
          inputType="text"
        />
        <Button
          color="primary"
          type="submit"
          className="submit-button"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Form>
      <Link to="/">
        <Button
          onClick={() => {
            setBackHome(true);
          }}
        >
          Back To Home Page
        </Button>
      </Link>
      {backHome && <Redirect to="/" push />}
      {redirect && <Redirect to="/" push />}
    </>
  );
}

export default ResourceForm;
