import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public pieChartLabels = ['mayo', 'junio', 'julio', 'agosto', 'septiembre'];
  public pieChartDatasets = [
    {
      data: [1.6, 1.5, 1.3, 2.5, 1.0],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {}
}
