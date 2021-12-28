import React, { Component } from 'react'
import '../App.css'
class EmptyNotification extends Component {

  render() {   
    return (
      <div className="text-center text-v-middle">
        <div>
          <h2>You have no unread Notifications </h2>
          <p>
                You will receive a notification when received
          </p>
        </div>
      </div>

      
    )
  }
}

export default EmptyNotification
