import React from "react";

import createFragment from "react-addons-create-fragment";

import { setStateObjectProperty } from "cloak-state-util";

import { Label, Button } from "reactstrap";
/**
 * Props:
 * name: The name of the input field.
 * stateValue: The state for this particular value
 * setStateFunc: The function that updates the state for this particular value
 * inputType: The input type for this particular value
 * onChange: The function to call when the input is changed
 */

function InputField({
  name,
  stateValue,
  stateFields,
  setStateFields,
  inputType,
  index,
  onArrayChange = (e, index) => {
    const updatedArray = [...stateValue];
    updatedArray[index] = e.target.value;
    setStateObjectProperty(stateFields, setStateFields, name, updatedArray);
  },
  onChange = (e) => {
    setStateObjectProperty(stateFields, setStateFields, name, e.target.value);
  },
}) {
  const [isArray, setIsArray] = React.useState(false);
  const [showButtons, setShowButtons] = React.useState(true);

  React.useEffect(() => {
    if (Array.isArray(stateValue)) {
      setIsArray(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFields, stateValue, index, showButtons]);

  function handleArrayAddElement(event) {
    // setStateFields([...stateValue].push(""));

    const updatedArray = [...stateValue];

    updatedArray.push("");

    setStateObjectProperty(stateFields, setStateFields, name, updatedArray);
  }

  function handleArrayDeleteElement(event) {
    // setStateFields(stateValue.slice(0, stateValue.length - 1));

    if (stateValue.length <= 1) {
      return;
    }

    const updatedArray = [...stateValue];
    updatedArray.pop();

    setStateObjectProperty(stateFields, setStateFields, name, updatedArray);
  }

  return (
    <>
      {isArray && isArray !== undefined && <Label htmlFor={name}>{name}</Label>}
      {isArray &&
        isArray !== undefined &&
        stateValue.map((resource, index) => {
          const fragmentObject = {
            input: (
              <input
                id={name}
                key={`${resource}-${index}-input`}
                value={resource}
                name={name}
                type={inputType}
                className="form-multi-input"
                onChange={(event) => {
                  onArrayChange(event, index);
                }}
                data-form-group={name}
              />
            ),
          };

          if (index === stateValue.length - 1) {
            fragmentObject.buttonContainer = (
              <div
                key={`${resource._id}-${index}-buttons`}
                className="button-container"
              >
                <Button
                  color="success"
                  type="button"
                  onClick={handleArrayAddElement}
                >
                  Add
                </Button>
                <Button
                  color="danger"
                  type="button"
                  onClick={handleArrayDeleteElement}
                >
                  Delete
                </Button>
              </div>
            );
          }

          return createFragment(fragmentObject);
        })}
      {/* {!isArray && isArray !== undefined && (
        <>
          {createFragment({
            label: (
              <Label key={`${name}-label`} htmlFor={name}>
                {name}
              </Label>
            ),
            input: (
              <input
                id={name}
                key={`${name}-input`}
                value={stateValue}
                name={name}
                type={inputType}
                onChange={onChange}
              />
            ),
          })}
        </>
      )} */}
    </>
  );
}

export default InputField;
