import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioOption } from '@src/app/shared/models/radio-option.model';

import { InputRadioCircleComponent } from './input-radio-circle.component';

describe('InputRadioCircleComponent', () => {
  let component: InputRadioCircleComponent;
  let fixture: ComponentFixture<InputRadioCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRadioCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRadioCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all options', () => {
    component.options = fixtureOptions();
    fixture.detectChanges();

    const options = fixture.debugElement.nativeElement.querySelectorAll('.input-radio-circle_option');

    expect(options.length).toBe(3);
  });
});

function fixtureOptions(): Array<RadioOption> {
  return [
    { label: 'any_label_1', value: 'any_value_1' },
    { label: 'any_label_2', value: 'any_value_2' },
    { label: 'any_label_3', value: 'any_value_3' }
  ];
}
