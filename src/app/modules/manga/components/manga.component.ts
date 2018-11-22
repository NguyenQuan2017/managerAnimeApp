import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MangaService} from '../manga.service';
import {ToastsManager} from 'ng6-toastr';
import {CategoryService} from '../../category/category.service';
import {GenresService} from '../../genres/genres.service';
import {UploadService} from '../../../core/services/upload.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manga',
  templateUrl: '../pages/manga.component.html',
  styleUrls: ['../pages/manga.component.scss'],
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
export class MangaComponent implements OnInit {
  state = 'small';
  isEdit = false;
  mangas: any;
  categories: any;
  genres: any;

  dropdownSettingsCategory = {};
  dropdownSettingsGenre = {};
  manga: any = {
      manga_name: null,
      selectedCategory: [],
      selectedGenre: [],
  };
  public url = 'http://localhost:9000';
  constructor(private mangaService: MangaService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private categoryServie: CategoryService,
              private genreService: GenresService,
              private uploadService: UploadService,
              private router: Router) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.getListManga();
      this.getListCategory();
      this.getListGenres();
  }

  toggleAction() {
      this.state = (this.state === 'small' ? 'large' : 'small');
  }

  getListManga(): any {
      return this.mangaService.getListManga().subscribe(data => {
          this.mangas = data.data;
      });
  }

  createManga(manga): any {
      this.isEdit = false;
      const files = this.uploadService.getFiles();
      const mangas = {
          manga,
          files
      };

      return this.mangaService.createManga(mangas).subscribe(data => {
          if (data.status === 'ok') {
              this.manga = data.data;
              this.toastr.success(data.message, 'Success');
          } else {
              this.toastr.error(data.message, 'Error');
          }
      });
  }


  getListCategory(): any {
      return this.categoryServie.getAllListCategory().subscribe(data => {
          this.categories = data.data;
          this.dropdownSettingsCategory = {
              singleSelection: false,
              idField: 'category_id',
              textField: 'category_name',
              selectAllText: 'Select All',
              unSelectAllText: 'UnSelect All',
              itemsShowLimit: 3,
              allowSearchFilter: true
          };
      });
  }

  getListGenres(): any {
      return this.genreService.getListGenre().subscribe(data => {
          this.genres = data.data;
          this.dropdownSettingsGenre = {
              singleSelection: false,
              idField: 'genre_id',
              textField: 'genre_name',
              selectAllText: 'Select All',
              unSelectAllText: 'UnSelect All',
              itemsShowLimit: 3,
              allowSearchFilter: true
          };
      });
  }


  showManga(manga_id): any {
  this.isEdit = true;
  this.state = 'large';
    return this.mangaService.showManga(manga_id).subscribe(data => {
        this.manga = data.data;
        this.manga.selectedCategory = data.data.categories;
        this.manga.selectedGenre = data.data.genres;
    });
  }

  updateManga(manga): any {
      this.isEdit = true;
      return this.mangaService.updateManga(manga.manga_id, manga).subscribe(data => {
          if (data.status === 'ok') {
              this.manga = data.data;
              this.getListManga();
              this.toastr.success(data.message, 'Sucess');
          } else {
              this.toastr.error(data.message, 'Error');
          }
      });
  }

  editMangaImage(manga_id, file_id) {
      this.router.navigateByUrl( `/dashboard/manga/${manga_id}/image/${file_id}`);
  }

 deleteManga(manga_id) {
      return this.mangaService.deleteManga(manga_id).subscribe(data => {
          if (data.status === 'ok') {
              this.getListManga();
              this.toastr.success(data.message, 'Success');
          } else {
              this.toastr.error(data.message, 'Error');
          }
      });
 }
}
