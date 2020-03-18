import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getCurrencies() {
    return this.http.get(this.baseUrl + '/prices', {
      headers:  {
        'x-rapidapi-host': 'bravenewcoin-v1.p.rapidapi.com',
        'x-rapidapi-key': '22fb7e70a3mshe9c4bbd22b3fb18p1fcf6cjsn7cbfa7e72343'
      },
      params: {
        'coin': 'btc',
      }
    });
  }
}
