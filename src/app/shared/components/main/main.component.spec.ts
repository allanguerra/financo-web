import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FabModalComponent } from '@src/app/shared/components/fab-modal/fab-modal.component';

import { MainComponent } from '@src/app/shared/components/main/main.component';
import { ModalService } from '@src/app/shared/services/modal-service/modal.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ MainComponent, MockFabComponent, MockNavComponent ],
      providers: [ ModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when click on fab button', () => {
    const modalServiceSpy = jest.spyOn(ModalService.prototype, 'openModal').mockReturnValueOnce(null);

    const fabButton = fixture.debugElement.nativeElement.querySelector('app-fab');
    fabButton.click();
    fixture.detectChanges();

    expect(modalServiceSpy).toHaveBeenCalledTimes(1);
    expect(modalServiceSpy).toHaveBeenCalledWith(FabModalComponent);
  });
});

@Component({ selector: 'app-nav', template: '' })
class MockNavComponent {}

@Component({ selector: 'app-fab', template: '' })
class MockFabComponent {}
