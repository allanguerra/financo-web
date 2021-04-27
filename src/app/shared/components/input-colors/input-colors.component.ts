import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { COLORS } from '@src/app/shared/dictionaries/colors.dictionary';

@Component({
  selector: 'app-input-colors',
  templateUrl: './input-colors.component.html',
  styleUrls: ['./input-colors.component.scss']
})
export class InputColorsComponent implements OnInit {

  @Input('control')
  public control: FormControl;

  @Output()
  public setValue: EventEmitter<string> = new EventEmitter<string>();

  public open: boolean = false;
  public readonly colors: Array<any> = COLORS;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleOptions(): void {
    this.open = !this.open;
  }

  public changeValue(hex: string): void {
    this.setValue.emit(hex);
    this.toggleOptions();
  }

  public getSelectedValue(): any {
    const selectedColorHex = this.control.value;
    if (!selectedColorHex) {
      return { name: 'selecione', hex: '' };
    }

    return this.colors.filter(color => color.hex === selectedColorHex)[0];
  }
}
