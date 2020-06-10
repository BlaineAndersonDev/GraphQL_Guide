import React from "react";
import "./App.css";
import Index from "./users2/Index.js";

class App extends React.Component {
  state = {
    selectedUser: null,
    refetchUsers: false
  };

  onUserSelected = (user) => {
    this.setState({ 
      selectedUser: user, 
    });
  };

  refreshUsersList = () => {
    this.setState({
      refetchUsers: true
    });
    this.setState({
      refetchUsers: false
    });
  };

  render() {
    return (
      <div id="app-wrapper">
        <Index />
      </div>
    );
  }
}

export default App;
