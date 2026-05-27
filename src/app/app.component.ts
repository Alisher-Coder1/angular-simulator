import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Пункт 1:
  // Название компании хранится в свойстве компонента
  // и выводится в шаблоне через Angular-интерполяцию {{ companyName }}.
  companyName = 'РУМТИБЕТ';

  // Пункт 1:
  // Массив пунктов меню используется для вывода навигации в шапке сайта.
  menuItems: string[] = [
    'Главная',
    'Про гида',
    'Программа тура',
    'Стоимость',
    'Блог',
    'Контакты',
  ];

  // Пункт 5:
  // Первый источник данных для универсальной коллекции Collection<T>.
  // Здесь коллекция работает со строками.
  tourLocations: string[] = ['Алтай', 'Кавказ', 'Домбай'];

  // Пункт 5:
  // Второй источник данных для универсальной коллекции Collection<T>.
  // Здесь коллекция работает с числами.
  tourPrices: number[] = [12000, 18000, 25000];

  // Пункт 5:
  // Создаём коллекцию на основе первого источника данных.
  locationCollection = new Collection<string>(this.tourLocations);

  // Пункт 5:
  // Создаём коллекцию на основе второго источника данных.
  priceCollection = new Collection<number>(this.tourPrices);

  constructor() {
    // Пункт 3:
    // При создании компонента сохраняем дату последнего захода на страницу.
    this.saveLastVisitDate();

    // Пункт 4:
    // При создании компонента увеличиваем и сохраняем количество заходов.
    this.saveVisitCount();
  }

  // Пункт 2:
  // Метод проверяет, является ли переданный цвет одним из трёх основных цветов:
  // красным, зелёным или синим.
  isPrimaryColor(color: Color): boolean {
    return color === Color.Red || color === Color.Green || color === Color.Blue;
  }

  // Пункт 3:
  // Метод сохраняет текущую дату и время последнего захода в localStorage.
  saveLastVisitDate(): void {
    const currentDate = new Date().toISOString();

    localStorage.setItem('lastVisitDate', currentDate);
  }

  // Пункт 4:
  // Метод получает текущее количество заходов из localStorage,
  // увеличивает значение на 1 и сохраняет обратно.
  saveVisitCount(): void {
    const savedVisitCount = localStorage.getItem('visitCount');
    const currentVisitCount = savedVisitCount ? Number(savedVisitCount) : 0;
    const nextVisitCount = currentVisitCount + 1;

    localStorage.setItem('visitCount', String(nextVisitCount));
  }
}