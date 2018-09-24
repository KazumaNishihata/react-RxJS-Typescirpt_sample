import * as Rx from 'rx';
import { TodoDispatcher } from '../dispatchers/TodoDispatcher';
import { ObservableArray } from '../utils/ObservableArray';

export interface Todo {
  title: string;
}

export class TodoStore {
  public todos = new ObservableArray<Todo>([]);
  private disposables: Rx.CompositeDisposable;

  constructor() {
    this.disposables = new Rx.CompositeDisposable();

    this.disposables.add(
      // TODO取得
      TodoDispatcher.getTodos.subscribe( res => {
        this.todos.onNext(res);
      })
    );

    this.disposables.add(
      // TODO追加
      TodoDispatcher.updateTodo.subscribe( params => {
        // 現在のTODOを取得して
        const todos = this.todos.getValue();
        // 新しいTODOを追記
        todos.push(params);
        // 反映
        this.todos.onNext(todos);
      })
    );

  }

  dispose() {
    this.disposables.dispose();
  }
}

