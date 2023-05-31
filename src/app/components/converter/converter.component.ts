import { Component, OnInit } from '@angular/core';
import { CurrenciesListService } from 'src/app/services/currenciesList.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  currencies = {};
  currenciesRates: any = {};
  leftCurrency: string = "USD";
  rightCurrency: string = "UAH";
  leftCurrencyValue: number = NaN;
  rightCurrencyValue: number = NaN;

  constructor(private currenciesService: CurrenciesListService) { }

  ngOnInit(): void {
    this.currenciesService.getAllCurrencies().subscribe(c => this.currencies = c);
    // this.currenciesService.handleOptionSelected().subscribe(e => this.currenciesRates = e);
  }
  getObjectEntries(obj: any): any[] {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }

  onOptionSelect() {
    this.convertRightCurrency();
  }

  convertRightCurrency() {
    this.rightCurrencyValue = parseFloat((this.leftCurrencyValue * this.currenciesRates.rates[this.rightCurrency] / this.currenciesRates.rates[this.leftCurrency]).toFixed(2));
  }
  convertLeftCurrency() {
    this.leftCurrencyValue = parseFloat((this.rightCurrencyValue * this.currenciesRates.rates[this.leftCurrency] / this.currenciesRates.rates[this.rightCurrency]).toFixed(2));
  }
  swapCurrencies() {
    let bufer: any = this.leftCurrency;
    this.leftCurrency = this.rightCurrency;
    this.rightCurrency = bufer;
    bufer = this.leftCurrencyValue;
    this.leftCurrencyValue = this.rightCurrencyValue;
    this.rightCurrencyValue = this.leftCurrencyValue;
    this.convertRightCurrency();
  }
}
