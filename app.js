'use strict'

const express = require('express')
const app = express()

// middleware (fancy word for a function) typically takes three arguments

const requestTime = (req, res, next) => {
  req.requestedTime = Date.now()
  next()
}

app.use(requestTime) // passing in a middleware function

app.use(express.static(__dirname + `/public`))

app.get(`/monkeys`, (req, res, next) => {
  console.log("fetching some monkeys")
  console.log(`this ran at ${req.requestedTime}`)
  res.sendFile(__dirname + `/public/monkeys.html`)
})

app.get(`/chickens`, (req, res, next) => {
  console.log("looking for chickens")
  res.send(`<h3>No chickens for you</h3><form method="POST"><input type="text"><button type="submit">push</button></form>`)
})

app.post(`/chickens`, (req, res, next) => {
  console.log(`posting a form for chickens`)
})

app.use( (req, res) => {
  console.log("we only have monkeys and chickens here")
})

app.listen(3000, () => console.log('listening on port 3000'))
