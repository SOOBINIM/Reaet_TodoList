import React from "react";

interface clcockProps {}
interface clockState {
  date: Date;
}

class Clock extends React.Component<clcockProps, clockState> {
  constructor(props: clcockProps) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    // 컴포넌트가 불러올 때 마다 실행
    setInterval(() => this.Change(), 1000);
  }

  Change() {
    this.setState({
      date: new Date(),
    });
    console.log("시계");
  }

  render(): React.ReactNode {
    return <div>시간 : {this.state.date.toLocaleTimeString()}</div>;
  }
}

export default Clock;
