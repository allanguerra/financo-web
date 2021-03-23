import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from '@src/app/modules/join/services/login-service/login.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { LoginComponent } from '@src/app/modules/join/components/login/login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ LoginComponent, ButtonComponent, InputComponent ],
      providers: [ LoginService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show invalid email error message and disable button', () => {
    const signupSpy = jest.spyOn(LoginService.prototype, 'login')
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

  it('should call login service', () => {
    const signupSpy = jest.spyOn(LoginService.prototype, 'login')
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
