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
}, 20 * 1000)

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function taskInBackground() {
  axios
    .get('https://mail.google.com/mail/u/1/feed/atom')
    .then(function (response) {
      const xml = response.data
      xml2js.parseString(xml, (err, apiResponse) => {
        if (err) {
          throw err
        }
        chrome.browserAction.setBadgeBackgroundColor({ color: '#005282' })

        let count = 0
        chrome.storage.local.get(['readTime'], (result) => {
          let lastReadTime = new Date(result.readTime)

          if (apiResponse.feed.entry) {
            for (let i = 0; i < apiResponse.feed.entry.length; i++) {
              let mDate = new Date(apiResponse.feed.entry[i].modified[0])
              if (mDate > lastReadTime) count++
            }
            chrome.browserAction.setBadgeText({
              text: count === '0' ? '' : count >= 20 ? '20+' : count.toString(),
            })
          }
        })
        let isGmailLogedIn = true
        chrome.storage.local.set({ isGmailLogedIn }, function () {})
      })
    })
    .catch(function (error) {
      if (error.status === 401) {
        chrome.storage.local.get(['storage'], (result) => {
          let isGmailLogedIn = false
          chrome.storage.local.set({ isGmailLogedIn }, function () {})
        })

        chrome.browserAction.setBadgeBackgroundColor({ color: 'red' })
        chrome.browserAction.setBadgeText({
          text: '!',
        })
      }
    })
}
