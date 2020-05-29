import React from "react";
import "./App.css";
import Users from "./users/Users.js";

class App extends React.Component {
  render() {
    return (
      <div id="app-wrapper">
        <Users />
      </div>
    );
  }
}

export default App;
