import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from '../../core/services/upload.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng6-toastr';


const URL = 'http://localhost:9000/api/v1/file/upload';

@Component({
  selector: 'app-change-file',
  templateUrl: './change-file.component.html',
  styleUrls: ['./change-file.component.scss']
})
export class ChangeFileComponent implements OnInit {

  public files: any;
  public url = 'http://localhost:9000';
  public fileUpload: Array<File> = [];
  isUpload = false;
  interval: any;
  file: any = {
      path: null
  };
  breadcrumb = '';
  avatar: any = {};
  user_id: number;
  file_id: number;
  manga_id: number;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'files',
      headers: [{
          name: 'Authorization',
          value: 'Bearer ' + localStorage.getItem('token')
      }]
  });
  constructor(private uploadService: UploadService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef)
  {
    this.user_id =  this.route.snapshot.params.user_id;
    this.file_id =  this.route.snapshot.params.file_id;
    this.manga_id =  this.route.snapshot.params.manga_id;
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.loadAvatar();
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
                  this.toastr.error(data.message, 'Error');
              }
          });
      }
  }

  loadAvatar() {
      this.isUpload = false;
      if (this.user_id) {
          this.breadcrumb = 'Users';
          this.uploadService.getFileByUser(this.user_id, this.file_id).subscribe(data => {
              this.file = data.data;
          });
      }
      if (this.manga_id) {
          this.breadcrumb = 'Manga';
         this.uploadService.getFileByManga(this.manga_id, this.file_id).subscribe(data => {
             this.file = data.data;
         });
      }

  }

  updateAvatar() {
      this.avatar = {
          files: this.uploadService.getFiles(),
          user_id: this.user_id
      };

      this.uploadService.updateAvatar(this.file_id, this.avatar).subscribe(files => {
          if (files.status === 'ok') {
              localStorage.removeItem('files');
              if (this.user_id) {
                  this.router.navigate(['dashboard/users']);
              } else if (this.manga_id) {
                  this.router.navigate(['dashboard/manga']);
              }
              this.toastr.success(files.message, 'Success');
          } else {
              this.toastr.error(files.error, 'Error');
          }
      });
  }
}
