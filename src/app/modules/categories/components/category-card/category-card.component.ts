import { Component, Input } from '@angular/core';
import { Category } from '@src/app/modules/categories/modals/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {

  @Input('category')
  public category: Category;

  public showMenu: boolean = false;

  constructor() { }

  public toggleShowMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public editCategory(): void {
    return;
  }

  public removeCategory(): void {
    return;
  }

}
