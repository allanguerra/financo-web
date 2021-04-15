import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Signup } from '@src/app/modules/join/models/signup.model';
import { SignupService } from '@src/app/modules/join/services/signup-service/signup.service';
import { BaseJoinComponent } from '@src/app/shared/base-components/base-join/base-join.component';
import { joinDictionary } from '@src/app/shared/dictionaries/join.dictionary';
import { REGEX } from '@src/app/utils/consts';
import { Messages } from '@src/app/utils/messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent extends BaseJoinComponent implements OnInit {

  public passwordTooltip = joinDictionary.passwordTolltip;

  constructor(
    protected injector: Injector,
    private readonly signupService: SignupService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  // TODO: adicionar tratamento para exibir mensagem quando clicar sem informar os dados para sign up
  public signup(): void {
    const signup: Signup = Object.assign(new Signup(), this.modelForm.value);

    this.signupService.signup(signup).subscribe({
      next: () => {
        this.messagesService.notify(Messages.SIGNUP_SUCCESS);
        this.router.navigate(['/join/login']);
      }
    });
  }

  // LISTENER METHODS

  @HostListener('window:resize')
  protected onResize(): void {
    this.resizing();
  }

  // PROTECTED METHODS

  protected buildModelForm(): void {
    this.modelForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(REGEX.PASSWORD)]]
    });
  }

}
