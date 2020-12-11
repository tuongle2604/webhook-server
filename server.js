const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const app = express();
 
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  rebuild(req.body.repository.name);
  res.status(200).end();
})

function rebuild(projectName) {
  return new Promise((ok, no) => {
    shell.exec("echo rebuild project: " + projectName);
    shell.cd(`../${projectName}`);
    shell.exec("git pull origin master");
    shell.exec("npm install");
    shell.exec("npm run build");
    ok();
  })
}

app.listen(3000);
