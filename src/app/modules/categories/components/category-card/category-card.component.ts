import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '@src/app/modules/categories/models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {

  @Input('category')
  public category: Category;

  @Output()
  public remove: EventEmitter<Category> = new EventEmitter<Category>();

  public showMenu: boolean = false;

  constructor() { }

  public toggleShowMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public editCategory(): void {
    return;
  }

  public removeCategory(): void {
    this.remove.emit(this.category);
  }

}
