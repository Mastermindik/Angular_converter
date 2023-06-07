import { Component, OnInit } from '@angular/core';
import { CurrenciesListService } from './services/currenciesList.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  currenciesRates: any = {};
  constructor(private currenciesService: CurrenciesListService) { }
  ngOnInit(): void {
    this.currenciesService.getRates().subscribe(e => this.currenciesRates = e);
  }
  
}
