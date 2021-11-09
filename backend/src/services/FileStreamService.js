import FileStream from '../repository/FileStream';
import {
  WAT_FILESTREAM_FILE_ADD,
  WAT_FILESTREAM_FILE_SET_DELETED,
  WAT_FILESTREAM_FILE_REMOVE_DELETED,
  WAT_FILESTREAM_GET_LIST_OF_FILES,
} from '../db/storedProcedures';

export class FileStreamService {
  static async downloadFile(user, fileId) {
    const fileStream = new FileStream(user);

    let result = await fileStream.downloadFile(fileId);

    return result;
  }

  static async uploadFile(user, file, parentRecordData) {
    const fileStream = new FileStream(user);
    const blobData = await fileStream.uploadFile(file);
    console.log(
      '+++ FileStreamService.uploadFile',
      user,
      file,
      blobData,
      parentRecordData
    );

    const deletedFile = await WAT_FILESTREAM_FILE_SET_DELETED(
      user.portalOwnersId,
      file.originalname,
      parentRecordData
    );

    const fileId = await WAT_FILESTREAM_FILE_ADD(
      user.portalOwnersId,
      file,
      parentRecordData,
      blobData
    );

    if (deletedFile) {
      fileStream.deleteFile(deletedFile);
      console.log('+++ deletedFile!!!!!', deletedFile);
      WAT_FILESTREAM_FILE_REMOVE_DELETED(user, deletedFile);
    }

    return { fileId };
  }

  static async getListOfFiles(user, parentRecordData) {
      const result = await WAT_FILESTREAM_GET_LIST_OF_FILES(user, parentRecordData);

      return result;
  }
}
