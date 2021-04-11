import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button class="button" [type]="type" [ngClass]="style" [disabled]="disabled" (click)="click()">{{text}}</button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input('text')
  public text: string;

  @Input('click')
  public click: () => void;

  @Input('type')
  public type: string = 'button';

  @Input('style')
  public style: string = 'primary';

  @Input('disabled')
  public disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
