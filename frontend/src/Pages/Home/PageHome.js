import "./PageHome.scss";
import homeAsidePicture from "./homeAsidePicture.png";
import { Redirect } from "react-router-dom";
import HeaderLine from "../../Components/HeaderLine/HeaderLine";
import News from "../../Components/News/News";

export default function PageHome(props) {
  if (!props.loginData) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page-home">
      <HeaderLine
        language={props.language}
        selectedPage={"home"}
        loginData={props.loginData}
      />

      <article>
        <div className="news-area">
          <News language={props.language} loginData={props.loginData} />
        </div>

        <aside>
          <img src={homeAsidePicture} alt="homeAsidePicture.png" />
        </aside>
      </article>
    </div>
  );
}
