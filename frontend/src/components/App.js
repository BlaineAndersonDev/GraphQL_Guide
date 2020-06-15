import React from "react";
import "./App.css";
import Index from "./users/Index.js";

class App extends React.Component {
  state = {
    mode: true
  };

  updateVisualMode = () => {
    if (this.state.mode) { // App is currently in Darkmode. Reset in Lightmode.
      document.documentElement.setAttribute('data-theme', 'light')
    } else { //App is currently in Lightmode. Reset in Darkmode. 
      document.documentElement.setAttribute('data-theme', 'dark')
    }
    this.setState({ mode: !this.state.mode });
  };

  render() {
    return (
      <div className="app-wrapper">
        <button className="app-mode-button" onClick={this.updateVisualMode}>
          Update Mode
          <div></div>
        </button>
        <Index />
      </div>
    );
  };
};

export default App;
