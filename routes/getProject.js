const express = require('express')
const router = express.Router({ mergeParams: true })
const { users, projects, contributes_on } = require('../project')
const { resolve } = require('path')
const fetch = require('node-fetch')
const { promises } = require('fs')
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
async function getProject(url) {
    const project = await fetch(url)
    return project
}

async function getCommits(url) {
    const commit = await fetch(url)
    return commit
}

async function getContributors(url) {
    const contribution = await fetch(url)
    return contribution
}

function fetchProjectInfo(username, projectTitle) {
    let user = {}
    user.contributors = []
    let login = []
    let promises = []
    fetch(`https://api.github.com/repos/${username}/${projectTitle}`)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                return reject('did not find the project')
            }
        })
        .then((json) => {
            //console.log(json)
            user.title = json.name
            user.description = json.description
        })
        .catch((error) => {
            console.log(error)
        })
    fetch(`https://api.github.com/repos/${username}/${projectTitle}/commits`)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                return reject('did not find commits')
            }
        })
        .then((json) => {
            //console.log(json)
            user.commits = json.length
        })
        .catch((error) => {
            console.log(error)
        })

    fetch(
        `https://api.github.com/repos/${username}/${projectTitle}/contributors`
    )
        // const fetchContributors = await
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                return reject('did not find contributors names')
            }
        })
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                login.push(json[i].login)
            }
        })
        .then(() => {
            for (let j = 0; j < login.length; j++) {
                promises.push(
                    fetch(`https://api.github.com/users/${login[j]}`)
                        .then((res) => res.json())
                        .then((json) => {
                            let object = {}
                            object.name = json.name
                            user.contributors.push(object)
                        })
                )
            }
            Promise.all(promises).then(() => console.log(user))
        })

        .catch((error) => {
            console.log(error)
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
