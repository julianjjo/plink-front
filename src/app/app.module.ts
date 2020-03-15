import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExchangeCoinComponent } from './exchange-coin/exchange-coin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExchangeCoinComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
