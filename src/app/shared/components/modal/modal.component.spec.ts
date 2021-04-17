import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from '@src/app/shared/components/modal/modal.component';
import { ModalService } from '@src/app/shared/services/modal-service/modal.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers: [ ModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show on init', (done) => {
    component.ngOnInit();

    setTimeout(() => {
      fixture.detectChanges();

      const modal = fixture.debugElement.nativeElement.querySelector('.modal');

      expect(modal).toBeTruthy();
      expect(modal.classList).toContain('show');

      done();
    }, 100);
  });

  it('should hide and close modal', (done) => {
    const modalServiceSpy = jest.spyOn(ModalService.prototype, 'closeModal').mockReturnValueOnce(null);

    const closeButton = fixture.debugElement.nativeElement.querySelector('.modal_container-close');
    closeButton.click();
    fixture.detectChanges();

    setTimeout(() => {
      const modal = fixture.debugElement.nativeElement.querySelector('.modal');

      expect(modal).toBeTruthy();
      expect(modal.classList).not.toContain('show');
      expect(modalServiceSpy).toHaveBeenCalledTimes(1);

      done();
    }, 200);
  });
});
