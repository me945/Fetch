const path = require ("path");
const http = require("https");
const fs = require('fs')
const { response, json } = require("express");
const { Console } = require("console");
const {users, projects, contributes_on} = require('./project');
//const data = require('./data');
var express = require("express");
const project = require("./project");
const { Server } = require("http");
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
  

//------------Find User Info---------------------------------------

//find user info
function checkForUser(user){
     for (var i =0; i < users.length; i++){
        if(users[i].id == user){
          return(JSON.stringify(users[i]));
        }
     }
}

//Object Example: { "id" :1, name": "whatever"}
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

//-----------Find Project Owner---------------------------------------

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

  //Object Example: { "id" :2, name": "yes"}
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

//---------Find projects info of the user---------------------------------------------

  //Projetcs/username - > returns json object with project's info
  function fetchProjectInfo(user,project){
    for (var i =0; i < projects.length; i++){
      if(projects[i].Owner_id == user){
        return(projects[i].title);
      }
  };
}

// Object Example:  {    
//                     "title_name" : "first_project",
//                     "description": "found  more reasons to hate JS",
//                     "commits": -1
//                      Contributors: [
//                                      {user:"name"},.       
//                                      {user:"name"}
//                                    ]
//                  },
//returns project titile info
app.get('/projects/:user/:project_title', (req, res) => {
  const project = String(req.params.project_title);
  const user = String(req.params.user);
  const getProject = fetchProjectInfo(user,project);

  if (!getProject) {
    res.status(500).send('project not found.')
  } else {
    res.json(getProject);
  }
});

//---------Find the projects the user is coontibuting to-----------------------------------------

  //Projetcs/username - > returns json object with project's contributers
  function userProjectsCont(user,project){
  //find projects the user is contributing to
  for (var j =0; j < contributes_on.length; j++){
    if(contributes_on[j].User_id == user){
      var y = contributes_on[i].Project_id;
    }
  }

  //fetch project info
  for (var k =0; k < projects.length; k++){
    if(project[k].Project_id == y){
      return (project[k].title)
    }
  }
}

//Object Example:  {
//                  Username : name,    
//                  projects: [{"id" : 1,
//                  "title_name":"first_project",
//                  "url" : /projects/name/first_project
//                   },
//
//                   {"id" : 2,
//                    "title_name":"second_project",
//                    "url" : /projects/name/second_project
//                   }]     
//                 }
//returns projects all contibuters

app.get('/projects/:user/', (req, res) => {
  const project = String(req.params.project_title);
  const user = String(req.params.user);
  const getProject = userProjectsCont(user,project);

  if (!getProject) {
    res.status(500).send('project not found.')
  } else {
    res.json(getProject);
  }
});
      
    
//----------------The End----------------------------
  //console.log(global)

  // //find project contributer
  // function checkForProjectCon(project){
  //   for (var i =0; i < contributes_on.length; i++){
  //      if(contributes_on[i].Project_id == project){
  //         var y = contributes_on[i].User_id;
  //      }
  //   }

  //    for(var j =0; j< users.length; j++){
  //      if(users[j].id == y){
  //         var userInfo = users[j];
  //      }
  //   }
  //   return(userInfo);
  // }  

//Object Example: [ { "id" :1, name": "whatever"}
//                { "id" :2, name": "yes"} ]

  //  //Object Example: { "id" :2, name": "yes"}
  //  //returns Porject contributers
  //  app.get('/project/:user/:project/con', (req, res) => {

  //   const project = String(req.params.project);
  //   const user = String(req.params.user);
  //   const getProject = checkForProjectCon(user,project);

  //   if (!getProject) {
  //     res.status(500).send('project not found.')
  //   } else {
  //     res.json(getProject);
  //   }
  // });



 console.log(JSON.stringify(contributes_on,null,4));
