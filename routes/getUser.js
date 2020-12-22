const express = require('express')
const router = express.Router({ mergeParams: true })
const { users, projects, contributes_on } = require('../project')

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
router.get('/', (req, res) => {
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

module.exports = router
