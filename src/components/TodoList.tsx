import React from "react";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import FormControl from "@mui/material/FormControl";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

interface Props {}

interface TodoItemData {
  id: number;
  text: string;
  complete: boolean;
}

interface State {
  createInput: string;
  updateInput: string;
  searchInput: string;
  todoItems: TodoItemData[]; // TodoItemData 로 이뤄진 배열
}

// 컴포넌트 시작
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

  public onRemove = (id: number): void => {
    this.setState(({ todoItems }) => ({
      todoItems: todoItems.filter((todo) => todo.id !== id),
    }));
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    console.log("할일 입력 : " + value);
    this.setState({
      createInput: value,
    });
  };

  public onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // 페이지 전환 막기
    // input 비우고, todoItems 추가
    console.log("id : " + this.id);
    this.setState(({ todoItems, createInput }) => ({
      createInput: "",
      todoItems: todoItems.concat({
        // concat 사용 이유
        // 이전 배열과 현재의 배열이 달라져 최적화 할 수 있게 된다.
        // push를 사용 하지 않는 이유는 두 배열이 같아지기 떄문에 비교할 수 없고 최적화를 할 수 없다.
        id: this.id++,
        text: createInput,
        complete: false,
      }),
    }));
  };

  public onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      searchInput: value,
    });
  };

  public onUpdateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    console.log("handleToaggleEditChange : " + value);
    this.setState({
      updateInput: value,
    });
  };

  public onToggle = (id: number, e: React.MouseEvent) => {
    // 토글 값만 바꿔주고 편집모드 완료모드를 나눠준다.
    console.log("토글");
    const { todoItems } = this.state;
    const index = todoItems.findIndex((data) => data.id === id); // id 로 인덱스 찾기
    const selectedItem = todoItems[index];
    const toggle = selectedItem.complete;
    const nextItemsOrigns = [...todoItems];
    const nextItemsChanges = [...todoItems];

    const nextItemsOrign = {
      ...selectedItem,
      complete: !toggle,
    };
    nextItemsOrigns[index] = nextItemsOrign;
    //

    const nextItemsChange = {
      ...selectedItem,
      complete: !selectedItem.complete,
      text: this.state.updateInput,
    };
    nextItemsChanges[index] = nextItemsChange;

    // 값을 저장

    // 수정 모드일 때
    // 토글 시키고, 원래값 보여주기
    if (!toggle) {
      console.log("수정 모드");
      this.setState({
        todoItems: nextItemsOrigns,
      });
    } else {
      console.log("완료 모드");
      this.setState({
        todoItems: nextItemsChanges,
      });
    }

    // 완료 모드일 때
    // 토글 시키고, 변경된 값 넣어주기
  };
  public render() {
    const { onChange, onSubmit, onRemove, onToggle, onSearch, onUpdateChange } =
      this;
    const { createInput, todoItems, searchInput } = this.state;
    const todoItemsList = todoItems
      .filter((data) => {
        if (searchInput == null) return data;
        else if (data.text?.toLowerCase().includes(searchInput.toLowerCase()))
          return data;
      })
      .map((data) => (
        <Box
          key={data.id}
          sx={{
            width: "100%",
            maxWidth: 360,
            border: "1px solid #90a4ae",
            bgcolor: "#eceff1",
          }}
        >
          <nav aria-label="main mailbox folders"></nav>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                {data.complete ? (
                  <Input
                    onChange={onUpdateChange}
                    defaultValue={todoItems[data.id / 2].text}
                  />
                ) : (
                  <div>
                    <b>{data.text}</b>
                  </div>
                )}
                <Button
                  style={{ marginLeft: "0.5rem" }}
                  variant="outlined"
                  startIcon={data.complete ? <DoneIcon /> : <EditIcon />}
                  onClick={(e: React.MouseEvent) => onToggle(data.id, e)}
                >
                  {data.complete ? "완료하기" : "수정하기"}
                </Button>
                <Button
                  style={{ marginLeft: "0.5rem" }}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => onRemove(data.id)}
                >
                  삭제하기
                </Button>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      ));

    return (
      <main className="todo-list-template">
        <div className="title">
          <h1>오늘 뭐하지?</h1>
          <Divider />
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="onSearch">할 일 검색</InputLabel>
              <Input
                id="onSearch"
                onChange={onSearch}
                placeholder={"내가.. 뭐..하려 했더라??"}
                value={searchInput}
              />
            </FormControl>
          </div>
        </div>
        <section className="form-wrapper">
          <div>
            <FormControl variant="standard">
              <form onSubmit={onSubmit}>
                <InputLabel htmlFor="onSearch">할 일 입력</InputLabel>
                <Input
                  onChange={onChange}
                  value={createInput}
                  placeholder={"할 일을 입력 하세요."}
                />
                <Button
                  style={{ marginLeft: "1rem" }}
                  variant="outlined"
                  startIcon={<AddCircleIcon />}
                  type="submit"
                >
                  추가하기
                </Button>
              </form>
            </FormControl>
          </div>
          <Divider />
        </section>
        <section className="todos-wrapper">
          <ul>{todoItemsList}</ul>
          {/* <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={todoItemsList} />
              </ListItemButton>
            </ListItem>
          </List> */}
        </section>
      </main>
    );
  }
}

export default TodoList;
