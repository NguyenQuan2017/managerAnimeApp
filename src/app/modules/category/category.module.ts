import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './components/category.component';
import {CategoryRoutingModule} from './category-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CategoryRoutingModule,
        FormsModule
    ],
    declarations: [
        CategoryComponent,
    ],
    exports: [
        CategoryComponent
    ]
})
export class CategoryModule { }