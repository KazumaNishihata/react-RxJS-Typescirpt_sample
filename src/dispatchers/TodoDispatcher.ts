import * as Rx from 'rx';
import { Todo } from '../stores/TodoStore';


export module TodoDispatcher {
  export const getTodos = new Rx.Subject<Todo[]>();
  export const updateTodo = new Rx.Subject<Todo>();
}
