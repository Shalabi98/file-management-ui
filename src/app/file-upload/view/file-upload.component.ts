import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../services/file-upload.service';
import { IFile } from '../interfaces/file-view.interface';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  // Declare flag variables
  loading = false;
  success = false;

  // Declare UI variables
  status = '';
  message = '';

  // Declare file variables
  file!: File;
  fileName = '';

  fileViewData$ = new Observable<IFile[]>();

  // Declare uploader directive to detect changes to reset file input state
  @ViewChild('uploader', { static: true, read: ElementRef })
  uploader!: ElementRef;

  // Inject file upload and snack bar services into the component
  constructor(
    private fileUploadService: FileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.onView();
  }

  // Handler for checking file input state
  fileInputHandler(event: any) {
    this.file = event.target.files[0];
    if (this.file !== null || this.file !== undefined) {
      // Initiate file upload once file is defined
      this.fileUploadHandler();
      // Reset file input to prevent instant same file upload
      this.uploader.nativeElement.value = '';
    }
    // Set file name
    this.fileName = this.file.name;
    // Reset message display
    this.message = '';
  }

  // Handler for file upload
  fileUploadHandler() {
    // Set the flag variable
    this.loading = !this.loading;
    console.log(this.file);

    // Call the file upload service to make a http post request to .net core Files Web API
    this.fileUploadService.uploadFile(this.file).subscribe({
      // Subscribe to the Observable
      next: (res) => {
        if (typeof res === 'object') {
          this.loading = false;
          this.success = true;
          // Implement snack bar to display real-time response
          this.snackBar.open(res.status, 'Dismiss', {
            duration: 7000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });
          /*
            Make a call to the
            child component service
            to render file data
          */
          this.onView();
        }
      },
      error: (err) => {
        // Update flag variables
        this.success = false;
        this.loading = false;

        // Store API response data
        this.status = err.error.status;
        this.message =
          err.error.message ?? 'Failed to contact file management APIs.';

        // Display error message
        this.snackBar.open(this.status ?? 'HTTP_ERROR_RESPONSE', 'Dismiss', {
          duration: 7000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  // Handler for file view
  onView() {
    this.fileViewData$ = this.fileUploadService.getFiles();
  }
}
