const express = require('express')
const router = express.Router({ mergeParams: true })
const { users, projects, contributes_on } = require('../project')

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
