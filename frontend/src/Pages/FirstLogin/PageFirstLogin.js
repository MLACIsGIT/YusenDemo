import { Redirect } from 'react-router-dom';
import './PageFirstLogin.scss';
import HeaderLine from '../../Components/HeaderLine/HeaderLine';
import FormBorder from '../../Components/FormBorder/FormBorder';
import FirstLoginForm from '../../Components/FirstLoginForm/FirstLoginForm';
import { languageElements } from './PageFirstLogin-languageElements';
import LanguageElementsHandler from '../../Components/repository/LanguageElementsHandler';

export default function PageFirstLogin(props) {
    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        props.language
      );

    if (props.loginData) {
        return <Redirect to='/home' />
    }

    function onLogin(newLoginData) {
        props.onLogin(newLoginData)
    }

    let regForm = <>
        <h1>{languageElementsHandler.get('form-title')}</h1>
        <FirstLoginForm
            language={props.language}
            onLogin={(newLoginData) => onLogin(newLoginData)}
            />
    </>

    return (
        <div className='page-firstLogin'>
            <HeaderLine
                language={props.language}
                selectedPage={'firstLogin'}
                loginData={props.loginData}
            />
            <main className='page-firstLogin-main'>
                <div className='page-firstLogin-form'>
                    <FormBorder
                        language={props.language}
                        form={regForm}
                    />
                </div>
            </main>
        </div>)
}
