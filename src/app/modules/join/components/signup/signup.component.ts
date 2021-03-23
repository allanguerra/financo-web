import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Signup } from '@src/app/modules/join/models/signup.model';
import { SignupService } from '@src/app/modules/join/services/signup-service/signup.service';
import { BaseJoinComponent } from '@src/app/shared/base-components/base-join/base-join.component';
import { REGEX } from '@src/app/utils/consts';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent extends BaseJoinComponent implements OnInit {

  // TODO: extrair strings para um dictionary
  public passwordTooltip = 'A senha deve conter: No mínimo 6 caracteres; No maximo 10 caracteres; Ao menos um caractere especial; Ao menos uma letra maiúscula; Ao menos um número.';

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
        // TODO: criar pagina para validação de e-mail.
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
