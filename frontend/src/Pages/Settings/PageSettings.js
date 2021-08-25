import { Redirect } from 'react-router-dom';
import './PageSettings.scss';
import HeaderLine from '../../Components/HeaderLine/HeaderLine';
import FormBorder from '../../Components/FormBorder/FormBorder';
import UserDataForm from '../../Components/UserDataForm/UserDataForm';
import { languageElements } from './PageSettings-languageElements';
import LanguageElementsHandler from '../../Components/repository/LanguageElementsHandler';

export default function PageSettings(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  if (!props.loginData) {
    return <Redirect to='/' />;
  }

  let regForm = (
    <>
      <h1>{languageElementsHandler.get('form-title')}</h1>
      <UserDataForm language={props.language} loginData={props.loginData} />
    </>
  );

  return (
    <div className='page-settings'>
      <HeaderLine
        language={props.language}
        selectedPage={'settings'}
        loginData={props.loginData}
      />
      <main className='page-settings-main'>
        <div className='page-settings-form'>
          <FormBorder language={props.language} form={regForm} />
        </div>
      </main>
    </div>
  );
}
