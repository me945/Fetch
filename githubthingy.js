const path = require ("path");
const http = require("https");
var express = require("express");
const { response } = require("express");
const app = express();
const PORT = 3000;


//"start":"nodemon github.js",
let github = 
[
    {"username" : "user0","project": {"title": "sigh","description" : "its a project ","commits": 3}},
    {"username" : "user1","project": {"title": "Sike3","description" : "its a project2 ","commits": 3}},
    {"username" : "user2","project": {"title": "Sike3","description" : "its a project2 ","commits": 3}},
    {"username" : "user2","project": {"title": "oblivious"},"description" : "its dark in here ","commits": 4},
    {"username" : "user3","project": {"title": "space"},"description" : "i can't breath","commits": 5},
]

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server running at: http://localhost:'+ PORT)});
    
app.get('/',(req, res)=>{
    res.send('Hello');
})    

app.get('/github', (req, res) => {
    res.json(github);
  });

app.get('/github/:username', (req, res) => {
    const user = String(req.params.username);
    const getUser = github.filter((username) => username.username === user);
  
    if (!getUser) {
      res.status(500).send('User not found.')
    } else {
      res.json(getUser);
    }
  });


  app.get('/github/:username/:project', (req, res) => {
    const project = String(req.params.project);
    const user = String(req.params.username);
    const getUser = github.find((x) => x.username === user && x.project.title === project);

    if (!getUser) {
      res.status(500).send('project not found.')
    } else {
      res.json(getUser);
    }
  });


const name = "Sike3";
const arr = github.filter(x => x.project.title === name);
console.log(arr);

// const users = JSON.stringify(github)
// const objs = JSON.parse(users);
// const trys = github.username = "user0";

// console.log(trys);
// console.log(github);
// const json = '{ "fruit": "pineapple", "fingers": 10 }';
// const obj = JSON.parse(json);
// console.log(obj.fruit, obj.fingers);