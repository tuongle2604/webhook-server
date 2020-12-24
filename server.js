const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { rebuild } = require("./helper");
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const modifiedFiles = req.body.head_commit.modified;
  // Not rebuild if only change readme.md
  if (
    modifiedFiles.length === 1 &&
    modifiedFiles[0].toLowerCase() === "readme.md"
  ) {
    return res.status(200).end();
  }

  const projectName = req.body.repository.name;
  setTimeout(() => rebuild(req.body.repository.name), 0);
  res.status(200).end();
});

app.listen(3000);
