import React, { Component } from 'react';
import { AppRoutes } from './routes/appRoutes'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App layer">
        <AppRoutes />
      </div>
    );
  }
}

export default App;
