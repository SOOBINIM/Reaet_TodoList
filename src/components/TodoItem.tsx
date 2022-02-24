import React, { Component } from "react";
import { MdDone, MdEditNote, MdDelete } from "react-icons/md";

interface TodoItemProps {
  text: string | undefined;
  editMode: boolean;
  updateInput: string;

  onUpdate(): void;
  onRemove(): void;
}

export class TodoItem extends Component<TodoItemProps> {
  render(): React.ReactNode {
    const { text, onUpdate, onRemove } = this.props;
    return (
      <li>
        {this.props.editMode ? (
          <form>
            <input
              defaultValue={"원래값"}
              onChange={(e) => this.setState({ updateInput: e.target.value })}
            />
            <span style={{ marginLeft: "0.5rem" }} onClick={() => onUpdate}>
              <MdDone />
            </span>
            <span style={{ marginLeft: "0.5rem" }} onClick={() => onRemove}>
              <MdDelete />
            </span>
          </form>
        ) : (
          <div>
            <b>{text}</b>
            <span style={{ marginLeft: "0.5rem" }} onClick={() => onUpdate()}>
              <MdEditNote />
            </span>
            <span style={{ marginLeft: "0.5rem" }} onClick={() => onRemove()}>
              <MdDelete />
            </span>
          </div>
        )}
      </li>
    );
  }
}

export default TodoItem;
