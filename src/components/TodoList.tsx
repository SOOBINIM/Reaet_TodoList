import React from "react";
import "./TodoListTemlpate.css";
import "./Form.css";
import { MdDone, MdEditNote, MdDelete } from "react-icons/md";

interface Props {}

interface TodoItemData {
  id: number;
  text: string | undefined;
  editMode: boolean;
}

interface State {
  createInput: string;
  updateInput: string;
  todoItems: TodoItemData[]; // TodoItemData 로 이뤄진 배열
}

class TodoList extends React.Component<Props, State> {
  id: number = 0;

  constructor(props: State) {
    super(props);
    this.state = {
      todoItems: [],
      createInput: "",
      updateInput: "",
    };
  }

  public onUpdate = (id: number, updateInput?: string): void => {
    console.log("업데이트");
    const { todoItems } = this.state;
    const index = todoItems.findIndex((data) => data.id === id); // id 로 인덱스 찾기
    const selectedItem = todoItems[index]; //  아이템 선택
    const nextItems = [...todoItems]; // 배열 내용을 복사

    // nextItems 는 바뀌는 전체 배열 값
    const nextItem = {
      ...selectedItem,
      editMode: !selectedItem.editMode,
      text: updateInput,
    };

    console.log(
      "원래 값 : " +
        selectedItem.text +
        " 바뀔 불린 : " +
        nextItem.editMode +
        " 바뀔 값 : " +
        nextItem.text
    );

    nextItems[index] = nextItem; // 교체 처리

    this.setState({
      todoItems: nextItems,
    });
  };

  public onRemove = (id: number): void => {
    this.setState(({ todoItems }) => ({
      todoItems: todoItems.filter((todo) => todo.id !== id),
    }));
  };

  public onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      createInput: value,
    });
  };

  public onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // 페이지 전환 막기
    // input 비우고, todoItems 추가
    this.setState(({ todoItems, createInput }) => ({
      createInput: "",
      todoItems: todoItems.concat({
        // concat 사용 이유
        // 이전 배열과 현재의 배열이 달라져 최적화 할 수 있게 된다.
        // push를 사용 하지 않는 이유는 두 배열이 같아지기 떄문에 비교할 수 없고 최적화를 할 수 없다.
        id: this.id++,
        text: createInput,
        editMode: false,
      }),
    }));
  };

  public render() {
    const { onChange, onSubmit, onRemove, onUpdate } = this;
    const { createInput, todoItems, updateInput } = this.state;

    console.log("updateInput : " + updateInput);

    const todoItemsList = todoItems.map((data) => (
      <li key={data.id}>
        {data.editMode ? (
          <form>
            <input
              defaultValue={"원래값"}
              onChange={(e) => this.setState({ updateInput: e.target.value })}
              value={updateInput}
            />
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onUpdate(data.id, updateInput)}
            >
              <MdDone />
            </span>
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onRemove(data.id)}
            >
              <MdDelete />
            </span>
          </form>
        ) : (
          <div>
            <b>{data.text}</b>
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onUpdate(data.id)}
            >
              <MdEditNote />
            </span>
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onRemove(data.id)}
            >
              <MdDelete />
            </span>
          </div>
        )}
      </li>
    ));

    return (
      <main className="todo-list-template">
        <div className="title">
          <h1>오늘 뭐하지?</h1>
        </div>
        <section className="form-wrapper">
          <div className="form">
            <form onSubmit={onSubmit}>
              <input
                onChange={onChange}
                value={createInput}
                placeholder={"할 일을 입력 하세요."}
              />
              <button className="create-button" type="submit">
                추가하기
              </button>
            </form>
          </div>
        </section>
        <section className="todos-wrapper">
          <ul>{todoItemsList}</ul>
        </section>
      </main>
    );
  }
}

export default TodoList;
