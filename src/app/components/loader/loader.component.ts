import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  // Получаем глобальный сервис загрузчика.
  private readonly loaderService = inject(LoaderService);

  // Передаём состояние загрузчика в HTML через Observable.
  public readonly loader$ = this.loaderService.loader$;
}