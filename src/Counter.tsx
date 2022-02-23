import React, { Component } from "react";

interface Props {}

interface State {
  counter: number;
}

class Counter extends Component<Props, State> {
  state: State = {
    counter: 0,
  };

  constructor(props: Props) {
    super(props);
    this.onIncrease = this.onIncrease.bind(this);
  }
  // 화살표 함수를 사용 하지 않은 onIncrease 때문에 작성 했다.

  onIncrease(): void {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  }

  // 화살표 함수를 사용 하지 않으면 this가 뭔지 모른다.
  // 따라서 위에 constructor을 사용해서 this가 뭔지 알려줘야 한다. 

  onDecrease = (): void => {
    this.setState(({ counter }) => ({ counter: counter - 1 }));
  };

  render() {
    const { onIncrease, onDecrease } = this;

    return (
      <div>
        <h1>카운터</h1>
        <h3>{this.state.counter}</h3>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
