import { Redirect } from "react-router-dom";
import HeaderLine from "../../Components/HeaderLine/HeaderLine";
import ReportInvoices from "../../Components/ReportInvoices/ReportInvoices";
import DownloadManager from "../../Components/repository/fileStream/DownloadManager";
export default function PageReports(props) {
  if (!props.loginData) {
    return <Redirect to="/" />;
  }

  async function trial01() {
    const downloadManager = new DownloadManager(props.loginData, {
      fileId: 275,
      mime: "application/pdf",
      fileName: "trial01.pdf",
    });

    downloadManager.downloadBlob(
      (err) => {
        console.error(err);
      },
      () => {
        downloadManager.downloadInBrowser();
      }
    );
  }

  return (
    <div className="page-reports">
      <button onClick={trial01}>Click me!</button>

      <HeaderLine
        language={props.language}
        selectedPage={"invoices"}
        loginData={props.loginData}
      />

      <ReportInvoices language={props.language} loginData={props.loginData} />
    </div>
  );
}
