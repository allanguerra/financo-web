import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input('label')  public label: string;
  @Input('control') public control: FormControl;
  @Input('type') public type: string = 'default';
  @Input('dark') public dark: boolean = false;
  @Input('tooltip') public tooltip: string;

  public show: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  public hasError(): boolean {
    if (this.control) {
      return this.control.invalid && this.control.touched;
    }
    return false;
  }

  public getMessage(): string | null {
    if (this.control) {
      if (this.control.errors && this.control.errors.required) {
        return 'campo obrigatório';
      } else if (this.control.errors && this.control.errors.email) {
        return 'não é um email válido';
      } else if (this.control.errors && this.control.errors.pattern) {
        return 'o formato é inválido';
      } else if (this.control.errors && this.control.errors.minlength) {
        return `mínimo de ${this.control.errors.minlength.requiredLength} caracteres`;
      } else if (this.control.errors && this.control.errors.notMatch) {
        return `as senhas são diferentes`;
      }
    }
    return null;
  }

  public showTooltip(): void {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
      setTimeout(() => { this.show = false; }, 4000);
    }
  }
}
