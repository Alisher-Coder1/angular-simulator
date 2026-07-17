import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  // Пользователь приходит от родительского smart-компонента.
  @Input({ required: true }) user!: User;

  // Карточка не удаляет пользователя сама, а только сообщает родителю id.
  @Output() deleteUser = new EventEmitter<number>();

  onDeleteUser(): void {
    this.deleteUser.emit(this.user.id);
  }
}