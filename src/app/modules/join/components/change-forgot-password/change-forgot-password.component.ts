import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from '@src/app/modules/join/models/change-password.model';

import { ForgotService } from '@src/app/modules/join/services/forgot-service/forgot.service';
import { joinDictionary } from '@src/app/shared/dictionaries/join.dictionary';
import { ForgotStatus } from '@src/app/shared/enums/forgot-status.enum';
import { REGEX } from '@src/app/utils/consts';
import { isPasswordsValid } from '@src/app/utils/validators/password-match.validator';

@Component({
  selector: 'app-change-forgot-password',
  templateUrl: './change-forgot-password.component.html'
})
export class ChangeForgotPasswordComponent implements OnInit {

  public title: string = 'Redefinir senha de acesso';
  public text: string = 'Aguarde um instante, estamos verificando a solicitação de alteração de senha...';
  public passwordTooltip = joinDictionary.passwordTolltip;

  public verifing = true;
  public expired = true;
  public submiting = false;

  public modelForm: FormGroup;

  private forgotId: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly forgotService: ForgotService
  ) { }

  ngOnInit(): void {
    this.buildModelForm();
    this.getForgotId();
    this.verifyForgotStatus();
  }

  public changePassword(): void {
    this.submiting = true;
    const changePassword: ChangePassword = Object.assign(new ChangePassword(), this.modelForm.value);

    this.forgotService.changeForgotPassword(this.forgotId, changePassword).subscribe({
      next: () => this.router.navigate(['/join/login']),
      complete: () => this.submiting = false
    });
  }

  public back(): void {
    this.router.navigate(['/join/login']);
  }

  // PRIVATE METHODS

  private getForgotId(): void {
    this.forgotId = this.route.snapshot.params.forgotId;
  }

  private verifyForgotStatus(): void {
    this.forgotService.verifyForgotStatus(this.forgotId).subscribe({
      next: (status: ForgotStatus) => {
        if (status !== ForgotStatus.ACTIVE) {
          this.text = 'A solicitação de redifinição de senha está expirada, por favor solicite novamente a alteração.';
          this.expired = true;
        } else {
          this.text = '';
          this.expired = false;
        }
      },
      error: () => {
        this.text = 'A solicitação de redifinição de senha está expirada, por favor solicite novamente a alteração.';
        this.expired = true;
      },
      complete: () => this.verifing = false
    });
  }

  private buildModelForm(): void {
    this.modelForm = this.fb.group({
      newPassword: [null, [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
      repeatPassword: [null, [Validators.required]]
    }, { validator: isPasswordsValid });
  }

}
