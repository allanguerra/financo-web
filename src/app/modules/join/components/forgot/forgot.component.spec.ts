import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { ForgotComponent } from '@src/app/modules/join/components/forgot/forgot.component';
import { ForgotService } from '@src/app/modules/join/services/forgot-service/forgot.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ForgotComponent, ButtonComponent, InputComponent ],
      providers: [ ForgotService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show invalid email error message and disable button', () => {
    component.ngOnInit();

    component.modelForm.get('email').setValue('invalid_email');
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.nativeElement.querySelector('.input-error');
    const signupButton = fixture.debugElement.nativeElement.querySelector('.button');
    signupButton.click();
    fixture.detectChanges();

    expect(errorMessage.textContent).toEqual('não é um email válido');
    expect(signupButton.disabled).toBe(true);
  });

  it('should register forgot password when click on save button', () => {
    const forgotSpy = jest.spyOn(ForgotService.prototype, 'registerForgot')
      .mockReturnValueOnce(of(null));

    const emailInput = component.modelForm.get('email');
    emailInput.setValue('any_email@email.com');
    fixture.detectChanges();
    const saveButton = fixture.debugElement.nativeElement.querySelector('.button');
    saveButton.click();
    fixture.detectChanges();

    expect(forgotSpy).toHaveBeenCalledTimes(1);
    expect(forgotSpy).toHaveBeenCalledWith({ email: 'any_email@email.com' });
  });
});
