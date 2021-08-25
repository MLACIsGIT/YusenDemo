import './FirstLoginForm.scss';
import { useRef, useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import InputFieldSet from '../InputFieldSet/InputFieldSet';
import { languageElements } from './FirstLoginForm-languageElements';
import LanguageElementsHandler from '../repository/LanguageElementsHandler';
import validator from 'validator';
import LoginData from '../repository/LoginData';

export default function FirstLoginForm(props) {
  let { token } = useParams();

  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [dataStatus, setDataStatus] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordAgain: '',
    gdprAccepted: '',
    termsOfServiceAccepted: '',
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
      password: '',
      passwordAgain: '',
      gdprAccepted: '',
      termsOfServiceAccepted: '',
      emailAnnouncementsAccepted: '',
      newsletterAccepted: '',
    });
  }

  const [fieldValues, setFieldValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordAgain: '',
    gdprAccepted: '',
    termsOfServiceAccepted: '',
    emailAnnouncementsAccepted: '',
    newsletterAccepted: '',
  });

  const references = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
    passwordAgain: useRef(),
    gdprAccepted: useRef(),
    termsOfServiceAccepted: useRef(),
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

    password: {
      required: isNotEmpty,
      passwordStrongEnough: isPasswordStrongEnough,
    },

    passwordAgain: {
      required: isNotEmpty,
      passwordAndPasswordAgainSame: isPasswordAndPasswordAgainSame,
    },

    gdprAccepted: {
      chkboxChecked: isNotEmpty,
    },

    termsOfServiceAccepted: {
      chkboxChecked: isNotEmpty,
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

  function isPasswordStrongEnough(value) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
      value
    );
  }

  function isPasswordAndPasswordAgainSame(value) {
    if (fieldValues['password'] && fieldValues['passwordAgain']) {
      return fieldValues['password'] === fieldValues['passwordAgain'];
    }
  }

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
        token,
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
          password: '',
          passwordAgain: '',
          gdprAccepted: jsonData.gdprAccepted,
          termsOfServiceAccepted: jsonData.termsOfServiceAccepted,
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
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/putandlogin`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          name: fieldValues.name,
          email: fieldValues.email,
          password: fieldValues.password,
          status: 'ACCEPTED',
          gdprAccepted: fieldValues.gdprAccepted ? true : false,
          termsOfServiceAccepted: fieldValues.termsOfServiceAccepted
            ? true
            : false,

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
          return data.json();
        })
        .then((jsonData) => {
          let newLogin = new LoginData(jsonData.token);
          props.onLogin(newLogin);
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

  if (!token) {
    return <Redirect to='/' />;
  }

  return (
    <div className='firstLogin-form'>
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
            reference={references['password']}
            name='password'
            labelText={languageElementsHandler.get(`field-password`)}
            explanationText={languageElementsHandler.get(
              'field-password-explanation'
            )}
            type='password'
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references['passwordAgain']}
            name='passwordAgain'
            labelText={languageElementsHandler.get(`field-passwordAgain`)}
            type='password'
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references['gdprAccepted']}
            name='gdprAccepted'
            labelText={languageElementsHandler.get(`field-gdprAccepted`)}
            link={
              'https://www.mediastart.hu/gdpr-iratmintak-es-adatkezeles-erthetoen/'
            }
            linkText={languageElementsHandler.get(
              'field-gdprAccepted-link-text'
            )}
            type='checkbox'
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />
          <InputFieldSet
            reference={references['termsOfServiceAccepted']}
            name='termsOfServiceAccepted'
            labelText={languageElementsHandler.get(
              `field-termsOfServiceAccepted`
            )}
            link={
              'https://webshippy.com/wp-content/uploads/webshop-ingyenes-ASZF-minta.pdf'
            }
            linkText={languageElementsHandler.get(
              'field-termsOfServiceAccepted-link-text'
            )}
            type='checkbox'
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
              {languageElementsHandler.get(`btn-login`)}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
