import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesListService {
  private myKey: string = "494345e5541d46efa7121c026b27acfb";
  constructor(public http: HttpClient) { }

  getAllCurrencies() {
    return this.http.get("https://openexchangerates.org/api/currencies.json").pipe(map(e => Object.entries(e).map(([key, value]) => ({ key, value })))) 
  }
  getRates() {
    return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=${this.myKey}`);
  }
  getHistoricalRates(date: string) {
    return this.http.get(`https://openexchangerates.org/api/historical/${date}.json?app_id=${this.myKey}`);
  }
  getStatistic(dateRange: string[]) {
    let test:any = [];
    dateRange.forEach(e => this.http.get(`https://openexchangerates.org/api/historical/${e}.json?app_id=${this.myKey}`).forEach((j:any) => test.push(j.rates)))
    return test;
  }

}