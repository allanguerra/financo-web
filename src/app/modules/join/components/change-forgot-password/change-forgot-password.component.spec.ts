import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgotService } from '@src/app/modules/join/services/forgot-service/forgot.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { of } from 'rxjs';

import { ChangeForgotPasswordComponent } from './change-forgot-password.component';

describe('ChangeForgotPasswordComponent', () => {
  let component: ChangeForgotPasswordComponent;
  let fixture: ComponentFixture<ChangeForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ChangeForgotPasswordComponent, ButtonComponent, InputComponent ],
      providers: [
        ForgotService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { forgotId: 'any_forgot_id' } } }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify forgot status when init', () => {
    const forgotSpy = jest.spyOn(ForgotService.prototype, 'verifyForgotStatus')
      .mockReturnValueOnce(of('active'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(forgotSpy).toHaveBeenCalledTimes(1);
    expect(forgotSpy).toHaveBeenCalledWith('any_forgot_id');
  });

  it('should show back button and expired message if forgot status is different than active', () => {
    jest.spyOn(ForgotService.prototype, 'verifyForgotStatus')
      .mockReturnValueOnce(of('expired'));

    component.ngOnInit();
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.button');
    const text = fixture.debugElement.nativeElement.querySelector('.helper-page_content-text');

    expect(button.textContent).toEqual('Voltar');
    expect(text.textContent).toEqual('A solicitação de redifinição de senha está expirada, por favor solicite novamente a alteração.');
  });

  it('should show change password form if forgot status is equal active', () => {
    jest.spyOn(ForgotService.prototype, 'verifyForgotStatus')
      .mockReturnValueOnce(of('active'));

    component.ngOnInit();
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.button');

    expect(button.textContent).toEqual('Redefinir senha');
  });

  it('should change password if forgot status is equal active', () => {
    jest.spyOn(ForgotService.prototype, 'verifyForgotStatus')
      .mockReturnValueOnce(of('active'));

    const forgotSpy = jest.spyOn(ForgotService.prototype, 'changeForgotPassword')
      .mockReturnValueOnce(of(null));

    component.ngOnInit();
    fixture.detectChanges();

    component.modelForm.get('password').setValue('Any_psw0');
    component.modelForm.get('confirmPassword').setValue('Any_psw0');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.button');
    button.click();

    expect(forgotSpy).toHaveBeenCalledTimes(1);
    expect(forgotSpy).toHaveBeenCalledWith('any_forgot_id', {password: 'Any_psw0', confirmPassword: 'Any_psw0'});
  });
});
