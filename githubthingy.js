const path = require ("path");
const http = require("https");
const fs = require('fs')
const { response, json } = require("express");
const { Console } = require("console");
const {users, projects, contributes_on} = require('./data.js');
//const data = require('./data');
var express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server running at: http://localhost:'+ PORT)});
    
app.get('/',(req, res)=>{
    res.send('Hello');
})    
app.get('/data', (req, res) => {
    res.json(data);
  });
  
//function to find the user
function checkForUser(user){
     for (var i =0; i < data.user.length; i++){
        if(data.users[i].id == user){
          return(JSON.stringify(data.user[i]));
        }
     }
}

//function to find project owner
function checkForProjectOwner(user,project){
     for (var i =0; i < projects.length; i++){
        if(projects[i].id == project){
          var x =  JSON.stringify(projects[i].Owner_id)
        }
     }
    
     if( x == user){
      for(var j =0; j<users.length; j++){
          if(users[j].id == x){
            var userInfo = users[j];
          }
      }
     return(userInfo);
    }else {
      return false;
    }
}

//function to find project contributer
function checkForProjectCon(project){
     for (var i =0; i < data.Contributing.length; i++){
        if(contributes_on[i].Project_id == project){
           var y = contributes_on[i].User_id;
        }
     }

      for(var j =0; j< data[0].user.length; j++){
        if(users[j].id == y){
           var userInfo = users[j];
        }
     }
     return(userInfo);
}
  

//return user's info
app.get('/data/:userId', (req, res) => {
    const user = String(req.params.userId);
    var getUser = checkForUser(user);

    if (!getUser) {
      res.status(500).send('User not found.')
    } else {
        const h = JSON.stringify(getUser);
        res.json(getUser);
      }
  });

  //returns Porject that user owns
  app.get('/data/:user/:project', (req, res) => {
    const project = String(req.params.project);
    const user = String(req.params.user);
    const getProject = checkForProjectOwner(project);

    if (!getProject) {
      res.status(500).send('project not found.')
    } else {
      res.json(getProject);
    }
  });

   //returns Porject contributers
   app.get('/data/:user/:project/con', (req, res) => {
    const project = String(req.params.project);
    const user = String(req.params.user);
    const getProject = checkForProjectCon(user,project);

    if (!getProject) {
      res.status(500).send('project not found.')
    } else {
      res.json(getProject);
    }
  });

  // some stats
  // fs.stat('data.json', (err, stats) => {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }  
  //   console.log(stats)
  // })

  console.log(global)