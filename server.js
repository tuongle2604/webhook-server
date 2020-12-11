var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post("/webhook", (req, res) => {
  console.log(req.body) // Call your action on the request here
  res.status(200).end() // Responding is important
})


app.listen(3000)