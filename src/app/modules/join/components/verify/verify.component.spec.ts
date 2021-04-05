import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { VerifyEmailService } from '@src/app/modules/join/services/verify-email-service/verify-email.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { of, throwError } from 'rxjs';

import { VerifyComponent } from './verify.component';

describe('VerifyComponent', () => {
  let component: VerifyComponent;
  let fixture: ComponentFixture<VerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ VerifyComponent, ButtonComponent ],
      providers: [
        VerifyComponent,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { userId: 'any_user_id' } } }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show fail message if verify email service return error', () => {
    const verifyEmailSpy = jest.spyOn(VerifyEmailService.prototype, 'verifyEmail')
      .mockReturnValueOnce(throwError('any error'));

    component.ngOnInit();
    fixture.detectChanges();

    const title = fixture.debugElement.nativeElement.querySelector('.verify_content-title').textContent;
    const description = fixture.debugElement.nativeElement.querySelector('.verify_content-text').textContent;

    expect(verifyEmailSpy).toHaveBeenCalledTimes(1);
    expect(verifyEmailSpy).toHaveBeenCalledWith('any_user_id');
    expect(title).toEqual('Tivemos um problema.');
    expect(description).toEqual('Nos desculpe, tivemos um problema ao verificar o seu e-mail, por-favor tente novamente mais tarde.');
  });

  it('should show success message if verify email service return error', () => {
    const verifyEmailSpy = jest.spyOn(VerifyEmailService.prototype, 'verifyEmail')
      .mockReturnValueOnce(of(null));

    component.ngOnInit();
    fixture.detectChanges();

    const title = fixture.debugElement.nativeElement.querySelector('.verify_content-title').textContent;
    const description = fixture.debugElement.nativeElement.querySelector('.verify_content-text').textContent;

    expect(verifyEmailSpy).toHaveBeenCalledTimes(1);
    expect(verifyEmailSpy).toHaveBeenCalledWith('any_user_id');
    expect(title).toEqual('Parabéns seu e-mail foi verificado!');
    expect(description).toEqual('Agora você já pode acessar todos os recursos do Finan.CO e começar a controlar de vez as suas finanças.');
  });
});
