import {Component, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';
import {element} from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() changeItemMenu: EventEmitter<any> = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  changeMenuItem($event: MouseEvent) {
    const elementLiMenu = $event.target as HTMLLIElement;
    const parent = elementLiMenu.parentElement;
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].className === 'active') {
        this.renderer.removeClass(parent.children[i], 'active');
      }
    }
    this.changeItemMenu.emit(elementLiMenu.textContent);
    this.renderer.addClass($event.target, 'active');
  }
}
