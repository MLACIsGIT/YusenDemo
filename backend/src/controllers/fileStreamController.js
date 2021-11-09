import { FileStreamService } from '../services';

export const fileStreamController = {
  async uploadFile(req, res, next) {
    if (!req.file) {
      const error = new Error('File attachement is missing');
      error.status = 400;
      next (error)
    }

    const fileData = {
      ...req.file,
      externalSystemId: req.headers.fileexternalsystemid,
      externalSystemTransactId: req.headers.fileexternalsystemtransactid,
    }
    const parentRecordData = {
      tableCode: req.headers.parenttable,
      externalSystemId: req.headers.parentexternalsystemid,
    };

    try {
      const result = await FileStreamService.uploadFile(
        req.verified,
        fileData,
        parentRecordData
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async downloadFile(req, res, next) {
    try {
      let result = await FileStreamService.downloadFile(
        req.verified,
        req.headers.fileid
      );
      res
        .status(200)
        .set({
          'Cache-Control': 'no-cache',
          'Access-Control-Expose-Headers': 'Content-Disposition',
          'Content-Type': result.fileParams.contentType,
          'Content-Length': result.fileParams.fileLength,
          'Content-Disposition':
            'attachment; filename=' + encodeURI(result.fileParams.origFileName),
          'Creation-Date': result.fileParams.creationDate,
          'File-Name': result.fileParams.origFileName,
          'File-Type': result.fileParams.contentType,
          'File-Length': result.fileParams.fileLength,
        })
        .send(result.fileStream);
    } catch (error) {
      next(error);
    }
  },

  async getListOfFiles(req, res, next) {
    try {
      const parentRecordData = {
        tableCode: req.headers.parenttable,
        externalSystemId: req.headers.parentexternalsystemid,
      }

      const result = await FileStreamService.getListOfFiles(req.verified, parentRecordData);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
};
