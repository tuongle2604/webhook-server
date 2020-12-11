const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const app = express();
 
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  // rebuild(req.body.repository.name);
  setTimeout(() => rebuild(req.body.repository.name), 1000);
  res.status(200).end();
})

function rebuild(projectName) {
  console.log("rebuild project: " + projectName);
  shell.cd(`../${projectName}`);
  console.log("Pull code ...");
  shell.exec("git pull origin master");
  console.log("Installing package...");
  shell.exec("npm install", {silent:true});
  console.log("Building...");
  shell.exec("npm run build", {silent:true});
  console.log("Done!");
}

app.listen(3000);
