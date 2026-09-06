import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { IUser } from '../../interfaces/user';
import { PhonePipe } from '../../../../shared/pipes/phone.pipe';
import { BoldHoverDirective } from '../../../../shared/directives/bold-hover.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, BoldHoverDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  // Пользователь приходит от родительского smart-компонента.
  @Input({ required: true }) user!: IUser;

  // Карточка не удаляет пользователя сама, а только сообщает родителю id.
  @Output() deleteUser = new EventEmitter<number>();

  onDeleteUser(): void {
    this.deleteUser.emit(this.user.id);
  }
}
