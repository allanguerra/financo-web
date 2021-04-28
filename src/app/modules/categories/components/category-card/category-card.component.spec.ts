import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Category } from '@src/app/modules/categories/models/category.model';
import { CategoryType } from '@src/app/shared/enums/category-type.enum';
import { Colors } from '@src/app/shared/enums/colors.enum';

import { CategoryCardComponent } from './category-card.component';

describe('CategoryCardComponent', () => {
  let component: CategoryCardComponent;
  let fixture: ComponentFixture<CategoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu when click on menu icon', () => {
    const menuButton = fixture.debugElement.nativeElement.querySelector('.fas.fa-ellipsis-v');
    menuButton.click();
    fixture.detectChanges();

    expect(component.showMenu).toBe(true);
  });

  it('should emit remove event when click on remove icon', (done) => {
    component.category = fixtureCategory();
    const removeIcon = fixture.debugElement.nativeElement.querySelector('.fas.fa-trash');

    component.remove.subscribe({
      next: (category: Category) => {
        expect(category._id).toEqual('any_id');
        expect(category.name).toEqual('any_name');
        expect(category.description).toEqual('any_description');
        expect(category.color).toEqual('#344563');
        expect(category.type).toEqual('expense');
        done();
      },
      error: () => done.fail()
    });

    removeIcon.click();
    fixture.detectChanges();
  });
});

function fixtureCategory(): Category {
  return {
    _id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    color: Colors.BLACK,
    type: CategoryType.EXPENSE,
    getType: () => 'DESPESAS'
  };
}
