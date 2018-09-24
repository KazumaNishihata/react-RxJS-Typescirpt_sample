import * as React from 'react';
import * as Rx from 'rx';

import { TodoAction } from './actions/TodoAction';
import { TodoStore, Todo } from './stores/TodoStore';

interface State {
  todos: Todo[];
  new: string;
}

class App extends React.Component<{}, State> {
  private disposables = new Rx.CompositeDisposable();
  private todoStore = new TodoStore();

  constructor() {
    super({});

    this.state = {
      todos: [],
      new: ''
    };

    this.changeText = this.changeText.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentDidMount() {
    this.disposables.add(
      this.todoStore.todos.subscribe(v => {
        this.setState({
          todos: v
        });
      })
    );
    TodoAction.getTodos();
  }

  componentWillUnmount() {
    this.todoStore.dispose();
    this.disposables.dispose();
  }

  changeText(e: any) {
    this.setState({
      new: e.currentTarget.value
    });
  }
  updateTodo(e: any) {
    TodoAction.updateTodo(this.state.new);
    this.setState({
      new: ''
    });
  }

  public render() {
    if (this.state.todos.length === 0) {
      return <div>読み込み中</div>;
    }
    return (
      <div>
          <ul>
          {this.state.todos.map((e, i) => {
            return <li key={i}>{e.title}</li>;
          })}
          </ul>
          <input
            type='text'
            value={this.state.new}
            onChange={this.changeText}
            />
          <input type='button' value='送信' onClick={this.updateTodo}/>
      </div>
    );
  }
}

export default App;
