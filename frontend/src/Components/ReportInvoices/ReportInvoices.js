import GridReport from "../GridReport/GridReport";
import { languageElements } from "./ReportInvoices-languageElements";
import ReportInvoicesFunctionCell from "./ReportInvoicesFunctionCell";

export default function ReportInvoices(props) {
  return (
    <div className="reportInvoices">
      <GridReport
        id="ReportInvoices01"
        dataEndpoint="data/get"
        language={props.language}
        loginData={props.loginData}
        report={{
          reportId: "ReportInvoices01",
          languageElements: languageElements,
          frameworkComponents: {
            ReportInvoicesFunctionCell,
          },
          cellRenderers: [
            {
              field: "ExternalSystem_ID",
              cellRenderer: "ReportInvoicesFunctionCell",
              cellRendererParams: {
                clicked: function (field) {
                  alert(`+++ ReportInvoices.js: ${field} was clicked`);
                },
              },
            },
          ],
        }}
      />
    </div>
  );
}
