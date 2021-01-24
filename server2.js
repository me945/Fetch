// backend api
// hard coded data
// make use github api

// front end
// make use of backend api
// display the backend data

var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname + '/public/')))

//localhost:3000/450.png
//localhost:3000/index2.html
//localhost:3000/ -> localhost:300/"index.html"
app.listen(3000, () => {
    console.log('Listening on port 3000...')
})

// https://docs.github.com/en/free-pro-team@latest/rest/reference

//for the user route
// get username, id
// get project id, title, url equals to the full name for each project from repos_url

//for the project route
//prodject id, title ,descrip
