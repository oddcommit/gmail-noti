/*global chrome,browser*/
import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import xml2js from 'xml2js'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Moment from 'react-moment'
import moment from 'moment'
class Notifications extends Component {
  constructor() {
    super()
    var today = false
    var yesterday = false
    var thisWeek = false
    var moreThanAWeek = false

    this.state = {
      gmailData: null,
    }
  }

  openSourcePage = (ref) => {
    window.open(ref, '_blank')
  }

  componentDidMount = () => {
    axios.get(`https://mail.google.com/mail/u/1/feed/atom`).then((res) => {
      const xml = res.data
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          throw err
        }
        this.setState({
          gmailData: result,
        })

        chrome.browserAction.setBadgeText({
          text:
            result.feed.fullcount[0] === '0' ? '' : result.feed.fullcount[0],
        })
      })
    })
  }
  updateTodayFlag = () => {
    this.today = true
  }

  updateYesterdayFlag = () => {
    this.yesterday = true
  }
  updateWeekFlag = () => {
    this.thisWeek = true
  }

  updateMoreThanAWeek = () => {
    this.moreThanAWeek = true
  }
  numberOfDaysfromToday = (fromDate) => {
    const date1 = moment(new Date())
    const date2 = moment(fromDate)
    return date1.diff(date2, 'days')
  }
  render() {
    var entrys =
      this.state.gmailData && this.state.gmailData.feed.entry
        ? this.state.gmailData.feed.entry
        : []
    return (
      <Container fixed="top">
        {entrys.map((entry, index) => {
          return (
            <div>
              <Row className="row">
                {/* Today */}
                {!this.today &&
                this.numberOfDaysfromToday(entry.issued[0]) === 0 ? (
                  <div className="list-header">TODAY</div>
                ) : null}
                {!this.today &&
                this.numberOfDaysfromToday(entry.issued[0]) === 0
                  ? this.updateTodayFlag()
                  : null}

                {/* {this.numberOfDaysfromToday(entry.issued[0])} */}
                {/* Yesterday */}
                {!this.yesterday &&
                this.numberOfDaysfromToday(entry.issued[0]) === 1 ? (
                  <div className="list-header">YESTERDAY</div>
                ) : null}
                {!this.yesterday &&
                this.numberOfDaysfromToday(entry.issued[0]) === 1
                  ? this.updateYesterdayFlag()
                  : null}

                {/* this week */}
                {!this.thisWeek &&
                this.numberOfDaysfromToday(entry.issued[0]) > 1 &&
                this.numberOfDaysfromToday(entry.issued[0]) < 14 ? (
                  <div className="list-header">THIS WEEK</div>
                ) : null}
                {!this.thisWeek &&
                this.numberOfDaysfromToday(entry.issued[0]) > 1 &&
                this.numberOfDaysfromToday(entry.issued[0]) < 14
                  ? this.updateWeekFlag()
                  : null}

                {/* older */}
                {!this.moreThanAWeek &&
                this.numberOfDaysfromToday(entry.issued[0]) >= 14 ? (
                  <div className="list-header">OLDER</div>
                ) : null}
                {!this.moreThanAWeek &&
                this.numberOfDaysfromToday(entry.issued[0]) >= 14
                  ? this.updateMoreThanAWeek()
                  : null}
              </Row>
              <Row
                className="row"
                onClick={() => this.openSourcePage(entry.link[0].$.href)}
              >
                <div className="list-item">
                  <div className="mager-content">
                    {entry.title[0].length > 42
                      ? entry.author[0].name[0] +
                        ': ' +
                        entry.title[0].substring(0, 42) +
                        '...'
                      : entry.author[0].name[0] + ': ' + entry.title[0]}
                    {/* <span class="tooltiptext">{entry.summary[0]}</span> */}
                  </div>
                  <div className="minor-content">
                    <Moment toNow>{entry.issued[0]}</Moment>{' '}
                    <strong>Gmail</strong>
                  </div>
                </div>
              </Row>
            </div>
          )
        })}
      </Container>
    )
  }
}

export default Notifications
