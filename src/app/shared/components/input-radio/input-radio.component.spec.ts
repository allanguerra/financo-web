import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioOption } from '@src/app/shared/models/radio-option.model';

import { InputRadioComponent } from './input-radio.component';

describe('InputRadioComponent', () => {
  let component: InputRadioComponent;
  let fixture: ComponentFixture<InputRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all options', () => {
    component.options = fixtureOptions();
    fixture.detectChanges();

    const options = fixture.debugElement.nativeElement.querySelectorAll('.input-radio_option');

    expect(options.length).toBe(3);
  });

  it('should emit changed value', (done) => {
    component.options = fixtureOptions();
    fixture.detectChanges();

    component.setValue.subscribe({
      next: (value: any) => {
        expect(value).toBeTruthy();
        expect(value).toEqual('any_value_2');
        done();
      },
      error: () => done.fail()
    });

    const options = fixture.debugElement.nativeElement.querySelectorAll('.input-radio_option');
    options[1].click();
    fixture.detectChanges();
  });
});

function fixtureOptions(): Array<RadioOption> {
  return [
    { label: 'any_label_1', value: 'any_value_1' },
    { label: 'any_label_2', value: 'any_value_2' },
    { label: 'any_label_3', value: 'any_value_3' }
  ];
}
