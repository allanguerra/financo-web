import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Credentials } from '@src/app/modules/join/models/credentials.model';
import { LoginService } from '@src/app/modules/join/services/login-service/login.service';
import { BaseJoinComponent } from '@src/app/shared/base-components/base-join/base-join.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends BaseJoinComponent implements OnInit {

  constructor(
    protected readonly injector: Injector,
    private readonly loginService: LoginService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public login(): void {
    if (this.modelForm.valid) {
      const credentials: Credentials = Object.assign(new Credentials(), this.modelForm.value);
      this.loginService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        }
      });
    }
  }

  // LISTENER METHODS

  @HostListener('window:resize')
  protected onResize(): void {
    this.resizing();
  }

  @HostListener('window:keydown.enter')
  protected onKeydow(event): void {
    this.login();
  }

  // PROTECTED METHODS

  protected buildModelForm(): void {
    this.modelForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

}
