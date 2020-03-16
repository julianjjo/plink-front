import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// TODO: Terminar de organizar el footer
export class AppComponent {
  title = 'Exchange Cryptocurrencies';
  selectedMenuItem = 'REALIZAR CAMBIO';

  changeItemMenu($event: any) {
    this.selectedMenuItem = $event;
  }
}
