const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { rebuild } = require("./helper");
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  setTimeout(() => rebuild(req.body.repository.name), 0);
  res.status(200).end();
});

app.listen(3000);
