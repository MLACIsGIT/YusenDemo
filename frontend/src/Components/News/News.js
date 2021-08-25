import { useState, useEffect } from "react";
import "./News.scss";
import NewsItem from "./NewsItem/NewsItem";
import NewsEditForm from "../NewsEditForm/NewsEditForm";
import { languageElements } from "./News-languageElements";

export default function News(props) {
  const [dataLoadingState, setDataLoadingState] = useState("NOT LOADED");
  const [newsData, setNewsData] = useState([]);
  const [editedNewsId, setEditedNewsId] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setDataLoadingState("LOADING");
    fetch(`${process.env.REACT_APP_API_BASE_URL}/news/getall`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        language: props.language,
      },
    })
      .then((data) => {
        if (data.status !== 200) {
          setDataLoadingState("NOT LOADED");
          const error = new Error("invalid");
          error.status = data.status;
          throw error;
        }
        return data.json();
      })
      .then((jsonData) => {
        setNewsData(jsonData);
        setDataLoadingState("LOADED");
      })
      .catch(() => {
        setDataLoadingState("NOT LOADED");
      });
  }

  function addNewNews() {
    setEditedNewsId(0);
    setDataLoadingState("EDIT");
  }

  let addButton;
  if (props.loginData?.getUserLevel() === "OWNER_SA") {
    addButton = (
      <button
        type="button"
        id="news-btn-add-new"
        class="btn btn-outline-info"
        onClick={addNewNews}
      >
        +
      </button>
    );
  }

  return (
    <div className="news">
      {dataLoadingState === "LOADING" && (
        <div className="loading-spinner">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {dataLoadingState === "LOADED" && (
        <div className="news-items">
          {addButton}
          {newsData.map((message) => {
            return (
              <NewsItem
                language={props.language}
                loginData={props.loginData}
                newsData={message}
                languageElements={languageElements}
              />
            );
          })}
        </div>
      )}
      {dataLoadingState === "EDIT" && (
        <div className="news-edit">
          <NewsEditForm newsId={editedNewsId} language={props.language} loginData={props.loginData} />
        </div>
      )}
    </div>
  );
}
