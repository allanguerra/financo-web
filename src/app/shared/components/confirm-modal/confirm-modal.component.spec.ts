import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { ModalComponent } from '@src/app/shared/components/modal/modal.component';

import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmModalComponent,
        ModalComponent,
        ButtonComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true if confirm button is clicked', (done) => {
    component.confirm.subscribe({
      next: (chose: boolean) => {
        expect(chose).toBe(true);
        done();
      },
      error: () => done.fail()
    });

    const confirmButton = fixture.debugElement.nativeElement.querySelector('#confirm_button');
    confirmButton.click();
    fixture.detectChanges();
  });

  it('should emit false if cancel button is clicked', (done) => {
    component.confirm.subscribe({
      next: (chose: boolean) => {
        expect(chose).toBe(false);
        done();
      },
      error: () => done.fail()
    });

    const confirmButton = fixture.debugElement.nativeElement.querySelector('#cancel_button');
    confirmButton.click();
    fixture.detectChanges();
  });
});
