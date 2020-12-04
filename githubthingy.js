const path = require ("path");
const http = require("https");
var express = require("express");
const { response, json } = require("express");
const app = express();
const PORT = 3000;

const data = require('./data.json');

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
  // console.log("this is user");
  // console.log(user);
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


//function to find project contributers
function checkForProjectCon(project){

     for (var i =0; i < data[2].Contributing.length; i++){
        if(data[2].Contributing[i].Project_id == project){
        return(JSON.stringify(data[0].user[i]));
      }
     }
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

//  //returns project contibute
//   app.get('/data/con/:project', (req, res) => {
//     const project = String(req.params.project);
//     // const user = String(req.params.user);
//     const getUser = checkForProjectCon(project);

//     if (!getUser) {
//       res.status(500).send('project not found.')
//     } else {
//       res.json(getUser);
//     }
//   });


//const name = "Sike3";
//const arr = github.filter(x => x.project.title === name);
//const h = JSON.stringify (arr);
//console.log(h);
//console.log(arr);

const someData = JSON.stringify(data,null,4);
console.log(data);
console.log(someData);


const anyAdult = data.some(p => p.user[0].id === 1);
console.log(anyAdult); // true

//for loop for fetch user
for(var i =0; i < data[0].user.length; i++){
  if(data[0].user[i].id === 2){
    console.log("Hello"+ JSON.stringify(data[0].user[i]));
  }
}

//for loop to fetch porject
for(var j=0; j < data[1].project.length; j++){

  if(data[1].project[j].title === "pro2"){
    console.log(data[1].project[j]);
  }
  
}



// console.log("Accessing the object");
// const data2 = someData;
//console.log(data2);

// var n = 1;
// const m = data.filter(x => x.user[1] .id === 1);

  const u = data[0].user[0].id;
  const p = data[1].project[1].title;
  const c = data[2].Contributing[0].User_id;

  console.log(u);
  console.log(p);
  console.log(c);

  if (u === p ){
    console.log("i found it");
  }
  const o = data[0].user[1].id;
  console.log(o);

//console.log(m);
 const cat = {
  code: 42,
  items: [{
      id: 1,
      name: 'foo'
  }, {
      id: 2,
      name: 'bar'
  }]
};

console.log(cat);
const item_name = cat.items[1].name;
console.log(item_name);
//console.log(github);
// const users = JSON.stringify(github)
// const objs = JSON.parse(users);
// const trys = github.username = "user0";

// console.log(trys);
// console.log(github);
// const json = '{ "fruit": "pineapple", "fingers": 10 }';
// const obj = JSON.parse(json);
// console.log(obj.fruit, obj.fingers);