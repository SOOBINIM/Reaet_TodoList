import React from "react";
import "./TodoListTemlpate.css";
import "./Form.css";
import "./Search.css";
import { MdDone, MdEditNote, MdDelete } from "react-icons/md";
import Button from "@mui/material/Button";

interface Props {}

interface TodoItemData {
  id: number;
  text: string | undefined;
  editMode: boolean;
}

interface State {
  createInput: string;
  updateInput: string;
  searchInput: string;
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
      searchInput: "",
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
      "id 값 : " +
        id +
        "원래 값 : " +
        selectedItem.text +
        " 바뀔 값 : " +
        nextItem.text +
        " 바뀔 불린 : " +
        nextItem.editMode
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

  onSearch = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      searchInput: value,
    });
  };

  public render() {
    const { onChange, onSubmit, onRemove, onUpdate, onSearch } = this;
    const { createInput, todoItems, updateInput, searchInput } = this.state;

    console.log("updateInput : " + updateInput);
    console.log("searchInput : " + searchInput);

    // const mapToComponent = (data) => {
    //   data.filter((todoItems) => {
    //     return todoItems.name.indexOf(this.state.searchInput) > -1;
    //   });
    // };

    const todoItemsList = todoItems
      .filter((data) => {
        if (searchInput == null) return false;
        else if (data.text?.includes(searchInput)) return true;
      })

      // .filter((data) => {
      //   if (this.state.searchInput == null) return data;
      //   else if (
      //     data.text
      //       ?.toLowerCase()
      //       .includes(this.state.searchInput.toLowerCase())
      //   )
      //     return data;
      // })
      .map((data) => (
        <li key={data.id}>
          {data.editMode ? (
            <form>
              <input
                defaultValue={data.text}
                onChange={(e) => this.setState({ updateInput: e.target.value })}
                value={this.state.updateInput}
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
          <div className="search">
            <input
              onChange={(e) => onSearch(e)}
              placeholder={"내가.. 뭐..하려 했더라??"}
              value={this.state.searchInput}
            ></input>
          </div>
        </div>
        <section className="form-wrapper">
          <div className="form">
            <form onSubmit={onSubmit}>
              <input
                onChange={onChange}
                value={createInput}
                placeholder={"할 일을 입력 하세요."}
              />
              <Button variant="contained" color="secondary" type="submit">
                추가하기
              </Button>
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
