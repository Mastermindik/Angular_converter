import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesListService {
  private myKey: string = "494345e5541d46efa7121c026b27acfb";
  constructor(public http: HttpClient) { }

  getAllCurrencies() {
    return this.http.get("https://openexchangerates.org/api/currencies.json")
  }
  handleOptionSelected() {
    return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=${this.myKey}`)
  }
  getValueOfCurrency(optionValue: string) {
    console.log(optionValue);
  }

}
