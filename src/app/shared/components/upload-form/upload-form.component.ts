import {Component, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import {UploadService} from '../../../core/services/upload.service';
import {FileUploader} from 'ng2-file-upload';
import {HttpHeaders} from '@angular/common/http';
import {subscribeOn} from 'rxjs/internal/operators';
import {ToastsManager} from 'ng6-toastr';

const URL = 'http://localhost:9000/api/v1/file/upload';
const HttpOption = [{
    Authorization : localStorage.getItem('token')
}] ;

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  public files: any;
  public url = 'http://localhost:9000';
  public fileUpload: Array<File> = [];
  isUpload = false;
  interval: any;
  file: any;

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'files',
      headers: [{
            name: 'Authorization',
            value: 'Bearer ' + localStorage.getItem('token')
      }]
  });
  constructor(private uploadService: UploadService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
      // this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
  }

  upload(fileInput: any) {
      clearInterval(this.interval);
      this.isUpload = true;
      this.fileUpload = <Array<File>>fileInput.target.files;
      const formData: any = new FormData();
      const files: Array<File> = this.fileUpload;
      for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i], files[i]['name']);
          console.log(formData.toString());
          this.uploadService.upload(formData).subscribe(data => {
              if (data.status === 'ok') {
                  this.files = data.data;
                  this.uploadService.setFiles(this.files);
                  this.toastr.success(data.message, 'Success');
              } else {
                  this.toastr.error(data.message, 'error');
              }
          });
      }
  }


}
