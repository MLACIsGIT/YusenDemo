import { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import "./PageDismissRegistration.scss";
import HeaderLine from "../../Components/HeaderLine/HeaderLine";
import Infobox from "../../Components/Infobox/Infobox";
import { languageElements } from "./PageDismissRegistration-languageElements";
import LanguageElementsHandler from "../../Components/repository/LanguageElementsHandler";

export default function PageDismissRegistration(props) {
  let { token } = useParams();

  const [statusOfDelete, setStatusOfDelete] = useState("waiting");

  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/dismissRegistration`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    })
      .then((data) =>
        setStatusOfDelete(data.status === 200 ? "success" : "invalid")
      )
      .catch(() => setStatusOfDelete("no-response"));
  }, []);

  const infobox = (
    <>
      <div className="header-area">
        <h4>{languageElementsHandler.get(`${statusOfDelete}-header`)}</h4>
      </div>
      <br />
      <div className="infoText-area">
        <h6>{languageElementsHandler.get(`${statusOfDelete}-p-01`)}</h6>
      </div>
    </>
  );

  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page-dismissRegistration">
      <HeaderLine
        language={props.language}
        selectedPage={"dismissRegistration"}
        loginData={props.loginData}
      />
      <main className="page-greeting-main">
        <Infobox left={"150px"} top={"50px"} info={infobox} />
      </main>
    </div>
  );
}
