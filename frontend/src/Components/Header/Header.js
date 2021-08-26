import './Header.scss';
import headerLogo from './headerLogo.png';
import LanguageSelector from '../LanguageSelector';
import LoggedUser from '../LoggedUser/LoggedUser';
import TokenExpirationMessage from '../TokenExpirationMessage/TokenExpirationMessage';

export default function Header(props) {
  function onLanguageChanged(newLanguage) {
    props.onLanguageChanged(newLanguage);
  }

  function onLogout() {
    props.onLogout();
  }

  return (
    <header>
      <div className="main-header">
        <div className="logo-area">
          <img className="header-logo" src={headerLogo} alt="logo" />
        </div>

        <div className="loggedUser-and-languagePicker">
          {props.loginData?.get().user && (
            <LoggedUser
              language={props.language}
              loginData={props.loginData}
              onLogout={onLogout}
            />
          )}

          <LanguageSelector
            languages={[
              { value: "en", text: "en" },
              { value: "de", text: "de" },
              { value: "hu", text: "hu" },
            ]}
            defaultLanguage={props.language}
            onLanguageChanged={(newLanguage) => {
              onLanguageChanged(newLanguage);
            }}
          />
        </div>
      </div>

      <TokenExpirationMessage
                language={props.language}
                loginData={props.loginData}
                onExtendToken={newToken => props.onExtendToken(newToken)}
                onLogout={onLogout}
            />
    </header>
  );
}
