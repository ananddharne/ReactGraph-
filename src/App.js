import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart'
class App extends Component {
  render() {
    return (
      <div style={{width:'100%',height:'100vh'}}>
      <div style={{width:600}}><Chart width={600} {...this.props} height={300}/></div>
      </div>
    );
  }
}

export default App;
