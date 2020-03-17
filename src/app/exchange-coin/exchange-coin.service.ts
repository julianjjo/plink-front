import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeCoinService {

  constructor(private http: HttpClient) { }

  getCryptocurrencies(){
    return this.http.get('https://bravenewcoin-v1.p.rapidapi.com/digital-currency-symbols', {
      headers:  {
        'x-rapidapi-host': 'bravenewcoin-v1.p.rapidapi.com',
        'x-rapidapi-key': '22fb7e70a3mshe9c4bbd22b3fb18p1fcf6cjsn7cbfa7e72343'
      }
    });
  }
}
