import React from "react";

import DeleteButton from "../components/DeleteButton";

import { Link } from "react-router-dom";

import { Button } from "reactstrap";

import {
  setStateObjectProperty,
  deleteItemFromStateArrayByMongoId,
} from "cloak-state-util";

import { kebabToPascalCaseWithSpaces } from "../components/utils/StringStyleConverion";

import "./Index.scss";

function Index({ resourceName, resourceFields }) {
  const [resources, setResources] = React.useState();

  const [maxColumnLengths, setMaxColumnLengths] = React.useState({});
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const RESOURCE_API_BASE_URL = process.env.RESOURCE_API_BASE_URL.replace(
    "<resource>",
    resourceName.toLowerCase();
  );

  /* 

    Contains the maximum length of grouped categories.
    This allows us to correctly layout the table.

    {
        artists: 3
        supporters: 4
    }

  */

  React.useEffect(async function () {
    const url = `${REACT_APP_API_URL}${RESOURCE_API_BASE_URL}`;

    const response = await fetch(url);
    const data = await response.json();
    if (definitions === undefined && data[0]) {
      setDefinitions(data);

      Object.keys(data[0])
        .filter((field) => Array.isArray(data[0][field]))
        .forEach((field) => {
          let maxFieldLength = 0;

          data.forEach((definition) => {
            if (definition[field].length > maxFieldLength) {
              maxFieldLength = definition[field].length;
            }
          });

          setStateObjectProperty(
            maxColumnLengths,
            setMaxColumnLengths,
            field,
            maxFieldLength
          );
        });
    }
  }, []);

  function updateDelete(id) {
    console.log("CALLED");
    console.log(definitions);
    deleteItemFromStateArrayByMongoId(definitions, setDefinitions, id);
  }

  const fieldsObj = {};
  fieldsObj.header = [];
  fieldsObj.inputs = [];

  resourceFields.map((resourceField) => {
    fieldsObj.header.push(handleFieldHeaders(resourceField));
    fieldsObj.inputs.push(handleFieldInputs(resourceFields));
  });

  function handleFieldHeaders(resourceField) {
    return <th>{kebabToPascalCaseWithSpaces(resourceField.name)}</th>;
  }

  function handleFieldInputs(resource) {
    return <td>{definition.term}</td>;
  }

  return (
    <main>
      <table>
        <thead>
          <tr>{fieldsObj.header}</tr>
        </thead>
        <tbody>
          {definitions !== undefined &&
            definitions.map((definition) => {
              return (
                <tr key={definition._id}>
                  <td>{definition.term}</td>
                  <td>{definition.definition}</td>
                  <td>
                    <Link
                      to={`/api/definitions/updateDefinition/${encodeURI(
                        definition._id
                      )}`}
                    >
                      <Button color="primary">Update</Button>
                    </Link>
                  </td>
                  <td>
                    <DeleteButton
                      definitionProp={definition}
                      updateDelete={updateDelete}
                      resourceName={resourceName}
                      resourceFields={resourceFields}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Link to="api/definitions/createDefinition">
        <Button color="success">Create Definition</Button>
      </Link>
    </main>
  );
}

export default Index;
