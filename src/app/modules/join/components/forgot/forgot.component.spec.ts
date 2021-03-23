import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { ForgotComponent } from '@src/app/modules/join/components/forgot/forgot.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      declarations: [ ForgotComponent, ButtonComponent, InputComponent ]
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
});
