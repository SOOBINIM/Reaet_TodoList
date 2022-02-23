import React, { Component } from "react";

interface TodoItemProps {
  text: string;
  complete: boolean;
  onToggle(): void;
  onRemove(): void;
  // onRemove:() => void;
  //   onUpdate(): void;
}

export class TodoItem extends Component<TodoItemProps> {
  render(): React.ReactNode {
    return (
      <li>
        <b
          onClick={this.props.onToggle}
          style={{
            textDecoration: this.props.complete ? "line-through" : "none",
          }}
        >
          {this.props.text}
        </b>
        <span style={{ marginLeft: "0.5rem" }} onClick={this.props.onRemove}>
          [지우기]
        </span>
      </li>
    );
  }
}

export default TodoItem;
