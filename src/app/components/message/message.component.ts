import { AsyncPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-message',
  imports: [AsyncPipe, NgFor, NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  // Получаем сервис сообщений.
  private readonly messageService = inject(MessageService);

  // Передаём поток сообщений в HTML-компонент.
  public readonly messages$ = this.messageService.messages$;

  // Закрывает выбранное сообщение.
  public closeMessage(id: number): void {
    this.messageService.closeMessage(id);
  }
}