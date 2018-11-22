import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../category.service';
import {ToastsManager} from 'ng6-toastr';

@Component({
  selector: 'app-category',
  templateUrl: '../pages/category.component.html',
  styleUrls: ['../pages/category.component.scss'],
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


export class CategoryComponent implements OnInit {
  state = 'small';
  category: any = {};
  categories: any;
  isEdit = false;
  @ViewChild('categoryForm') categoryForm;
  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef)
  {
      this.route.params.subscribe(res => console.log('category was load'));
      this.toastr.setRootViewContainerRef(vcr);
  }

  toggleAction() {
      this.state = (this.state === 'small' ? 'large' : 'small');
  }

  ngOnInit() {
      this.getListCategory();
  }

  getListCategory(): any {
    return this.categoryService.getAllListCategory().subscribe(data => {
        this.categories = data.data;
    });
  }

  createCategory(category): any {
      this.isEdit = false;
      return this.categoryService.createCategory(category).subscribe(data => {
          if (data.status === 'ok') {
            this.toastr.success(data.message, 'Success');
            this.getListCategory();
            this.categoryForm.reset();
          } else {
              this.toastr.error(data.message, 'Error');
          }
      });
  }

  showCategory(category_id): any {
      this.isEdit = true;
      this.state = 'large';
      console.log(this.isEdit);
      return this.categoryService.showCategoryById(category_id).subscribe(data => {
          if (data.status === 'ok') {
              this.category = data.data;
          }
      });
  }
  updateCategory(category): any {
      this.isEdit = true;
      return this.categoryService.updateCategory(category.category_id, category).subscribe(data => {
          if (data.status === 'ok') {
              this.category = data.data;
              this.toastr.success(data.message, 'Success');
              this.categoryForm.reset();
          } else {
              this.toastr.error(data.message, 'Error');
          }
      });
  }

  deleteCategory(category_id): any {
      return this.categoryService.deleteCategoryById(category_id).subscribe(data => {
          if (data.status === 'ok') {
              this.toastr.success(data.message, 'Success');
              this.getListCategory();
          } else {
              this.toastr.error(data.message, 'Error');
          }
      });
  }
}
