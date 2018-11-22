import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GenresService} from '../genres.service';
import {ToastsManager} from 'ng6-toastr';

@Component({
  selector: 'app-genres',
  templateUrl: '../pages/genres.component.html',
  styleUrls: ['../pages/genres.component.scss'],
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
export class GenresComponent implements OnInit {
  state = 'small';
  genres: any;
  genre: any = {};
  isEdit = false;
  @ViewChild('genreForm') genreForm;
  constructor(private genreService: GenresService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.getListGenre();
  }

  toggleAction() {
      this.state = (this.state === 'small' ? 'large' : 'small');
  }

  getListGenre(): any {
      return this.genreService.getListGenre().subscribe(data => {
          this.genres = data.data;
      });
  }

  createGenres(genre): any {
      this.isEdit = false;
      return this.genreService.createGenre(genre).subscribe(data => {
         if (data.status === 'ok') {
             this.genre = data.data;
             this.toastr.success(data.message, 'Success');
             this.getListGenre();
             this.genreForm.reset();
         } else {
             this.toastr.error(data.message, 'Error');
         }
      });
  }

  editGenre(genre_id): any {
      window.scroll(0, 0);
      this.isEdit = true;
      this.state = 'large';
      return this.genreService.showGenre(genre_id).subscribe(data => {
          this.genre = data.data;
      });
  }

  updateGenres(genre): any {
    this.isEdit = true;
    return this.genreService.updateGenre(genre.genre_id, genre).subscribe(data => {
        if (data.status === 'ok') {
            this.genre = data.data;
            this.toastr.success(data.message, 'Success');
            this.getListGenre();
            this.genreForm.reset();
        } else {
            this.toastr.error(data.message, 'Error');
        }
    });
  }

  deleteGenre(genre_id) {
      return this.genreService.deleteGenre(genre_id).subscribe(data => {
          if (data.status === 'ok') {
              this.toastr.success(data.message, 'Success');
              this.getListGenre();
          } else {
              this.toastr.error(data.message, 'Error');
          }
      });
  }


}
