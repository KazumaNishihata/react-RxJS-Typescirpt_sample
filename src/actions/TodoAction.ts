import * as Rx from 'rx';
import { TodoDispatcher } from '../dispatchers/TodoDispatcher';

export module TodoAction {
  export function getTodos(): Rx.AsyncSubject<any> {
    const subject = new Rx.AsyncSubject<any>();
    // API擬似
    setTimeout(() => {
      const res = [
        {
          title: 'aaaaa'
        },
        {
          title: 'bbbb'
        }
      ];
      TodoDispatcher.getTodos.onNext(res);
      subject.onNext(res);
      subject.onCompleted();
    }, 1000);

    return subject;

  }

  export function updateTodo(title: string): Rx.AsyncSubject<any> {
    const subject = new Rx.AsyncSubject<any>();
    // API擬似
    setTimeout(() => {
      const params = {
          title
      };
      TodoDispatcher.updateTodo.onNext(params);
      subject.onNext(params);
      subject.onCompleted();
    }, 1000);

    return subject;

  }
}
