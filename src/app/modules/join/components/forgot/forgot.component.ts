import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseJoinComponent } from '@src/app/shared/base-components/base-join/base-join.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent extends BaseJoinComponent implements OnInit {

  constructor(
    protected readonly injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public rememberMe(): void {
    // TODO: criar serviço no backend
    return;
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
