import React from "react";
import "./App.css";
import Users from "./users/Users.js";
import User from "./users/User.js";
import CreateUser from "./users/CreateUser";

class App extends React.Component {
  state = {
    selectedUser: null,
  };

  selectUser = (user) => {
    this.setState({ selectedUser: user });
  };
  render() {
    return (
      <div id="app-wrapper">
        <CreateUser selectUser={this.selectUser} />
        {this.state.selectedUser ? (
          <User user={this.state.selectedUser} selectUser={this.selectUser} />
        ) : (
          <Users selectUser={this.selectUser} />
        )}
      </div>
    );
  }
}

export default App;
