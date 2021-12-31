/*global chrome,browser*/
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { goTo } from 'react-chrome-extension-router'
import Settings from './Settings'
import '../App.css'
import Notifications from './Notifications'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form } from 'react-bootstrap'

class Welcome extends Component {
  state = {
    enabled: false,
    isGmailLogedIn: false,
  }

  componentDidMount = () => {
    chrome.storage.local.get(['storage'], (result) => {
      if (result.storage.gmail)
        this.setState({
          enabled: true,
        })
    })

    chrome.storage.local.get(['isGmailLogedIn'], (result) => {
      this.setState({
        isGmailLogedIn: result.isGmailLogedIn,
      })
    })
  }

  welcomePage = () => {
    return (
      <div className="text-center">
        <img
          src="/img/notification.png"
          alt="bg"
          className="welcome-image "
        ></img>
        <div>
          <h2>Enable notifications</h2>
          <p>
          Make sure you're logged into Gmail. Navigate to settings and allow Extention to read Gmail notifications.
          </p>
        </div>
        <div>
          <button class="btn btn-warning" onClick={() => goTo(Settings)}>
            <FontAwesomeIcon icon="globe" /> Settings
          </button>
        </div>
      </div>
    )
  }
  render() {
    return this.state.enabled && this.state.isGmailLogedIn ? (
      <Notifications />
    ) : (
      this.welcomePage()
    )
  }
}

export default Welcome
