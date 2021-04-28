import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from '@src/app/modules/categories/categories-routing.module';
import { CategoriesListComponent } from '@src/app/modules/categories/components/categories-list/categories-list.component';
import { SharedModule } from '@src/app/shared/shared.module';
import { CategoryCardComponent } from '@src/app/modules/categories/components/category-card/category-card.component';
import { CategoriesFormComponent } from '@src/app/modules/categories/components/categories-form/categories-form.component';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoryCardComponent,
    CategoriesFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
