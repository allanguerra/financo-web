import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoriesFormService } from '@src/app/modules/categories/services/categories-form-service/categories-form.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputColorsComponent } from '@src/app/shared/components/input-colors/input-colors.component';
import { InputRadioComponent } from '@src/app/shared/components/input-radio/input-radio.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { of } from 'rxjs';

import { CategoriesFormComponent } from './categories-form.component';

describe('CategoriesFormComponent', () => {
  let component: CategoriesFormComponent;
  let fixture: ComponentFixture<CategoriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        MessagesService,
        CategoriesFormService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: [ { path: 'new' } ], parent: { url: [ { path: 'categories' } ] } } }
        }
      ],
      declarations: [
        CategoriesFormComponent,
        InputComponent,
        InputRadioComponent,
        InputColorsComponent,
        ButtonComponent,
        LoadderComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set corret page title', () => {
    const pageTitle = fixture.debugElement.nativeElement.querySelector('.form_header-title h2');
    expect(pageTitle.textContent).toEqual('Nova Categoria');
  });

  it('should set input radio options', () => {
    const radioButtons = fixture.debugElement.nativeElement.querySelectorAll('.input-radio_option');

    expect(radioButtons.length).toBe(3);
    expect(radioButtons[0].textContent).toEqual('RECEITA');
    expect(radioButtons[1].textContent).toEqual('AMBOS');
    expect(radioButtons[2].textContent).toEqual('DESPESA');
  });

  it('should disable submit button if form is invalid', () => {
    const serviceSpy = jest.spyOn(CategoriesFormService.prototype, 'store').mockReturnValueOnce(of(null));

    const submitButton = fixture.debugElement.nativeElement.querySelectorAll('.button')[1];
    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should enable submit button if form is valid and call service to store', () => {
    const serviceSpy = jest.spyOn(CategoriesFormService.prototype, 'store').mockReturnValueOnce(of(null));

    component.modelForm.get('name').setValue('any_name');
    component.modelForm.get('color').setValue('any_color');
    component.modelForm.get('type').setValue('any_type');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.nativeElement.querySelectorAll('.button')[1];
    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith({
      _id: null,
      name: 'any_name',
      description: null,
      color: 'any_color',
      type: 'any_type'
    });
  });
});
