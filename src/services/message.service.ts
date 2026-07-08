import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageType } from '../enums/MessageType';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // Приватный поток хранит текущий список сообщений.
  private readonly messagesSubject = new BehaviorSubject<Message[]>([]);

  // Публичный поток доступен компонентам только для чтения.
  public readonly messages$: Observable<Message[]> =
    this.messagesSubject.asObservable();

  // Показывает сообщение об успешном действии.
  public showSuccess(text: string): void {
    this.addMessage({
      id: Date.now(),
      type: MessageType.Success,
      text,
    });
  }

  // Показывает информационное сообщение.
  public showInfo(text: string): void {
    this.addMessage({
      id: Date.now(),
      type: MessageType.Info,
      text,
    });
  }

  // Показывает предупреждающее сообщение.
  public showWarn(text: string): void {
    this.addMessage({
      id: Date.now(),
      type: MessageType.Warn,
      text,
    });
  }

  // Показывает сообщение об ошибке.
  public showError(text: string): void {
    this.addMessage({
      id: Date.now(),
      type: MessageType.Error,
      text,
    });
  }

  // Добавляет новое сообщение в начало потока.
  private addMessage(message: Message): void {
    const currentMessages = this.messagesSubject.getValue();

    this.messagesSubject.next([message, ...currentMessages]);

    // Автоматически закрывает сообщение через 5 секунд.
    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  // Закрывает сообщение по его идентификатору.
  public closeMessage(id: number): void {
    const filteredMessages = this.messagesSubject
      .getValue()
      .filter((message) => message.id !== id);

    this.messagesSubject.next(filteredMessages);
  }
}