import * as React from "react";

interface Props {
  //   color: string;
  //   avatar: string;
}

interface State {
  interval: number;
  progress: number;
}

class DateTest extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      interval: Math.floor(Math.random() * 500),
      progress: 0,
    };
  }

  componentDidMount() {
    setInterval(this.timer, this.state.interval);
  }

  timer() {
    this.setState({ progress: this.state.progress + 1 });
    console.log("anyhting");

    this.state.progress >= 99
      ? this.setState({ progress: 100 })
      : this.setState({ progress: 0 });
  }

  render() {
    return (
      <div>
        <div className="App-lane">
          {/* <img src={ this.props.avatar } alt=""/> */}
          {/* <progress */}
          {/* // value={this.state.progress}
          // color={this.props.color}
          max="100" */}
          {/* /> */}
        </div>
      </div>
    );
  }
}

export default DateTest;
