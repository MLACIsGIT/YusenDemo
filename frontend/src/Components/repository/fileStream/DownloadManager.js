export default class DownloadManager {
  constructor(loginData, fileParams) {
    this.loginData = loginData;
    this.fileParams = {
      fileId: fileParams.fileId,
      mime: fileParams.mime,
      fileName: fileParams.fileName,
    };
    this.status = "NOT STARTED";
    this.blob = undefined;
  }

  getFileParams() {
    return this.fileParams;
  }

  setFileParams(fileParams) {
    this.fileParams = fileParams;
    this.status = "NOT STARTED";
    this.blob = undefined;
  }
  getStatus() {
    return this.status;
  }

  getBlob() {
    return this.blob;
  }

  async downloadBlob(onErr, onSuccess) {
    this.status = "PROCESSING";
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: this.fileParams.mime,
        token: this.loginData.getToken(),
        fileId: this.fileParams.fileId,
      },
    };

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/filestream/download`,
      requestOptions
    )
      .then((response) => {
        if (response.status!==200) {
          let error = new Error('invalid');
          throw error;
        }
        debugger
        return response.blob();
      })
      .then((blob) => {
        debugger
        this.blob = new Blob([blob], {
          type: this.fileParams.mime,
        });
        this.status = "DOWNLOADED";
        onSuccess();
      })
      .catch((err) => {
        debugger
        console.error("error", err);
        this.status = "NOT LOADED";
        onErr(err);
      });
  }

  async downloadInBrowser() {
    if (this.status !== "DOWNLOADED") {
      console.error(
        "DownloadManager: file not downloaded. (Use DownloadManager.downloadBlob() before!"
      );
      return;
    }
    const objUrl = window.URL.createObjectURL(this.blob);

    let link = document.createElement("a");
    link.href = objUrl;
    link.download = this.fileParams.fileName;
    link.click();

    // For Firefox it is necessary to delay revoking the ObjectURL.
    setTimeout(() => {
      window.URL.revokeObjectURL(objUrl);
    }, 250);
  }
}
