import React from "react";

import createFragment from "react-addons-create-fragment";

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
  setStateFunc,
  inputType,
  stateFields,
  onChange = (e) => {
    setStateFunc(e.target.value);
  },
}) {
  const [isArray, setIsArray] = React.useState(false);

  React.useEffect(() => {
    console.log("State Fields");
    console.log(stateFields);

    console.log("STATE VALUE: " + stateValue);
    if (Array.isArray(stateValue)) {
      setIsArray(true);
    } else {
      console.log("ARRAY: FALSE");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFields, stateValue]);

  function handleArrayAddElement(event) {}

  function handleArrayDeleteElement(event) {}

  return (
    <>
      {isArray && isArray !== undefined && <Label htmlFor={name}>{name}</Label>}
      {isArray &&
        isArray !== undefined &&
        stateValue.map((resource, index) => {
          return createFragment({
            input: (
              <input
                id={name}
                key={index}
                value={resource}
                name={name}
                type={inputType}
                className="form-multi-input"
                onChange={(event) => {
                  onChange(event, index);
                }}
                data-form-group={name}
              />
            ),
            buttonContainer: (
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
            ),
          });
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
