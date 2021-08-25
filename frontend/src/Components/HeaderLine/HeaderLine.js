import "./HeaderLine.scss";
import { Link } from "react-router-dom";
import { languageElements } from "./HeaderLine-languageElements";
import LanguageElementsHandler from "../repository/LanguageElementsHandler";
import PictHandler from "./pictures/PictHandler";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

export default function HeaderLine(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    languageElements,
    props.language
  );
  const selectedPage = props.selectedPage;
  let navbar;
  let navItems;

  switch (props.loginData?.tokenData.user.userLevel) {
    case "CUSTOMER":
      navItems = [
        "home",
        "invoices",
        "stocks",
        "tracking",
        "settings",
        "contact",
      ];
      break;

      case "OWNER_SA":
        navItems = [
            "home",
            "invoices",
            "stocks",
            "tracking",
            "settings",
            "contact",
          ];
          break;
    
    default:
      navItems = [
        "home",
        "contact",
      ];
  }

  if (props.loginData && navItems.length > 0) {
    let linkStyle = { width: `calc( 100% / ${navItems.length} - 4px )` };

    navbar = navItems.map((item) => {
      if (item === selectedPage) {
        return (
          <div key={item} style={linkStyle}>
            <Link to={`/${item}`} className="main-navbar-item btn btn-primary">
              <PictHandler pictureCode={`${item}_selected`} />
              <span>{languageElementsHandler.get(`header-title-${item}`)}</span>
            </Link>
          </div>
        );
      }

      return (
        <div key={item} style={linkStyle}>
          <Link to={`/${item}`} className="main-navbar-item btn btn-light">
            <PictHandler pictureCode={item} />
            <span>{languageElementsHandler.get(`header-title-${item}`)}</span>
          </Link>
        </div>
      );
    });
  }

  return (
    <div className="header-line">
      <div className="main-navbar">{navbar}</div>
      <h1 className="header-title-bar">
        <div className="header-title-bar-column-1" onClick={props.onHamClicked}>
          {props.onHamClicked ? <MenuOutlinedIcon fontSize="large" /> : null}
        </div>
        <div className="header-title-bar-column-2">
          {languageElementsHandler.get(`header-title-${selectedPage}`)}
        </div>
        <div className="header-title-bar-column-3"></div>
      </h1>
    </div>
  );
}
