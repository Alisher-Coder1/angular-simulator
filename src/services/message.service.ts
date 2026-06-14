import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // Пункт 3 домашнего задания №17:
  // массив хранит все активные сообщения, которые сейчас отображаются на экране.
  public messages: Message[] = [];

  // Добавляет новое сообщение в начало списка,
  // чтобы последнее созданное сообщение отображалось сверху.
  public addMessage(message: Message): void {
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