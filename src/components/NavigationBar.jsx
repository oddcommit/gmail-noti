import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styled from 'styled-components'
import { goTo } from 'react-chrome-extension-router'
import Settings from './Settings'
import Welcome from './Welcome'
import * as Icon from 'react-bootstrap-icons';

class NavigationBar extends Component {

  menu = () =>{
    goTo(Settings)
  }

  welcome = () =>{
    goTo(Welcome)
  }
  render() {
    const Styles = styled.div`
      .navbar {
        background-color: #337ab7;
      }
      a,
      .navbar-brand,
      .navbar-nav,
      .nav-link {
        color: white;
        padding-left: 15px;
        &:hover {
          color: white;
        }
      }

      #nav-dropdown {
        color: white;
      }
      .dropdown-item {
        color: black;
        &:hover {
          background-color: #337ab7;
        }
      }
    `

    return (
      <Styles>
        <Navbar expand="rg" >
          <Navbar.Brand >Notify</Navbar.Brand>
          <Nav.Link onClick ={this.menu}><Icon.Gear/></Nav.Link>
        </Navbar>
      </Styles>
    )
  }
}

export default NavigationBar
