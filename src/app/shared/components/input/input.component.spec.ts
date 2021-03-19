import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { InputComponent } from '@src/app/shared/components/input/input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;

    component.control = new FormControl(null, [Validators.required]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add dark class if dark is true', () => {
    component.dark = true;
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('.input');

    expect(input.classList).toContain('dark');
  });

  it('should not add dark class if dark is false', () => {
    component.dark = false;
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('.input');

    expect(input.classList).not.toContain('dark');
  });

  it('should set correct label', () => {
    component.label = 'any_label';
    fixture.detectChanges();

    const inputLabel = fixture.debugElement.nativeElement.querySelector('.input .input-label');

    expect(inputLabel.textContent).toEqual('any_label');
  });

  it('should show input-error if control is invalid', () => {
    component.control.markAsTouched();
    component.hasError();
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('.input');

    expect(input.classList).toContain('error');
  });
});
