import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrenciesListService } from 'src/app/services/currenciesList.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  currencies: any[] = [];
  currenciesRates: any = {};
  leftCurrency: string = "USD";
  rightCurrency: string = "UAH";
  leftCurrencyValue: number = NaN;
  rightCurrencyValue: number = NaN;
  intepbankRate: any = [
    {desc: "0%", value: 0},
    {desc:"1%", value: 0.01},
    {desc: "2% (standard rate for ATMs)", value:0.02},
    {desc: "3% (standard rate for credit cards)", value:0.03},
    {desc: "4%", value:0.04},
    {desc: "5% (standard rate for self-service terminals)", value:0.05}];
  rate: number = 0;
  minDate: Date = new Date(1991, 1, 1);
  maxDate: Date = new Date();
  currentDate: Date = new Date();

  constructor(private currenciesService: CurrenciesListService) { }

  ngOnInit(): void {
    this.currenciesService.getAllCurrencies().subscribe(c => this.currencies = c);
    this.currenciesService.getRates().subscribe(e => this.currenciesRates = e);
    this.optionChanged.emit([this.leftCurrency, this.rightCurrency]);
  }
  @Output() optionChanged: EventEmitter<string[]> = new EventEmitter<string[]>();
  
  convertRightCurrency():void {
    this.optionChanged.emit([this.leftCurrency, this.rightCurrency]);
    
    this.rightCurrencyValue = parseFloat(((this.leftCurrencyValue * this.currenciesRates.rates[this.rightCurrency] / this.currenciesRates.rates[this.leftCurrency]) + ((this.leftCurrencyValue * this.currenciesRates.rates[this.rightCurrency] / this.currenciesRates.rates[this.leftCurrency]) * this.rate)).toFixed(3));
  }
  convertLeftCurrency():void {
    this.optionChanged.emit([this.leftCurrency, this.rightCurrency]);
    this.leftCurrencyValue = parseFloat(((this.rightCurrencyValue * this.currenciesRates.rates[this.leftCurrency] / this.currenciesRates.rates[this.rightCurrency] - (this.rightCurrencyValue * this.currenciesRates.rates[this.leftCurrency] / this.currenciesRates.rates[this.rightCurrency]) * this.rate)).toFixed(3));
  }
  swapCurrencies():void {
    let bufer: string | number = this.leftCurrency;
    this.leftCurrency = this.rightCurrency;
    this.rightCurrency = bufer;
    bufer = this.leftCurrencyValue;
    this.leftCurrencyValue = this.rightCurrencyValue;
    this.rightCurrencyValue = this.leftCurrencyValue;
    this.convertRightCurrency();
  }
  changeDate():void {
    if (this.currentDate === this.maxDate) {
      this.currenciesService.getRates().subscribe(e => this.currenciesRates = e);
    } else {
      this.currenciesService.getHistoricalRates(this.currentDate.toJSON().substring(0, 10)).subscribe(e => this.currenciesRates = e);
      if (this.leftCurrencyValue) {
        this.convertRightCurrency();
      }
    }
  }
}