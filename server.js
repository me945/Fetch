const path = require('path')
const http = require('https')
const fs = require('fs')
const { response, json } = require('express')
const { Console } = require('console')
const { users, projects, contributes_on } = require('./project')
//const data = require('./data');
var express = require('express')
const project = require('./project')
const { Server } = require('http')
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants')
const app = express()

const PORT = 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log('Server running at: http://localhost:' + PORT)
})

app.get('/', (req, res) => {
    res.send('Hello')
})
app.get('/project', (req, res) => {
    res.json(projects)
})

//------------Find User Info---------------------------------------

//find user info
function checkForUser(user) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == user) {
            return JSON.stringify(users[i])
        }
    }
}

//Object Example: { "id" :1, name": "whatever"}
//return user's info
app.get('/project/:userId', (req, res) => {
    const user = String(req.params.userId)
    var getUser = checkForUser(user)

    if (!getUser) {
        res.status(500).send('User not found.')
    } else {
        const h = JSON.parse(getUser)
        res.json(getUser)
    }
})

//-----------Find Project Owner---------------------------------------

//find project owner
function checkForProjectOwner(user, project) {
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === project) {
            var x = JSON.stringify(projects[i].Owner_id)
        }
    }
    if (x === user) {
        for (var j = 0; j < users.length; j++) {
            if (users[j].id === x) {
                var userInfo = users[j]
            }
        }
        return userInfo
    } else {
        return false
    }
}

//Object Example: { "id" :2, name": "yes"}
//return project owner
app.get('/project/:project/:user', (req, res) => {
    const project = String(req.params.project)
    const user = String(req.params.user)
    const getProject = checkForProjectOwner(user, project)

    if (!getProject) {
        res.status(500).send('project not found.')
    } else {
        res.json(getProject)
    }
})

//---------Find projects info of the user---------------------------------------------

// Object Example:  {
//                     "title_name" : "first_project",
//                     "description": "found  more reasons to hate JS",
//                     "commits": -1
//                      contributors: [
//                                      {user:"name"},.
//                                      {user:"name"}
//                                    ]
//                  },
//Projetcs/username - > returns json object with project's info
function fetchProjectInfo(user, project) {
    var obj = {},
        obj2 = {},
        arr = [],
        arr2 = [],
        p_id

    //adding project info
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].title_name === project) {
            obj.title_name = projects[i].title_name
            obj.description = projects[i].description
            obj.commits = projects[i].commits
            p_id = projects[i].id
        }
    }

    //find contirbutions
    for (var i = 0; i < contributes_on.length; i++) {
        if (contributes_on[i].id === p_id) {
            arr.push(contributes_on[i].username)
        }
    }

    //get project info
    for (var i = 0; i < arr.length; i++) {
      for(var j=0; j<= users.length; j++){
        if (users[j].username == arr[i]) {
            obj2 = users[i]
            delete obj2.id
            arr2.push(obj2)
        }
      }
    }

    obj.contributers = Object.assign(arr2)
    return JSON.stringify(obj, null, 4)
}

//returns project titile info
app.get('/projects/:user/:project_title', (req, res) => {
    const project = String(req.params.project_title)
    const user = String(req.params.user)
    const getProject = fetchProjectInfo(user, project)

    if (!getProject) {
        res.status(500).send('project not found.')
    } else {
        res.json(getProject)
    }
})

//---------Find the projects the user is coontibuting to-----------------------------------------

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

function userProjects(user) {
    //projects/:user/
    var objtest = {},
        proObj = {},
        arrtest = [],
        arrtest2 = []

    //get username
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === user) {
            objtest.username = users[i].name
            useridtest = users[i].id
        }
    }

    //find contirbutions
    for (var i = 0; i < contributes_on.length; i++) {
        if (contributes_on[i].id === useridtest) {
            arrtest.push(contributes_on[i].project_id)
        }
    }

    //get project info
    for (var i = 0; i < arrtest.length; i++) {
        if (projects[i].id === arrtest[i]) {
            proObj = projects[i]
            delete proObj.Owner_id
            delete proObj.description
            delete proObj.commits
            arrtest2.push(proObj)
        }
    }

    objtest.projects = Object.assign(arrtest2)
    return JSON.stringify(objtest, null, 4)
}

// returns user projects that he/she contributed to
app.get('/projects/:user/', (req, res) => {
    const user = String(req.params.user)
    const getProject = userProjects(user)

    if (!getProject) {
        res.status(500).send('project not found.')
    } else {
        res.json(getProject)
    }
})




