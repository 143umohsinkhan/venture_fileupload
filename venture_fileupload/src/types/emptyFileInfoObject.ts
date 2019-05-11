import { IUploadedFile } from "./IUploadedFile";

export const emptyUploadedFile :IUploadedFile = {
    fileName : '',
    fileData : new FormData(),
    isActive : false
};