import React from "react";
import ResourceForm from "./ResourceForm";

import "./CreateUpdateDefinition.scss";

function CreateUpdateDefinition({
  match: { params },
  resourceName,
  resourceFields,
  create,
}) {
  const [stateFields, setStateFields] = React.useState({});

  /*

  stateFields: 
  {
    fieldName1: fieldValue1,
    fieldName2: fieldValue2,
    fieldName3: fieldValue3,
    fieldName4: fieldValue4,
    fieldName5: fieldValue5
  }

  */

  const [redirect, setRedirect] = React.useState(false);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const REACT_APP_RESOURCE_API_BASE_URL = process.env.REACT_APP_RESOURCE_API_BASE_URL.replace(
    "<resource>",
    // Perhaps in the future, will add functionality for resources that have differeing plural words
    resourceName.toLowerCase() + "s"
  );

  React.useEffect(() => {
    if (!create) {
      handlePopulation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePopulation() {
    let url;
    if (!create) {
      url = `${REACT_APP_API_URL}${REACT_APP_RESOURCE_API_BASE_URL}/${params.id}`;
    } else {
      url = `${REACT_APP_API_URL}${REACT_APP_RESOURCE_API_BASE_URL}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { __v, _id, ...prunedData } = data;

        console.log("DATA");
        console.log(prunedData);
        setStateFields(prunedData);
      });
  }

  return (
    <main>
      <ResourceForm
        resourceName={resourceName}
        resourceFields={resourceFields}
        stateFields={stateFields}
        setStateFields={setStateFields}
        redirect={redirect}
        setRedirect={setRedirect}
        params={params}
        create={create}
      />
    </main>
  );
}

export default CreateUpdateDefinition;
