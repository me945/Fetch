const express = require('express')
const router = express.Router({ mergeParams: true })
const fetch = require('node-fetch')
//const axios = require('axios')
//const http = require('http')
//var path = require('path')
// ---------Find projects info of the user---------------------------------------------

// Object Example:  {
//                     "title_name" : "first_project",
//                     "description": "found  more reasons to hate JS",
//                     "commits": -1
//                      contributors: [
//                                      {user:"name"},.
//                                      {user:"name"}
//                                    ]
//                  }
async function fetchProjectInfo(username, projectTitle) {
    let user = {}
    user.contributors = []
    let login = []
    let promises = []
    return Promise.all([
        // promise 1
        fetch(`https://api.github.com/repos/${username}/${projectTitle}`, {
            headers: { Authorization: 'token ' + process.env.GITHUB_API_TOKEN },
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return 'did not find the project'
                }
            })
            .then((json) => {
                //console.log(json)
                user.title = json.name
                user.description = json.description
            })
            .catch((error) => {
                console.log(error)
            }),
        // promise 2
        fetch(
            `https://api.github.com/repos/${username}/${projectTitle}/commits?per_page=1`,
            {
                headers: {
                    Authorization: 'token ' + process.env.GITHUB_API_TOKEN,
                },
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    return res.headers
                } else {
                    return 'did not find commits'
                }
            })
            .then((object) => {
                const link = object.get('link')
                const links = link.split(', ')
                const lastLink = links[links.length - 1]
                const pageNumberString = lastLink.slice(
                    lastLink.indexOf('&page=') + 6,
                    lastLink.indexOf('>')
                )
                const pageNumber = Number(pageNumberString)
                user.commits = pageNumber
            })
            .catch((error) => {
                console.log(error)
            }),
        // promise 3
        fetch(
            `https://api.github.com/repos/${username}/${projectTitle}/contributors`,
            {
                headers: {
                    Authorization: 'token ' + process.env.GITHUB_API_TOKEN,
                },
            }
        )
            // const fetchContributors = await
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return 'did not find contributors names'
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
                        fetch(`https://api.github.com/users/${login[j]}`, {
                            headers: {
                                Authorization:
                                    'token ' + process.env.GITHUB_API_TOKEN,
                            },
                        })
                            .then((res) => res.json())
                            .then((json) => {
                                let object = {}
                                object.name = json.name
                                user.contributors.push(object)
                            })
                    )
                }
                return Promise.all(promises).then(() => {
                    //console.log(user)
                    return user
                })
            })
            .catch((error) => {
                console.log(error)
            }),
    ]).then(() => {
        return user
    })
}

//returns project titile info
router.get('/', (req, res) => {
    const projectTitle = req.params.project_title
    const username = req.params.username
    fetchProjectInfo(username, projectTitle).then((project) => {
        //console.log(project)
        if (!project) {
            res.status(404).send('Project not found.')
        } else {
            // res.render('getProject', {
            //     username: req.params.username,
            //     title: project.title,
            //     commits: project.commits,
            //     description: project.description,
            //     contributors: project.contributors,
            // })
            res.send(project)
        }
    })
})

// //returns project titile info
// router.get('/', async (req, res) => {
//     const projectTitle = req.params.project_title
//     const username = req.params.username
//     const user = {}
//     let promiseList = []
//     try {
//         promiseList.push(
//             getRequest(
//                 `https://api.github.com/repos/${username}/${projectTitle}`
//             )
//         )
//         promiseList.push(
//             getRequestHeaders(
//                 `https://api.github.com/repos/${username}/${projectTitle}/commits?per_page=1`
//             )
//         )
//         promiseList.push(getNames(username, projectTitle))
//         const results = await Promise.all(promiseList)
//         user.title = results[0].title
//         user.description = results[0].description
//         const link = results[1].get('link')
//         console.log(link)
//         const links = link.split(', ')
//         const lastLink = links[links.length - 1]
//         const pageNumberString = lastLink.slice(
//             lastLink.indexOf('&page=') + 6,
//             lastLink.indexOf('>')
//         )
//         const pageNumber = Number(pageNumberString)
//         user.commits = pageNumber
//         // user.commits = results[1].length
//         user.contributors = results[2].map((user) => user.name)
//         res.send(user)
//     } catch (error) {
//         res.status(404).send({ message: 'Failed', error: error })
//     }
//     // fetchProjectInfo(username, projectTitle).then((project) => {
//     //     console.log(project)
//     //     if (!project) {
//     //         res.status(404).send('Project not found.')
//     //     } else {
//     //         res.send(project)
//     //     }
//     // })
// })
// async function getNames(username, projectTitle) {
//     return getRequest(
//         `https://api.github.com/repos/${username}/${projectTitle}/contributors`
//     ).then((contributors) => {
//         const promises = []
//         for (let i = 0; i < contributors.length; i++) {
//             promises.push(
//                 getRequest(
//                     `https://api.github.com/users/${contributors[i].login}`
//                 )
//             )
//         }
//         return Promise.all(promises)
//     })
// }
// async function getRequest(url) {
//     const res = await fetch(url, {
//         headers: { Authorization: 'token ' + process.env.GITHUB_API_TOKEN },
//     })
//     return await res.json()
// }
// function getRequestHeaders(url) {
//     return fetch(url, {
//         headers: { Authorization: 'token ' + process.env.GITHUB_API_TOKEN },
//     }).then((res) => res.headers)
// }

module.exports = router
