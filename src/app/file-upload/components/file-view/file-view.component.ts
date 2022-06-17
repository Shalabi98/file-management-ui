import { Component, Input } from '@angular/core';
import { IFile } from '../../interfaces/file-view.interface';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css'],
})
export class FileViewComponent {
  /*Sharing data between child (file-view)
    and parent (file-upload) directives*/
  @Input()
  data: IFile[] = [];

  constructor() {}
}
