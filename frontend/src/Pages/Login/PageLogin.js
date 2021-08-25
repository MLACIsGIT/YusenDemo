import "./PageLogin.scss";
import { Redirect } from 'react-router-dom';
import HeaderLine from '../../Components/HeaderLine/HeaderLine';
import Infobox from '../../Components/Infobox/Infobox';
import LoginForm from '../../Components/LoginForm/LoginForm';

export default function PageLogin(props) {
    function onLogin(newLoginData) {
        props.onLogin(newLoginData)
    }

    if (props.loginData) {
        return <Redirect to='/home' />
    }

    const infobox =
        <LoginForm
            language={props.language}
            settings={props.settings}
            loginData={props.loginData}
            onLogin={newLoginData => onLogin(newLoginData)}
        />

    return (
        <div className="page-login">
            <HeaderLine
                language={props.language}
                selectedPage={"login"}
                loginData={props.loginData}
            />

            <main>
                <Infobox
                    left={"150px"}
                    top={"50px"}
                    info={infobox}
                />
            </main>
        </div>
    )
}
