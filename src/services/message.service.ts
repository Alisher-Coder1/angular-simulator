import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageType } from '../enums/MessageType';
import { IMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // Приватный поток хранит текущий список сообщений.
  private readonly messagesSubject = new BehaviorSubject<IMessage[]>([]);

  // Публичный поток доступен компонентам только для чтения.
  readonly messages$: Observable<IMessage[]> =
    this.messagesSubject.asObservable();

  // Показывает сообщение об успешном действии.
  showSuccess(text: string): void {
    this.addMessage({
      id: Date.now(),
      type: MessageType.SUCCESS,
      text,
    });
  }

  // Показывает информационное сообщение.
  showInfo(text: string): void {
    this.addMessage({
      id: Date.now(),
      type: MessageType.INFO,
      text,
    });
  }

  // Показывает предупреждающее сообщение.
  showWarn(text: string): void {
    this.addMessage({
      id: Date.now(),
      type: MessageType.WARN,
      text,
    });
  }

  // Показывает сообщение об ошибке.
  showError(text: string): void {
    this.addMessage({
      id: Date.now(),
      type: MessageType.ERROR,
      text,
    });
  }

  // Добавляет новое сообщение в начало потока.
  private addMessage(message: IMessage): void {
    const currentMessages = this.messagesSubject.getValue();

    this.messagesSubject.next([message, ...currentMessages]);

    // Автоматически закрывает сообщение через 5 секунд.
    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  // Закрывает сообщение по его идентификатору.
  closeMessage(id: number): void {
    const filteredMessages = this.messagesSubject
      .getValue()
      .filter((message) => message.id !== id);

    this.messagesSubject.next(filteredMessages);
  }
}
