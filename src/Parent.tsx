import * as React from "react";

interface ParentProps {
  name: string;
}

interface ParentState {
  age: number;
}

class Parent extends React.Component<ParentProps, ParentState> {
  constructor(props: { name: string }) {
    console.log("Parent constructor");
    super(props);
    this.state = {
      age: 31,
    };
  }
}
