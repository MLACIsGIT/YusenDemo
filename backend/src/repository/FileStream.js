import { WAT_FILESTREAM_FILE_PARAMS_GET_BY_WAT_FILES_ID } from '../db/storedProcedures';
import streamifier from 'streamifier';

const { BlobServiceClient } = require('@azure/storage-blob');

export default class FileStream {
  constructor(user) {
    this.storageConfig = {
      storageConnectionString: process.env.FILESTREAM_BLOB_CONNECT,
      options: {
        encrypt: true,
      },
    };
    this.user = user;
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.storageConfig.storageConnectionString
    );
    this.containerClient = this.blobServiceClient.getContainerClient(
      user.portalOwnersId
    );
  }

  async streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on('data', data => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  }

  async getFileParams(fileId) {
    let fileParams = await WAT_FILESTREAM_FILE_PARAMS_GET_BY_WAT_FILES_ID(
      this.user.portalOwnersId,
      fileId
    );

    return fileParams;
  }

  getBlobAccountName() {
    return this.blobServiceClient.accountName;
  }

  async downloadFile(fileId) {
    const fileParams = await this.getFileParams(fileId);
    const blobName = `${fileParams.filePath}/${fileParams.fileName}`;
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    const fileStream = await this.streamToBuffer(
      downloadBlockBlobResponse.readableStreamBody
    );

    return {
      fileParams,
      fileStream,
    };
  }

  async uploadFile(file) {
    const blobAccount = this.getBlobAccountName();
    const blobPath = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const blobFileName = Math.random()
      .toString(36)
      .replace(/[/\\?%*:|"<>]/g, '-');
    const fileNameWithPath = `${blobPath}/${blobFileName}`;

    const blockBlobClient = this.containerClient.getBlockBlobClient(
      fileNameWithPath
    );

    const stream = streamifier.createReadStream(
      Buffer.from(file.buffer),
      file.size
    );

    await blockBlobClient.uploadStream(stream);
    //streamifier.createReadStream(Buffer.from(file.buffer), file.size),

    return {
      blobAccount,
      blobPath,
      blobFileName,
    };
  }

  async deleteFile(file) {
    const blobName = `${file.filePath}/${file.fileName}`;
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

    blockBlobClient.delete();
  }
}
