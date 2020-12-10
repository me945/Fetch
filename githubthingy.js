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
   app.get('/projects/:user/:project/con', (req, res) => {
    const project = String(req.params.project);
    const user = String(req.params.user);
    const getProject = checkForProjectCon(user,project);

    if (!getProject) {
      res.status(500).send('project not found.')
    } else {
      res.json(getProject);
    }
  });

// //returns project titile info
// app.get('/projects/:user/:project_title', (req, res) => {
//   const project = String(req.params.project_title);
//   const user = String(req.params.user);
//   const getProject = fetchProjectInfo(user,project);

//   if (!getProject) {
//     res.status(500).send('project not found.')
//   } else {
//     res.json(getProject);
//   }
// });


  console.log(global)
  //---------------ignore below-------------------

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

// const anyAdult = data.some(p => p.user[0].id === 1);
// console.log(anyAdult); // true

// //for loop for fetch user
// for(var i =0; i < data[0].user.length; i++){
//   if(data[0].user[i].id === 2){
//     console.log("Hello"+ JSON.stringify(data[0].user[i]));
//   }
// }

// //for loop to fetch porject
// for(var j=0; j < data[1].project.length; j++){

//   if(data[1].project[j].title === "pro2"){
//     console.log(data[1].project[j]);
//   }
  
// }

// // console.log("Accessing the object");
// // const data2 = someData;
// //console.log(data2);

// // var n = 1;
// // const m = data.filter(x => x.user[1] .id === 1);

//   const u = data[0].user[0].id;
//   const p = data[1].project[1].title;
//   const c = data[2].Contributing[0].User_id;

//   console.log(u);
//   console.log(p);
//   console.log(c);

//   if (u === p ){
//     console.log("i found it");
//   }
//   const o = data[0].user[1].id;
//   console.log(o);

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


// const initialState = [
//   {id:1 ,name: 'Product A', image: 'pic-001.jpg', tags: ['nature', 'camping', 'outdoor']},
//   {id:2 ,name: 'Product B', image: 'pic-002.jpg', tags: ['winter', 'hiking', 'camping', 'snow']},
//   {id:3 ,name: 'Product C', image: 'pic-003.jpg', tags: ['vacation', 'family', 'kids', 'river', 'lake', 'fishing']}
// ]

// console.log(data[0].user[1]);
// console.log(initialState);

//var hi = data[0].user[1].id;
//console.log("this is hi " +hi);


function transformEmployeeData(data) {
  return data.map(function(employee) {
    return employee.reduce(function(user, id) {
      user[id[0]] = id[1]
      return user
    }, {})
  })
}

var input = [[['firstName', 'Joe'], ['lastName', 'Blow'], ['age', 42], ['role', 'clerk']],
[['firstName', 'Mary'], ['lastName', 'Jenkins'], ['age', 36], ['role', 'manager']]]

var hello = [
    {"user":[
            { "id" :1,
            "name": "whatever"  },
            { "id" :2,
             "name": "yes"  }
            ]
  },
]
console.log( transformEmployeeData(input) )

//------------ A break through --------------
let dog = {
  "user":[{ "id" :1,
            "name": "whatever"  
          },

          { "id" :2,
             "name": "yes"  
          }]
  ,

  "project":[{ "id" : 1,
               "title": "pro2",
               "Owner_id": 2
             },

             { "id" :2,
              "title": "Pro2",
              "Owner_id": 1
            }]           
  ,

  "Contributing":[{ "User_id": 1,
                     "Project_id": 1  
                  },
                  { "User_id": 2,
                    "Project_id": 2  
                  }]
  }

console.log("this is dog");
console.log(dog);
 var v = dog.user.filter((x)=> x.id == 1); 
 let b = dog.project.filter((x)=> x.Owner_id == 1);
 let m = dog.Contributing.filter((x)=> x.User_id ==1);

 console.log("this is V"+ JSON.stringify(v));
 console.log("this is b"+ JSON.stringify(b));
 console.log("this is M"+ JSON.stringify(m));
 
 
const someData = JSON.stringify(dog,null,4);
console.log(dog);


console.log("This is dog with Null,4 \n"+ someData);
console.log(users.filter((x)=> x.id ==1));
console.log(users[1]);
console.log("this is projects \n" + JSON.stringify(projects[0].title,null,4));

// console.log(projects.filter((x)=> x.title.filter() == "First project"));




