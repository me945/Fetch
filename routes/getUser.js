const express = require('express')
const router = express.Router({ mergeParams: true })
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
function userProjects(username) {
    let user = {}
    user.projects = []
    let promises = []

    return fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                return 'did not find the user'
            }
        })
        .then((json) => {
            user.id = json.id
            user.name = json.name
            return fetch(`https://api.github.com/users/${username}/repos`)
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                return 'did not find repo work'
            }
        })
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                let project = {}
                project.id = json[i].id
                project.name = json[i].name
                project.url = json[i].url
                promises.push(user.projects.push(project))
            }
            return Promise.all(promises).then(() => {
                return user
            })
        })
        .catch((error) => console.log(error))
}

// returns user projects that he/she contributed to
router.get('/', (req, res) => {
    const username = req.params.username
    userProjects(username).then((userInfo) => {
        if (!userInfo) {
            res.status(404).send('User not found.')
        } else {
            // res.setHeader('content-type', 'application/json')
            //res.send(JSON.Stringfy(userInfo, null, 4))
            // res.render('getUser', {
            //     id: userInfo.id,
            //     username: userInfo.name,
            //     projects: userInfo.projects,
            // })
            res.send(userInfo)
        }
    })
})

module.exports = router
