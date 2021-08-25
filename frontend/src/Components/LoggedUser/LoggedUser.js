import './LoggedUser.scss';
import { languageElements } from './LoggedUser-languageElements';
import LanguageElementsHandler from '../repository/LanguageElementsHandler';

export default function LoggedUser(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  function onLogout() {
      props.onLogout();
  }

  return (
    <div id="LoggedUser" className="btn btn-success" onClick={onLogout}>
      <div id="LoggedUser-user-icon"></div>
      {languageElementsHandler.get("div-LoggedUser")}
      <span>{props.loginData?.get().user.email}</span>
    </div>
  );
}
