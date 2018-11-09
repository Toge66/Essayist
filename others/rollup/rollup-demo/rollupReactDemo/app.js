import React from "react";
import ReactDOM from "react-dom";

import "./default.css";

class HelloMessage extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}
const node = document.querySelector("#app");

ReactDOM.render(<HelloMessage name="Rollup oooo" />, node);
