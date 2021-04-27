import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RadioOption } from '@src/app/shared/models/radio-option.model';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent implements OnInit {

  @Input('options')
  public options: Array<RadioOption> = [];

  @Input('control')
  public control: FormControl;

  @Output()
  public setValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public changeValue(value: string): void {
    this.setValue.emit(value);
  }

}
