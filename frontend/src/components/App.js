import React from "react";
import "./App.css";
import Index from "./users/Index.js";

class App extends React.Component {
  render() {
    return (
      <div id="app-wrapper">
        <Index />
      </div>
    );
  };
};

export default App;
