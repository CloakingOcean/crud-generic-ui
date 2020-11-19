import React from "react";
import ResourceForm from "./ResourceForm";

import "./CreateUpdateDefinition.scss";

function CreateUpdateDefinition({
  match: { params },
  resourceName,
  resourceFields,
  create,
}) {
  const [term, setTerm] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const setMethods = {
    setTerm,
    setDefinition,
    setRedirect,
  };

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    if (!create) {
      handlePopulation();
    }
  }, []);

  async function handlePopulation() {
    let url;
    if (!create) {
      url = `${REACT_APP_API_URL}/api/definitions/${params.id}`;
    } else {
      url = `${REACT_APP_API_URL}/api/definitions/`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const form = document.getElementById("resource-form");

        Object.keys(data)
          .filter((field) => field !== "_id" && field !== "__v")
          .forEach((field) => {
            let computedName = field;

            if (field.includes("-")) {
              computedName = kebabToCamelCase(field);
            }

            const firstCapLetter = computedName.charAt(0).toUpperCase();
            const rest = computedName.slice(1);

            computedName = `set${firstCapLetter}${rest}`;

            console.log(computedName);

            setMethods[computedName](data[field]);
          });
      });
  }

  function kebabToCamelCase(string) {
    return string.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  }

  return (
    <main>
      <ResourceForm
        resourceName={resourceName}
        resourceFields={resourceFields}
        term={term}
        setTerm={setTerm}
        definition={definition}
        setDefinition={setDefinition}
        redirect={redirect}
        setRedirect={setRedirect}
        params={params}
        create={create}
      />
    </main>
  );
}

export default CreateUpdateDefinition;
