# Homework 27 — Dependency Injection

## Задача №1. Singleton или нет?

Будет создан **один экземпляр `CounterService`**.

`CounterService` зарегистрирован через `providedIn: 'root'`, поэтому предоставляется root injector'ом как singleton.

`ComponentA` и `ComponentB` получат один и тот же экземпляр сервиса.

---

## Задача №2. Локальный Provider

Будет создано **два экземпляра `CounterService`**.

`CounterService` указан в `providers` самого `ChildComponent`.

Каждый экземпляр `ChildComponent` имеет собственный injector, поэтому каждый из двух `<app-child>` получит свой экземпляр `CounterService`.

---

## Задача №3. Какой экземпляр получит компонент?

`ChildComponent` получит **экземпляр `LoggerService`, созданный provider'ом `ParentComponent`**.

Angular начинает поиск зависимости с ближайшего injector и затем поднимается вверх по иерархии.

Так как `LoggerService` зарегистрирован в `providers` родительского `ParentComponent`, этот provider будет найден раньше root provider.

Поэтому root-экземпляр для `ChildComponent` использоваться не будет.

---

## Задача №4. useExisting

Существует **один используемый экземпляр `LoggerService`**.

`useExisting` не создаёт новый объект.

Токен `'LOGGER'` становится alias для уже существующего provider `LoggerService`.

Поэтому:

```ts
const a = inject(LoggerService);
const b = inject('LOGGER');
```

получат один и тот же экземпляр.

То есть:

```ts
a === b;
```

будет:

```ts
true;
```

---

## Задача №5. useFactory

`useFactory` будет вызвана **при первом разрешении соответствующей зависимости данным injector'ом**.

В приведённом примере это произойдёт при первом запросе:

```ts
inject(LoggerService);
```

Factory provider создаётся лениво.

После выполнения factory injector сохраняет полученный экземпляр и при следующих запросах того же provider возвращает уже существующий объект.

То есть `useFactory` не вызывается при каждом `inject()`.

---

## Задача №6. Multi Provider

В:

```ts
value;
```

окажется:

```ts
['A', 'B'];
```

При использовании:

```ts
multi: true;
```

Angular собирает значения всех providers одного токена в массив.

Порядок значений соответствует порядку регистрации providers.

---

## Задача №7. Optional

В:

```ts
logger;
```

будет:

```ts
null;
```

Поскольку используется:

```ts
optional: true;
```

Angular не выбросит ошибку, если provider `LoggerService` отсутствует.

Без `optional: true` отсутствие provider привело бы к ошибке Dependency Injection.

---

## Задача №8. Self

Произойдёт **ошибка Dependency Injection — provider `LoggerService` не будет найден**.

Опция:

```ts
self: true;
```

заставляет Angular искать зависимость только в injector текущего компонента.

Хотя `LoggerService` зарегистрирован через:

```ts
providedIn: 'root';
```

root injector проверяться не будет.

Так как собственного provider `LoggerService` в текущем компоненте нет, Angular завершит поиск ошибкой.

---

## Задача №9. SkipSelf

`ChildComponent` получит **экземпляр `LoggerService` из injector `ParentComponent`**.

Опция:

```ts
skipSelf: true;
```

заставляет Angular пропустить собственный injector `ChildComponent` и начать поиск с родительского injector.

Поскольку `ParentComponent` содержит:

```ts
providers: [LoggerService];
```

будет использован именно его экземпляр.

---

## Задача №10. Нет регистрации

Произойдёт **ошибка Dependency Injection**.

Выполняется:

```ts
const service = inject(ApiService);
```

но `ApiService` нигде не зарегистрирован.

Также не используется:

```ts
optional: true;
```

Поэтому Angular не сможет найти provider для `ApiService` и выбросит ошибку отсутствующего provider.

---

## Задача №11. Что произойдёт?

Будет создан **один экземпляр `LoggerService`**.

`LoggerService` зарегистрирован через:

```ts
providedIn: 'root';
```

Поэтому оба вызова:

```ts
logger1 = inject(LoggerService);
logger2 = inject(LoggerService);
```

получат один и тот же экземпляр из root injector.

То есть:

```ts
logger1 === logger2;
```

будет:

```ts
true;
```

---

## Задача №12. Финал

В приложении существует два уровня регистрации `LoggerService`:

- глобальный provider через `providedIn: 'root'`;
- локальный provider в `HeaderComponent` через `providers: [LoggerService]`.

### 1. Сколько экземпляров LoggerService существует?

Если `LoggerService` действительно будет запрошен как в ветке `HeaderComponent`, так и вне неё, будет создано **два экземпляра**:

1. локальный экземпляр для `HeaderComponent` и его дочерней ветки;
2. глобальный экземпляр из root injector для остальных частей приложения.

Angular создаёт экземпляры provider'ов лениво — при первом запросе соответствующей зависимости.

### 2. Какой экземпляр получит HeaderComponent?

`HeaderComponent` получит **свой локальный экземпляр `LoggerService`**.

Причина — сервис зарегистрирован непосредственно в:

```ts
providers: [LoggerService];
```

этого компонента.

Angular начинает поиск с ближайшего injector, поэтому локальный provider будет найден раньше root provider.

### 3. Какой экземпляр получит DashboardComponent?

`DashboardComponent` получит **root-экземпляр `LoggerService`**.

Локальный provider `HeaderComponent` ему недоступен, потому что `HeaderComponent` и `DashboardComponent` находятся в разных ветках дерева компонентов.

### 4. Какой экземпляр получит UserCardComponent?

`UserCardComponent` также получит **root-экземпляр `LoggerService`**.

В его собственной ветке дерева компонентов локального provider `LoggerService` нет.

### 5. По какой цепочке Injector'ов Angular будет искать зависимость в UserCardComponent?

Поиск начинается с ближайшего injector и идёт вверх:

```text
UserCardComponent
→ DashboardComponent
→ AppComponent
→ root / environment injector
```

Так как локального provider `LoggerService` в этой ветке нет, Angular найдёт глобальный provider, зарегистрированный через:

```ts
providedIn: 'root';
```

---

## Задача №13. Цепочка зависимостей

После:

```ts
inject(A);
```

Angular должен разрешить всю цепочку зависимостей.

Последовательность будет следующей:

1. Angular ищет provider для `A`.
2. Находит provider `A` в root injector.
3. Для создания `A` требуется `B`.
4. Angular ищет provider для `B`.
5. Находит provider `B`.
6. Для создания `B` требуется `C`.
7. Angular ищет provider для `C`.
8. Находит provider `C`.
9. Для создания `C` требуется `D`.
10. Angular ищет provider для `D`.
11. Находит provider `D`.
12. Для создания `D` требуется `LoggerService`.
13. Angular ищет provider для `LoggerService`.
14. Находит его в root injector.
15. Создаёт экземпляр `LoggerService`.
16. Сохраняет экземпляр `LoggerService` в кэше injector.
17. Используя `LoggerService`, создаёт `D`.
18. Сохраняет `D`.
19. Используя `D`, создаёт `C`.
20. Сохраняет `C`.
21. Используя `C`, создаёт `B`.
22. Сохраняет `B`.
23. Используя `B`, создаёт `A`.
24. Сохраняет `A`.
25. `inject(A)` возвращает готовый экземпляр `A`.

Итоговая цепочка зависимостей:

```text
A → B → C → D → LoggerService
```

После первого успешного разрешения созданные root-сервисы будут закэшированы соответствующим injector.

При следующих запросах этих сервисов будут возвращаться уже существующие экземпляры.

---

## Задача №14. Ленивая инициализация сервисов

По условию все компоненты приложения уже открывались, но ни один из указанных сервисов ещё не запрашивался.

Все сервисы имеют:

```ts
providedIn: 'root';
```

### Сколько экземпляров сервисов существует в памяти?

**0 экземпляров сервисов.**

`providedIn: 'root'` регистрирует provider в root injector, но сам экземпляр сервиса создаётся лениво — только при первом запросе зависимости.

Затем выполняется:

```ts
inject(UserService);
```

Angular должен создать `UserService`.

Но `UserService` зависит от `ApiService`.

Поэтому сначала Angular должен разрешить `ApiService`.

`ApiService`, в свою очередь, зависит от `LoggerService`.

Получается цепочка:

```text
UserService
→ ApiService
→ LoggerService
```

Angular создаст:

1. `LoggerService`;
2. затем `ApiService`;
3. затем `UserService`.

После этого в памяти будут находиться **3 экземпляра сервисов**:

1. `UserService`;
2. `ApiService`;
3. `LoggerService`.

Все три экземпляра будут сохранены root injector и повторно использоваться при следующих запросах.

---

## Задача №15. Архитектура интернет-магазина

Необходимо определить подходящий способ регистрации каждого сервиса.

Возможные варианты:

- `providedIn: 'root'`;
- `providers` компонента;
- `providers` маршрута;
- `InjectionToken`;
- `useFactory`;
- `useValue`.

### 1. ApiService

**Регистрация:** `providedIn: 'root'`

`ApiService` отвечает за HTTP-запросы во всём приложении.

Он используется разными страницами и сервисами, поэтому должен иметь один общий экземпляр на уровне приложения.

### 2. AuthService

**Регистрация:** `providedIn: 'root'`

`AuthService` хранит текущее состояние пользователя и предоставляет методы `login()`, `logout()`, `currentUser()`.

Состояние авторизации должно быть единым для всего приложения.

Если создать несколько экземпляров `AuthService`, разные части приложения могли бы иметь разное состояние пользователя.

### 3. CartService

**Регистрация:** `providedIn: 'root'`

`CartService` хранит товары в корзине.

Корзина должна сохраняться при переходах пользователя между различными страницами приложения.

Поэтому необходим один общий экземпляр сервиса.

### 4. ProductFilterService

**Регистрация:** `providers` на уровне соответствующего маршрута.

Например:

```ts
{
  path: 'phones',
  component: PhonesComponent,
  providers: [ProductFilterService],
}
```

и отдельно:

```ts
{
  path: 'laptops',
  component: LaptopsComponent,
  providers: [ProductFilterService],
}
```

Фильтры относятся к конкретной странице.

На странице «Телефоны» должно существовать своё состояние фильтров, а на странице «Ноутбуки» — своё.

После ухода с соответствующего маршрута этот экземпляр больше не нужен.

### 5. NotificationService

**Регистрация:** `providedIn: 'root'`

Toast-уведомления могут вызываться из разных частей приложения.

Поэтому нужен один глобальный `NotificationService`.

### 6. ThemeService

**Регистрация:** `providedIn: 'root'`

Тема приложения должна быть общей для всех страниц.

Изменение темы в одном компоненте должно сразу отражаться во всём приложении.

Поэтому необходим один глобальный экземпляр.

### 7. DashboardStatisticsService

**Регистрация:** `providers` маршрута Dashboard.

Например:

```ts
{
  path: 'dashboard',
  component: DashboardComponent,
  providers: [DashboardStatisticsService],
}
```

Сервис нужен только странице Dashboard.

После ухода пользователя с Dashboard его состояние больше не требуется.

Поэтому нет необходимости хранить этот сервис глобально.

### 8. UserTableStateService

**Регистрация:** `providers` маршрута Users.

Сервис хранит состояние таблицы:

- сортировку;
- текущую страницу;
- выбранные фильтры.

Это состояние необходимо только внутри страницы пользователей.

Поэтому сервис логично ограничить injector'ом соответствующего маршрута.

### 9. ModalService

**Регистрация:** `providedIn: 'root'`

Любой компонент приложения может открыть модальное окно.

Состояние модальных окон должно управляться централизованно.

Поэтому нужен один глобальный экземпляр `ModalService`.

### 10. LoggerService

**Регистрация:** глобальный provider через `useFactory`.

Например концептуально:

```ts
{
  provide: LoggerService,
  useFactory: loggerFactory,
}
```

Причина — реализация логирования зависит от окружения:

```text
production → отправка логов на сервер
development → вывод логов в консоль
```

Factory может получить конфигурацию приложения и выбрать подходящую реализацию логирования.

Сам provider при этом должен быть зарегистрирован на уровне приложения/root environment injector, чтобы все части приложения использовали одну согласованную систему логирования.

### 11. AppConfig

**Регистрация:** `InjectionToken + useValue`.

Например:

```ts
export interface AppConfig {
  apiUrl: string;
  production: boolean;
  appVersion: string;
}
```

Создаём token:

```ts
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
```

И регистрируем значение:

```ts
{
  provide: APP_CONFIG,
  useValue: {
    apiUrl: '...',
    production: false,
    appVersion: '1.0.0',
  },
}
```

`AppConfig` — это конфигурационные данные, а не сервис с собственной бизнес-логикой.

Поэтому `InjectionToken + useValue` подходит для него лучше всего.

### 12. CurrencyFormatter

**Регистрация:** `InjectionToken + useValue`.

Если необходимо хранить только формат или значение настройки форматирования числа, отдельный сервис создавать необязательно.

Например:

```ts
export const CURRENCY_FORMAT = new InjectionToken<string>('CURRENCY_FORMAT');
```

Регистрация:

```ts
{
  provide: CURRENCY_FORMAT,
  useValue: '1.2-2',
}
```

Таким образом формат можно внедрять как обычную зависимость через DI.

### 13. AnalyticsService

**Регистрация:** условный глобальный provider через `useFactory`.

Аналитика должна зависеть от конфигурации приложения.

Например factory может проверить, включена ли аналитика:

```ts
{
  provide: AnalyticsService,
  useFactory: analyticsFactory,
  deps: [APP_CONFIG],
}
```

Если аналитика включена, factory предоставляет рабочую реализацию.

Если аналитика выключена, factory может предоставить no-op реализацию, которая не выполняет отправку аналитических событий.

Таким образом поведение `AnalyticsService` определяется конфигурацией приложения, а остальные компоненты не должны самостоятельно проверять, включена аналитика или нет.
