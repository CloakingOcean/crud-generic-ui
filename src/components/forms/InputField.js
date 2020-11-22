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
    console.log("STATE VALUE");
    if (Array.isArray(stateValue)) {
      console.log(stateValue.length);
      console.log("INDEX: " + index);
      console.log(index === stateValue.length - 1);
      console.log("STATE VALUE");
      console.log(stateValue);
      console.log("SETTING IS ARRAY!");
      setIsArray(true);
    } else {
      console.log("ARRAY: FALSE");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFields, stateValue, index, showButtons]);

  function handleArrayAddElement(event) {
    // setStateFields([...stateValue].push(""));

    const updatedArray = [...stateValue];

    updatedArray.push("");

    setStateObjectProperty(stateFields, setStateFields, name, updatedArray);

    console.log("handleArrayAddElement");
  }

  function handleArrayDeleteElement(event) {
    // setStateFields(stateValue.slice(0, stateValue.length - 1));

    if (stateValue.length <= 1) {
      return;
    }

    const updatedArray = [...stateValue];
    updatedArray.pop();

    setStateObjectProperty(stateFields, setStateFields, name, updatedArray);
    console.log(stateFields);
    console.log("handleArrayDeleteElement");
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
                key={index}
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
              <div key={`${index}-buttons`} className="button-container">
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
      {!isArray && isArray !== undefined && (
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
      )}
    </>
  );
}

export default InputField;
