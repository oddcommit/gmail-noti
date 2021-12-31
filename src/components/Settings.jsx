/*global chrome,browser*/
import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { goTo } from 'react-chrome-extension-router'
import * as Icon from 'react-bootstrap-icons';
import '../App.css'

import Welcome from './Welcome'
import axios from 'axios'
import SettinngsInfo from './models/SettinngsInfo'

class Settings extends Component {
  constructor() {
    super()
    this.state = {
      isChanged: false,
      gmail: false,
      facebook: false,
      github: false,
      isGmailLogedIn: false,
      infoModelState : false
    }
  }
  stateChange = () => {
    this.setState({
      isChanged: true,
    })
  }

  handleChange = (e) => {
    console.log(e.target)
    this.setState({
      [e.target.name]: e.target.checked,
    })
    this.updateLoginStatus()
    this.stateChange()
  }

  updateLoginStatus = () => {
    let isGmailLogedIn = false
    axios
      .get('https://mail.google.com/mail/u/1/feed/atom')
      .then(function (response) {
        isGmailLogedIn = true
      })
      .catch(function (error) {
        isGmailLogedIn = false
      })
      .finally(() => {
        chrome.storage.local.set({ isGmailLogedIn }, () => {
          this.setState({
            isGmailLogedIn,
          })
        })
      })
  }

  open = () =>{
    console.log('open')
    this.setState({
      infoModelState : true
    })
  }


  close = () => {
    this.setState({
      infoModelState: false,
    })
  }
  
  save = () => {
    let platforms = {
      gmail: this.state.gmail,
      facebook: this.state.facebook,
      github: this.state.github,
    }
    chrome.storage.local.set({ storage: platforms }, () => {
      goTo(Welcome)
    })
  }

  componentDidMount = () => {
    chrome.storage.local.get(['storage'], (result) => {
      this.setState({
        gmail: result.storage.gmail,
        facebook: result.storage.facebook,
        github: result.storage.github,
      })
    })

    chrome.storage.local.get(['isGmailLogedIn'], (result) => {
      this.setState({
        isGmailLogedIn: result.isGmailLogedIn,
      })
    })
  }
  render() {
    return (
      <div>
        <div className="settings-description">
        Choose Gmail to receive notifications
        </div>
        <div className="list-header">
          PLATFORMS <Icon.InfoCircle onClick = {this.open}/>
          
        </div>
        <div className="platform-item">
          <Row className="mb-3">
            <Form.Group as={Col} id="formGridCheckbox">
              <Form.Check
                onChange={this.handleChange}
                checked={this.state.gmail}
                type="checkbox"
                name="gmail"
                label="Gmail"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              {!this.state.gmail ? (
                ''
              ) : this.state.isGmailLogedIn ? (
                <span class="label label-success"> Sync</span>
              ) : (
                <span class="label label-warning">Gmail is not logged in</span>
              )}
            </Form.Group>
          </Row>
          {/* <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              onChange={this.handleChange}
              checked={this.state.facebook}
              type="checkbox"
              name="facebook"
              label="Facebook"
              disabled="true"
            />
          </Form.Group> */}
          {/* <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              onChange={this.handleChange}
              checked={this.state.github}
              type="checkbox"
              name="github"
              label="github"
              disabled="true"
            />
          </Form.Group> */}
        </div>
        <div className="settings-save">
          <Button
            className="btn btn-warning save-btn"
            type="submit"
            onClick={this.save}
          >
            {this.state.isChanged ? 'Save' : 'Cancel'}
          </Button>
        </div>
        <div className ="version">
          Version 0.1.1
        </div>
        <SettinngsInfo
         show={this.state.infoModelState}
         onHide={this.close}
         refersh={this.componentDidMount}
        ></SettinngsInfo>
        {/* <settinngsInfo
          show={this.state.infoModelState}
          onHide={this.close}
          refersh={this.componentDidMount}
        ></settinngsInfo> */}
        
      </div>
    )
  }
}

export default Settings
