import "./TrackingSystem.scss";
import { useRef, useState, useEffect } from "react";
import InputFieldSet from "../../../../Components/InputFieldSet/InputFieldSet";
import { languageElements } from "./TrackingSystem-languageElements";
import LanguageElementsHandler from "../../../../Components/repository/LanguageElementsHandler";

export default function TrackingSystem(props) {
  const [formWasValidated, setFormWasValidated] = useState(false);

  const [errors, setErrors] = useState({
    refNo: "",
    refNoType: "",
  });

  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  function showMessageShortly(codeOfMessage, typeOfAlert) {
    setFormAlertText(languageElementsHandler.get(codeOfMessage));
    setFormAlertType(typeOfAlert);
    setTimeout(() => {
      setFormAlertText("");
      setFormAlertType("");
    }, 5000);
  }

  function clearAllErrors() {
    setErrors({
      refNo: "",
      refNoType: "",
    });
  }

  const [fieldValues, setFieldValues] = useState({
    refNo: "",
    refNoType: "HBL",
  });

  const references = {
    refNo: useRef(),
    refNoType: useRef(),
  };

  const [formAlertText, setFormAlertText] = useState("");
  const [formAlertType, setFormAlertType] = useState("");

  const validators = {
    refNo: {
      required: isNotEmpty,
    },
    refNoType: {
      required: isNotEmpty,
    },
  };

  const errorTypes = {
    required: languageElementsHandler.get(`validation-required`),
  };

  function isNotEmpty(value) {
    return value !== "";
  }

  useEffect(() => {
    clearAllErrors();
  }, [props.lang]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isFormValid()) {
      window.open(
        `https://rt.yusen-logistics.com/yusenvantagefocus/anonymous;hblNo=${fieldValues.refNo}`
      );
    }
  }

  function isFormValid() {
    let isFormValid = true;
    for (const fieldName of Object.keys(fieldValues)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  function handleInputBlur(e) {
    const fieldName = e.target.name;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));

    validateField(fieldName);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const fieldName = e.target.name;
    setFieldValues({
      ...fieldValues,
      [fieldName]: value,
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
  }

  function setCustomValidity(fieldName, text) {
    const ref = references[fieldName].current;
    const classList = [...ref.classList];
    const isRadioGroup = classList.some((i) => i === "radio-group");

    if (!isRadioGroup) {
      ref.setCustomValidity(text);
    }
  }

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
    setCustomValidity(fieldName, "");

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((previousErrors) => {
              return {
                ...previousErrors,
                [fieldName]: errorText,
              };
            });
            setCustomValidity(fieldName, errorText);
          }
        }
      }
    }
    return isValid;
  }

  return (
    <div className="sel-register">
      {formAlertText && (
        <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        className={`needs-validation ${
          formWasValidated ? "was-validated" : ""
        }`}
      >
        <InputFieldSet
          reference={references["refNo"]}
          name="refNo"
          labelText={languageElementsHandler.get(`field-refNo`)}
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required={true}
        />
        <InputFieldSet
          reference={references["refNoType"]}
          name="refNoType"
          labelText={""}
          type="radio"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required={true}
          optionList={[
            { value: "HBL", text: "HBL/HAWB #" },
            { value: "CONT", text: "Container #" },
          ]}
        />
        <div className="btn-area">
          <button type="submit" className="btn btn-success">
            {languageElementsHandler.get(`btn-search`)}
          </button>
        </div>
      </form>
    </div>
  );
}
