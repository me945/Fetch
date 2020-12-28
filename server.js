const { users, projects, contributes_on } = require('./project')
const getUserRoute = require('./routes/getUser')
const getProjectRoute = require('./routes/getProject')
var express = require('express')
var path = require('path')
const axios = require('axios')
const app = express()
const PORT = 3000

app.set('json spaces', 4)

app.get('/', (req, res) => {
    //res.redirect('/projects/first')
    res.status(200).send('Server is running.')
})

app.get('/project', (req, res) => {
    res.json(projects)
})

app.use(express.static(path.join(__dirname + '/public/')))
app.use('/projects/:username', getUserRoute)
app.use('/projects/:username/:project_title', getProjectRoute)

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost: ${PORT}`)
})

//---------User Rout-----------------
//to get the user name: me945 (https://api.github.com/users/me945/)
/* 
    name: "Mahmoud"
    id: 50902206
*/
//all projects : (https://api.github.com/users/me945/repos)
/*
    Exmaple: 
    id: 225803621
    name: "IOS_Calculator"
    url: "https://api.github.com/repos/me945/IOS_Calculator"
*/

//---------Project Rout-----------------
//one Project: (https://api.github.com/repos/me945/IOS_Calculator)
/* 
    name: "IOS_Calculator"
    description: Null
*/
// commits: (https://api.github.com/repos/me945/IOS_Calculator/commits)
/* 
    i am not sure what to count
*/
//contributors: (https://api.github.com/repos/me945/IOS_Calculator/contributors)
/* 
   for each user url: (https://api.github.com/users/me945) -> name: "Mahmoud"
*/
