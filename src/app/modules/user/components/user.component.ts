import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {UploadService} from '../../../core/services/upload.service';
import {ToastContainer, ToastsManager} from 'ng6-toastr';

@Component({
  selector: 'app-user',
  templateUrl: '../pages/user.component.html',
  styleUrls: ['../pages/user.component.scss'],
    animations: [
        // Define animation
        trigger('toggleAction', [
            state('small', style({ height: '0'})),
            state('large', style(
                {
                    height: 'auto',
                    width: '100%',
                    padding: '10px',
                }
            )),
            transition('small <=> large', animate('0.3s'))
        ]),
    ]
})
export class UserComponent implements OnInit {
  public url = 'http://localhost:9000';
  state = 'small';
  users: any;
  data: any = {};
  user: any = {};
  isEdit = false;
  @ViewChild('userForm') userForm;

  constructor( private route: ActivatedRoute,
               private userService: UserService,
               private uploadService: UploadService,
               private router: Router,
               public toastr: ToastsManager,
               public vcr: ViewContainerRef ) {
      this.route.params.subscribe(res => console.log('user was loaded'));
      this.toastr.setRootViewContainerRef(vcr);
  }

  toggleAction() {
      this.state = (this.state === 'small' ? 'large' : 'small');
  }

  ngOnInit() {
      this.getUser();
  }

  addUser(user) {
    this.isEdit = false;
    const files = this.uploadService.getFiles();
    this.data = {
        user,
        files
    };
    return this.userService.register(this.data).subscribe(data => {
      if (data.status === 'ok') {
          localStorage.removeItem('files');
          this.userForm.reset();
          this.toastr.success(data.message, 'Success!');
          this.getUser();
      } else {
          this.toastr.error(data.message, 'Oop!');
      }
    });
  }

  getUser(): any {
    return this.userService.getUser().subscribe(data => {
        this.users = data.data;
    });
  }

  editUser(user_id) {
      this.isEdit = true;
      this.state = 'large';
      return this.userService.getUserUpdate(user_id).subscribe(data => {
          this.user = data.data;
      });
  }

  updateUser(user) {
    this.isEdit = true;
    return this.userService.updateUser(user.user_id, user).subscribe(data => {
        if (data.status === 'ok') {
            this.getUser();
            this.userForm.reset();
            this.toastr.success(data.message, 'Success!');
        } else {
            this.toastr.error(data.message, 'Oop!');
        }

    });
  }

  editAvatar(user_id, file_id) {
      this.router.navigateByUrl( `/dashboard/users/${user_id}/image/${file_id}`);
  }

  deleteUser(user_id) {
    return this.userService.deleteUser(user_id).subscribe(data => {
        if (data.status === 'ok') {
            this.toastr.success(data.message, 'success');
            this.getUser();
        } else {
            this.toastr.error(data.message, 'error');
        }
    });
  }

}
