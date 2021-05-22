import { Component, Input, OnInit } from '@angular/core';
import { MonthResume } from '@src/app/modules/dashboard/models/month-resume.model';

@Component({
  selector: 'app-resume-card',
  templateUrl: './resume-card.component.html'
})
export class ResumeCardComponent implements OnInit {

  @Input()
  public resume: MonthResume;

  constructor() { }

  ngOnInit(): void {
  }

  public getExpensesDiff(): string {
    const diff = (100 * this.resume.expenses) / this.resume.revenues;
    return `${diff}%`;
  }
}
