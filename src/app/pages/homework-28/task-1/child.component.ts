import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface IUser {
  name: string;
  age: number;
}

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input({ required: true }) user!: IUser;
}
