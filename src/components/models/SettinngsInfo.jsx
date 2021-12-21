import React, { Component } from 'react'
import { Modal, Button, Row } from 'react-bootstrap'

class SettinngsInfo extends Component {
  constructor(props, context) {
    super(props, context)

    console.log('here inside model');
  }

  render() {
    return (
      <Modal
      {...this.props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Platfrom Loged in</Modal.Title>
          </Modal.Header>

          <Modal.Body>
                We support the following platforms. To get notified,
                   you must be logged in to that platform in the browser before using Bluebell.
                    When Bluebell is able to fetch the service, it will update with a green sync icon
          </Modal.Body>

          <Modal.Footer>
            <Button  className="btn btn-warning save-btn" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    )
  }
}

export default SettinngsInfo
