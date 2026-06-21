import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // Пункт 3 домашнего задания №17:
  // массив хранит все активные сообщения, которые сейчас отображаются на экране.
  public messages: Message[] = [];

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
  // Добавляет новое сообщение в начало списка,
  // чтобы последнее созданное сообщение отображалось сверху.
  // Внутренний метод сервиса: создаваемое сообщение нельзя добавлять напрямую извне.
  private addMessage(message: Message): void {
  this.messages.unshift(message);

  // Автоматически закрываем сообщение через 5 секунд после его добавления.
  setTimeout(() => {
    this.closeMessage(message.id);
  }, 5000);
}

  // Закрывает сообщение по его идентификатору.
  public closeMessage(id: number): void {
    this.messages = this.messages.filter((message) => message.id !== id);
  }
}