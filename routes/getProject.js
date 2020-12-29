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
async function fetchProjectInfo(username, projectTitle) {
    let user = {}
    user.contributors = []
    let login = []

    //test link: http://localhost:3000/projects//me945/IOS_Calculator/
    //https://api.github.com/repos/$(username)/$(projectTitle)
    //https://api.github.com/repos/$(username)/$(projectTitle)/commits
    //https://api.github.com/repos/$(username)/$(projectTitle)/contributors

    //const fetchCommits = await

    // .then(() => {
    //     console.log(user)
    // })
    // fetch(`https://api.github.com/repos/${username}/${projectTitle}/commits`)
    //     .then((res) => res.json())
    //     .then((json) => {
    //         //console.log(json)
    //         user.commits = json.length
    //     })
    //const fetchProject = await
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
            return fetch(
                `https://api.github.com/repos/${username}/${projectTitle}/commits`
            )
        })
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
            return fetch(
                `https://api.github.com/repos/${username}/${projectTitle}/contributors`
            )
        })
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
                fetch(`https://api.github.com/users/${login[j]}`)
                    .then((res) => res.json())
                    .then((json) => {
                        let object = {}
                        //console.log(json)
                        object.name = json.name
                        user.contributors.push(object)
                        console.log(user)
                    })
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .catch((error) => console.error(error))

    //await new Promise((resolve, reject) => setTimeout(fetchContributors, 3000))
    // const results = await Promise.all([
    //     fetchCommits,
    //     fetchProject,
    //     fetchContributors,
    // ])
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
