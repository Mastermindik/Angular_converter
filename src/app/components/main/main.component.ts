import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  currencies: string[] = ["USD", "UAH"]

  optionChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedCurrencyCahnge(currency: string[]) {
    this.currencies[0] = currency[0];
    this.currencies[1] = currency[1];
  }
}
