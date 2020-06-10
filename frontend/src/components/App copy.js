import React from "react";
import "./App.css";
import Users from "./users/Users.js";
import User from "./users/User.js";
import CreateUser from "./users/CreateUser";
import DeleteUser from "./users/DeleteUser";

class App extends React.Component {
  state = {
    selectedUser: null,
    refetchUsers: false,
  };

  onUserSelected = (user) => {
    this.setState({
      selectedUser: user,
    });
  };

  refreshUsersList = () => {
    this.setState({
      refetchUsers: true,
    });
    this.setState({
      refetchUsers: false,
    });
  };

  render() {
    return (
      <div id="app-wrapper">
        <div>Refresh: {this.state.refetchUsers}</div>
        <CreateUser refreshUsersList={this.refreshUsersList} />
        {this.state.selectedUser ? (
          <div className="app-container">
            <User
              user={this.state.selectedUser}
              onUserSelected={this.onUserSelected}
              refreshUsersList={this.refreshUsersList}
            />
            <DeleteUser
              userId={this.state.selectedUser.id}
              refreshUsersList={this.refreshUsersList}
            />
          </div>
        ) : (
          <div className="app-container">
            <Users
              refetchUsers={this.state.refetchUsers}
              refreshUsersList={this.refreshUsersList}
              onUserSelected={this.onUserSelected}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
