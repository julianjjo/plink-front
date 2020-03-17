import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ExchangeCoinService} from './exchange-coin.service';
import { HttpClient } from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-exchange-coin',
  templateUrl: './exchange-coin.component.html',
  styleUrls: ['./exchange-coin.component.scss']
})
export class ExchangeCoinComponent implements OnInit {
  dataCryptocurrencies = {};
  http;

  @ViewChild('exchange') exchangeButton: ElementRef;
  @ViewChild('formCryptocurrency') formCryptocurrency: ElementRef;
  @ViewChild('amountCryptocurrency') amountCryptocurrency: ElementRef;
  @ViewChild('typeCryptocurrency') typeCryptocurrency: ElementRef;
  @ViewChild('typeCurrency') typeCurrency: ElementRef;
  @ViewChild('amountCurrency') amountCurrency: ElementRef;
  @ViewChild('inputAmountCryptocurrency') inputAmountCryptocurrency: ElementRef;
  @ViewChild('inputAmountCurrency') inputAmountCurrency: ElementRef;

  constructor(private renderer: Renderer2, private exchangeCoinService: ExchangeCoinService) {}

  ngOnInit() {
    this.loadSelectCryptocurrencies()
      .subscribe(function (data) {
        this.dataCryptocurrencies = data['digital_currencies'];
        this.loadSelectCryptocurrencies();
      });
  }

  loadSelectCryptocurrencies() {
    return this.exchangeCoinService.getData() // add `return`
      .map(
        result => {
          this.result = result;
          for (const crytocurrency in this.dataCryptocurrencies) {
            console.log(crytocurrency);
          }
        });
  }

  exchangeCurrency($event: MouseEvent) {
    this.changeOrderElementsForm();
  }

  changeOrderElementsForm() {
    if (this.formCryptocurrency.nativeElement.children[0] !== this.amountCurrency.nativeElement) {
      this.renderer.setProperty(this.inputAmountCurrency.nativeElement, 'value', this.inputAmountCryptocurrency.nativeElement.value);
      this.renderer.setProperty(this.inputAmountCryptocurrency.nativeElement, 'value', null);
      this.currenciesElements();
      this.cryptocurrenciesElements();
    } else {
      this.renderer.setProperty(this.inputAmountCryptocurrency.nativeElement, 'value', this.inputAmountCurrency.nativeElement.value);
      this.renderer.setProperty(this.inputAmountCurrency.nativeElement, 'value', null);
      this.cryptocurrenciesElementsInvert();
      this.currenciesElementsInvert();
    }
  }

  currenciesElements() {
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, this.amountCurrency.nativeElement);
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, this.typeCurrency.nativeElement);
  }

  currenciesElementsInvert() {
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, this.typeCurrency.nativeElement);
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, this.amountCurrency.nativeElement);
  }

  cryptocurrenciesElements() {
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, this.typeCryptocurrency.nativeElement);
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, this.amountCryptocurrency.nativeElement);
  }

  cryptocurrenciesElementsInvert() {
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, this.amountCryptocurrency.nativeElement);
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, this.typeCryptocurrency.nativeElement);
  }
}
