const path = require ("path");
const http = require("https");
const fs = require('fs')
const { response, json } = require("express");
const { Console } = require("console");
const {users, projects, contributes_on} = require('./project');
//const data = require('./data');
var express = require("express");
const project = require("./project");
const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server running at: http://localhost:'+ PORT)});
    
app.get('/',(req, res)=>{
    res.send('Hello');
})    
app.get('/project', (req, res) => {
    res.json(projects);
  });
  
//find user info
function checkForUser(user){
     for (var i =0; i < users.length; i++){
        if(users[i].id == user){
          return(JSON.stringify(users[i]));
        }
     }
}

//find project owner
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

//find project contributer
function checkForProjectCon(project){
     for (var i =0; i < contributes_on.length; i++){
        if(contributes_on[i].Project_id == project){
           var y = contributes_on[i].User_id;
        }
     }

      for(var j =0; j< users.length; j++){
        if(users[j].id == y){
           var userInfo = users[j];
        }
     }
     return(userInfo);
}  
  //Projetcs/username - > returns json object with project's info
  function fetchProjectInfo(user,project){
    for (var i =0; i < projects.length; i++){
      if(projects[i].Owner_id == user){
        return(projects[i].title);
      }
  };
}

  
//return user's info
app.get('/project/:userId', (req, res) => {
    const user = String(req.params.userId);
    var getUser = checkForUser(user);

    if (!getUser) {
      res.status(500).send('User not found.')
    } else {
        const h = JSON.parse(getUser);
        res.json(getUser);
      }
  });

  //return project owner
  app.get('/project/:project/:user', (req, res) => {
    const project = String(req.params.project);
    const user = String(req.params.user);
    const getProject = checkForProjectOwner(user,project);

    if (!getProject) {
      res.status(500).send('project not found.')
    } else {
      res.json(getProject);
    }
  });

   //returns Porject contributers

   app.get('/project/:user/:project/con', (req, res) => {

    const project = String(req.params.project);
    const user = String(req.params.user);
    const getProject = checkForProjectCon(user,project);

    if (!getProject) {
      res.status(500).send('project not found.')
    } else {
      res.json(getProject);
    }
  });

//returns project titile info
app.get('/projects/:user', (req, res) => {
  const project = String(req.params.project_title);
  const user = String(req.params.user);
  const getProject = fetchProjectInfo(user,project);

  if (!getProject) {
    res.status(500).send('project not found.')
  } else {
    res.json(getProject);
  }
});

  console.log(global)




