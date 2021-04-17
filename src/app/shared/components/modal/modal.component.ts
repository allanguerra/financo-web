import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { ModalService } from '@src/app/shared/services/modal-service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public show: boolean = false;
  public closing: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected readonly modalService: ModalService;

  constructor(
    protected readonly injector: Injector
  ) {
    this.modalService = injector.get(ModalService);
  }

  ngOnInit(): void {
    this.showModal();
  }

  public closeModal(): void {
    this.show = false;
    setTimeout(() => this.modalService.closeModal(), 200);
  }

  // PROTECTED METHODS

  protected showModal(): void {
    setTimeout(() => this.show = true, 100);
  }

}
