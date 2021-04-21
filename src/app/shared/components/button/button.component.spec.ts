import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set corret button text', () => {
    component.text = 'any_text';
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.button');

    expect(button.textContent).toEqual('any_text');
  });

  it('should add primary class if no type is provided', () => {
    const button = fixture.debugElement.nativeElement.querySelector('.button');

    expect(button.classList).toContain('primary');
  });

  it('should add type class if type is provided', () => {
    component.type = 'any_class';
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.button');

    expect(button.classList).toContain('any_class');
  });

  it('should disable if disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('.button');

    expect(button.disabled).toBeTruthy();
  });
});
