import React, { Component } from "react";
import TodoItem from "./TodoItem";
import "./TodoListTemlpate.css";
import "./Form.css";

interface Props {}

// interface ParentProps {
//   name: string;
// }

// interface ParentState {
//   age: number;
// }

interface TodoItemData {
  id: number;
  text: string;
  complete: boolean;
}

interface State {
  todoItems: TodoItemData[]; // TodoItemData 로 이뤄진 배열
  input: string;
}

class TodoList extends React.Component<Props, State> {
  // shouldComponentUpdate(nextProps: P, nextState : S): boolean {
  //   return this.props.todos !== nextProps.todos;
  // }
  // shouldComponentUpdate(nextProps: ParentProps, nextState: ParentState): Boolean {
  //   console.log("shouldComponentUpdate");
  //   return true;
  // }
  constructor(props: State) {
    super(props);
    this.state = {
      todoItems: [],
      input: "",
    };
  }

  id: number = 0;

  onToggle = (id: number): void => {
    const { todoItems } = this.state;
    const index = todoItems.findIndex((todo) => todo.id === id); // id 로 인덱스 찾기
    const selectedItem = todoItems[index]; //  아이템 선택
    const nextItems = [...todoItems]; // 배열 내용을 복사

    const nextItem = {
      ...selectedItem,
      complete: !selectedItem.complete,
    };

    nextItems[index] = nextItem; // 교체 처리

    this.setState({
      todoItems: nextItems,
    });
  };

  onRemove = (id: number): void => {
    this.setState(({ todoItems }) => ({
      todoItems: todoItems.filter((todo) => todo.id !== id),
    }));
  };

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      input: value,
    });
  };

  //   onUpdate = (id: number, e: React.FormEvent<HTMLFormElement>): void => {
  //     this.setState(({ todoItems }) => ({
  //       todoItems: todoItems.map((todo) =>
  //         id === todo.id ? { ...todo, ...e } : todo
  //       ),
  //     }));
  //   };

  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // 페이지 전환 막기
    // input 비우고, todoItems 추가
    this.setState(({ todoItems, input }) => ({
      input: "",
      todoItems: todoItems.concat({
        // concat 사용 이유
        // 이전 배열과 현재의 배열이 달라져 최적화 할 수 있게 된다.
        // push를 사용 하지 않는 이유는 두 배열이 같아지기 떄문에 비교할 수 없고 최적화를 할 수 없다.
        id: this.id++,
        text: input,
        complete: false,
      }),
    }));
  };

  render() {
    const { onSubmit, onChange, onRemove, onToggle } = this;
    // 비구조화 할당
    // this.onSubmit, this.onChange, this.onRemove 와 같다.
    const { input, todoItems } = this.state;

    const todoItemList = todoItems.map((todo) => (
      <TodoItem
        key={todo.id}
        complete={todo.complete}
        onToggle={() => onToggle(todo.id)}
        onRemove={() => onRemove(todo.id)}
        text={todo.text}
      />
    ));

    return (
      <main className="todo-list-template">
        <div className="title">
          <h1>오늘 뭐하지?</h1>
        </div>
        <section className="form-wrapper">
          <div className="form">
            <form onSubmit={onSubmit}>
              <input onChange={onChange} value={input} />
              <button className="create-button" type="submit">
                추가하기
              </button>
            </form>
          </div>
        </section>
        <section className="todos-wrapper">
          <ul>{todoItemList}</ul>
        </section>
      </main>
    );
  }
}

export default TodoList;
