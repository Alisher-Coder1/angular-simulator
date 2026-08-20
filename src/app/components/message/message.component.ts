import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-message',
  imports: [AsyncPipe, NgTemplateOutlet, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  // Получаем сервис сообщений.
  private readonly messageService = inject(MessageService);

  // Передаём поток сообщений в HTML-компонент.
  readonly messages$ = this.messageService.messages$;

  readonly faMessage = faMessage;


  // Закрывает выбранное сообщение.
  closeMessage(id: number): void {
    this.messageService.closeMessage(id);
  }

}