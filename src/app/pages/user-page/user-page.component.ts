import { Component } from '@angular/core';
import { MessageComponent } from '../../components/message/message.component';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-user-page',

  // Подключаем компонент уведомлений к странице пользователей.
  imports: [MessageComponent],

  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
}