import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ExchangeCoinService} from './exchange-coin.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exchange-coin',
  templateUrl: './exchange-coin.component.html',
  styleUrls: ['./exchange-coin.component.scss']
})
export class ExchangeCoinComponent implements OnInit {
  dataCryptocurrencies = {};
  dataCurrencies = {};
  cryptoCurrencies = new Array();
  currencies = new Array();
  public exchangeFormGroup: FormGroup;

  @ViewChild('exchange') exchangeButton: ElementRef;
  @ViewChild('formCryptocurrency') formCryptocurrency: ElementRef;
  @ViewChild('amountCryptocurrency') amountCryptocurrency: ElementRef;
  @ViewChild('typeCryptocurrency') typeCryptocurrency: ElementRef;
  @ViewChild('typeCurrency') typeCurrency: ElementRef;
  @ViewChild('amountCurrency') amountCurrency: ElementRef;
  @ViewChild('inputAmountCryptocurrency') inputAmountCryptocurrency: ElementRef;
  @ViewChild('selectTypeCryptocurrency') selectTypeCryptocurrency: ElementRef;
  @ViewChild('selectTypeCurrency') selectTypeCurrency: ElementRef;
  @ViewChild('inputAmountCurrency') inputAmountCurrency: ElementRef;

  constructor(private renderer: Renderer2, private exchangeCoinService: ExchangeCoinService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.getCryptoCurrencies();
    this.getCurrencies();
  }

  private buildForm() {
    this.exchangeFormGroup = new FormGroup({
      inputAmountCryptocurrency: new FormControl('', Validators.pattern('^(\\d|,)*\\d*$')),
      selectTypeCryptocurrency: new FormControl('BTC'),
      selectTypeCurrency: new FormControl('USD'),
      inputAmountCurrency: new FormControl('')
    });
  }

  private getCryptoCurrencies() {
    this.exchangeCoinService.getCryptocurrencies()
      .subscribe((data: any) => {
        this.dataCryptocurrencies = data['digital_currencies'];
        for (const cryptoCurrency in this.dataCryptocurrencies) {
          if (this.dataCryptocurrencies.hasOwnProperty(cryptoCurrency)) {
            this.cryptoCurrencies.push(Object.keys(this.dataCryptocurrencies[cryptoCurrency]));
          }
        }
      });
  }

  private getCurrencies() {
    this.exchangeCoinService.getCurrencies()
      .subscribe((data: any) => {
        this.dataCurrencies = data['fiat_currencies'];
        for (const currency in this.dataCurrencies) {
          if (this.dataCurrencies.hasOwnProperty(currency)) {
            this.currencies.push(Object.keys(this.dataCurrencies[currency]));
          }
        }
      });
  }

  private exchangeCurrencies(amount, from, to, input) {
    this.exchangeCoinService.exchangeCurrencies(amount, from, to)
      .subscribe((data: any) => {
        this.renderer.setProperty(input, 'value', data['to_quantity']);
      });
  }

  exchangeCurrency($event: MouseEvent) {
    this.changeOrderElementsForm();
  }

  changeOrderElementsForm() {
    if (this.formCryptocurrency.nativeElement.children[0] !== this.amountCurrency.nativeElement) {
      this.changeAmountCryptocurrency(
        this.amountCurrency.nativeElement,
        this.amountCryptocurrency.nativeElement,
        this.inputAmountCurrency.nativeElement,
        this.inputAmountCryptocurrency.nativeElement,
        this.typeCurrency.nativeElement,
        this.typeCryptocurrency.nativeElement,
        this.selectTypeCurrency.nativeElement,
        this.selectTypeCryptocurrency.nativeElement
      );
    } else {
      this.changeAmountCryptocurrency(
        this.amountCryptocurrency.nativeElement,
        this.amountCurrency.nativeElement,
        this.inputAmountCryptocurrency.nativeElement,
        this.inputAmountCurrency.nativeElement,
        this.typeCryptocurrency.nativeElement,
        this.typeCurrency.nativeElement,
        this.selectTypeCryptocurrency.nativeElement,
        this.selectTypeCurrency.nativeElement
      );
    }
  }

  private changeAmountCryptocurrency(
    firstAmountElement, secondAmountElement,
    firstInputAmountElement, secondInputAmountElement,
    firstTypeElement, secondTypeElement, firstSelectElement, secondSelectElement) {

    this.renderElementsUp(
      firstAmountElement,
      firstTypeElement,
      firstInputAmountElement,
      secondInputAmountElement
    );
    this.renderElementsDown(
      secondAmountElement,
      secondTypeElement,
      secondInputAmountElement
    );
    this.exchangeCurrencies(
      firstInputAmountElement.value,
      firstSelectElement.value,
      secondSelectElement.value,
      secondInputAmountElement
    );
  }

  renderElementsUp(amount, type, input, beforeInput) {
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, amount);
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, type);
    this.renderer.setProperty(input, 'value', beforeInput.value);
    this.renderer.removeAttribute(input, 'disabled');
    this.renderer.listen(input, 'keyup', (event) => {
      this.onKeyCryptocurrency(event);
    });
  }

  renderElementsDown(amount, type, input) {
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, type);
    this.renderer.appendChild(this.formCryptocurrency.nativeElement, amount);
    this.renderer.setAttribute(input, 'disabled', 'true');
    this.renderer.listen(input, 'keyup', (event) => {});
  }

  onKeyCryptocurrency($event: KeyboardEvent) {
    const amount = (event.target as HTMLInputElement).value;
    this.getExchangeForm(amount);
  }

  getExchangeForm(amount) {
    if (this.formCryptocurrency.nativeElement.children[0] === this.amountCryptocurrency.nativeElement) {
      if (Number(amount) === 0) {
        this.renderer.setProperty(this.inputAmountCryptocurrency.nativeElement, 'value',  '');
      }
      this.exchangeCurrencies(
        amount,
        this.selectTypeCryptocurrency.nativeElement.value,
        this.selectTypeCurrency.nativeElement.value,
        this.inputAmountCurrency.nativeElement
      );
    } else {
      this.exchangeCurrencies(
        amount,
        this.selectTypeCurrency.nativeElement.value,
        this.selectTypeCryptocurrency.nativeElement.value,
        this.inputAmountCryptocurrency.nativeElement
      );
    }
  }
}
