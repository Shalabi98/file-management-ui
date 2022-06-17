//File Interface
export interface IFile {
  //Grouping Variable
  contentType: string;
  files: UploadedFile[];
}

//Uploaded File Metadata Inteface
export interface UploadedFile {
  id: number;
  name: string;
  contentType: string;
  size: string;
  uploadDate: Date;
}
