const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const app = express();
 
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  rebuild(req.body.name);
  res.status(200).end();
})

async function rebuild(projectName) {
  shell.exec("echo rebuild project: " + projectName);
  shell.cd(`../${projectName}`);
  shell.exec("git pull origin master");
  shell.exec("npm install");
  shell.exec("npm run build");
}

app.listen(3000);