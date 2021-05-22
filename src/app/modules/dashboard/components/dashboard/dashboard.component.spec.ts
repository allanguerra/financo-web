import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeCardComponent } from '@src/app/modules/dashboard/components/resume-card/resume-card.component';
import { Dashboard } from '@src/app/modules/dashboard/models/dashboard-model';
import { DashboardService } from '@src/app/modules/dashboard/services/dashboard-service/dashboard.service';
import { ChartComponent } from '@src/app/shared/components/chart/chart.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';
import { ChartModule } from 'primeng/chart';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ChartModule,
      ],
      declarations: [
        DashboardComponent,
        ResumeCardComponent,
        ChartComponent,
        LoadderComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
