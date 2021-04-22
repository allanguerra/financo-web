import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { ModalComponent } from '@src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent extends ModalComponent implements OnInit {

  public confirmType: string = '';
  public resourceTitle: string = '';

  public confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(readonly injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public chose(chose: boolean): void {
    this.confirm.emit(chose);
    this.closeModal();
  }

}
