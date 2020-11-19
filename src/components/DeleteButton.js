import React from "react";
import "./DeleteButton.scss";

import { Button } from "reactstrap";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function DeleteButton({ definitionProp, updateDelete, resources }) {
  const [definition, setDefinition] = React.useState();

  React.useEffect(() => {
    setDefinition(definitionProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOnClick(event) {
    event.preventDefault();

    const confirmResult = window.confirm(
      "Are you sure you want to delete this definition?",
      false
    );

    if (!confirmResult) {
      return;
    }

    fetch(`${REACT_APP_API_URL}/api/definitions/${definition._id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        updateDelete(definition._id);
      });
  }

  return (
    <Button color="danger" onClick={handleOnClick}>
      Delete
    </Button>
  );
}

export default DeleteButton;
