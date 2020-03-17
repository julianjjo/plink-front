import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExchangeCoinComponent } from './exchange-coin/exchange-coin.component';
import { ListCurrenciesComponent } from './list-currencies/list-currencies.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExchangeCoinComponent,
    ListCurrenciesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
