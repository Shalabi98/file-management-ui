import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFile } from '../interfaces/file-view.interface';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  // API url
  baseApiUrl = environment.apiBaseUrl + '/files';

  // Inject http client service
  constructor(private http: HttpClient) {}

  // API post request to upload a file
  uploadFile(file: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file);

    return this.http.post(this.baseApiUrl, formData);
  }

  // API get request to return list of files
  getFiles(): Observable<IFile[]> {
    return this.http.get<IFile[]>(this.baseApiUrl);
  }
}
