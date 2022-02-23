import React, { Component } from "react";

interface State {
  name: string;
}

class Change extends Component {
  state: State = {
    name: "",
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      name: value,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState(({}) => ({
      name: "",
    }));
  };

  render(): React.ReactNode {
    return (
      <form>
        <input value={this.state.name} onChange={this.handleChange} />
        <div>{this.state.name}</div>
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default Change;
