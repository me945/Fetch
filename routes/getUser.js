const express = require('express')
const router = express.Router({ mergeParams: true })
const { users, projects, contributes_on } = require('../project')
const { resolve } = require('path')
const fetch = require('node-fetch')

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

async function userProjects(username) {
    var user = {}
    user.projects = []

    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((json) => {
            user.id = json.id
            user.name = json.name
        })

    fetch(`https://api.github.com/users/${username}/repos`)
        .then((res) => res.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                let project = {}
                project.id = json[i].id
                project.name = json[i].name
                project.url = json[i].url
                user.projects.push(project)
            }
        })
        .then(() => {
            console.log(user)
        })
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
