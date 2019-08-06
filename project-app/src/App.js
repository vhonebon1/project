import React, { Component } from 'react';
import './App.css';
import ProjectsContainer from './components/ProjectsContainer'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Project List</h1>
        </div>
        <ProjectsContainer />
      </div>
    );
  }
}

export default App;
