import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAvatarComponent } from './input-avatar.component';

describe('InputAvatarComponent', () => {
  let component: InputAvatarComponent;
  let fixture: ComponentFixture<InputAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
