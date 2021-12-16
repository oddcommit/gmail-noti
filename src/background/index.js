/*global chrome,browser*/
// If your extension doesn't need a background script, just leave this file empty
import axios from 'axios'
import xml2js from 'xml2js'

chrome.storage.local.get(['storage'], (result) => {
  if (result.storage && result.storage.gmail) {
    taskInBackground()
  } else {
    chrome.browserAction.setBadgeText({ text: '' })
  }
})

setInterval(function () {
  chrome.storage.local.get(['storage'], (result) => {
    if (result.storage && result.storage.gmail) {
      taskInBackground()
    } else {
      chrome.browserAction.setBadgeText({ text: '' })
    }
  })
}, 10* 1000)

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function taskInBackground() {
  axios
    .get('https://mail.google.com/mail/u/1/feed/atom')
    .then(function (response) {
      const xml = response.data
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          throw err
        }
        chrome.browserAction.setBadgeText({
          text: result.feed.fullcount[0],
        })
        let isGmailLogedIn = true
        chrome.storage.local.set({ isGmailLogedIn }, function () {})
      })
    })
    .catch(function (error) {
      chrome.storage.local.get(['storage'], (result) => {
        let isGmailLogedIn = false
        chrome.storage.local.set({ isGmailLogedIn }, function () {})
      })

      chrome.browserAction.setBadgeBackgroundColor({ color: 'red' })
      chrome.browserAction.setBadgeText({
        text: '!',
      })
    })
}
