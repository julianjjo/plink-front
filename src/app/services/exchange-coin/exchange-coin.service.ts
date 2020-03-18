import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeCoinService {
  baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getCryptocurrencies() {
    return this.http.get(this.baseUrl + '/digital-currency-symbols', {
      headers:  {
        'x-rapidapi-host': 'bravenewcoin-v1.p.rapidapi.com',
        'x-rapidapi-key': '22fb7e70a3mshe9c4bbd22b3fb18p1fcf6cjsn7cbfa7e72343'
      }
    });
  }

  getCurrencies() {
    return this.http.get(this.baseUrl + '/fiat-currency-symbols', {
      headers:  {
        'x-rapidapi-host': 'bravenewcoin-v1.p.rapidapi.com',
        'x-rapidapi-key': '22fb7e70a3mshe9c4bbd22b3fb18p1fcf6cjsn7cbfa7e72343'
      }
    });
  }

  exchangeCurrencies(amount, from, to) {
    return this.http.get(this.baseUrl + '/convert', {
      headers:  {
        'x-rapidapi-host': 'bravenewcoin-v1.p.rapidapi.com',
        'x-rapidapi-key': '22fb7e70a3mshe9c4bbd22b3fb18p1fcf6cjsn7cbfa7e72343'
      },
      params: {
        'qty': amount,
        'from': from,
        'to': to
      }
    });
  }
}
