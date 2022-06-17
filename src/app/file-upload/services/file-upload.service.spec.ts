import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FileService } from './file-upload.service';

describe('FileUploadService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // The following are custom made unit tests for the file upload service
  // Unit tests immediately fail if backend server is not running

  // Implement a unit test that checks for invalid file input
  it('should return "ok" state as false when file is null or empty', (done: DoneFn) => {
    var isSuccess = true;
    service.uploadFile(null).subscribe({
      next: (res) => {
        console.log(res);
        isSuccess = true;
      },
      error: (err) => {
        console.log(err);
        //only code that changes true -> false
        isSuccess = err.ok;
      },
      complete: () => console.log('test complete'),
    });

    setTimeout(() => {
      expect(isSuccess).toEqual(false);
      done();
    }, 1000);
  });

  // Implement a unit test that checks for successful file data retrieval
  it('should return true when files are loaded', (done: DoneFn) => {
    var isSuccess = false;
    service.getFiles().subscribe({
      next: (res) => {
        console.log(res);
        isSuccess = true;
      },
      error: (err) => {
        console.log(err);
        isSuccess = err.ok;
      },
      complete: () => console.log('test complete'),
    });

    setTimeout(() => {
      expect(isSuccess).toEqual(true);
      done();
    }, 1000);
  });
});
