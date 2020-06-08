import React from "react";
import "./App.css";
import Users from "./users2/Users.js";
import User from "./users2/User.js";
import CreateUser from "./users2/CreateUser";

class App extends React.Component {
  state = {
    selectedUser: null,
    refetchUsers: false
  };

  onUserSelected = (user) => {
    this.setState({ 
      selectedUser: user, 
    });
    this.onRefetchUsers(true)
  };

  onRefetchUsers = (boolean) => {
    this.setState({
      refetchUsers: boolean
    });
  };

  render() {
    return (
      <div id="app-wrapper">
        <div>Refresh: {this.state.refetchUsers}</div>
        <CreateUser onRefetchUsers={this.onRefetchUsers} onUserSelected={this.onUserSelected}/>
        {this.state.selectedUser ? (
          <User user={this.state.selectedUser} onUserSelected={this.onUserSelected} />
        ) : (
          <Users refetchUsers={this.state.refetchUsers} onRefetchUsers={this.onRefetchUsers} onUserSelected={this.onUserSelected} />
        )}
      </div>
    );
  }
}

export default App;
