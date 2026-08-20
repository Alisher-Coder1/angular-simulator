// Пункт 5:
// Универсальный класс коллекции.
// <T> означает, что коллекция может работать с любым типом данных:
// string, number, object и другими.
export class Collection<T> {

  private items: T[];

  // Пункт 5:
  // Конструктор принимает начальный массив элементов.
  // Если массив не передан, коллекция создаётся пустой.
  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  // Пункт 5:
  // Возвращает все элементы коллекции.
  getAll(): T[] {
    return this.items;
  }

  // Пункт 5:
  // Возвращает один элемент коллекции по индексу.
  // Если элемента по такому индексу нет, вернётся undefined.
  getOne(index: number): T | undefined {
    return this.items[index];
  }

  // Пункт 5:
  // Полностью очищает коллекцию.
  clear(): void {
    this.items = [];
  }

  // Пункт 5:
  // Удаляет один элемент коллекции по индексу.
  removeOne(index: number): void {
    this.items.splice(index, 1);
  }

  // Пункт 5:
  // Заменяет один элемент коллекции по индексу на новое значение.
  replaceOne(index: number, newItem: T): void {
    this.items[index] = newItem;
  }

}