import { FormGroup } from '@angular/forms';

export function isPasswordsValid(formGroup: FormGroup): void {
  const newPassword = formGroup.get('newPassword');
  const repeatPassword = formGroup.get('repeatPassword');

  if (newPassword.value !== repeatPassword.value) {
    repeatPassword.setErrors({ notMatch: true });
  }
}