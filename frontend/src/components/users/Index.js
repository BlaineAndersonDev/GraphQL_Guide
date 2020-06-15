import React from "react";
import "./styles/Index.css";
import Users from "./Users.js";
import User from "./User.js";
import CreateUser from "./CreateUser.js";
import UpdateUser from "./UpdateUser.js";
import DeleteUser from "./DeleteUser.js";

class Index extends React.Component {
  state = {
    refreshCount: 0,
    selectedUser: null
  };

  forceRefresh = async () => {
    await this.setState({
      refreshCount: (this.state.refreshCount + 1)
    })
  };

  handleSelectedUser = async (user) => {
    await this.setState({ selectedUser: user })
  };

  render() {
    return (
      <div id="user-index-wrapper">
        <h1 id="user-index-title">Users</h1>
        {this.state.selectedUser ? (
          <User
            user={this.state.selectedUser}
            forceRefresh={this.forceRefresh}
            handleSelectedUser={this.handleSelectedUser}
            UpdateUser={UpdateUser} //Component
            DeleteUser={DeleteUser} //Component
          />
        ) : (
          <Users 
            refreshCount = {this.state.refreshCount}
            forceRefresh={this.forceRefresh}
            handleSelectedUser={this.handleSelectedUser}
            UpdateUser={UpdateUser} //Component
            DeleteUser={DeleteUser} //Component
          />
        )}
        <CreateUser
          forceRefresh={this.forceRefresh}
        />
      </div>
    );
  }
}

export default Index;