import { Component, OnInit } from '@angular/core';
import { Dashboard } from '@src/app/modules/dashboard/models/dashboard-model';
import { DashboardService } from '@src/app/modules/dashboard/services/dashboard-service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isLoading: boolean = false;

  public dashboard: Dashboard;

  private readonly currentDate: Date = new Date();

  constructor(
    private readonly dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getDashboard();
  }

  // PRIVATE METHODS

  private getDashboard(): void {
    this.isLoading = true;
    const params = { month: this.currentDate.getMonth() + 1, year: this.currentDate.getFullYear() };

    this.dashboardService.getDashboard(params).subscribe({
      next: (dashboard: Dashboard) => {
        this.dashboard = dashboard;
        this.isLoading = false;
      }
    });
  }

}
