import { Component, OnDestroy, inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPersonHiking,
  faPlay,
  faShieldHalved,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { Color } from '../../../enums/Color';
import { Collection } from '../../collection';
import { MessageService } from '../../../services/message.service';
import { MessageType } from '../../../enums/MessageType';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MessageComponent } from '../../components/message/message.component';
import { APP_CONFIG } from '../../config/app-config.token';
import { DATE_FORMAT } from '../../config/date-format.token';

type TaskPanelMode = 'date' | 'counter';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, MessageComponent, FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnDestroy {
  readonly appConfig = inject(APP_CONFIG);

  private readonly dateFormat = inject(DATE_FORMAT);

  // Пункт 3 домашнего задания №17:
  // подключаем сервис сообщений к компоненту.
  readonly messageService = inject(MessageService);

  // Пункт 4 домашнего задания №17:
  // подключаем сервис для работы с localStorage.
  private readonly localStorageService = inject(LocalStorageService);

  // Делаем enum доступным в HTML-шаблоне.
  readonly MessageType = MessageType;

  readonly faPlay = faPlay;

  /// Выбирает метод сервиса в зависимости от типа сообщения.
  addMessage(type: MessageType, text: string): void {
    switch (type) {
      // Успешное выполнение действия.
      case MessageType.SUCCESS:
        this.messageService.showSuccess(text);
        break;
      // Информационное сообщение.
      case MessageType.INFO:
        this.messageService.showInfo(text);
        break;
      // Предупреждение для пользователя.
      case MessageType.WARN:
        this.messageService.showWarn(text);
        break;
      // Сообщение об ошибке.
      case MessageType.ERROR:
        this.messageService.showError(text);
        break;
    }
  }

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

  // Пункт 2 домашнего задания №16:
  // Храним выбранную пользователем локацию тура.
  selectedTourLocation = '';

  // Пункт 2 домашнего задания №16:
  // Храним выбранную пользователем дату похода.
  selectedTourDate = '';

  // Пункт 2 домашнего задания №16:
  // Храним выбранное количество участников.
  selectedParticipants = '';

  // Пункт 2 домашнего задания №16:
  // Список вариантов для поля "Участники".
  participantOptions: string[] = [
    '4 человека',
    '5 человек',
    '6 человек',
    '7 человек',
  ];

  // Пункт 1 домашнего задания №16:
  // Данные для преимуществ блока "Лучшие программы для тебя".
  programFeatures = [
    {
      icon: faPersonHiking,
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      icon: faShieldHalved,
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      icon: faTag,
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  // Пункт 1 домашнего задания №16:
  // Данные для галереи блока "Лучшие программы для тебя".
  programImages = [
    {
      src: 'assets/program-lake.png',
      alt: 'Горное озеро',
      modifier: 'lake',
    },
    {
      src: 'assets/program-hiker.png',
      alt: 'Турист в горах',
      modifier: 'hiker',
    },
    {
      src: 'assets/program-snowmobile.png',
      alt: 'Снегоход в горах',
      modifier: 'snowmobile',
    },
    {
      src: 'assets/program-valley.png',
      alt: 'Горная долина',
      modifier: 'valley',
    },
  ];

  // Пункт 1 домашнего задания №17
  // Данные для блока "Популярные направления"
  popularTours = [
    {
      image: 'assets/popular-lake.png',
      title: 'Озеро возле гор',
      description: 'романтическое путешествие',
      price: 480,
      rating: 4.9,
    },
    {
      image: 'assets/popular-night.png',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      rating: 4.5,
    },
    {
      image: 'assets/popular-yoga.png',
      title: 'Растяжка в горах',
      description: 'для тех, кто заботится о себе',
      price: 230,
      rating: 5.0,
    },
  ];

  blogPosts = [
    {
      image: 'assets/blog-italy.png',
      title: 'Красивая Италия, какая она в реальности?',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      link: 'читать статью',
    },
    {
      image: 'assets/blog-airplane.png',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      link: 'читать статью',
    },
    {
      image: 'assets/blog-map.png',
      title: 'Как подготовиться к путешествию в одиночку? ',
      description:
        'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      link: 'читать статью',
    },
    {
      image: 'assets/blog-mountains.png',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      link: 'читать статью',
    },
  ];

  galleryImages = [
    {
      src: 'assets/gallery-balloons.png',
      alt: 'Путешественники среди воздушных шаров',
      isWide: true,
    },
    {
      src: 'assets/gallery-travel-items.png',
      alt: 'Вещи для путешествия',
      isWide: false,
    },
    {
      src: 'assets/gallery-sailboat.png',
      alt: 'Парусник у побережья',
      isWide: false,
    },
    {
      src: 'assets/gallery-beach.png',
      alt: 'Пляж с прозрачной водой',
      isWide: false,
    },
    {
      src: 'assets/gallery-canyon.png',
      alt: 'Путешественники в каньоне',
      isWide: true,
    },
    {
      src: 'assets/gallery-workspace.png',
      alt: 'Записи и принадлежности путешественника',
      isWide: false,
    },
  ];

  // Пункт 4 домашнего задания №16:
  // Свойство хранит текущую дату и время.
  currentDateTime = '';

  // Пункт 5 домашнего задания №16:
  // Свойство хранит текущее значение счётчика кликов.
  clickCount = 0;

  // Пункт 6 домашнего задания №16:
  // Один блок переключается между двумя режимами:
  // 'date' — показывает дату,
  // 'counter' — показывает кликер из пункта 5.
  taskPanelMode: TaskPanelMode = 'date';

  // Пункт 7 домашнего задания №16:
  // Свойство для живого ввода текста.
  liveInputText = '';

  // Пункт 8 домашнего задания №16:
  // Управляет отображением искусственной загрузки страницы.
  isPageLoading = true;

  // Пункт 5 домашнего задания №15:
  // Первый источник данных для универсальной коллекции Collection<T>.
  tourLocations: string[] = ['Алтай', 'Кавказ', 'Домбай'];

  // Пункт 5 домашнего задания №15:
  // Второй источник данных для универсальной коллекции Collection<T>.
  tourPrices: number[] = [12000, 18000, 25000];

  // Пункт 5 домашнего задания №15:
  // Создаём коллекцию на основе первого источника данных.
  locationCollection = new Collection<string>(this.tourLocations);

  // Пункт 5 домашнего задания №15:
  // Создаём коллекцию на основе второго источника данных.
  priceCollection = new Collection<number>(this.tourPrices);

  // Пункт 4 домашнего задания №16:
  // Идентификатор таймера нужен, чтобы потом корректно остановить setInterval.
  private dateTimerId: number | undefined;

  // Пункт 8 домашнего задания №16:
  // Идентификатор таймера загрузки нужен,
  // чтобы при уничтожении компонента можно было очистить setTimeout.
  private loadingTimerId: number | undefined;

  constructor() {
    // Пункт 3:
    // При создании компонента сохраняем дату последнего захода на страницу.
    this.saveLastVisitDate();

    // Пункт 4:
    // При создании компонента увеличиваем и сохраняем количество заходов.
    this.saveVisitCount();

    // Пункт 4 домашнего задания №16:
    // Сразу показываем текущее время, не ожидая первой секунды.
    this.updateCurrentDateTime();

    // Пункт 4 домашнего задания №16:
    // Каждую секунду обновляем дату и время.
    this.dateTimerId = window.setInterval(() => {
      this.updateCurrentDateTime();
    }, 1000);

    // Пункт 8 домашнего задания №16:
    // Через 2 секунды скрываем искусственную загрузку страницы.
    this.loadingTimerId = window.setTimeout(() => {
      this.isPageLoading = false;
    }, 2000);
  }

  // Пункт 4 и пункт 8 домашнего задания №16:
  // При уничтожении компонента очищаем таймеры,
  // чтобы не оставлять лишние процессы в памяти.
  ngOnDestroy(): void {
    if (this.dateTimerId !== undefined) {
      clearInterval(this.dateTimerId);
    }

    if (this.loadingTimerId !== undefined) {
      clearTimeout(this.loadingTimerId);
    }
  }

  // Пункт 2:
  // Метод проверяет, является ли переданный цвет одним из трёх основных цветов:
  // красным, зелёным или синим.
  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  // Пункт 3:
  // Метод сохраняет текущую дату и время последнего захода в localStorage.
  saveLastVisitDate(): void {
    const currentDate = new Date().toISOString();

    this.localStorageService.setItem('lastVisitDate', currentDate);
  }

  // Пункт 4:
  // Метод получает текущее количество заходов из localStorage,
  // увеличивает значение на 1 и сохраняет обратно.
  saveVisitCount(): void {
    const savedVisitCount =
      this.localStorageService.getItem<number>('visitCount');
    const currentVisitCount = savedVisitCount ? Number(savedVisitCount) : 0;
    const nextVisitCount = currentVisitCount + 1;

    this.localStorageService.setItem('visitCount', nextVisitCount);
  }

  // Пункт 4 домашнего задания №16:
  // Метод формирует текущую дату и время до секунд.
  updateCurrentDateTime(): void {
    const currentDate = new Date();

    const date = formatDate(currentDate, this.dateFormat, 'en-US');

    const time = currentDate.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    this.currentDateTime = date + ' ' + time;
  }

  // Пункт 5 домашнего задания №16:
  // Увеличиваем счётчик на 1.
  increaseClickCount(): void {
    this.clickCount += 1;
  }

  // Пункт 5 домашнего задания №16:
  // Уменьшаем счётчик на 1, но не позволяем значению стать меньше 0.
  decreaseClickCount(): void {
    if (this.clickCount > 0) {
      this.clickCount -= 1;
    }
  }

  // Пункт 6 домашнего задания №16:
  // Переключаем отображение между датой и кликером.
  toggleTaskPanelMode(): void {
    this.taskPanelMode = this.taskPanelMode === 'date' ? 'counter' : 'date';
  }

  // Пункт 6 домашнего задания №16:
  // Текст кнопки меняется в зависимости от того, что сейчас отображается.
  get taskPanelToggleText(): string {
    return this.taskPanelMode === 'date' ? 'Показать счётчик' : 'Показать дату';
  }

  // Пункт 2 домашнего задания №16:
  // Кнопка поиска программы отключена,
  // если хотя бы одно поле формы ещё не заполнено.
  get isSearchButtonDisabled(): boolean {
    return (
      !this.selectedTourLocation ||
      !this.selectedTourDate ||
      !this.selectedParticipants
    );
  }
}
