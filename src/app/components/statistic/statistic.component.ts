import { Component, DoCheck, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrenciesListService } from 'src/app/services/currenciesList.service';

// import { default as Annotation } from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit, DoCheck {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  dataSet = [];
  dateNow:string = new Date().toLocaleDateString();
  min: number = 36.91;
  avg: number = 37.00;
  max: number = 37.07;
  previos: string[];
  
  constructor(private currenciesService: CurrenciesListService) {
    this.previos = this.currentCurrencies;
   }
  ngDoCheck(): void {
    if (this.currentCurrencies[0] !== this.previos[0] || this.currentCurrencies[1] !== this.previos[1]) {
      this.update();
      this.update();
      this.updateExtrems()
    }
  }

  ngOnInit(): void {
    this.dataSet = this.currenciesService.getStatistic(this.getWeekDates());
    setTimeout(() => {
      this.update();
      this.update();
      this.updateExtrems();
    }, 5000);
  }
  
  @Input() currentCurrencies: string[] = ["USD", "UAH"];

  //Canvas
  public lineChartData: ChartConfiguration["data"] = {
    datasets: [
      {
        data: this.getRates(this.currentCurrencies, this.dataSet).length ? this.getRates(this.currentCurrencies, this.dataSet) : [36.95, 36.91, 36.93, 37.07, 37.07, 36.86, 36.95],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: this.getDates()
  }
  public lineChartOptions: ChartConfiguration["options"] = {
    plugins: {
      legend: { display: false }
    }
  }
  public lineChartType: ChartType = "line";

  //Functions
  getWeekDates(): string[] {
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toJSON().substring(0, 10));
    }
    return dates;
  }
  getRates(currencies: string[], data: any): number[] {
    const arr: number[] = [];
    
    for (let el of data) {
      let rate: number = el[currencies[1]] / el[currencies[0]];
      arr.push(rate);
    }
    this.chart?.update();
    return arr;
  }
  getDates(): string[] {
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleString().substring(0, 5));
    }
    
    return dates;
  }
  update() {
    this.lineChartData.datasets[0].data = this.getRates(this.currentCurrencies, this.dataSet)
  }
  updateExtrems():void {
    const arr:number[] = this.getRates(this.currentCurrencies, this.dataSet);
    this.min = Math.min(...arr);
    this.max = Math.max(...arr);
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    this.avg = sum / arr.length;
  }
}
