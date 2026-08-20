import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPinterest,
  faSkype,
  faTelegram,
  faVk,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  readonly faTelegram = faTelegram;

  readonly faVk = faVk;

  readonly faPinterest = faPinterest;

  readonly faSkype = faSkype;

}