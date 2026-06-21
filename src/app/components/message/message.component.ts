import { Component, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-message', 
  // Подключаем директивы для перебора сообщений и вывода шаблона.
  imports: [NgFor, NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  // Получаем общий сервис, чтобы HTML-компонент мог вывести активные сообщения.
  public readonly messageService = inject(MessageService);
}