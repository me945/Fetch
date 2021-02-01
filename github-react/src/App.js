import { useState, useEffect } from 'react'
import Nav from './components/Nav/Nav.js'
import Title from './components/Title/Title.js'
import Profile from './components/Profile/Profile.js'
import ProjectsList from './components/Project/ProjectsList.js'

function App() {
    //get the username from the url
    const url = new URL(window.location.href)
    let userURL = url.searchParams.get('user').toString()

    //state that holds the user object
    const [userInfo, setUserInfo] = useState([])

    //set the user object to useState
    useEffect(() => {
        const getUserInfo = async () => {
            const infoFromServer = await fetchUser()
            setUserInfo(infoFromServer)
        }
        getUserInfo()
    }, [])

    var userProjects = {}
    //Fetch user information from the server
    const fetchUser = async () => {
        const fetchData = await fetch(
            `http://localhost:3000/projects/${userURL}`
        )
        const data = await fetchData.json()

        userProjects = data.projects
        console.log(userProjects)
        return data
    }

    let x = 0

    //pass username
    const onPress = () => {
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
            <Profile />
            <ProjectsList projects={userInfo} getProjectName={getProjectName} />
        </div>
    )
}
export default App
