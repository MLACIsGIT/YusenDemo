import './PageGreeting.scss';
import { Link } from 'react-router-dom';
import HeaderLine from '../../Components/HeaderLine/HeaderLine'
import Infobox from '../../Components/Infobox/Infobox';
import { languageElements } from './PageGreeting-languageElements'
import LanguageElementsHandler from '../../Components/repository/LanguageElementsHandler';

export default function PageGreeting(props) {
    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        props.language
      );

    const infobox = <>
        <div className="header-area">
        <h4>{languageElementsHandler.get("greeting-header")}</h4>
        </div>
        <br />
        <div className="infoText-area">
            <h6>{languageElementsHandler.get("greeting-p-01")}</h6>
        </div>
        <div className="input-field-area">
            <Link to={"/login"} className="btn btn-primary">{languageElementsHandler.get("btn-login")}</Link>
        </div>
    </>

    return (
        <div className="page-greeting">
            <HeaderLine
                language={props.language}
                selectedPage={"greeting"}
                loginData={props.loginData}
            />
            <main className="page-greeting-main">
                <Infobox
                    left={"150px"}
                    top={"50px"}
                    info={infobox}
                />
            </main>
        </div>)
}