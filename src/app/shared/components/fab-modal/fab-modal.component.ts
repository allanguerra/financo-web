import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '@src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-fab-modal',
  templateUrl: './fab-modal.component.html',
  styleUrls: ['./fab-modal.component.scss']
})
export class FabModalComponent extends ModalComponent implements OnInit {

  constructor(
    protected readonly injector: Injector,
    private readonly router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public navigateTo(path: string): void {
    this.router.navigate(['home', path]);
    this.closeModal();
  }

  // LISTENER METHODS

  @HostListener('window:keydown.escape')
  public escapePressed(): void {
    this.closeModal();
  }

}
