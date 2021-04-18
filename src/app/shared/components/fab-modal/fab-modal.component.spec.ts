import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from '@src/app/shared/components/modal/modal.component';
import { ModalService } from '@src/app/shared/services/modal-service/modal.service';

import { FabModalComponent } from './fab-modal.component';

describe('FabModalComponent', () => {
  let component: FabModalComponent;
  let fixture: ComponentFixture<FabModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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

  it('should redirect to categories and close modal', (done) => {
    const navigateSpy = jest.spyOn(Router.prototype, 'navigate').mockReturnValueOnce(null);
    const modalServiceSpy = jest.spyOn(ModalService.prototype, 'closeModal').mockReturnValueOnce(null);

    const categoriesButton = fixture.debugElement.nativeElement.querySelector('#categoriesButton');
    categoriesButton.click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith(['home', 'categories']);
      expect(modalServiceSpy).toHaveBeenCalledTimes(1);

      done();
    }, 200);
  });
});
