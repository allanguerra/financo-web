import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from '@src/app/modules/categories/models/category.model';
import { ExpensesFormComponent } from '@src/app/modules/expenses/component/expenses-form/expenses-form.component';
import { ExpensesFormService } from '@src/app/modules/expenses/services/expenses-form-service/expenses-form.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputRadioComponent } from '@src/app/shared/components/input-radio/input-radio.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';
import { CategoryType } from '@src/app/shared/enums/category-type.enum';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { SESSION } from '@src/app/utils/consts';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import { of } from 'rxjs';


describe('ExpensesFormComponent', () => {
  let component: ExpensesFormComponent;
  let fixture: ComponentFixture<ExpensesFormComponent>;
  let categoriesSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarModule,
        IMaskModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        ExpensesFormComponent,
        ButtonComponent,
        InputComponent,
        InputRadioComponent,
        LoadderComponent
      ],
      providers: [
        MessagesService,
        ExpensesFormService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: [ { path: 'new' } ], parent: { url: [ { path: 'expenses' } ] } } }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    sessionStorage.setItem(SESSION.ACTIVE_BOARD, 'any_board_id');
    categoriesSpy = jest.spyOn(ExpensesFormService.prototype, 'getCategories')
      .mockReturnValueOnce(of(fixtureCategories()));

    fixture = TestBed.createComponent(ExpensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set corret page title', () => {
    const pageTitle = fixture.debugElement.nativeElement.querySelector('.form_header-title h2');
    expect(pageTitle.textContent).toEqual('Lançar Despesa');
  });

  it('should disable submit button if form is invalid', () => {
    const serviceSpy = jest.spyOn(ExpensesFormService.prototype, 'store').mockReturnValueOnce(of(null));

    const submitButton = fixture.debugElement.nativeElement.querySelectorAll('.button')[1];
    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should enable submit button if form is valid and call service to store', () => {
    const serviceSpy = jest.spyOn(ExpensesFormService.prototype, 'store').mockReturnValueOnce(of(null));
    const now = new Date();

    component.modelForm.get('title').setValue('any_title');
    component.modelForm.get('category').setValue('any_category');
    component.modelForm.get('value').setValue(10);
    component.modelForm.get('paymentStatus').setValue('paid');
    component.modelForm.get('expirationDate').setValue(now);
    component.modelForm.get('recurrent').setValue(false);
    fixture.detectChanges();

    const submitButton = fixture.debugElement.nativeElement.querySelectorAll('.button')[1];
    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith({
      _id: null,
      title: 'any_title',
      description: null,
      category: 'any_category',
      value: 10,
      paymentStatus: 'paid',
      expirationDate: now,
      recurrent: false,
      recurrentTimes: null
    });
  });
});

function fixtureCategories(): Array<Category> {
  return [
    {
      name: 'any_category',
      description: 'any_description',
      color: 'any_color',
      type: CategoryType.EXPENSE,
      getType: () => 'despesa'
    }
  ];
}
