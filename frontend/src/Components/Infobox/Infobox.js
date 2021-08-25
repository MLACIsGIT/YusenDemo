import "./Infobox.scss";
import headerLogo from "./headerLogo.svg";

export default function Infobox(props) {
  return (
    <div className="infobox-container">
      <div className="infobox">
        <div className="infobox-article">
          <div className="infobox-header">
            <div className="logo-area">
              <img
                className="header-logo"
                src={headerLogo}
                height="50px"
                alt="logo"
              />
            </div>
          </div>
          <div className="infobox-main">{props.info}</div>
        </div>
      </div>
    </div>
  );
}
