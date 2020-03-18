import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CurrenciesService} from '../../services/currencies/currencies.service';
import {Price} from '../../interfaces/price';

@Component({
  selector: 'app-list-currencies',
  templateUrl: './list-currencies.component.html',
  styleUrls: ['./list-currencies.component.scss']
})
export class ListCurrenciesComponent implements OnInit {
  prices: [Price];
  initial: number;
  final: number;

  @ViewChild('tbodyPrices') tbodyPrices: ElementRef;

  constructor(private currenciesService: CurrenciesService, private renderer: Renderer2) {
    this.initial = 0;
    this.final = 7;
  }

  ngOnInit() {
    this.currenciesService.getCurrencies()
      .subscribe((data: any) => {
        this.prices = data['prices'];
      });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.final += 7;
  }

}
