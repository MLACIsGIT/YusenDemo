import "./NewsEditForm.scss";
import { useRef, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import InputFieldSet from "../InputFieldSet/InputFieldSet";
import { languageElements } from "./NewsEditForm-languageElements";
import LanguageElementsHandler from "../repository/LanguageElementsHandler";
import validator from "validator";
import LoginData from "../repository/LoginData";

export default function NewsEditForm(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [dataStatus, setDataStatus] = useState("valid");

  const [errors, setErrors] = useState({
    title: "",
    shortDescription: "",
    date: "",
    expireDate: "",
    language: "",
    linkToArticle: "",
  });

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
      title: "",
      shortDescription: "",
      date: "",
      expireDate: "",
      language: "",
      linkToArticle: "",
    });
  }

  const [fieldValues, setFieldValues] = useState({
    title: "",
    shortDescription: "",
    date: "",
    expireDate: "",
    language: "",
    linkToArticle: "",
  });

  const references = {
    title: useRef(),
    shortDescription: useRef(),
    date: useRef(),
    expireDate: useRef(),
    language: useRef(),
    linkToArticle: useRef(),
  };

  const [formAlertText, setFormAlertText] = useState("");
  const [formAlertType, setFormAlertType] = useState("");

  const validators = {
    title: {
      required: isNotEmpty,
    },
    shortDescription: {
      required: isNotEmpty,
    },
    date: {
      required: isNotEmpty,
    },
    expireDate: {
      required: isNotEmpty,
    },
    language: {
      required: isNotEmpty,
    },
    linkToArticle: {
      required: isNotEmpty,
      validURL: isValidURL,
    },
  };

  const errorTypes = {
    required: languageElementsHandler.get("validation-required"),
    validURL: languageElementsHandler.get("validation-validURL"),
  };

  function isNotEmpty(value) {
    return value;
  }

  function isValidURL(value) {
    return validator.isURL(value);
  }

  useEffect(() => {
    if (props.newsId) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/news/get`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          token: props.loginData.getToken(),
          id: props.newsId,
        },
      })
        .then((data) => {
          if (data.status !== 200) {
            setDataStatus("invalid");
            const error = new Error("invalid");
            error.status = data.status;
            throw error;
          }
          return data.json();
        })
        .then((jsonData) => {
          setDataStatus("valid");
          setFieldValues({
            title: jsonData.title,
            shortDescription: jsonData.shortDescription,
            date: jsonData.date,
            expireDate: jsonData.expireDate,
            language: jsonData.language,
            linkToArticle: jsonData.linkToArticle,
          });
        })
        .catch((error) => {
          if (error.message === "Failed to fetch") {
            setDataStatus("no-response");
          }
        });
    }
  }, []);

  useEffect(() => {
    clearAllErrors();
  }, [props.language]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid()) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/news/put`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          token: props.loginData.getToken(),
          id: props.newsId,
        },
        body: JSON.stringify({
          title: fieldValues.title,
          shortDescription: fieldValues.shortDescription,
          date: fieldValues.date,
          expireDate: fieldValues.expireDate,
          language: fieldValues.language,
          linkToArticle: fieldValues.linkToArticle,
        }),
      })
        .then((data) => {
          if (data.status !== 200) {
            throw new Error("result-nok");
          }
          props.onSubmit();
        })
        .catch((error) => {
          showMessageShortly(
            error.message === "result-nok"
              ? error.message
              : "result-no-response",
            "danger"
          );
        });
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

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));
    references[fieldName].current.setCustomValidity("");

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
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  if (!props.loginData?.getToken()) {
    return <Redirect to="/" />;
  }

  return (
    <div className="newsEditForm-form">
      <h3>NewsEditForm {dataStatus}</h3>
      {!dataStatus && (
        <div className={`alert mt-3 alert-info`} role="alert">
          {languageElementsHandler.get("info-waiting-for-server")}
        </div>
      )}
      {dataStatus === "no-response" && (
        <div className={`alert mt-3 alert-danger`} role="alert">
          {languageElementsHandler.get("no-response")}
        </div>
      )}
      {dataStatus === "invalid" && (
        <div className={`alert mt-3 alert-danger`} role="alert">
          {languageElementsHandler.get("dataStatus-invalid")}
        </div>
      )}
      {formAlertText && (
        <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
      {dataStatus === "valid" && (
        <form
          onSubmit={handleSubmit}
          noValidate={true}
          className={`needs-validation ${
            formWasValidated ? "was-validated" : ""
          }`}
        >
          <InputFieldSet
            reference={references["title"]}
            name="title"
            labelText={languageElementsHandler.get(`field-title`)}
            type="text"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references["shortDescription"]}
            name="shortDescription"
            labelText={languageElementsHandler.get(`field-shortDescription`)}
            type="textarea"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references["date"]}
            name="date"
            labelText={languageElementsHandler.get(`field-date`)}
            type="date"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references["expireDate"]}
            name="expireDate"
            labelText={languageElementsHandler.get(`field-expireDate`)}
            type="date"
            explanationText={languageElementsHandler.get(
              "field-expireDate-explanation"
            )}
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references["language"]}
            name="language"
            labelText={languageElementsHandler.get(`field-language`)}
            type="select"
            errors={errors}
            fieldValues={fieldValues}
            optionList={[
              { value: "", text: "" },
              { value: "hu", text: "hu" },
              { value: "de", text: "de" },
              { value: "en", text: "en" },
            ]}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references["linkToArticle"]}
            name="linkToArticle"
            labelText={languageElementsHandler.get(`field-linkToArticle`)}
            type="text"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <div className="btn-area">
            <button type="submit" className="btn btn-success">
              {languageElementsHandler.get(`btn-login`)}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
