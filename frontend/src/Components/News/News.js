import { useState, useEffect } from "react";
import "./News.scss";
import NewsItem from "./NewsItem/NewsItem";
import NewsEditForm from "../NewsEditForm/NewsEditForm";
import { languageElements } from "./News-languageElements";
import FormBorder from "../FormBorder/FormBorder";

export default function News(props) {
  const [dataLoadingState, setDataLoadingState] = useState("NOT LOADED");
  const [newsData, setNewsData] = useState([]);
  const [editedNewsId, setEditedNewsId] = useState("");

  useEffect(() => {
    loadData();
  }, [props.language]);

  useEffect(() => {
    if (dataLoadingState === "NOT LOADED") {
      loadData();
    }
  }, [dataLoadingState]);

  function loadData() {
    setDataLoadingState("LOADING");
    const userLevel = props.loginData.getUserLevel();
    const endpoint = `${process.env.REACT_APP_API_BASE_URL}/news/${(userLevel === 'OWNER_SA') ? 'getall/' : 'getlist/'}`
    fetch(endpoint, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        portalownersid: process.env.REACT_APP_PORTAL_OWNERS_ID,
        language: props.language,
        token: props.loginData.getToken(),
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

  function onEditItem(id) {
    setEditedNewsId(id);
    setDataLoadingState("EDIT");
  }

  function onNewFormReturn() {
    setDataLoadingState("NOT LOADED");
  }

  function onDeleteItem(id) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/news/delete`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        token: props.loginData.getToken(),
        id: id,
      },
    })
      .then((data) => {
        if (data.status !== 200) {
          throw new Error("result-nok");
        }
        setDataLoadingState("NOT LOADED");
      })
      .catch((error) => {
        console.error("Delete failed", error);
      });
  }

  function addNewNews() {
    setEditedNewsId("");
    setDataLoadingState("EDIT");
  }

  let addButton;
  if (props.loginData?.getUserLevel() === "OWNER_SA") {
    addButton = (
      <button
        type="button"
        id="news-btn-add-new"
        className="btn btn-outline-info"
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
                key={message._id}
                language={props.language}
                loginData={props.loginData}
                newsData={message}
                onDeleteItem={onDeleteItem}
                onEditItem={onEditItem}
                languageElements={languageElements}
              />
            );
          })}
        </div>
      )}
      {dataLoadingState === "EDIT" && (
        <div className="news-edit">
          <FormBorder
            form={
              <NewsEditForm
                newsId={editedNewsId}
                language={props.language}
                loginData={props.loginData}
                onReturn={onNewFormReturn}
              />
            }
          />
        </div>
      )}
    </div>
  );
}
