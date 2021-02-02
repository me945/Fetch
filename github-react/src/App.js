import { useState, useEffect } from 'react'
import Nav from './components/Nav/Nav.js'
import Title from './components/Title/Title.js'
import Profile from './components/Profile/Profile.js'
import ProjectsList from './components/Project/ProjectsList.js'
// import ProjectInfo from './components/ProjectInfo/ProjectsInfo.js'
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

    const onClickHandler = async (e) => {
        e.preventDefault()

        //Fetch user information from the server
        const fetchUser = async () => {
            const fetchData = await fetch(
                `http://localhost:3000/projects/${username}`
            )
            const data = await fetchData.json()

            console.log(data)
            return data
        }
        //pass the values to the stuff
        const getUserInfo = async () => {
            const infoFromServer = await fetchUser()
            setProjectInfo(infoFromServer.projects)
            setUserInfo({
                name: infoFromServer.name,
                id: infoFromServer.id,
            })
        }
        getUserInfo()
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
        console.log(id)
    }
    return (
        <div className="App">
            <Nav />
            <Title />
            <div
                style={{
                    paddingBottom: 20,
                    paddingTop: 20,
                    textAlign: 'center',
                }}
            >
                <div className="ui search">
                    <div className="ui icon input">
                        <i className="search icon"></i>
                        <input
                            className="prompt"
                            placeholder="enter username here"
                            type="text"
                            value={username}
                            onChange={onChangeHandler}
                        ></input>
                    </div>
                    <button
                        className=" ui primary button"
                        type="submit"
                        onClick={onClickHandler}
                    >
                        <i className="github icon"></i>
                        Search
                    </button>
                </div>
            </div>
            {/* <ProjectInfo userName={userURL} ProjectName={'projectName'} /> */}
            <Profile userinfo={userInfo} userName={username} />
            <ProjectsList
                userProjects={projectInfo}
                getProjectName={getProjectName}
            />
        </div>
    )
}
export default App
