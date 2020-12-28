const express = require('express')
const router = express.Router({ mergeParams: true })
const { users, projects, contributes_on } = require('../project')
const { resolve } = require('path')
const fetch = require('node-fetch')
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
    var user = {}
    user.contributors = []
    let login = []

    //test link: http://localhost:3000/projects//me945/IOS_Calculator/
    //https://api.github.com/repos/$(username)/$(projectTitle)
    //https://api.github.com/repos/$(username)/$(projectTitle)/commits
    //https://api.github.com/repos/$(username)/$(projectTitle)/contributors

    fetch(`https://api.github.com/repos/${username}/${projectTitle}/commits`)
        .then((res) => res.json())
        .then((json) => {
            user.commits = json.length
        })
        .then(() => {
            console.log(user)
        })

    fetch(`https://api.github.com/repos/${username}/${projectTitle}`)
        .then((res) => res.json())
        .then((json) => {
            user.title = json.name
            user.description = json.description
        })

    fetch(
        `https://api.github.com/repos/${username}/${projectTitle}/contributors`
    )
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            for (let i = 0; i < json.length; i++) {
                login.push(json[i].login)
            }
            console.log(login)
            return getName(() => {
                for (let j = 0; j < login.length; j++) {
                    fetch(`https://api.github.com/users/${login[i]}`)
                        .then((res) => res.json())
                        .then((json) => {
                            user.contributors.push(json.name)
                        })
                }
            })
        })
}

//returns project titile info
router.get('/', (req, res) => {
    const projectTitle = req.params.project_title
    const username = req.params.username
    const project = fetchProjectInfo(username, projectTitle)

    if (!project) {
        res.status(404).send('Project not found.')
    } else {
        res.json(project)
    }
})

module.exports = router
