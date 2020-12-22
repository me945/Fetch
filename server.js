const { users, projects, contributes_on } = require('./project')

const getUserRoute = require('./routes/getUser')
const getProjectRoute = require('./routes/getProject')
var express = require('express')
const app = express()
const PORT = 3000

app.set('json spaces', 4)

app.get('/', (req, res) => {
    res.redirect('/projects/first')
})
app.get('/project', (req, res) => {
    res.json(projects)
})

app.use('/projects/:username', getUserRoute)
app.use('/projects/:username/:project_title', getProjectRoute)

app.listen(PORT, () => {
    console.log('Server running at: http://localhost:' + PORT)
})
