import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import PageGreeting from './Pages/Greeting/PageGreeting';
import PageFirstLogin from './Pages/FirstLogin/PageFirstLogin';
import PageDismissRegistration from './Pages/DismissRegistration/PageDismissRegistration';
import PageLogin from './Pages/Login/PageLogin';
import PageContact from './Pages/Contact/PageContact';
import PageContactVienna from './Pages/Contact/ContactVienna/PageContactVienna';
import PageContactBudapest from './Pages/Contact/ContactBudapest/PageContactBudapest';
import PageContactKoper from './Pages/Contact/ContactKoper/PageContactKoper';
import PageHome from './Pages/Home/PageHome';
import PageInvoices from './Pages/Invoices/PageInvoices';
import PageStocks from './Pages/Stocks/PageStocks';
import PageSettings from './Pages/Settings/PageSettings';
import PageDeliveries from './Pages/Deliveries/PageDeliveries';
import LoginData from './Components/repository/LoginData';

function App() {
  const [language, setLanguage] = useState('en');
  const [loginData, setLoginData] = useState(null);

  function onLanguageChanged(newLanguage) {
    setLanguage(newLanguage);
  }

  function onLogout() {
    setLoginData(null);
  }

  function onExtendToken(newToken) {
    if (!newToken) {
      onLogout();
      return;
    }
    let newLogin = new LoginData(newToken);
    setLoginData(newLogin);
  }

  function onLogin(newLoginData) {
    setLoginData(newLoginData);
  }

  return (
    <div className='App'>
      <Router>
        <Header
          language={language}
          onLanguageChanged={(newLanguage) => onLanguageChanged(newLanguage)}
          loginData={loginData}
          onExtendToken={(newToken) => onExtendToken(newToken)}
          onLogout={onLogout}
        />

        <Switch>
          <Route exact path='/'>
            <PageGreeting language={language} />
          </Route>

          <Route path='/dismissregistration/:token'>
            <PageDismissRegistration
            language={language}
            />
          </Route>

          <Route path='/firstlogin/:token'>
            <PageFirstLogin
              language={language}
              loginData={loginData}
              onLogin={(newLoginData) => onLogin(newLoginData)}
            />
          </Route>

          <Route exact path='/login'>
            <PageLogin
              language={language}
              loginData={loginData}
              onLogin={(newLoginData) => onLogin(newLoginData)}
            />
          </Route>

          <Route exact path='/home'>
            <PageHome
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route exact path='/invoices'>
            <PageInvoices
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route exact path='/stocks'>
            <PageStocks
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route exact path='/tracking'>
            <PageDeliveries
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route exact path='/settings'>
            <PageSettings
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route exact path='/contact'>
            <PageContact
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route exact path='/contact/vienna'>
            <PageContactVienna
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route exact path='/contact/budapest'>
            <PageContactBudapest
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route exact path='/contact/koper'>
            <PageContactKoper
              language={language}
              loginData={loginData}
              onLogout={onLogout}
            />
          </Route>

          <Route path='*'>
            <PageGreeting language={language} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
