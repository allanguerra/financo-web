import { Component, OnInit } from '@angular/core';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
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
    private readonly dashboardService: DashboardService,
    private readonly boardsService: BoardsService
  ) { }

  ngOnInit(): void {
    this.getDashboard();
    this.listenActiveBoardChanges();
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

  private listenActiveBoardChanges(): void {
    this.boardsService.activeBoardChanges.subscribe({
      next: (_: string) => this.getDashboard()
    });
  }
}
