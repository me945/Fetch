import { useState, useEffect } from 'react'
import Nav from './components/Nav/Nav.js'
import Title from './components/Title/Title.js'
import Profile from './components/Profile/Profile.js'
import ProjectsList from './components/Project/ProjectsList.js'
import ProjectInfo from './components/ProjectInfo/ProjectInfo.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
    //get the username from the url
    // const url = new URL(window.location.href)
    // let userURL = url.searchParams.get('user').toString()

    //state that holds the user object
    const [projectInfo, setProjectInfo] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [username, setUserName] = useState('')

    //set the user object to useState
    // useEffect(() => {
    //     const getUserInfo = async () => {
    //         const infoFromServer = await fetchUser()
    //         setProjectInfo(infoFromServer.projects)
    //         setUserInfo({
    //             name: infoFromServer.name,
    //             id: infoFromServer.id,
    //         })
    //     }
    //     getUserInfo()
    // }, [])

    //send username to the usestate
    const onChangeHandler = (name) => {
        setUserName(name.target.value)
    }

    //onClick Function
    const onClickHandler = async (e) => {
        e.preventDefault()

        const myURL = new URL(window.location.href)
        myURL.pathname = 'userinfo'
        myURL.search = `user=${username}`

        window.location.href = myURL

        // //Fetch user information from the server
        // const fetchUser = async () => {
        //     const fetchData = await fetch(
        //         `http://localhost:3000/projects/${username}`
        //     )
        //     const data = await fetchData.json()

        //     console.log(data)
        //     return data
        // }

        // //pass object values to the state
        // const getUserInfo = async () => {
        //     const infoFromServer = await fetchUser()
        //     setProjectInfo(infoFromServer.projects)
        //     setUserInfo({
        //         name: infoFromServer.name,
        //         id: infoFromServer.id,
        //     })
        // }
        // getUserInfo()
    }
    return (
        <Router>
            <div className="App">
                <Nav
                    onChange={onChangeHandler}
                    onClick={onClickHandler}
                    userName={username}
                />
                <Route
                    path="/"
                    exact
                    render={() => (
                        <Title
                            onChange={onChangeHandler}
                            onClick={onClickHandler}
                            userName={username}
                        />
                    )}
                />
                <Route path="/userinfo" component={Profile} />
                <Route path="/projectinfo" component={ProjectInfo} />
                {/* <Profile userinfo={userInfo} userName={username} /> */}
                {/* <ProjectsList
                    userProjects={projectInfo}
                    getProjectName={getProjectName}
                /> */}
            </div>
        </Router>
    )
}
export default App
