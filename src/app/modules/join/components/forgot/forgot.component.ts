import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseJoinComponent } from '@src/app/shared/base-components/base-join/base-join.component';
import { Forgot } from '@src/app/modules/join/models/forgot.model';
import { ForgotService } from '@src/app/modules/join/services/forgot-service/forgot.service';
import { Messages } from '@src/app/utils/messages';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent extends BaseJoinComponent implements OnInit {

  constructor(
    protected readonly injector: Injector,
    private readonly forgotService: ForgotService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public rememberMe(): void {
    const forgot = Object.assign(new Forgot(), this.modelForm.value);

    this.forgotService.registerForgot(forgot).subscribe({
      next: () => {
        this.messagesService.notify(Messages.FORGOT_EMAIL_SENT);
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
      email: [null, [Validators.required, Validators.email]]
    });
  }
}
