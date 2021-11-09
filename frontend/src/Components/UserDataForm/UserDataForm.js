import './UserDataForm.scss';
import { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import InputFieldSet from '../InputFieldSet/InputFieldSet';
import { languageElements } from './UserDataForm-languageElements';
import LanguageElementsHandler from '../repository/LanguageElementsHandler';
import validator from 'validator';

export default function UserDataForm(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [dataStatus, setDataStatus] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    emailAnnouncementsAccepted: '',
    newsletterAccepted: '',
  });

  function showMessageShortly(codeOfMessage, typeOfAlert) {
    setFormAlertText(languageElementsHandler.get(codeOfMessage));
    setFormAlertType(typeOfAlert);
    setTimeout(() => {
      setFormAlertText('');
      setFormAlertType('');
    }, 5000);
  }

  function clearAllErrors() {
    setErrors({
      name: '',
      email: '',
      emailAnnouncementsAccepted: '',
      newsletterAccepted: '',
    });
  }

  const [fieldValues, setFieldValues] = useState({
    name: '',
    email: '',
    emailAnnouncementsAccepted: '',
    newsletterAccepted: '',
  });

  const references = {
    name: useRef(),
    email: useRef(),
    emailAnnouncementsAccepted: useRef(),
    newsletterAccepted: useRef(),
  };

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  const validators = {
    name: {
      required: isNotEmpty,
    },

    email: {
      required: isNotEmpty,
      validEmail: isValidEmail,
    },

    emailAnnouncementsAccepted: {},
    newsletterAccepted: {},
  };

  const errorTypes = {
    required: languageElementsHandler.get('validation-required'),
    chkboxChecked: languageElementsHandler.get('validation-chkboxChecked'),
    validEmail: languageElementsHandler.get('validation-validEmail'),
    passwordStrongEnough: languageElementsHandler.get(
      'validation-passwordStrongEnough'
    ),
    passwordAndPasswordAgainSame: languageElementsHandler.get(
      'validation-passwordAndPasswordAgainSame'
    ),
  };

  function isNotEmpty(value) {
    return value;
  }

  function isValidEmail(value) {
    return validator.isEmail(value);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/get`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'token': props.loginData.getToken(),
      },
    })
      .then((data) => {
        if (data.status !== 200) {
          setDataStatus('invalid');
          const error = new Error('invalid');
          error.status = data.status;
          throw error;
        }
        return data.json();
      })
      .then((jsonData) => {
        setDataStatus('valid');
        setFieldValues({
          name: jsonData.name,
          email: jsonData.email,
          emailAnnouncementsAccepted: jsonData.emailAnnouncementsAccepted,
          newsletterAccepted: jsonData.newsletterAccepted,
        });
      })
      .catch((error) => {
        if (error.message === 'Failed to fetch') {
          setDataStatus('no-response');
        }
      });
  }, []);

  useEffect(() => {
    clearAllErrors();
  }, [props.language]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid()) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/put`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'token': props.loginData.getToken(),
        },
        body: JSON.stringify({
          name: fieldValues.name,
          email: fieldValues.email,
          emailAnnouncementsAccepted: fieldValues.emailAnnouncementsAccepted
            ? true
            : false,
          newsletterAccepted: fieldValues.newsletterAccepted ? true : false,
        }),
      })
        .then((data) => {
          if (data.status !== 200) {
            throw new Error('result-nok');
          }
          showMessageShortly('result-ok', 'success');

          return data.json();
        })
        .catch((error) => {
          showMessageShortly(
            error.message === 'result-nok' ? error.message : 'result-no-response',
            'danger'
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
      [fieldName]: '',
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
      [fieldName]: '',
    }));
  }

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: '',
    }));
    references[fieldName].current.setCustomValidity('');

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

  if (!props.loginData) {
    return <Redirect to='/' />;
  }

  return (
    <div className='userData-form'>
      {!dataStatus && (
        <div className={`alert mt-3 alert-info`} role='alert'>
          {languageElementsHandler.get('info-waiting-for-server')}
        </div>
      )}
      {dataStatus === 'no-response' && (
        <div className={`alert mt-3 alert-danger`} role='alert'>
          {languageElementsHandler.get('no-response')}
        </div>
      )}
      {dataStatus === 'invalid' && (
        <div className={`alert mt-3 alert-danger`} role='alert'>
          {languageElementsHandler.get('dataStatus-invalid')}
        </div>
      )}
      {formAlertText && (
        <div className={`alert mt-3 alert-${formAlertType}`} role='alert'>
          {formAlertText}
        </div>
      )}
      {dataStatus === 'valid' && (
        <form
          onSubmit={handleSubmit}
          noValidate={true}
          className={`needs-validation ${
            formWasValidated ? 'was-validated' : ''
          }`}
        >
          <InputFieldSet
            reference={references['name']}
            name='name'
            labelText={languageElementsHandler.get(`field-name`)}
            type='text'
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references['email']}
            name='email'
            labelText={languageElementsHandler.get(`field-email`)}
            type='email'
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references['emailAnnouncementsAccepted']}
            name='emailAnnouncementsAccepted'
            labelText={languageElementsHandler.get(
              `field-emailAnnouncementsAccepted`
            )}
            type='checkbox'
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references['newsletterAccepted']}
            name='newsletterAccepted'
            labelText={languageElementsHandler.get(`field-newsletterAccepted`)}
            type='checkbox'
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <div className='btn-area'>
            <button type='submit' className='btn btn-success'>
              {languageElementsHandler.get(`btn-submit`)}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
