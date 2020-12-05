const path = require ("path");
const http = require("https");
var express = require("express");
const { response, json } = require("express");
const app = express();
const PORT = 3000;
const data = require('./data.json');
const { Console } = require("console");

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
     for (var i =0; i < data[0].user.length; i++){
        if(data[0].user[i].id == user){
          return(JSON.stringify(data[0].user[i]));
        }
     }
}

//function to find project owner
function checkForProjectOwner(project){
     for (var i =0; i < data[1].project.length; i++){
        if(data[1].project[i].id == project){
          var x =  JSON.stringify(data[1].project[i].Owner_id)
        }
     }

     for(var j =0; j<data[0].user.length; j++){
        if(data[0].user[j].id == x){
           var userInfo = data[0].user[j];
        }
     }
     return(userInfo);
}

//function to find project contributer
function checkForProjectCon(project){
     for (var i =0; i < data[2].Contributing.length; i++){
        if(data[2].Contributing[i].Project_id == project){
           var y = data[2].Contributing[i].User_id;
        }
     }

      for(var j =0; j< data[0].user.length; j++){
        if(data[0].user[j].id == y){
           var userInfo = data[0].user[j];
        }
     }
     return(userInfo);
}
  

//return user's info
app.get('/data/:user', (req, res) => {
    const user = String(req.params.user);
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
    const getProject = checkForProjectCon(project);

    if (!getProject) {
      res.status(500).send('project not found.')
    } else {
      res.json(getProject);
    }
  });
