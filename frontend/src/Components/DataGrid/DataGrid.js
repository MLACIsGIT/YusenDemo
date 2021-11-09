import "./DataGrid.scss";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import FieldFormatters from "../repository/FieldFormatters";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import LanguageElementsHandler from "../repository/LanguageElementsHandler";

export default function DataGrid(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    props.languageElements,
    props.language
  );

  function dateFormatter(params) {
    return FieldFormatters.dateFormatter(params.value, props.language);
  }

  function floatFormatter(params) {
    return FieldFormatters.numberFormatter(params.value, props.language, 2);
  }

  function float4Formatter(params) {
    return FieldFormatters.numberFormatter(params.value, props.language, 2);
  }

  function languageTextFormatter(params) {
    return languageElementsHandler.get(`${params.value}`);
  }

  const columnTypes = {
    date: {
      valueFormatter: dateFormatter,
      filter: "agDateColumnFilter",
      filterParams: {
        debounceMs: 500,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          if (cellValue == null) {
            return 0;
          }
          const filterLocalDateAtMidnightInt =
            filterLocalDateAtMidnight.getFullYear() * 10000 +
            (filterLocalDateAtMidnight.getMonth() + 1) * 100 +
            filterLocalDateAtMidnight.getDate();
          const cellValueInt =
            parseInt(cellValue.substr(0, 4)) * 10000 +
            parseInt(cellValue.substr(5, 2)) * 100 +
            parseInt(cellValue.substr(8, 2));
          if (cellValueInt < filterLocalDateAtMidnightInt) {
            return -1;
          } else if (cellValueInt > filterLocalDateAtMidnightInt) {
            return 1;
          } else {
            return 0;
          }
        },
      },
      comparator: (d1, d2) => {
        if (!d1 && !d2) {
          return 0;
        }

        if (!d1) {
          return -1;
        }

        if (!d2) {
          return 1;
        }

        if (d1 === d2) {
          return 0;
        }
        return d1 > d2 ? 1 : -1;
      },
    },

    float: {
      valueFormatter: floatFormatter,
      headerClass: "grid-header-right",
      cellStyle: { textAlign: "right" },
      filter: "agNumberColumnFilter",
    },

    float4: {
      valueFormatter: float4Formatter,
      headerClass: "grid-header-right",
      cellStyle: { textAlign: "right" },
      filter: "agNumberColumnFilter",
    },

    languageText: {
      valueFormatter: languageTextFormatter,
    },

    default: {
      filter: "agTextColumnFilter",
    },
  };

  let gridColumns = props.columns.map((col) => {
    let fieldCellRenderer;

    if (props.cellRenderers) {
      fieldCellRenderer = props.cellRenderers.find((renderer) => {
        return renderer.field === col.field;
      });
    }

    if (!fieldCellRenderer) {
      fieldCellRenderer = {};
    }

    return {
      ...col,
      cellRenderer: fieldCellRenderer["cellRenderer"],
      cellRendererParams: fieldCellRenderer["cellRendererParams"],
    };
  });

  return (
    <div
      id={props.id}
      className="ag-theme-alpine"
      style={{ height: "70vh", width: "100%" }}
    >
      <AgGridReact
        rowData={props.data}
        columnTypes={columnTypes}
        frameworkComponents={props.frameworkComponents}
      >
        {gridColumns.map((col) => {
          return (
            <AgGridColumn
              key={col.field}
              field={col.field}
              headerName={languageElementsHandler.get(`field-${col.field}`)}
              sortable={true}
              type={col.type ? col.type : "default"}
              cellRenderer={col.cellRenderer}
              cellRendererParams={col.cellRendererParams}
              resizable={true}
              width={col.width}
            ></AgGridColumn>
          );
        })}
      </AgGridReact>
    </div>
  );
}
