const path = require ("path");
const http = require("https");
var express = require("express");
const { response } = require("express");
var app = express();
const PORT = 3000;


//"start":"nodemon github.js",
let github = [
    {
        "username" : "user1",
        "project": "Sike",
        "description" : "its a project ",
        "commits": 2
    },
    {
        "username" : "user1",
        "project": "Sike2",
        "description" : "its a project2 ",
        "commits": 3
    },
    {
        "username" : "user2",
        "project": "Oblivious",
        "description" : "its dark in here ",
        "commits": 4
    },
    {
        "username" : "user3",
        "project": "Space",
        "description" : "i can't breath",
        "commits": 5
    },
]


app.use(express.json());

app.listen(PORT, () => {
    console.log('Server running at: http://localhost:'+ PORT)});
    
app.get('/',(request, response)=>{
    response.send('Hello');
})    

app.get('/github', (request, response) => {
    response.json(github);
  });

app.get('/github/:username', (request, response) => {
    const user = String(request.params.username);
    const getUser = github.find((username) => username.username === user);
  
    if (!getUser) {
      response.status(500).send('User not found.')
    } else {
      response.json(getUser);
    }
  });