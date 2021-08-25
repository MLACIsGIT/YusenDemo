import "./TokenExpirationMessage.scss";
import { useState, useEffect } from "react";
import { languageElements } from "./TokenExpirationMessage-languageElements";
import LanguageElementsHandler from "../repository/LanguageElementsHandler";

export default function TokenExpirationMessage(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  const [tokenStatus, setTokenStatus] = useState("NOT VALID");

  async function onExtendValidity(e) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/extendtokenvalidity`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        token: props.loginData.getToken(),
      },
    })
      .then((data) => {
        if (data.status !== 200) {
          throw Error("invalid");
        }
        return data.json();
      })
      .then((jsonData) => {
        props.onExtendToken(jsonData.token);
      })
      .catch(() => {
        props.onLogout();
      });
  }

  useEffect(() => {
    let timerOfExpiresShortly;
    let timerOfValidity;

    let user = props.loginData?.get().user;

    if (user?.userLevel === "GUEST") {
      setTokenStatus("VALID");
      return;
    }

    if (!user) {
      setTokenStatus("NOT VALID");
    } else {
      let currentDate = new Date();
      let validUntil =
        props.loginData?.get().token.valid - currentDate.getTime();

      if (validUntil === undefined || validUntil < 2000) {
        setTokenStatus("NOT VALID");
      } else {
        let setTimerShortly = false;

        if (validUntil < 120000) {
          setTokenStatus("EXPIRES SHORTLY");
        } else {
          setTokenStatus("VALID");
          setTimerShortly = true;
        }
        timerOfValidity = setTimeout(() => {
          props.onExtendToken(null);
        }, validUntil - 5000);

        if (setTimerShortly) {
          timerOfExpiresShortly = setTimeout(() => {
            setTokenStatus("EXPIRES SHORTLY");
          }, validUntil - 120000);
        }
      }
    }

    return () => {
      if (timerOfExpiresShortly !== undefined) {
        clearTimeout(timerOfExpiresShortly);
      }

      if (timerOfValidity !== undefined) {
        clearTimeout(timerOfValidity);
      }
    };
  }, [props.loginData]);

  let message;

  if (tokenStatus === "EXPIRES SHORTLY") {
    message = (
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>
          {languageElementsHandler.get("message-expires-shortly")}
        </strong>
        <button
          type="button"
          className="btn-extend btn btn-success btn-sm"
          aria-label="Close"
          onClick={(e) => onExtendValidity(e)}
        >
          {languageElementsHandler.get("btn-extend")}
        </button>
      </div>
    );
  }

  return <div className="token-expiration-message">{message}</div>;
}
