import * as Rx from 'rx';

export class ObservableArray<T> extends Rx.Subject<T[]> {
  public items: T[];

  constructor(items: T[]) {
    super();
    this.items = items;
  }

  public getValue(): T[] {
    return this.items;
  }

  onNext(items: T[]): void {
    this.items = items || [];
    super.onNext(items);
  }
}
