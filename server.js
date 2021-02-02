const getUserRoute = require('./routes/getUser')
const getProjectRoute = require('./routes/getProject')
var express = require('express')
var path = require('path')
const app = express()
const PORT = 3000
const cors = require('cors')

app.set('json spaces', 4)
app.set('view engine', 'ejs')

//create a server
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     fs.readFile('/public/gitHub.html')

//     res.end()
// })

// server.listen(PORT, (error) => {
//     if (error) {
//         console.log('something is wrong')
//     } else {
//         console.log(`Server running on: http://localhost: ${PORT}`)
//     }
// })

//Home page
// app.use('/', (req, res) => {
//     res.status(200).send('hello')
// })
app.use(cors('hhtp://localhost/*'))
app.use('/', express.static(path.join(__dirname + '/public/')))
app.use('/projects/:username', getUserRoute)
app.use('/projects/:username/:project_title', getProjectRoute)

module.exports = app.listen(PORT, () => {
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

// Event listeners
