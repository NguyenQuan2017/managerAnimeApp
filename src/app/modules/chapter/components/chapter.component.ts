import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MangaService} from '../../manga/manga.service';
import {ToastsManager} from 'ng6-toastr';
import {ChapterService} from '../chapter.service';
import {UploadService} from '../../../core/services/upload.service';

@Component({
  selector: 'app-chapter',
  templateUrl: '../pages/chapter.component.html',
  styleUrls: ['../pages/chapter.component.scss'],
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
export class ChapterComponent implements OnInit {
  state = 'small';
  isEdit = false;
  mangas: any;
  chapter: any  = {
      selectedManga: null,

  };
  p = 1;
  chapters: any;
  dropdownSettingsManga  = {};
  public url = 'http://localhost:9000';
  @ViewChild('chapterForm') chapterForm;
  constructor(private mangaService: MangaService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private chapterService: ChapterService,
              private uploadService: UploadService) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.getListManga();
      this.getListChapter();
  }

  toggleAction() {
      this.state = (this.state === 'small' ? 'large' : 'small');
  }

  getListManga(): any {
      return this.mangaService.getListManga().subscribe(data => {
          this.mangas = data.data;
          this.dropdownSettingsManga = {
              singleSelection: true,
              idField: 'manga_id',
              textField: 'manga_name',
              selectAllText: 'Select All',
              unSelectAllText: 'UnSelect All',
              itemsShowLimit: 100,
              allowSearchFilter: true
          };
      });
  }

  createChapter(chapter): any {
      const files = this.uploadService.getFiles();
      const chapters = {
        files: files,
        chapter: chapter
      };
      return this.chapterService.createChapter(chapters).subscribe(data => {
          if (data.status === 'ok') {
              this.chapter = data.data;
              this.toastr.success(data.message, 'Success');
              this.getListChapter();
              this.chapterForm.reset();
          } else {
                this.toastr.error(data.message, 'Error');
          }
      });
  }

  getListChapter(): any {
      return this.chapterService.getListChapter().subscribe(data => {
          if (data.status === 'ok') {
              this.chapters = data.data.chapters;
              console.log(this.chapters);
          }
      });
  }

}
