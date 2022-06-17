import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FileUploadComponent } from './view/file-upload.component';
import { FileViewComponent } from './components/file-view/file-view.component';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MAT_MODULES = [
  MatIconModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatGridListModule,
  MatDialogModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [FileUploadComponent, FileViewComponent],
  imports: [CommonModule, FileUploadRoutingModule, ...MAT_MODULES],
})
export class FileUploadModule {}
