import "./NewsItem.scss";
import FieldFormatters from "../../repository/FieldFormatters";
import LanguageElementsHandler from "../../repository/LanguageElementsHandler";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import CreateSharpIcon from "@material-ui/icons/CreateSharp";

export default function NewsItem(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    props.languageElements,
    props.language
  );

  function deleteClicked() {
    props.onDeleteItem(props.newsData._id);
  }

  function editClicked() {
    props.onEditItem(props.newsData._id);
  }

  let editButtons;
  if (props.loginData?.getUserLevel() === "OWNER_SA") {
    editButtons = (
      <div className="commandline">
        <DeleteSharpIcon onClick={deleteClicked} />
        <CreateSharpIcon onClick={editClicked} />
      </div>
    );
  }

  return (
    <div className="news-item">
      {editButtons}
      <h4>
        {FieldFormatters.dateFormatter(props.newsData.date, props.language)}
      </h4>
      <h3>{props.newsData.title}</h3>
      <h4> {props.newsData.shortDescription} </h4>
      <a rel="noreferrer" target="_blank" href={props.newsData.linkToArticle}>
        {languageElementsHandler.get("link-details")}
      </a>
    </div>
  );
}
