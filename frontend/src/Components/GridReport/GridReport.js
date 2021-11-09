import { useState, useEffect, useRef } from "react";
import "./GridReport.scss";
import { Accordion } from "bootstrap";
import DataGrid from "../DataGrid/DataGrid";
import Filters from "../Filters/Filters";
import LanguageElementsHandler from "../repository/LanguageElementsHandler";
import ExcelExport from "../ExcelExport/ExcelExport";

export default function GridReport(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    props.report.languageElements,
    props.language
  );

  const accordionData = useRef();
  const [reportParams, setReportParams] = useState({});
  const [dataLoadingState, setDataLoadingState] = useState("NOT PREPARED");
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);

  useEffect(() => {
    setDataLoadingState("NOT PREPARED");
    fetch(`${process.env.REACT_APP_API_BASE_URL}/data/getreportparams`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        token: props.loginData.getToken(),
        reportid: props.id,
      },
    })
      .then((data) => {
        if (data.status !== 200) {
          setDataLoadingState("NOT PREPARED");
          const error = new Error("invalid");
          error.status = data.status;
          throw error;
        }
        return data.json();
      })
      .then((jsonData) => {
        setReportParams(jsonData);

        setGridColumns(
          jsonData.selectedColumns.map((columnName) => {
            const columnDef = jsonData.columns.find((column) => {
              return column.field === columnName;
            });
            return {
              field: columnName,
              type: columnDef.type,
              width: columnDef.width,
            };
          })
        );

        setDataLoadingState("NOT LOADED");
      })
      .catch((error) => {
        setDataLoadingState("NOT PREPARED");
      });
  }, [props.loginData]);

  useEffect(() => {
    showDataIfNotCollapsed();
  }, [props.language]);

  function showDataIfNotCollapsed() {
    if (accordionData.current) {
      if (!accordionData.current.classList.contains("collapsed")) {
        showData();
      }
    }
  }

  function getFilter() {
    let filterFields = Array.from(document.querySelectorAll(".reportFilter"))
      .filter((e) => e.value)
      .map((e) => {
        switch (e.type) {
          case "date":
            let dateValue = new Date(e.value);
            let sqlDate = `CONVERT(DATETIME, '${dateValue.getFullYear()}-${
              dateValue.getMonth() + 1
            }-${dateValue.getDate()}', 102)`;
            let sqlDate2359 = `CONVERT(DATETIME, '${dateValue.getFullYear()}-${
              dateValue.getMonth() + 1
            }-${dateValue.getDate()} 23:59:59', 102)`;

            let result = e.dataset.sql.replace(/\?\(2359\)/g, sqlDate2359);
            result = result.replace(/\?/g, sqlDate);

            return result;

          default:
            return `(${e.dataset.sql.replace(/\?/g, e.value)})`;
        }
      });

    return filterFields.join(" AND ");
  }

  function showData() {
    setDataLoadingState("LOADING");
    fetch(`${process.env.REACT_APP_API_BASE_URL}/${props.dataEndpoint}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        token: props.loginData.getToken(),
        language: props.language,
        reportid: props.id,
        filters: getFilter(),
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
        setGridData(jsonData.docs.data);
        setDataLoadingState("LOADED");
      })
      .catch((error) => {
        setDataLoadingState("NOT LOADED");
      });
  }

  if (Object.keys(reportParams).length === 0) {
    return <></>;
  }

  return (
    <div className="grid-report">
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="grid-report-flush-filter">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapse-filter"
              aria-expanded="false"
              aria-controls="flush-collapse-filter"
            >
              {languageElementsHandler.get("flush-filter")}
            </button>
          </h2>
          <div
            id="flush-collapse-filter"
            className="accordion-collapse collapse"
            aria-labelledby="grid-report-flush-filter"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <Filters
                reportParams={reportParams}
                languageElements={props.report.languageElements}
                language={props.language}
              />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="grid-report-flush-data">
            <button
              ref={accordionData}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapse-data"
              aria-expanded="false"
              aria-controls="flush-collapse-data"
              onClick={(e) => showDataIfNotCollapsed()}
            >
              {languageElementsHandler.get("flush-data")}
            </button>
          </h2>
          <div
            id="flush-collapse-data"
            className="accordion-collapse collapse"
            aria-labelledby="grid-report-flush-data"
            data-bs-parent="#accordionFlushExample"
          >
            {dataLoadingState === "NOT LOADED" && (
              <div className="accordion-body"></div>
            )}

            {dataLoadingState === "LOADING" && (
              <div className="accordion-body loading-spinner">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {dataLoadingState === "LOADED" && (
              <div className="accordion-body">
                <div className="accordion-body-header">
                  <ExcelExport data={gridData} />
                </div>

                <DataGrid
                  id={`${props.id}-dataGrid`}
                  columns={gridColumns}
                  language={props.language}
                  languageElements={props.report.languageElements}
                  data={gridData}
                  frameworkComponents={props.report.frameworkComponents}
                  cellRenderers={props.report.cellRenderers}
                />
              </div>
            )}
          </div>
        </div>
        <div className="accordion-item d-none">
          <h2
            className="accordion-header"
            id="grid-report-flush-select-columns"
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapse-selectColumns"
              aria-expanded="false"
              aria-controls="flush-collapse-selectColumns"
            >
              {"###flush-select-columns"}
            </button>
          </h2>
          <div
            id="flush-collapse-selectColumns"
            className="accordion-collapse collapse"
            aria-labelledby="grid-report-flush-select-columns"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              third item's accordion body. Nothing more exciting happening here
              in terms of content, but just filling up the space to make it
              look, at least at first glance, a bit more representative of how
              this would look in a real-world application.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
