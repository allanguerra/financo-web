import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { CategoryCardComponent } from '@src/app/modules/categories/components/category-card/category-card.component';
import { Category } from '@src/app/modules/categories/models/category.model';
import { CategoriesListService } from '@src/app/modules/categories/services/categories-list-service/categories-list.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';
import { CategoryType } from '@src/app/shared/enums/category-type.enum';
import { Colors } from '@src/app/shared/enums/colors.enum';
import { of } from 'rxjs';

import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  let serviceMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CategoriesListService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { parent: { url: [{ path: 'categories' }] } } }
        }
      ],
      declarations: [
        CategoriesListComponent,
        CategoryCardComponent,
        LoadderComponent,
        ButtonComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    serviceMock = jest.spyOn(CategoriesListService.prototype, 'getAll')
      .mockReturnValue(of(fixtureCategoriesList()));

    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct page title', () => {
    fixture.detectChanges();

    const pageTitle = fixture.debugElement.nativeElement.querySelector('.list_header-title h2');

    expect(pageTitle.textContent).toEqual('Suas Categorias');
  });

  it('should get categories list', () => {
    fixture.detectChanges();

    const categories = fixture.debugElement.nativeElement.querySelectorAll('.card');

    expect(serviceMock).toHaveBeenCalledTimes(1);
    expect(categories.length).toBe(2);
  });
});

function fixtureCategoriesList(): Array<Category> {
  return [
    {
      _id: 'any_category_id_1',
      name: 'any_category_name_1',
      description: 'any_category_description_1',
      color: Colors.BLACK,
      type: CategoryType.REVENUE,
      getType: () => 'RECEITA'
    },
    {
      _id: 'any_category_id_2',
      name: 'any_category_name_2',
      description: 'any_category_description_2',
      color: Colors.BLACK,
      type: CategoryType.EXPENSE,
      getType: () => 'DESPESA'
    }
  ];
}
