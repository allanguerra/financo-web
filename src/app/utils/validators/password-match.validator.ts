import { FormGroup } from '@angular/forms';

export function isPasswordsValid(formGroup: FormGroup): void {
  const newPassword = formGroup.get('password');
  const repeatPassword = formGroup.get('confirmPassword');

  if (newPassword.value !== repeatPassword.value) {
    repeatPassword.setErrors({ notMatch: true });
  }
}