import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Total } from '@src/app/modules/dashboard/models/total.model';
import { SIZES } from '@src/app/utils/consts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges, OnInit {

  @Input('data')
  public data: Array<Total> = [];

  @Input('title')
  public title: string;

  public chartData: any;

  private screenWidth: number;

  constructor() { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnChanges(): void {
    if (this.data && this.data.length > 0) {
      this.buildChartData();
    }
  }

  public setHeight(): string {
    return this.screenWidth < SIZES.MEDIUM_SCRREN_UP ? '40vh' : '20vh';
  }

  // PRIVATE METHODS

  private buildChartData(): void {
    this.chartData = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }]
    };
    this.data.forEach((data: Total) => {
      this.chartData.labels.push(data.category.name);
      this.chartData.datasets[0].data.push(data.total);
      this.chartData.datasets[0].backgroundColor.push(data.category.color);
      this.chartData.datasets[0].hoverBackgroundColor.push(data.category.color);
    });
  }

  @HostListener('window:resize')
  private resizing(): void {
    this.screenWidth = window.innerWidth;
  }

}
