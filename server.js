const { users, projects, contributes_on } = require('./project')
var express = require('express')
const app = express()
const PORT = 3000

app.set('json spaces', 4)

app.listen(PORT, () => {
    console.log('Server running at: http://localhost:' + PORT)
})

app.get('/', (req, res) => {
    res.redirect('/projects/first')
})

app.get('/project', (req, res) => {
    res.json(projects)
})

//---------Find the projects the user is coontibuting to-----------------------------------------

//Object Example:  {
//                  id: 2
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

function userProjects(username) {
    let user = {}
    user.projects = []

    //get username
    for (var i = 0; i < users.length; i++) {
        if (users[i].name === username) {
            // objtest.username = users[i].name
            // userIdTest = users[i].id
            user.username = users[i].name
            user.id = users[i].id
        }
    }

    for (var i = 0; i < projects.length; i++) {
        if (projects[i].Owner_id === user.id) {
            const project = {}
            project.id = projects[i].id
            project.title_name = projects[i].title_name
            project.url = projects[i].url
            user.projects.push(project)
        }
    }

    // objtest.projects = Object.assign(arrtest2)
    return user
}

// returns user projects that he/she contributed to
app.get('/projects/:username', (req, res) => {
    const username = req.params.username
    const userInfo = userProjects(username)

    if (!userInfo) {
        res.status(404).send('project not found.')
    } else {
        // res.setHeader('content-type', 'application/json')
        //res.send(JSON.Stringfy(userInfo,null,4))
        res.send(userInfo)
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
function fetchProjectInfo(username, projectTitle) {
    var obj = {},
        obj2 = {},
        arr = [],
        arr2 = [],
        p_id

    //adding project info
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].title_name === projectTitle) {
            obj.title_name = projects[i].title_name
            obj.description = projects[i].description
            obj.commits = projects[i].commits
            p_id = projects[i].id
        }
    }

    //find contirbutions
    for (let i = 0; i < contributes_on.length; i++) {
        if (contributes_on[i].project_id === p_id) {
            arr.push(contributes_on[i].user_id)
        }
    }

    //get the username that belongs to that id
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (users[i].id === arr[j]) {
                let obj = {}
                obj.username = users[i].name
                arr2.push(obj)
            }
        }
    }

    obj.contributers = arr2
    return obj
}

//returns project titile info
app.get('/projects/:username/:project_title', (req, res) => {
    const projectTitle = req.params.project_title
    const username = req.params.username
    const project = fetchProjectInfo(username, projectTitle)

    if (!project) {
        res.status(404).send('Project not found.')
    } else {
        res.json(project)
    }
})

console.log(contributes_on)
