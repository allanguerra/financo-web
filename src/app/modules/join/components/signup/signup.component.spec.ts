import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from '@src/app/modules/join/components/signup/signup.component';
import { SignupService } from '@src/app/modules/join/services/signup-service/signup.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ SignupComponent, InputComponent, ButtonComponent ],
      providers: [ SignupService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show invalid email error message and disable button', () => {
    const signupSpy = jest.spyOn(SignupService.prototype, 'signup')
      .mockImplementationOnce(() => of());

    component.ngOnInit();

    component.modelForm.get('email').setValue('invalid_email');
    component.modelForm.get('password').setValue('Any_psw0');
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.nativeElement.querySelector('.input-error');
    const signupButton = fixture.debugElement.nativeElement.querySelector('.button');
    signupButton.click();
    fixture.detectChanges();

    expect(errorMessage.textContent).toEqual('não é um email válido');
    expect(signupButton.disabled).toBe(true);
    expect(signupSpy).not.toHaveBeenCalled();
  });

  it('should show invalid password error message and disable button', () => {
    const signupSpy = jest.spyOn(SignupService.prototype, 'signup')
      .mockImplementationOnce(() => of());

    component.ngOnInit();

    component.modelForm.get('email').setValue('any_email@email.com');
    component.modelForm.get('password').setValue('invalid');
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.nativeElement.querySelectorAll('.input-error')[1];
    const signupButton = fixture.debugElement.nativeElement.querySelector('.button');
    signupButton.click();
    fixture.detectChanges();

    expect(errorMessage.textContent).toEqual('o formato é inválido');
    expect(signupButton.disabled).toBe(true);
    expect(signupSpy).not.toHaveBeenCalled();
  });

  it('should call signup service', () => {
    const signupSpy = jest.spyOn(SignupService.prototype, 'signup')
      .mockImplementationOnce(() => of());

    component.ngOnInit();

    component.modelForm.get('email').setValue('any_email@email.com');
    component.modelForm.get('password').setValue('Any_psw0');
    fixture.detectChanges();

    const signupButton = fixture.debugElement.nativeElement.querySelector('.button');
    signupButton.click();
    fixture.detectChanges();

    expect(signupSpy).toHaveBeenCalledTimes(1);
    expect(signupSpy).toHaveBeenCalledWith({ email: 'any_email@email.com', password: 'Any_psw0' });
  });
});
