/*global chrome,browser*/
import React, { Component } from 'react'
import { Router } from "react-chrome-extension-router";
import NavigationBar from './components/NavigationBar'
import Notifications from './components/Notifications'
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  componentDidMount = ()=> {
   
  }
  render() {
    return (
      <div className="App">
        <React.Fragment>
        <NavigationBar />
          <Router>
              <Welcome/>
          </Router>
        </React.Fragment>
      </div>
    )
  }
}

export default App
