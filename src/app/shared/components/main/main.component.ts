import { Component, OnInit } from '@angular/core';
import { FabModalComponent } from '@src/app/shared/components/fab-modal/fab-modal.component';
import { ModalService } from '@src/app/shared/services/modal-service/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  public openModal(): void {
    const modal: FabModalComponent = this.modalService.openModal(FabModalComponent);
  }

}
