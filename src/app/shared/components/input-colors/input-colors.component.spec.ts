import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { InputColorsComponent } from './input-colors.component';

describe('InputColorsComponent', () => {
  let component: InputColorsComponent;
  let fixture: ComponentFixture<InputColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputColorsComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('any_color', [Validators.required]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all options', () => {
    const colors = fixture.debugElement.nativeElement.querySelectorAll('.input-colors_options span');

    expect(colors.length).toBe(10);
  });

  it('should emit changed value', (done) => {
    component.setValue.subscribe({
      next: (value: any) => {
        expect(value).toBeTruthy();
        expect(value).toEqual('#F2D600');
        done();
      },
      error: () => done.fail()
    });

    const colors = fixture.debugElement.nativeElement.querySelectorAll('.input-colors_options span');
    colors[1].click();
    fixture.detectChanges();
  });
});
