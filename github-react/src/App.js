import Nav from './components/Nav.js'
import Title from './components/Title.js'
import GetName from './components/GetName.js'
import Profile from './components/Profile.js'
import ProjectsList from './components/ProjectsList.js'
import { useState } from 'react'

function App() {
    //set of data
    const [projects, setTask] = useState([
        { id: 1, text: 'storIT' },
        { id: 2, text: 'iOS-Calculator' },
        { id: 3, text: 'whatever' },
    ])
    let x = 0
    // let f = 'hello'

    const getListOfProjects = () => {
        userProjects('me945')
        function userProjects(username) {
            let user = {}
            user.projects = []
            //getUserName = username
            return fetch(`projects/${username}`)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        return 'did not find the user'
                    }
                })
                .then((json) => {
                    console.log(json)
                })
                .catch((error) => console.log(error))
        }
    }

    //pass username
    const getUserName = () => {
        //check if the user entered a username

        // if (!a === f) {
        //     alert('Please enter a username')
        //     return
        // }
        console.log(x)
        x++
        //pass the username to the fetch funtion

        //change the url to ?user={username}
    }

    //button funtion
    const getProjectName = (id) => {
        console.log('Name', id)
    }
    return (
        <div className="App">
            <Nav />
            <Title />
            <GetName getUserName={getUserName} />
            <Profile />
            <ProjectsList projects={projects} getProjectName={getProjectName} />
        </div>
    )
}
export default App
