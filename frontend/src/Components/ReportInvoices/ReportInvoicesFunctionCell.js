import { Component } from "react";
import downloadIcon from "./file_download_black_24dp.svg";
import "./ReportInvoicesFunctionCell.scss";
import DownloadManager from "../repository/fileStream/DownloadManager";

export default class ReportInvoicesFunctionCell extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
    const downloadManager = new DownloadManager({
      fileId: 275,
      mime: "application/pdf",
      fileName: "trial01.pdf",
    });

    downloadManager.downloadBlob().then(() => {
      downloadManager.downloadInBrowser();
    });
  }
  render() {
    return (
      <div className="reportInvoicesFunctionCell-download">
        <img
          src={downloadIcon}
          onClick={this.btnClickedHandler}
          alt="download"
        />
      </div>
    );
  }
}
