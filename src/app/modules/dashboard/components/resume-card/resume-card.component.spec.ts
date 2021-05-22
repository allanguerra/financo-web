import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthResume } from '@src/app/modules/dashboard/models/month-resume.model';

import { ResumeCardComponent } from './resume-card.component';

describe('ResumeCardComponent', () => {
  let component: ResumeCardComponent;
  let fixture: ComponentFixture<ResumeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeCardComponent);
    component = fixture.componentInstance;
    component.resume = fixtureResume();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set onWallet value', () => {
    const expensesValueLabel = fixture.debugElement.nativeElement.querySelectorAll('.card-wallet_content_value')[0];

    expect(expensesValueLabel).toBeTruthy();
    expect(expensesValueLabel.textContent).toEqual('R$990.00');
  });

  it('should set revenues value', () => {
    const expensesValueLabel = fixture.debugElement.nativeElement.querySelectorAll('.card-wallet_content_value')[1];

    expect(expensesValueLabel).toBeTruthy();
    expect(expensesValueLabel.textContent).toEqual('R$1,000.00');
  });

  it('should set expenses value', () => {
    const expensesValueLabel = fixture.debugElement.nativeElement.querySelectorAll('.card-wallet_content_value')[2];

    expect(expensesValueLabel).toBeTruthy();
    expect(expensesValueLabel.textContent).toEqual('R$10.00');
  });
});

function fixtureResume(): MonthResume {
  return {
    revenues: 1000,
    expenses: 10,
    onWallet: 990,
  };
}
