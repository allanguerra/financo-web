import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from '@src/app/shared/components/modal/modal.component';
import { ModalService } from '@src/app/shared/services/modal-service/modal.service';

import { FabModalComponent } from './fab-modal.component';

describe('FabModalComponent', () => {
  let component: FabModalComponent;
  let fixture: ComponentFixture<FabModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabModalComponent, ModalComponent ],
      providers: [ ModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
